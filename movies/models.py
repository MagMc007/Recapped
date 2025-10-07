from django.db import models


class Movies(models.Model):
    """ movies model to store movie data """
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

    name = models.CharField(max_length=255)
    genre = models.CharField(max_length=100, choices=GENRE_OPTIONS)
    year = models.IntegerField()
    country = models.CharField(max_length=255)
    video_id = models.CharField(max_length=100)
    source_channel = models.CharField(max_length=255)
    source_channel_id = models.CharField(max_length=100)
    is_movie = models.BooleanField()
    is_series = models.BooleanField()

    def __str__(self):
        return f"{self.name} | {self.year} | {self.coutry}"
