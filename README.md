# chacha
> Django REST Framework(backend) + React(frontend) <br>
트위터가 글 중심, 인스타가 사진 중심 커뮤니티라면 이 앱은 그래프 중심 커뮤니티랄까

## Goals
- Django REST Framework
- JWT(Json Web Token) auth

## Todos
- [x]  로그인 기능, 회원가입 기능
    - [x] /accounts/login/
    - [x] /accounts/register/
- [x] Question 생성 페이지 만들기
- [ ] url 싹 다 정리하기
- [ ] 필요한 api
    - [ ] get current user info→ profile
    - [x] get is-logged-in → 필요 없을듯
    - [x] post question
- [x] main question 보낼 때
    - [x] answer 수만 리스트로 보내기
    - [x] answer 정보는 보내지 말기 (브라우저로 볼 수 있으니깐)
- [x] choices 는 기본적으로 question 등록할 때 같이 할 수 있게 → modelviewset customizing 할 수 있으면 json으로 choices 목록 오는거 views에서 등록하기
- [ ] rest auth 말고 그냥 기본 rest framework jwt 써보기
