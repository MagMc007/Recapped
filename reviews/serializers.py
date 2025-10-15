from rest_framework import serializers
from .models import Rating
from users.serializers import UserSerializer
from movies.serializers import MovieSerializer


class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    movie = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Rating
        fields = ["id", "user", "movie", "score"]
  
    def validate_score(self, data):
        if 0 <= data <= 5:
            return data
        raise serializers.ValidationError("score can only be in range [0, 5]")


