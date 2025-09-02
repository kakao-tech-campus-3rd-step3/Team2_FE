# 풀잇 FrontEnd

## 목차

[Git Convention](#git-convention) <br/>
[Code Convention](#code-convention) <br/>
[Folder Structure](#folder-structures) <br/>

## Git Convention

[Commit](#commit) <br/>
[Branch](#branch) <br/>
[PR](#pr) <br/>

### Commit

#### 작업태그

| 접두사       | 설명                                |
| ------------ | ----------------------------------- |
| **init**     | 프로젝트 초기 설정                  |
| **feat**     | 새 기능 추가                        |
| **fix**      | 버그 수정                           |
| **style**    | 코드 스타일 변경 (세미콜론 누락 등) |
| **docs**     | 문서 (README.md 등)                 |
| **refactor** | 리팩토링                            |
| **hotfix**   | 핫픽스                              |
| **chore**    | 기타 작업                           |

#### Commit message 형태

- `작업태그(키워드): 작업내용 (#이슈번호)`
- 작업태그: [작업태그](#작업태그) 확인
- 키워드 (생략 가능): 작업 키워드
- 작업내용: 한국어 또는 영어로 작성하며, 영어로 작성 시에는 동사원형으로 시작
- 이슈번호 (생략 가능): Github issue 번호
- e.g
  - `feat(nav_bar): 네비게이션 바를 생성 (#1)`
  - `fix(user_name): 유저 이름 데이터를 수정 (#5)`

### Branch

- main
  - 최종 배포 branch

- develop
  - 개발 메인 branch
  - develop branch로 merge시 PR 작성
  - PR Approve 2명 이상 필요

- feat/\*\*
  - 기능 구현 시 branch 이름을 `feat/featureName`로 분기
  - e.g
    - `feat/main-page`

- fix/\*\*
  - 오류 수정시 branch 이름을 `fix/bugName`로 분기
  - e.g
    - `fix/booth-page-ui`

### PR

제목 템플릿

```
[작업번호]: 제목
```

예시

```
FTSK-1: ts 기반 리액트 프로젝트를 세팅하고 추가 라이브러리 설치와 github action을 설정
```

본문 템플릿

```
PR 설명
- [PR 설명]
- [PR 설명]
작업 상세 내용
- [작업 상세 내용]
- [작업 상세 내용]
기타사항 / 참고사항
- [기타사항 / 참고사항]
```

예시

```
## PR 설명

-  ts 기반 리액트 프로젝트를 세팅
- 추가 라이브러리 설치
- airbnb 컨벤션으로 eslint 설정, prettier 설정
- github action으로  prettier, eslint, ts check를 자동화 했습니다

## 작업 상세 내용
- ts기반 리액트 프로젝트를 VITE로 세팅
- Tailwind CSS 4.1.12 설치
- React Router Dom 7.8.2 설치
- TanStack Query (react-query) 5.85.5 설치
- axios 1.11.0 설치
- eslint 9.34.0 설치
- airbnb 컨벤션 반영
- prettier 3.6.2 설치

- github action으로 prettier, eslint, ts check 자동화

## 기타사항 / 참고사항

- LGTM 해주세용 😀😀😀😀
```

## Code Convention(Air bnb Style)

출처: https://github.com/airbnb/javascript<br/>

## Folder Structures

### Feature-based 구조

```
src/
├─ app/
│  ├─ routes/
│  ├─ index.tsx
│  └─ routePaths.ts
│
│
├─ pages/
│  ├─ HomePage.tsx
│  ├─ LoginPage.tsx
│  ├─ ProductListPage.tsx
│  ├─ ProductDetailPage.tsx
│  ├─ OrderPage.tsx
│  ├─ NotFoundPage.tsx
│  └─ _layout/
│     └─ AppLayout.tsx
│
│
├─ features/
│  ├─ auth/
│  │  ├─ components/
│  │  ├─ hooks/
│  │  ├─ services/
│  │  └─ index.ts
│  ├─ order/
│  │  ├─ components/
│  │  ├─ hooks/
│  │  ├─ services/
│  │  └─ index.ts
│  └─ product/
│     ├─ components/
│     ├─ hooks/
│     ├─ services/
│     └─ index.ts
│
├─ shared/
│  ├─ components/
│  ├─ hooks/
│  ├─ utils/
│  ├─ api/
│  ├─ styles/
│  └─ config/
│
└─ main.tsx
```
