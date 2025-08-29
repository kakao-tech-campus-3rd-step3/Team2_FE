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

- PR Template에 맞춰 작성

## Code Convention(Air bnb Style)

출처: https://github.com/airbnb/javascript<br/>

## Folder Structures

