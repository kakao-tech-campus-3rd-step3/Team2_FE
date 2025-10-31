import { useState } from 'react';
import styled from '@emotion/styled';

import PageLayout from '@/shared/components/Layout/PageLayout';

import SolveHeader from '@/features/solve/components/SolveHeader';
import ProgressDescription from '@/features/solve/components/ProgressDescription';
import QuestionNavigator from '@/features/solve/components/QuestionNavigator';

import ProgressCard from '@/features/solve/components/ProgressCard';

import SolveResult from './SolveResult';

import type { QuestionSet } from '@/features/solve/types/question';

import { useQuery } from '@tanstack/react-query';
import api from '@/shared/api/axiosClient';
import { useParams, useSearchParams } from 'react-router-dom';
import type { MarkingRequest } from '@/features/solve/types/MarkingRequest';

import Spinner from '@/shared/components/Spinner';

// 문제 타입별 문제 푸는곳 컴포넌트들
import MultipleChoiceSolve from '@/features/solve/components/question-types/MultipleChoiceSolve';
import ShortAnswerSolve from '@/features/solve/components/question-types/ShortAnswerSolve';
import TrueFalseSolve from '@/features/solve/components/question-types/TrueFalseSolve';

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
  const { questionSetId } = useParams<{ questionSetId: string }>(); // 문제집 id를 받아와서 문제집을 출력함
  const [searchParams] = useSearchParams();
  const [isExplanationPage, setIsExplanationPage] = useState<boolean>(false); // 하그냥 시원하게 상태 한개 더써야겠다...일단은...

  const goExplanationPage = () => {
    setIsAllSolved(false);
    setIsExplanationPage(true);
    setCurrentQuestionIndex(1);
  }; // 해설 보러 가는 wrapper 함수
  const isReviewing = searchParams.get('isReviewing') === 'true';

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

  // console.log(data);
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

  const renderSolveComponent = () => {
    const questionType = data?.questions?.[0]?.questionType;
    switch (questionType) {
      case 'MULTIPLE_CHOICE':
        return (
          <MultipleChoiceSolve
            currentQuestionIndex={currentQuestionIndex}
            questions={data}
            setSolvedCheck={setSolvedCheck}
            solvedCheck={solvedCheck}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            setIsAllSolved={setIsAllSolved}
            isExplanationPage={isExplanationPage}
          />
        );
      case 'TRUE_FALSE':
        return (
          <TrueFalseSolve
            currentQuestionIndex={currentQuestionIndex}
            questions={data}
            setSolvedCheck={setSolvedCheck}
            solvedCheck={solvedCheck}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            setIsAllSolved={setIsAllSolved}
            isExplanationPage={isExplanationPage}
          />
        );
      case 'SHORT_ANSWER':
        return (
          <ShortAnswerSolve
            currentQuestionIndex={currentQuestionIndex}
            questions={data}
            setSolvedCheck={setSolvedCheck}
            solvedCheck={solvedCheck}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            setIsAllSolved={setIsAllSolved}
            isExplanationPage={isExplanationPage}
          />
        );
      default:
        return <p>문제 유형을 확인할 수 없습니다.</p>;
    }
  };
  return (
    <PageLayout>
      <SolveWrapper>
        {isAllSolved ? (
          <SolveResult
            questionLength={data.questions.length}
            solvedCheck={solvedCheck}
            questions={data} // TODO: 이건 나중에 정답만 내려주는 방식으로 리팩토링하자
            isReviewing={isReviewing} // 이게 지금 일반 문제풀이인지 오답노트중인지 체크
            goExplanationPage={goExplanationPage}
          />
        ) : (
          <>
            <SolveHeader
              currentQuestionIndex={currentQuestionIndex}
              title={data.title}
              questionLength={data.questions.length}
              questions={data}
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
              {renderSolveComponent()}
              <RightSidebar>
                <ProgressCard
                  questionLength={data.questions.length}
                  solvedCheck={solvedCheck}
                  questions={data}
                  setIsAllSolved={setIsAllSolved}
                />
              </RightSidebar>
            </SolveContentWrapper>
          </>
        )}
      </SolveWrapper>
    </PageLayout>
  );
}

export default Solve;
