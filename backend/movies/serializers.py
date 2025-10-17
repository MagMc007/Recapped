from rest_framework import serializers
from .models import Movies, Genre, Youtube


class YTSerializer(serializers.ModelSerializer):
    """ serilizes YT data related to object """
    class Meta:
        model = Youtube
        fields = ['id', 'source_channel', 'source_channel_id', 'video_id']


class GenreSerializer(serializers.ModelSerializer):
    """ serilizies genre """
    class Meta:
        model = Genre
        fields = ["id", "name",]


class MovieSerializer(serializers.ModelSerializer):
    """ serializes movie objects """
    # prepare modelSers to nest
    youtube_details = YTSerializer(read_only=True, many=True)
    genre = GenreSerializer(read_only=True)
    average_rating = serializers.ReadOnlyField()

    class Meta:
        model = Movies
        fields = [
            "id",
            "name",
            "country",
            "year",
            "genre",
            "is_movie",
            "is_series",
            "poster_url",
            "youtube_details",
            "average_rating"
        ]
