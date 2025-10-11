from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status
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
 

class SearchMovieView(ListAPIView):
    """view to respond to searches"""
    serializer_class = MovieSerializer
    permission_classes = [IsAuthenticated]

    # set queryset to filter the search value
    def get_queryset(self):
        query = self.request.query_parmas.get("q", "")
        return Movies.objects.filter(name__icontains=query)

    def list(self, request, *args, **kwargs):
        query = request.query_params.get('q', '')
        queryset = self.get_queryset()
        # no movies for search
        if not queryset.exists():
            return Response({"message": f"No results for `{query}`."},
                            status=status.HTTP_404_NOT_FOUND)
        serilizer = self.get_serializer()
        return Response(serilizer.data)


