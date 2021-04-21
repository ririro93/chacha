from rest_framework.serializers import ModelSerializer
from django.contrib.auth import get_user_model

CustomUser = get_user_model()

class CustomUserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'username', 'date_joined')

# for sending to front end 
class CustomUserUsernameSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username')
