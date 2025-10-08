from rest_framework import serializers
from .models import Movies


class MovieSerializer(serializers.ModelSerializer):
    """ serializes movie objects """
    class Meta:
        model = Movies
        fields = "__all__"