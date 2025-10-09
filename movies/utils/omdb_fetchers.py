# movies/management/commands/populate_movies.py
import os
import json
import requests
from django.core.management.base import BaseCommand
from django.db import transaction
from movies.models import Movies, Genre, Youtube
from movies.utils.youtube_fetchers import fetch_videos_from_channel
from movies.utils.open_ai import extract_movie_info

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
YT_API_KEY = os.getenv("YOUTUBE_API_KEY")
OMDB_API_KEY = os.getenv("OMBD_API_KEY")

# ------------ Helper Functions ------------


def query_omdb(title, year=None):
    """Query OMDb for canonical movie data."""
    params = {"t": title, "apikey": OMDB_API_KEY}
    if year:
        params["y"] = year
    r = requests.get("http://www.omdbapi.com/", params=params, timeout=10)
    r.raise_for_status()
    data = r.json()
    if data.get("Response") == "True":
        return data
    return None


def parse_year(year_str):
    """Extract year as int from string like '2010' or '2010–2012'."""
    if not year_str:
        return 0
    import re
    match = re.match(r"(\d{4})", str(year_str))
    return int(match.group(1)) if match else 0


def normalize_genre(omdb_genre):
    """Take first genre from OMDb and lowercase it for your GENRE_OPTIONS."""
    if not omdb_genre:
        return "unknown"
    return omdb_genre.split(",")[0].strip().lower()


def fallback_title_from_yt(title):
    """Remove words like recap, summary, trailer to get movie title."""
    import re
    t = re.sub(r"\(.*?\)|\[.*?\]", "", title)  # remove brackets
    t = re.sub(r"(?i)\b(recap|full recap|summary|trailer)\b", "", t)
    t = re.sub(r"[-–—|].*$", "", t)  # remove trailing suffixes
    return t.strip()

# ------------ Management Command ------------


class Command(BaseCommand):
    help = "Fetch videos from channels, extract movie info via OpenAI, enrich with OMDb, and populate DB."

    def add_arguments(self, parser):
        parser.add_argument("--channels", nargs="+", help="Channel IDs to fetch")

    def handle(self, *args, **options):
        CHANNELS = [
            # Series Channels
            {"name": "Man of Recaps", "handle": "@ManofRecaps"},
            {"name": "Series Recap", "handle": "@SeriesRecapEng"},
            # Normal Movies Channels
            {"name": "Film Recaps Here", "handle": "@FilmRecapsHere"},
            {"name": "DiTi Recap", "handle": "@DiTiRecap96"},
            {"name": "5 Star Movie Reviews", "handle": "@5starmoviereviews"},
            {"name": "TheCutFrame", "id": "Not Found", "handle": "@ThecutFrame"},
            {"name": "PRO Movie Recap", "handle": "@PROMovieRecapp"},
            {"name": "RecapRecap", "handle": "@recaprecap99"},
            {"name": "Show Time", "handle": "@Itsshowtimerecaps"}
        ]

        if options.get("channels"):
            CHANNELS = [{"name": cid, "id": cid} for cid in options["channels"]]

        for ch in CHANNELS:
            self.stdout.write(f"-- Processing channel {ch['name']} ({ch['id']})")
            try:
                videos = fetch_videos_from_channel(ch["id"], YT_API_KEY)
            except Exception as e:
                self.stderr.write(f"Failed to fetch videos: {e}")
                continue

            for v in videos:
                snippet = v.get("snippet", {})
                yt_title = snippet.get("title", "")
                yt_desc = snippet.get("description", "")
                video_id = v.get("id", {}).get("videoId")

                # Step 2: OpenAI extraction
                parsed = extract_movie_info(yt_title, yt_desc)
                if parsed and parsed.get("movie_title"):
                    movie_title = parsed["movie_title"]
                    year_hint = parsed.get("year")
                else:
                    movie_title = fallback_title_from_yt(yt_title)
                    year_hint = None

                self.stdout.write(f"Candidate title: {movie_title} (year hint: {year_hint})")

                # Step 3: Query OMDb
                try:
                    omdb_data = query_omdb(movie_title, year_hint)
                except Exception as e:
                    self.stderr.write(f"OMDb query failed for '{movie_title}': {e}")
                    continue

                if not omdb_data:
                    self.stdout.write(f"OMDb did not find '{movie_title}', skipping.")
                    continue

                # Prepare DB fields
                genre_name = normalize_genre(omdb_data.get("Genre"))
                genre_obj, _ = Genre.objects.get_or_create(name=genre_name)

                year_val = parse_year(omdb_data.get("Year"))
                movie_defaults = {
                    "country": omdb_data.get("Country", "Unknown"),
                    "genre": genre_obj,
                    "is_movie": omdb_data.get("Type", "movie").lower() != "series",
                    "is_series": omdb_data.get("Type", "movie").lower() == "series",
                    "poster_url": omdb_data.get("Poster", "")
                }

                # Save Movie
                movie_obj, created = Movies.objects.get_or_create(
                    name=omdb_data.get("Title", movie_title),
                    year=year_val,
                    defaults=movie_defaults
                )

                # Save YouTube data
                if video_id:
                    Youtube.objects.get_or_create(
                        movie=movie_obj,
                        video_id=video_id,
                        defaults={
                            "source_channel": snippet.get("channelTitle", ch["name"]),
                            "source_channel_id": ch["id"]
                        }
                    )

                self.stdout.write(self.style.SUCCESS(f"Saved: {movie_obj.name} ({movie_obj.year})"))

        self.stdout.write(self.style.SUCCESS("All done!"))
