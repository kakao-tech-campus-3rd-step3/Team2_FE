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

import { questions } from '@/features/solve/mocks/question.mock';

const SolveWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.spacing5};

  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 960px;
  background-color: ${({ theme }) => theme.colors.gray.gray2};
`;

const SolveContentWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.spacing3};
  display: flex;
`;

const RightSidebar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

type SolveProps = {
  setSelectedMenu: React.Dispatch<React.SetStateAction<string>>;
};

function Solve({ setSelectedMenu }: SolveProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(1); // 현재 풀고있는 문제 인덱스
  const [selectedMode, setSelectedMode] = useState<string>('시험'); // 문제 풀이 모드 선택
  const [solvedCheck, setSolvedCheck] = useState<Set<number>>(new Set()); // 선택된 문항 set으로 관리, 얘를 더 발전 시켜서 현재 문제 푼 답 + 마지막 제출할때 정답들 목록이랑 비교시켜서 점수를 생성해내야함
  const [isAllSolved, setIsAllSolved] = useState<boolean>(false); // 전체 문제가 다 풀렸는지 감지
  const percentageOfProblemSolved = (solvedCheck.size / 10) * 100;

  return (
    <PageLayout>
      <SolveWrapper>
        {isAllSolved ? (
          <SolveResult
            questions={questions}
            solvedCheck={solvedCheck}
            setSelectedMenu={setSelectedMenu}
          />
        ) : (
          <>
            <SolveHeader currentQuestionIndex={currentQuestionIndex} />
            <ProgressDescription solvedCheckPercent={percentageOfProblemSolved} />
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
                solvedCheck={solvedCheck}
              />
              <RightSidebar>
                <ModeCard selectedMode={selectedMode} setSelectedMode={setSelectedMode} />
                <ProgressCard questions={questions} solvedCheck={solvedCheck} />
              </RightSidebar>
            </SolveContentWrapper>
          </>
        )}
      </SolveWrapper>
    </PageLayout>
  );
}

export default Solve;
