from rest_framework.views import APIView
from rest_framework import status, generics
from django.contrib.auth import get_user_model
from . import serializers
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
User = get_user_model()


class RegisterView(generics.CreateAPIView):
    """ view to register user """
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        response = {
            "user": {
                "id": user.id,
                "username": user.username,
            },
            "refresh": user.refresh_token,
            "access_token": user.access_token
        }
        
        return Response(response, status=status.HTTP_201_CREATED)

    
class LoginView(APIView):
    """ view to login user in """
    permission_classes = [AllowAny]

    # override post
    def post(self, request, *args, **kwargs):
        serializer = serializers.LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        # generate token for user
        refresh_token = RefreshToken.for_user(user)
        access_token = refresh_token.access_token

        # prepare response json
        response = {
            "user": {
                "id": user.id,
                "username": user.username,
            },
            "refresh": str(refresh_token),
            "access_token": str(access_token)
        }
        
        return Response(response, status=status.HTTP_200_OK)
