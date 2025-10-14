# 풀잇 FrontEnd

![PullIt Banner](./public/pullit_banner.png)

<p align="center">
  AI 기반 학습 플랫폼 <b>“Pull It”</b><br/>
  학습 자료를 업로드하면 자동으로 문제를 생성하고, 오답노트를 관리할 수 있습니다.<br/>
</p>

## 목차

[프로젝트 소개](#프로젝트-소개) <br/>
[기술 스택](#기술-스택) <br/>
[Git 규칙](#git-규칙) <br/>
[코드 컨벤션](#코드-컨벤션) <br/>
[디렉터리 구조](#디렉터리-구조) <br/>
[팀원](#팀원) <br/>

## 프로젝트 소개

**Pull It**은 대학생 및 학습자를 위한 AI 기반 학습 보조 플랫폼입니다.  
단순히 공부 자료를 모으는 것을 넘어, **AI가 직접 문제를 만들어주고**,  
**오답 관리·학습 진도 추적**까지 도와주는 통합 학습 환경을 제공합니다.

## 기술 스택

<p align="center">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/>
  <img src="https://img.shields.io/badge/React_Router_Dom-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"/>
  <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Emotion-DB7093?style=for-the-badge&logo=emotion&logoColor=white"/>
  <img src="https://img.shields.io/badge/Chakra_UI-319795?style=for-the-badge&logo=chakraui&logoColor=white"/>
  <img src="https://img.shields.io/badge/Lottie-00B2A9?style=for-the-badge&logo=lottiefiles&logoColor=white"/>
  <img src="https://img.shields.io/badge/Lucide_React-8A2BE2?style=for-the-badge&logo=lucide&logoColor=white"/>
  <img src="https://img.shields.io/badge/React_Toastify-FF8C00?style=for-the-badge&logo=react&logoColor=white"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"/>
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black"/>
  <img src="https://img.shields.io/badge/Husky-000000?style=for-the-badge&logo=husky&logoColor=white"/>
  <img src="https://img.shields.io/badge/Airbnb_Code_Style-FF5A5F?style=for-the-badge&logo=airbnb&logoColor=white"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>
</p>

## Git 규칙

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

## 코드 컨벤션

Air bnb Style</br>
출처: https://github.com/airbnb/javascript<br/>

## 디렉터리 구조

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

## 팀원

<table align="center">
  <tr>
    <td align="center" style="padding: 10px;">
      <a href="https://github.com/anseonghyeon" target="_blank">
        <img 
          src="https://avatars.githubusercontent.com/u/62938167?v=4" 
          width="100px" 
          style="border-radius: 8px; border: 1.5px solid #ddd;" 
          alt="안성현"
        />
      </a>
      <br/>
      <sub>
        <b>
          <a href="https://github.com/anseonghyeon" style="text-decoration: none; color: #58a6ff;">안성현</a>
        </b>
      </sub>
    </td>
    <td align="center" style="padding: 10px;">
      <a href="https://github.com/Changhee-Cho" target="_blank">
        <img 
          src="https://avatars.githubusercontent.com/u/74707152?v=4" 
          width="100px" 
          style="border-radius: 8px; border: 1.5px solid #ddd;" 
          alt="조창희"
        />
      </a>
      <br/>
      <sub>
        <b>
          <a href="https://github.com/Changhee-Cho" style="text-decoration: none; color: #58a6ff;">조창희</a>
        </b>
      </sub>
    </td>
  </tr>
</table>
