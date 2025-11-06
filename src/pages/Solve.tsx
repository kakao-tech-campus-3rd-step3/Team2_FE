// External libraries
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import styled from '@emotion/styled';

// Feature components & types
import SolveHeader from '@/features/solve/components/SolveHeader';
import ProgressDescription from '@/features/solve/components/ProgressDescription';
import QuestionNavigator from '@/features/solve/components/QuestionNavigator';
import ProgressCard from '@/features/solve/components/ProgressCard';
import SolveResult from '@/features/solve/components/SolveResult';
import NotFoundQuestionSet from '@/features/solve/components/NotFoundQuestionSet';
import MultipleChoiceSolve from '@/features/solve/components/question-types/MultipleChoiceSolve';
import ShortAnswerSolve from '@/features/solve/components/question-types/ShortAnswerSolve';
import TrueFalseSolve from '@/features/solve/components/question-types/TrueFalseSolve';
import { useSolveState } from '@/features/solve/hooks/useSolveState';
import type { QuestionSet } from '@/features/solve/types/question';

// Shared components
import PageLayout from '@/shared/components/Layout/PageLayout';
import Spinner from '@/shared/components/Spinner';
import api from '@/shared/api/axiosClient';

const SolveWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.spacing5};
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 760px;
  max-width: 960px;
  padding: 0px 20px;
  background-color: ${({ theme }) => theme.colors.gray.gray2};

  @media (max-width: 1050px), (max-height: 400px) {
    margin-top: ${({ theme }) => theme.spacing.spacing3};
    min-width: unset;
    width: 100%;
    max-width: 100%;
    padding: 0px ${({ theme }) => theme.spacing.spacing3};
  }
`;

const SolveContentWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.spacing3};
  display: flex;

  @media (max-width: 1050px), (max-height: 400px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.spacing3};
  }
`;

const RightSidebar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 180px;

  @media (max-width: 1050px), (max-height: 400px) {
    min-width: unset;
    width: 100%;
  }
`;

function Solve() {
  const { questionSetId } = useParams<{ questionSetId: string }>();
  const [searchParams] = useSearchParams();
  const isReviewing = searchParams.get('isReviewing') === 'true';

  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    solvedCheck,
    setSolvedCheck,
    isAllSolved,
    setIsAllSolved,
    isExplanationPage,
    goExplanationPage,
  } = useSolveState({ questionSetId, isReviewing });

  const { isPending, error, data } = useQuery<QuestionSet, AxiosError>({
    queryKey: ['questionSet', 'detail', questionSetId, isReviewing],
    queryFn: async () => {
      const url = isReviewing
        ? `/question-set/${questionSetId}?isReviewing=true`
        : `/question-set/${questionSetId}`;
      const res = await api.get<QuestionSet>(url);

      return res.data;
    },
    retry: (failureCount, error) => {
      const status = error.response?.status;

      // 문제집 번호가 없는 경우 바로 에러로 처리
      if (status === 404) return false;

      // 해당 문제집에 대한 접근 권한이 없을 경우 바로 에러로 처리
      if (status === 400) return false;

      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 8000),
  });

  if (isPending)
    return (
      <PageLayout>
        <Spinner />
      </PageLayout>
    );

  if (error)
    return (
      <PageLayout>
        <NotFoundQuestionSet />
      </PageLayout>
    );

  const percentageOfProblemSolved =
    data.questionLength > 0 ? Math.round((solvedCheck.length / data.questions.length) * 100) : 0;

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
            questions={data}
            isReviewing={isReviewing}
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
                  isExplanationPage={isExplanationPage}
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
