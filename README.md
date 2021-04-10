# chacha
> Django REST Framework(backend) + React(frontend) <br>
트위터가 글 중심, 인스타가 사진 중심 커뮤니티라면 이 앱은 그래프 중심 커뮤니티랄까

## 목표
- try Django REST Framework
- try JWT(Json Web Token) auth

## 투두s
- API request & response
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
        - [ ] rest-auth 3rd party 라이브러리 말고 그냥 기본 rest framework jwt 써보기
        - [ ] social-login 추가
        - [ ] email verification 추가
- Frontend
    - [ ] 대충 누르지 않게끔 장치
        - [ ] 회원가입 한 유저만 (?)
        - [ ] 30초 후에 누를 수 있게하기 (?)

## 해보고 싶은거
- three.js 써서 그래프 보여줄 때 돌릴 수 있는 정육면체 각 면에 그래프 하나씩 보여줘보고 싶다

## 배운거
- how to add new custom views to a viewset
- how to create a read_only field in a serializer for respose data