from rest_framework.test import APITestCase, APIClient
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from .models import Movies, Youtube, Genre

User = get_user_model()


class TestMovieEndPoints(APITestCase):
    """Tests all the endpoints in the app"""
    def setUp(self):
        # set up client
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="mag2",
            password="qwerty1234@#",
            email="mag2@mag.com"
        )

        # authenticate
        self.client.force_authenticate(user=self.user)
    
        # set up movie 
        self.genre = Genre.objects.create(
            name="action"
        )

        self.movie1 = Movies.objects.create(
            name="testMovie1",
            country="testCountry",
            year=1234,
            genre=self.genre,
            is_movie=True,
            is_series=False,
            poster_url="https://m.media-amazon.com/images/M/MV5BNzBhNzlkM2UtZTQyOC00NjUyLTkzMmMtNDQ1YTM5N2NmMGE5XkEyXkFqcGc@._V1_SX300.jpg"
        )

        self.movie2 = Movies.objects.create(
            name="testMovie2",
            country="testCountry",
            year=1234,
            genre=self.genre,
            is_movie=False,
            is_series=True,
            poster_url="https://m.media-amazon.com/images/M/MV5BNzBhNzlkM2UtZTQyOC00NjUyLTkzMmMtNDQ1YTM5N2NmMGE5XkEyXkFqcGc@._V1_SX300.jpg"
        )

        self.yt1 = Youtube.objects.create(
            movie=self.movie1,
            source_channel="test channel",
            source_channel_id="test_channel_id",
            video_id="test_video_id"
        )
        
        self.yt2 = Youtube.objects.create(
            movie=self.movie2,
            source_channel="test channel",
            source_channel_id="test_channel_id",
            video_id="test_video_id"
        )

    def test_all_movies_view(self):
        """Tests the AllMoviesView"""

        url = reverse("all-movies-view")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 1)

        self.assertIn(self.movie1.name, response.data["results"][0]["name"])
    
    def test_all_series_view(self):
        """Tests the AllSeriesView"""

        url = reverse("all-series-view")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 1)

        self.assertIn(self.movie2.name, response.data["results"][0]["name"])
    
    def test_series_detail_view(self):
        """Tests the SeriesDetailView"""
        url = reverse("indiv-series-view", args=[self.movie2.name])
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn(self.movie2.name, response.data["name"])