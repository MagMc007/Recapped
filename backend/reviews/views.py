from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import ReviewSerializer
from .models import Rating, Movies
from urllib.parse import unquote


class ListCreateRatingView(generics.ListCreateAPIView):
    """Allows user to rate a movie"""
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        movie_name = self.kwargs["movie_name"]
        return Rating.objects.filter(movie__name=movie_name)

    def perform_create(self, serializer):
        movie_name = unquote(self.kwargs['movie_name'])
        movie = Movies.objects.get(name=movie_name)
        user = self.request.user

        # Check if rating already exists for this user/movie
        existing = Rating.objects.filter(movie=movie, user=user).first()

        if existing:
            # Update existing rating
            existing.score = serializer.validated_data['score']
            existing.save()
            return existing

        # Otherwise create a new rating
        serializer.save(user=user, movie=movie)

