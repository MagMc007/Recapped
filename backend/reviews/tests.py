from rest_framework.test import APIClient, APITestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from movies.models import Movies, Youtube, Genre

User = get_user_model()


class TestReatingViews(APITestCase):
    """Tests the rating views"""
    def setUp(self):
        # set up user
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="mag2", password="qwerty1234@#"
        )

        self.client.force_authenticate(user=self.user)

        # set up movie
        self.genre1 = Genre.objects.create(name="action")

        self.movie1 = Movies.objects.create(
            name="testMovie1",
            country="testCountry",
            year=12345,
            genre=self.genre1,
            is_movie=True,
            is_series=False,
            poster_url="https://m.media-amazon.com/images/M/MV5BNzBhNzlkM2UtZTQyOC00NjUyLTkzMmMtNDQ1YTM5N2NmMGE5XkEyXkFqcGc@._V1_SX300.jpg",
        )

        self.yt1 = Youtube.objects.create(
            movie=self.movie1,
            source_channel="test channel",
            source_channel_id="test_channel_id",
            video_id="test_video_id",
        )

    def test_rating_movie_view(self):
        """tests a user rating a movie"""
        url = f"/api/reviews/movies/{self.movie1.name}/ratings/"
        data = {"score": 3}

        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["score"], 3)

        """test the rating of a movie given by user"""
        url = f"/api/reviews/movies/{self.movie1.name}/ratings/"

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["results"][0]["score"], 3)