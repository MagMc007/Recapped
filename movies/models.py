from django.db import models


class Genre(models.Model):
    """ stores genre for movie """
    GENRE_OPTIONS = [
        ("action", "Action"),
        ("horror", "Horror"),
        ("drama", "Drama"),
        ("adventure", "Adventure"),
        ("comedy", "Comedy"),
        ("crime", "Crime"),
        ("slasher", "Slasher"),
        ("western", "Western"),
        ("war", "War"),
        ("mystery", "Mystery"),
        ("romance", "Romance"),
        ("sci-fi", "Sci-fi"),
    ]

    name = models.CharField(max_length=100, choices=GENRE_OPTIONS)

    def __str__(self):
        return f"{self.name}"


class Movies(models.Model):
    """ stores data for movies """
    name = models.CharField(max_length=255)
    country = models.CharField(max_length=100)
    year = models.IntegerField()
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE, related_name="movies")
    is_movie = models.BooleanField()
    is_series = models.BooleanField()
    poster_url = models.URLField(max_length=1000, blank=True, null=True)

    @property
    def average_rating(self):
        ratings = self.ratings.all()
        if ratings.exists():
            return round(sum(r.score for r in ratings) / ratings.count(), 1)
        return None

    def __str__(self):
        return f"{self.name} | {self.country} | {self.year}"
    

class Youtube(models.Model):
    """ store youtube data related to a movie"""
    movie = models.ForeignKey(Movies, on_delete=models.CASCADE, related_name="youtube_details")
    source_channel = models.CharField(max_length=100)
    source_channel_id = models.CharField(max_length=100)
    video_id = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.source_channel_id} | {self.video_id}"


