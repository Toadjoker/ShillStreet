from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed

from .serializers import UserSerializer, WaitListSerializer
from .authentication import JWTAuthentication
from .models import User, WaitList
from .readTweetViaApi import readTweet
from datetime import datetime, timedelta
import requests
import jwt
# Create your views here.


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        walletAddress = request.data['walletAddress']
        privateString = request.data['privateString']

        user = User.objects.filter(walletAddress=walletAddress).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if user.privateString != privateString:
            raise AuthenticationFailed('Incorrect privateString!')

        payload = {
            'id': user.id,
            'exp': datetime.utcnow() + timedelta(minutes=60),
            'iat': datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', 'HS256')

        response = Response()

        response.data = {
            'jwt': token
        }
        return response


class UserView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)


class RequestTwitterVerification(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({"id": f"{135487456845+int(user.id)}"})


class CheckBindedTwitterHandle(APIView):

    def post(self, request):
        walletAddress = request.data.get('walletAddress')
        if User.objects.filter(walletAddress=walletAddress).exists():
            user = User.objects.filter(walletAddress=walletAddress).first()
            return Response({"is_twitterBinded": user.is_twitterBinded, "twitter_handle": f"{user.twitter_handle}"})
        else:
            return Response({"is_twitterBinded": False})


class BindTwitterView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        url = request.data.get('url')
        tweet_content, twitter_user_id, twitter_handle = readTweet(url)

        if f"{135487456845 + int(user.id)}" not in tweet_content:
            return Response({"error": "Wrong Tweet"}, status=400)

        if not twitter_handle:
            return Response({"error": "Twitter handle is required"}, status=400)

        # Check if the Twitter handle is already in use
        if User.objects.filter(twitter_handle=twitter_handle).exists():
            return Response({"error": "This Twitter handle is already in use"}, status=400)

        user.twitter_handle = twitter_handle
        user.twitter_user_id = twitter_user_id
        user.is_twitterBinded = True
        user.save()

        serializer = UserSerializer(user)
        return Response(serializer.data)


class UnbindTwitterView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        user.twitter_handle = None
        user.is_twitterBinded = False
        user.save()

        serializer = UserSerializer(user)
        return Response(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt', samesite='None')
        response.data = {
            'message': 'success'
        }
        return response


class DeleteUser(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, user_id):
        user = User.objects.filter(id=int(user_id)).first()

        if user is None:
            print("not found")
            # raise Http404("User does not exist")

        user.delete()

        response = Response()
        response.data = {
            'message': 'success'
        }
        return response


class WaitList(APIView):

    def post(self, request):
        waitlistemail = request.data.get('email')
        serializer = WaitListSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        warn_info = {
            'username': 'ShillStreet Bot',
            'avatar_url': '',
            "embeds": [
                {"title": "**New Waitlist**",
                 "color": 4611764,
                 "footer": {
                     "text": "New user joined wait list",
                     "icon_url": ""
                 },
                 "fields": [{"name": "Email Address", "value": f"{waitlistemail}", "inline": False},
                            {"name": "Status", "value": "Done", "inline": False}]}]}
        requests.post(
            'https://discord.com/api/webhooks/1093662954215456869/574uQrgYmB4shdy4GcqGyF_54pS-FuRwpWew-HTjwTmCMlAw7aVN4V9i9fW7zuE6dEic', json=warn_info)

        response = Response()
        response.data = {
            'message': 'success'
        }
        return response
