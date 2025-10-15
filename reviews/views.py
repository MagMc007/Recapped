from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import ReviewSerializer
from .models import Rating, Movies


class ListCreateRating(generics.ListCreateAPIView):
    """Allows user to rate a movie"""
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]
      
    def get_queryset(self):
        movie_name = self.kwargs["movie_name"]
        return Rating.objects.filter(movie__name=movie_name)

    def perform_create(self, serializer):
        movie_name = self.kwargs['movie_name']
        movie = Movies.objects.get(name=movie_name)
        serializer.save(user=self.request.user, movie=movie)
