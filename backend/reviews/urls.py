from django.urls import path
from .views import ListCreateRatingView

urlpatterns = [
    path("movies/<str:movie_name>/ratings/", ListCreateRatingView.as_view(), name="list-create-rating-movie-view"),
    path("series/<str:movie_name>/ratings/", ListCreateRatingView.as_view(), name="list-create-rating-movie-view"),
]