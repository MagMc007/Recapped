from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from rest_framework_simplejwt.tokens import RefreshToken
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """ serializes user data for saving and registry """
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
    # override the create function to hash passwords

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data.get("username"),
            email=validated_data.get("email")
        )
        user.set_password(validated_data["password"])
        user.save()

        # create token and store it in validated data
        refresh = RefreshToken.for_user(user)
        user.refresh_token = str(refresh)
        user.access_token = str(refresh.access_token)

        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)  

        if password:
            instance.set_password(password)  # hash and set password

        instance.save()
        return instance


class LoginSerializer(serializers.ModelSerializer):
    """ serializes data for login """
    password = serializers.CharField(write_only=True)
    username = serializers.CharField()

    class Meta:
        model = User
        fields = ["username", "password"]

    def validate(self, data):
        user = authenticate(username=data["username"], password=data["password"])

        if user and user.is_active:
            return user 
           
        raise serializers.ValidationError("Invalid credential")
