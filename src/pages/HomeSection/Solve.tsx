import { useState } from 'react';
import styled from '@emotion/styled';

import PageLayout from '@/shared/components/Layout/PageLayout';

import SolveHeader from '@/features/solve/components/SolveHeader';
import ProgressDescription from '@/features/solve/components/ProgressDescription';
import QuestionNavigator from '@/features/solve/components/QuestionNavigator';
import QuestionArea from '@/features/solve/components/QuestionArea';
import ModeCard from '@/features/solve/components/ModeCard';
import ProgressCard from '@/features/solve/components/ProgressCard';

import SolveResult from './SolveResult';
// 전체 wrapper
const SolveWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.spacing5};

  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 960px;
  background-color: ${({ theme }) => theme.colors.gray.gray2};
`;

// 문제 푸는 부분 본문 전체
const SolveContentWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.spacing3};
  display: flex;
`;

// 오른쪽 애들 묵어둔것
const RightSidebar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

interface Question {
  id: number;
  stem: string;
  options: string[];
  answer: number;
}

// 문제집 Mock 데이터
const questions: Question[] = [
  {
    id: 1,
    stem: '다음 중 데이터 분석의 첫 단계는 무엇입니까?',
    options: ['데이터 수집', '데이터 전처리', '데이터 시각화', '데이터 모델링'],
    answer: 1,
  },
  {
    id: 2,
    stem: '통계에서 평균을 나타내는 용어는 무엇입니까?',
    options: ['Mean', 'Median', 'Mode', 'Variance'],
    answer: 1,
  },
  {
    id: 3,
    stem: '머신러닝에서 과적합(Overfitting)을 방지하는 방법은?',
    options: ['Dropout', 'Batch Normalization', 'Regularization', '모두 해당'],
    answer: 4,
  },
  {
    id: 4,
    stem: 'HTTP 프로토콜에서 GET 요청의 특징은?',
    options: ['데이터 조회', '데이터 생성', '데이터 수정', '데이터 삭제'],
    answer: 1,
  },
  {
    id: 5,
    stem: '다음 중 NoSQL 데이터베이스가 아닌 것은?',
    options: ['MongoDB', 'Redis', 'PostgreSQL', 'Cassandra'],
    answer: 3,
  },
  {
    id: 6,
    stem: 'React의 상태 관리 훅은?',
    options: ['useState', 'useMemo', 'useEffect', 'useCallback'],
    answer: 1,
  },
  {
    id: 7,
    stem: 'CSS에서 Flexbox의 주축을 설정하는 속성은?',
    options: ['align-items', 'justify-content', 'flex-direction', 'flex-wrap'],
    answer: 3,
  },
  {
    id: 8,
    stem: '데이터베이스에서 기본 키(Primary Key)의 역할은?',
    options: ['중복 허용', '유일성 보장', 'NULL 값 허용', '인덱스 생성 불가'],
    answer: 2,
  },
  {
    id: 9,
    stem: '다음 중 파이썬의 데이터 타입이 아닌 것은?',
    options: ['list', 'tuple', 'map', 'set'],
    answer: 3,
  },
  {
    id: 10,
    stem: 'Git에서 새로운 브랜치를 만드는 명령어는?',
    options: ['git checkout', 'git merge', 'git branch', 'git commit -b'],
    answer: 3,
  },
];

// Solve
function Solve() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(1); // 현재 풀고있는 문제 인덱스
  const [selectedMode, setSelectedMode] = useState<string>('시험'); // 문제 풀이 모드 선택
  const [solvedCheck, setSolvedCheck] = useState<Set<number>>(new Set()); // 선택된 문항 set으로 관리

  const [isAllSolved, setIsAllSolved] = useState<boolean>(false);
  // set에 풀린 문제 기록 함수
  
  return (
    <PageLayout>
      <SolveWrapper>
        {isAllSolved ? <SolveResult/>: <>
    <SolveHeader currentQuestionIndex={currentQuestionIndex} />
        <ProgressDescription solvedCheckPercent={(solvedCheck.size / 10) * 100} />
        <QuestionNavigator
          currentQuestionIndex={currentQuestionIndex}
          solvedCheck={solvedCheck}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
        />
        <SolveContentWrapper>
          <QuestionArea
            currentQuestionIndex={currentQuestionIndex}
            questions={questions}
            setSolvedCheck={setSolvedCheck}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            setIsAllSolved={setIsAllSolved}
          />
          <RightSidebar>
            <ModeCard selectedMode={selectedMode} setSelectedMode={setSelectedMode}/>
            <ProgressCard questions={questions} solvedCheck={solvedCheck} />
          </RightSidebar>
        </SolveContentWrapper>
        </>}
      </SolveWrapper>
    </PageLayout>
  );
}

export default Solve;
