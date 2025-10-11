from django.urls import path
from . import views

urlPatterns = [
    path("movies/", views.AllMoviesView.as_view(), name="all-movies-view"),
    path("series/", views.AllSeriesView.as_view(), name="all-series-view"),
    path("series/<str:name>/", views.SeriesDetailView.as_view(), name="indiv-series-view"),
    path("movies/<str:name>/", views.MovieDetailView.as_view(), name="indiv-movie-view"),
    path("movies/search/", views.SearchMovieView.as_view(), name="search-movie-view")
]