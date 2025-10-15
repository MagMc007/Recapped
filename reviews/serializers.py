from rest_framework import serializers
from .models import Rating


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = "__all__"
  
    def validate_score(self, data):
        if 0 <= data <= 5:
            return data
        raise serializers.ValidationError("score can only be in range [0, 5]")