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

import type { QuestionSet } from '@/features/solve/types/question';
// import { mockQuestionSet } from '@/features/solve/mocks/question.mock';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api/axiosClient';

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
  questionSetId: number;
};

function Solve({ setSelectedMenu, questionSetId }: SolveProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(1);
  const [solvedCheck, setSolvedCheck] = useState<Map<number, string>>(new Map());
  const [isAllSolved, setIsAllSolved] = useState<boolean>(false); // 전체 문제가 다 풀렸는지 감지는 solvedCheck state가 다찼는지르 확인 할 수 있음 제거헤도 될듯
  const [selectedMode, setSelectedMode] = useState<string>('시험'); // 문제 풀이 모드 선택 얜 신경쓰지마 아직 무시해

  // 목데이터로 테스트
  // const data = mockQuestionSet;

  // 1. 서버로부터 문제조회를 하는 부분 questionSetId로 문제집 조회
  const { isPending, error, data } = useQuery({
    queryKey: ['questionSet', questionSetId],
    queryFn: async () => {
      const res = await api.get<QuestionSet>(`/question-set/${questionSetId}`);
      return res.data;
    },
  });

  // 로딩
  if (isPending)
    return (
      <PageLayout>
        <h1>Loading...</h1>
      </PageLayout>
    );

  // 에러
  if (error)
    return (
      <PageLayout>
        <h1>Error</h1>
      </PageLayout>
    );

  const percentageOfProblemSolved =
    data.questionLength > 0 ? Math.round((solvedCheck.size / data.questionLength) * 100) : 0; //문제 얼마나 풀었는지 퍼센트
  // 2. 조회해온 문제집을 하위 컴포넌트로 내려줘서 문제집을 출력해야함
  return (
    <PageLayout>
      <SolveWrapper>
        {isAllSolved ? (
          <SolveResult
            questionLength={data.questionLength}
            solvedCheck={solvedCheck}
            setSelectedMenu={setSelectedMenu}
            questions={data} // TODO: 이건 나중에 정답만 내려주는 방식으로 리팩토링하자
          />
        ) : (
          <>
            <SolveHeader
              currentQuestionIndex={currentQuestionIndex}
              title={data.title}
              setSelectedMenu={setSelectedMenu}
              questionLength={data.questionLength}
            />
            {/* 프로그레스바 부분은 solvedCheck를 내려보내서 size 계산해서 쓸까?*/}
            <ProgressDescription percentageOfProblemSolved={percentageOfProblemSolved} />
            <QuestionNavigator
              currentQuestionIndex={currentQuestionIndex}
              solvedCheck={solvedCheck}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              questionLength={data.questionLength}
            />
            <SolveContentWrapper>
              <QuestionArea
                currentQuestionIndex={currentQuestionIndex}
                questions={data}
                setSolvedCheck={setSolvedCheck}
                solvedCheck={solvedCheck}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                setIsAllSolved={setIsAllSolved}
              />
              <RightSidebar>
                <ModeCard selectedMode={selectedMode} setSelectedMode={setSelectedMode} />
                <ProgressCard questionLength={data.questionLength} solvedCheck={solvedCheck} />
              </RightSidebar>
            </SolveContentWrapper>
          </>
        )}
      </SolveWrapper>
    </PageLayout>
  );
}

export default Solve;
