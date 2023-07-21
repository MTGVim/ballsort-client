
<img src="https://github.com/MTGVim/ballsort-client/blob/main/src/assets/logo.png" width="200">

# BallSort (client)

## Table of Contents

- [BallSort (client)](#ballsort-client)
  - [Table of Contents](#table-of-contents)
  - [About ](#about-)
  - [Getting Started ](#getting-started-)
    - [Prerequisites](#prerequisites)
    - [Installing](#installing)
  - [Usage ](#usage-)
  - [DEMO](#demo)

## About <a name = "about"></a>

MERN 스택에 관심이 생겨 토이 프로젝트에 적용해 보고 싶던 차에,

 즐겨하던 볼 소트 게임이 광고를 요구하길래, 직접 만들자 싶어 시작.


### TODO LIST
- [x] MERN 스택 구성
  - [x] MongoDB
  - [x] Express
  - [x] React
  - [x] Node.js
- [x] 사용자
  - [x] 회원가입
  - [x] 로그인
  - [ ] JWT
- [ ] 게임
  - [x] 핵심 로직
    - [x] 스테이지 유효성 검사
    - [x] 애니메이션 & 볼 이동 로직
    - [x] 승리 조건
    - [x] 한 번에 여러 볼 이동
  - [ ] 경쟁요소
    - [x] 최대 클리어 스테이지 번호
    - [x] 스테이지 별 볼 이동 횟수
    - [ ] 스테이지 별 클리어 시간
  - [x] 절차적 스테이지 생성
    - [x] 생성
    - [x] 클리어 가능함을 보장
  - [ ] 난이도
    - [ ] 생성 시 유효했던 moveBalls 횟수로 판단?
    - [ ] 난이도가 점진적으로 어려워지도록 하기 (병 갯수는 최대 10개임)
  - [ ] 무한모드
    - [ ] 스테이지 번호 대신 무엇으로 분류할 것인가?
- [x] demo

## Getting Started <a name = "getting_started"></a>

### Prerequisites

Wanna use online service? go and see BallSort(Server) repo's README.md

```
node.js (^16)
```

### Installing

```
yarn
```

```
until finished
```

## Usage <a name = "usage"></a>

```
yarn start
```

## DEMO

[DEMO](https://ballsorting.web.app/)
