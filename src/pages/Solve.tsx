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

import { useQuery } from '@tanstack/react-query';
import api from '@/shared/api/axiosClient';
import { useParams, useSearchParams } from 'react-router-dom';
import type { MarkingRequest } from '@/features/solve/types/MarkingRequest';

import Spinner from '@/shared/components/Spinner';
const SolveWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.spacing5};
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 760px;
  max-width: 960px;
  padding: 0px 20px;
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
  min-width: 180px;
`;

function Solve() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(1); // 현재 풀고있는 문항 위치
  const [solvedCheck, setSolvedCheck] = useState<MarkingRequest[]>([]); // 문항에 대한 배열이고 각 문항의 필드는 문항 id, 선택한 답, 선택한 답에 대한 타입으로 구성됨
  const [isAllSolved, setIsAllSolved] = useState<boolean>(false); // 전체 문제가 다 풀렸는지 감지는 solvedCheck state가 다찼는지르 확인 할 수 있음 제거헤도 될듯
  const [selectedMode, setSelectedMode] = useState<string>('시험'); // 문제 풀이 모드 선택 얜 신경쓰지마 아직 무시해
  const { questionSetId } = useParams<{ questionSetId: string }>(); // 문제집 id를 받아와서 문제집을 출력함
  const [searchParams] = useSearchParams();

  const isReviewing = searchParams.get('isReviewing') === 'true';

  console.log('풀고있는 문제 state', solvedCheck);
  // 1. 서버로부터 문제조회를 하는 부분 questionSetId로 문제집 조회
  const { isPending, error, data } = useQuery({
    queryKey: ['questionSet', questionSetId, isReviewing],
    queryFn: async () => {
      const url = isReviewing
        ? `/question-set/${questionSetId}?isReviewing=true`
        : `/question-set/${questionSetId}`;
      const res = await api.get<QuestionSet>(url);
      return res.data;
    },
  });

  // 로딩
  if (isPending)
    return (
      <PageLayout>
        <Spinner />
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
    data.questionLength > 0 ? Math.round((solvedCheck.length / data.questions.length) * 100) : 0; //문제 얼마나 풀었는지 퍼센트
  // 2. 조회해온 문제집을 하위 컴포넌트로 내려줘서 문제집을 출력해야함

  return (
    <PageLayout>
      <SolveWrapper>
        {isAllSolved ? (
          <SolveResult
            questionLength={data.questions.length}
            solvedCheck={solvedCheck}
            questions={data} // TODO: 이건 나중에 정답만 내려주는 방식으로 리팩토링하자
            isReviewing={isReviewing} // 이게 지금 일반 문제풀이인지 오답노트중인지 체크
          />
        ) : (
          <>
            <SolveHeader
              currentQuestionIndex={currentQuestionIndex}
              title={data.title}
              questionLength={data.questions.length}
            />
            {/* 프로그레스바 부분은 solvedCheck를 내려보내서 size 계산해서 쓸까?*/}
            <ProgressDescription percentageOfProblemSolved={percentageOfProblemSolved} />
            <QuestionNavigator
              currentQuestionIndex={currentQuestionIndex}
              solvedCheck={solvedCheck}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              questionLength={data.questions.length}
              questions={data}
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
                <ProgressCard questionLength={data.questions.length} solvedCheck={solvedCheck} />
              </RightSidebar>
            </SolveContentWrapper>
          </>
        )}
      </SolveWrapper>
    </PageLayout>
  );
}

export default Solve;
