from django.db import models


class Movies(models.Model):
    """ stores data for movies """
    name = models.CharField(max_length=255)
    country = models.CharField(max_length=100)
    year = models.IntegerField()
    is_movie = models.BooleanField()
    is_series = models.BooleanField()

    def __str__(self):
        return f"{self.name} | {self.country} | {self.year}"
    

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

    genre = models.CharField(max_length=100, choices=GENRE_OPTIONS)
    movies = models.ForeignKey(Movies, on_delete=models.CASCADE, related_name="movie_genre")

    def __str__(self):
        return f"{self.genre}"


class Youtube(models.Model):
    """ store youtube data related to a movie"""
    movie = models.ForeignKey(Movies, on_delete=models.CASCADE, related_name="movie_yt")
    source_channel = models.CharField(max_length=100)
    source_channel_id = models.CharField(max_length=100)
    video_id = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.source_channel_id} | {self.video_id}"


