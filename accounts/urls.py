from django.urls import include, path

app_name = 'accounts'

urlpatterns = [
    path('auth/', include('rest_auth.urls'), name='auth'),
    path('auth/register/', include('rest_auth.registration.urls'), name='register'),
]