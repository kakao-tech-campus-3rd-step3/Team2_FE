// src/shared/mocks/questions.mock.ts
import type { Question } from '../types/question';

export const questions: Question[] = [
  {
    id: 1,
    questionText: '다음 중 데이터 분석의 첫 단계는 무엇입니까?',
    options: ['데이터 수집', '데이터 전처리', '데이터 시각화', '데이터 모델링'],
    answer: '데이터 수집',
    explanation: '데이터 분석의 시작은 필요한 데이터를 수집하는 과정입니다.',
  },
  {
    id: 2,
    questionText: '통계에서 평균을 나타내는 용어는 무엇입니까?',
    options: ['Mean', 'Median', 'Mode', 'Variance'],
    answer: 'Mean',
    explanation: '평균은 데이터를 모두 합한 뒤 개수로 나눈 값으로, 영어로 Mean이라고 합니다.',
  },
  {
    id: 3,
    questionText: '머신러닝에서 과적합(Overfitting)을 방지하는 방법은 무엇입니까?',
    options: ['Dropout', 'Batch Normalization', 'Regularization', '모두 해당'],
    answer: '모두 해당',
    explanation:
      '과적합을 방지하기 위해 Dropout, Batch Normalization, Regularization 기법이 사용됩니다.',
  },
  {
    id: 4,
    questionText: 'HTTP 프로토콜에서 GET 요청의 특징은 무엇입니까?',
    options: ['데이터 조회', '데이터 생성', '데이터 수정', '데이터 삭제'],
    answer: '데이터 조회',
    explanation: 'GET 요청은 서버에서 데이터를 조회할 때 사용됩니다.',
  },
  {
    id: 5,
    questionText: '다음 중 NoSQL 데이터베이스가 아닌 것은?',
    options: ['MongoDB', 'Redis', 'PostgreSQL', 'Cassandra'],
    answer: 'PostgreSQL',
    explanation: 'PostgreSQL은 관계형 데이터베이스(RDBMS)입니다.',
  },
  {
    id: 6,
    questionText: 'React에서 상태를 관리하기 위한 훅(Hook)은 무엇입니까?',
    options: ['useState', 'useMemo', 'useEffect', 'useCallback'],
    answer: 'useState',
    explanation: 'useState는 React에서 상태를 관리하기 위한 기본 Hook입니다.',
  },
  {
    id: 7,
    questionText: 'CSS에서 Flexbox의 주축을 설정하는 속성은 무엇입니까?',
    options: ['align-items', 'justify-content', 'flex-direction', 'flex-wrap'],
    answer: 'flex-direction',
    explanation: 'flex-direction은 Flexbox의 주축(main axis)을 결정하는 속성입니다.',
  },
  {
    id: 8,
    questionText: '데이터베이스에서 기본 키(Primary Key)의 역할은 무엇입니까?',
    options: ['중복 허용', '유일성 보장', 'NULL 값 허용', '인덱스 생성 불가'],
    answer: '유일성 보장',
    explanation: 'Primary Key는 각 레코드를 고유하게 식별하기 위해 유일성을 보장합니다.',
  },
  {
    id: 9,
    questionText: '다음 중 파이썬의 데이터 타입이 아닌 것은 무엇입니까?',
    options: ['list', 'tuple', 'map', 'set'],
    answer: 'map',
    explanation: 'map은 파이썬의 내장 함수이지, 기본 데이터 타입은 아닙니다.',
  },
  {
    id: 10,
    questionText: 'Git에서 새로운 브랜치를 생성하는 명령어는 무엇입니까?',
    options: ['git checkout', 'git merge', 'git branch', 'git commit -b'],
    answer: 'git branch',
    explanation: '`git branch`는 새로운 브랜치를 생성하는 명령어입니다.',
  },
];
