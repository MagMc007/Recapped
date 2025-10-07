from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from django.contrib.auth import get_user_model


User = get_user_model()


class AuthenticationAPITest(APITestCase):
    """ Ensure Register works and creates user """

    def test_register_user(self):
        url = reverse("register-view")

        data = {
            "username": "magReg",
            "password": "qwerty1234@#",
            "email": "magReg@mag.com"
        }
        
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('user', response.data)
        self.assertIn('refresh', response.data)
        self.assertIn('access_token', response.data)
        self.assertEqual(response.data['user']['username'], "magReg")
   
    # set up user for login
    def setUp(self):
        self.user = User.objects.create_user(
            username="mag3",
            email="mag3@mag.com",
            password="qwerty1234@#"
        )

    def test_login_user(self):
        url = reverse("login-view")

        data = {
            "username": "mag3",
            "password": "qwerty1234@#"
        }

        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('user', response.data)
        self.assertIn('refresh', response.data)
        self.assertIn('access_token', response.data)
        self.assertEqual(response.data['user']['username'], "mag3")
    
    def tearDown(self):
        self.user.delete()

    
