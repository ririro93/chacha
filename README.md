# chacha
> Django REST Framework(backend) + React(frontend) <br>
트위터가 글 중심, 인스타가 사진 중심 커뮤니티라면 이 앱은 그래프 중심 커뮤니티

## 목표
- try Django REST Framework
- try JWT(Json Web Token) auth

## 투두s
- API endpoints
    - [x] auth -> api/accounts/...
        - [x] 로그인, 로그아웃
        - [x] 회원가입 (signup/)
        - [ ] current user info (profile/)
    - [ ] questions -> api/questions/...
        - [x] Question 생성 (POST)
            - [x] choices 는 기본적으로 question 등록할 때 같이 할 수 있게 
            - [x] -> modelviewset customizing 할 수 있으면 json으로 choices 목록 오는걸로 question, choices 한번에 생성하기
        - [x] Main Question (main-question/)
            - [x] 각 Choice 에 대한 답변 개수만 추가해서 보내기
            - [x] -> answer 정보는 보내지 말기 (브라우저로 볼 수 있으니깐)
- Backend
    - auth
        - [x] rest-auth 3rd party 라이브러리 말고 그냥 기본 rest framework jwt 써보기
            - 기본 rest framework 에는 jwt 없음 -> dj-rest-auth + simplejwt 사용
        - [ ] social-login 추가
        - [ ] email verification 추가
        - [x] question ModelViewSet 에서 method 별 permission 다르게 설정 -> GET: allowany, POST: IsAuthenticated 
            - 복잡해서 create method에서 if user.is_authenticed 사용
        - [x] logout 하면 401 status 와 "detail": "Refresh token was not included in request data." 라는 메세지가 온다
            - [github issues](https://github.com/iMerica/dj-rest-auth/issues/96): 여기 보면 middleware 추가해주면 된다고 해서 시도
            - 문제: refresh token은 브라우저의 http-only cookie에 저장되고 logout 요청을 보낼 때 header에 이 refresh token 정보를 넣어서 보내준다 하지만 djangorestframework-simplejwt라는 라이브러리는 body로 밖에 refresh token을 못 받는다
            - -> 정리: dj-rest-auth가 브라우저의 cookie에 저장된 access-token과 refresh-token은 지워주지만 body로 refresh token을 받지 못한 simplejwt 라이브러리는 blacklist에 해당 refresh-token을 추가하지 못한다
            - -> 즉 로그아웃을 했지만 기존 refresh-token으로 새로운 access-token의 발급을 요청하면 새로 발급해준다.
            - 해결: request의 header로 들어오는 refresh-token 정보를 middleware를 통해 body로 넘겨주는 작업을 해서 simplejwt 라이브러리가 해당 refresh-token을 blacklist에 추가할 수 있도록 해준다.
            - -> 링크에 있는 코드에는 logout url에 해당하는 경우에 이 작업을 해주는 부분이 없어서 따로 추가 해줘야됨 
            - -> logout body에 {} 처럼 공간을 만들어서 비지 않게 보내야지 refresh-token을 추가해 줄 수 있음
- Frontend
    - [ ] 대충 누르지 않게끔 장치
        - [ ] 회원가입 한 유저만 (?)
        - [ ] 30초 후에 누를 수 있게하기 (?)

## 해보고 싶은거
- three.js 써서 그래프 보여줄 때 돌릴 수 있는 정육면체 각 면에 그래프 하나씩 보여줘보고 싶다

## 배운거
- how to add new custom views to a viewset
- how to create a read_only field in a serializer for respose data