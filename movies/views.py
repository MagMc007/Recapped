from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.mixins import 
from .models import Movies
from .serializers import MovieSerializer


class AllMoviesView(ListAPIView):
    """view to list all movies"""
    queryset = Movies.objects.filter(is_movie=True)
    serializer_class = MovieSerializer
    permission_classes = [IsAuthenticated]


class AllSeriesView(ListAPIView):
    """view to list all series"""
    queryset = Movies.objects.filter(is_series=True)
    serializer_class = MovieSerializer
    permission_classes = [IsAuthenticated]

class MovieDetailView(RetrieveAPIView):
    """get a single movie"""
    serializer_class = MovieSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "name"

    def get_queryset(self):
        return Movies.objects.filter(is_movie=True)

class SeriesDetailView(RetrieveAPIView):
    """retrieves single series"""
    serializer_class = MovieSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "name"

    def get_queryset(self):
        return Movies.objects.filter(is_series=True)