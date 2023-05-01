from django.urls import path
from .views import RegisterView, LoginView, UserView, LogoutView, RequestTwitterVerification, CheckBindedTwitterHandle, BindTwitterView, UnbindTwitterView, WaitList

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('user/', UserView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('checkTwitterBinded/', CheckBindedTwitterHandle.as_view()),
    path('request/', RequestTwitterVerification.as_view()),
    path('bind/', BindTwitterView.as_view()),
    path('unbind_twitter/', UnbindTwitterView.as_view()),
    path('join_waitlist/', WaitList.as_view())

]
