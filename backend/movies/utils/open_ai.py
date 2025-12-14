import os
import json
# from openai import OpenAI

from google import genai
import time

# Load your API key (set it in your .env)

# genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
GENAI_KEYS = [
    os.getenv("GEMINI_API_KEY_2"),
    os.getenv("GEMINI_API_KEY_1"),
    os.getenv("GEMINI_API_KEY_3"),
    os.getenv("GEMINI_API_KEY_4"),
    os.getenv("GEMINI_API_KEY_5"),
]


def api_key_iterator(keys):
    """ iterates over api key to deal with quota"""
    while True:
        for key in keys:
            if key:
                yield key


key_gen = api_key_iterator(GENAI_KEYS)


def extract_movie_info(video_title, video_description):
    """Leverages ai model and gives the name """
    combined_text = f"{video_title}\n\n{video_description}"

    # model = genai.GenerativeModel("gemini-2.5-pro")  # or gemini-1.5-flash (faster & free)

    prompt = (
        "Extract movie or series information from the provided YouTube title and description. "
        "Return JSON with: `movie_title` (exact name of the movie or show), `year` (release year, if available), "
        "`country` (primary production country, if known), `genres` (list of genres, if identifiable), "
        "`confidence` (0-1 score for extraction accuracy). "
        "The title or description explicitly contains the movie/show name, often embedded with extra text like 'recap','season.' or others "
        "Use prior knowledge to identify the correct name, ignoring irrelevant phrases. "
        f"Input:\n{combined_text}"
    )

    retries = 0
    max_retries = 5
    while retries < max_retries:
        key = next(key_gen)
        client = genai.Client(api_key=key)

        try:
            response = client.models.generate_content(
                model="models/gemini-2.5-flash",
                contents=prompt
            )
            text = response.text.strip()

            # Extract JSON safely
            start = text.find("{")
            end = text.rfind("}") + 1
            if start == -1 or end == -1:
                raise ValueError("Invalid JSON returned")

            parsed = json.loads(text[start:end])
            if parsed.get("movie_title") is None:
                raise ValueError("movie_title missing in response")

            return parsed

        except Exception as e:
            err_str = str(e)
            if "RESOURCE_EXHAUSTED" in err_str or "429" in err_str:
                # Wait for the suggested retry delay or default to 35s
                delay = 35
                if "retryDelay" in err_str:
                    try:
                        delay = float(err_str.split("retryDelay")[1].split("s")[0])
                    except (IndexError, ValueError):
                        delay = 35
                print(f"Quota hit on key {key}, retrying in {delay:.1f}s...")
                time.sleep(delay)
                retries += 1
            else:
                print(f"Gemini API error with key {key}: {e}")
                retries += 1
                time.sleep(5)

    # If all retries fail
    print("All retries exhausted, skipping extraction.")
    return None