from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status
from .models import Movies
from .serializers import MovieSerializer
from rest_framework.pagination import PageNumberPagination


class AllMoviesView(ListAPIView):
    """view to list all movies"""

    queryset = Movies.objects.filter(is_movie=True).prefetch_related('youtube_details').distinct()
    serializer_class = MovieSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination


class AllSeriesView(ListAPIView):
    """view to list all series"""

    queryset = Movies.objects.filter(is_series=True).prefetch_related('youtube_details').distinct()
    serializer_class = MovieSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination


class MovieDetailView(RetrieveAPIView):
    """get a single movie"""

    serializer_class = MovieSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination
    lookup_field = "name"

    def get_queryset(self):
        return Movies.objects.filter(is_movie=True)


class SeriesDetailView(RetrieveAPIView):
    """retrieves single series"""

    serializer_class = MovieSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination
    lookup_field = "name"

    def get_queryset(self):
        return Movies.objects.filter(is_series=True)


class SearchMovieView(ListAPIView):
    """view to respond to searches"""

    serializer_class = MovieSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination

    # set queryset to filter the search value
    def get_queryset(self):
        query = self.request.query_parmas.get("q", "")
        return Movies.objects.filter(name__icontains=query)

    # handle case if no such movie is found
    def list(self, request, *args, **kwargs):
        query = request.query_params.get("q", "")
        queryset = self.get_queryset()
        # no movies for search
        if not queryset.exists():
            return Response(
                {"message": f"No results for `{query}`."},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = self.get_serializer(queryset)
        return Response(serializer.data)


class RecentMovies(ListAPIView):
    """gets uset the mosst recent movies"""

    serializer_class = MovieSerializer
    permission_classes = [IsAuthenticated]
    queryset = Movies.objects.filter(is_movie=True).order_by("-year")
    pagination_class = PageNumberPagination


class RecentSeries(ListAPIView):
    """gets the recent series"""

    serializer_class = MovieSerializer
    permission_classes = [IsAuthenticated]
    queryset = Movies.objects.filter(is_series=True).order_by("-year")
    pagination_class = PageNumberPagination


class GenreFilterMovies(ListAPIView):
    """filters both movies and series based on genre"""

    serializer_class = MovieSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        genre = self.request.query_params.get("f", "")
        return Movies.objects.filter(genre__name__icontains=genre, is_movie=True)

    def list(self, request, *args, **kwargs):
        genre = request.query_params.get("q", "")
        queryset = self.get_queryset()

        if not queryset.exists():
            return Response(
                {"message": f"No movies with genre: `{genre}` yet."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = self.get_serializer(queryset)

        return Response(serializer.data)


class GenreFilterSeries(ListAPIView):
    """filters movies based on genre"""

    serializer_class = MovieSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        genre = self.request.query_params("f", "")
        return Movies.objects.filter(genre__name__icontains=genre, is_series=True)

    def list(self, request, *args, **kwargs):
        genre = request.query_params.get("q", "")
        queryset = self.get_queryset()

        if not queryset.exists():
            return Response(
                {"message": f"No movies with genre: `{genre}` yet."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = self.get_serializer(queryset)

        return Response(serializer.data)


class YearFilterMovies(ListAPIView):
    """filters movies based on year"""

    serializer_class = MovieSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        year = self.request.query_params.get("y", "")
        return Movies.objects.filter(year=int(year), is_movies=True)

    def list(self, request, *args, **kwargs):
        year = request.query_params.get("y", "")
        queryset = self.get_queryset()

        if not queryset.exists():
            return Response(
                {"message": f"No movies from the year: `{year}`."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = self.get_serializer(queryset)

        return Response(serializer.data)


class YearFilterSeries(ListAPIView):
    """filters series based on year"""

    serializer_class = MovieSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        year = self.request.query_params("y", "")
        return Movies.objects.filter(year=int(year), is_series=True)

    def list(self, request, *args, **kwargs):
        year = request.query_params.get("y", "")
        queryset = self.get_queryset()

        if not queryset.exists():
            return Response(
                {"message": f"No series from the year: `{year}`."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serilaizer = self.get_serializer(queryset)

        return Response(serilaizer.data)


class CountryFilterMovies(ListAPIView):
    """filters movies based on country"""

    serializer_class = MovieSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        country = self.request.query_params.get("y", "")
        return Movies.objects.filter(country__icontains=country, is_movies=True)

    def list(self, request, *args, **kwargs):
        country = request.query_params.get("y", "")
        queryset = self.get_queryset()

        if not queryset.exists():
            return Response(
                {"message": f"No movies from the country: `{country}`."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = self.get_serializer(queryset)

        return Response(serializer.data)


class CountryFilterSeries(ListAPIView):
    """filters series based on coutry"""
    serializer_class = MovieSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        country = self.request.query_params("c", "")
        return Movies.objects.filter(country__icontains=country, is_series=True)

    def list(self, request, *args, **kwargs):
        country = request.query_params.get("c", "")
        queryset = self.get_queryset()

        if not queryset.exists():
            return Response(
                {"message": f"No series from the country: `{country}`."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serilaizer = self.get_serializer(queryset)

        return Response(serilaizer.data)
