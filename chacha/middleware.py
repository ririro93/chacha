from django.conf import settings
from django.utils.deprecation import MiddlewareMixin
import json
from pprint import pprint


class MoveJWTCookieIntoTheBody(MiddlewareMixin):
    """
    for Django Rest Framework JWT's POST "/token-refresh" endpoint --- check for a 'token' in the request.COOKIES
    and if, add it to the body payload.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_view(self, request, view_func, *view_args, **view_kwargs):
        if request.path == 'api/accounts/token/verify/' and settings.JWT_AUTH_COOKIE in request.COOKIES:
            print('## access-token moved from header to body')
            if request.body != b'':
                data = json.loads(request.body)
                data['token'] = request.COOKIES[settings.JWT_AUTH_COOKIE]
                request._body = json.dumps(data).encode('utf-8')
            else:
                # I cannot create a body if it is not passed so the client must send '{}'
                pass

        return None

class MoveJWTRefreshCookieIntoTheBody(MiddlewareMixin):
    """
    for Django Rest Framework JWT's POST "/token-refresh" endpoint --- check for a 'token' in the request.COOKIES
    and if, add it to the body payload.
    + works also for logout
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_view(self, request, view_func, *view_args, **view_kwargs):
        if (request.path == '/api/accounts/token/refresh/' or request.path == '/api/accounts/logout/') and settings.JWT_AUTH_REFRESH_COOKIE in request.COOKIES:
            print('## refresh-token moved from header to body')

            if request.body != b'':
                data = json.loads(request.body)
                data['refresh'] = request.COOKIES[settings.JWT_AUTH_REFRESH_COOKIE]
                request._body = json.dumps(data).encode('utf-8')
            else:
                # I cannot create a body if it is not passed so the client must send '{}'
                pass

        return None