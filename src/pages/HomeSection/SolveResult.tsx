import styled from '@emotion/styled';

const SolveResultTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title1Bold.lineHeight};
`;
const SolveResultDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.subtitle2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.subtitle2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.subtitle2Regular.lineHeight};
`;

const ResultCardsWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.spacing6};
  margin-top: ${({ theme }) => theme.spacing.spacing8};
`;

const ResultCard = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray.gray0};
  padding: ${({ theme }) => theme.spacing.spacing4};
  border-radius: ${({ theme }) => theme.radius.radius3};
`;

const ResultCardTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.subtitle1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.subtitle1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.subtitle1Bold.lineHeight};
`;

const ResultStats = styled.div`
  margin-top: ${({ theme }) => theme.spacing.spacing4};
`;

const ResultStatItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.spacing2} 0;
`;

const ResultStatLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.label1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label1Regular.lineHeight};
`;

const ResultStatValue = styled.span`
  font-size: ${({ theme }) => theme.typography.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.label1Bold.lineHeight};
  color: ${({ theme }) => theme.colors.semantic.primary};
`;

const ResultScoreWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.spacing4};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ResultScore = styled.span`
  font-size: 32px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.semantic.primary};
`;

const ResultScoreDescription = styled.p`
  margin-top: ${({ theme }) => theme.spacing.spacing2};
  font-size: ${({ theme }) => theme.typography.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.body1Regular.lineHeight};
`;

const ResultActions = styled.div`
  margin-top: ${({ theme }) => theme.spacing.spacing4};
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const ReviewWrongAnswersButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  border-radius: ${({ theme }) => theme.radius.radius2};
  padding: ${({ theme }) => theme.spacing.spacing2};
  color: ${({ theme }) => theme.colors.gray.gray10};
`;

const RetryButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  border-radius: ${({ theme }) => theme.radius.radius2};
  padding: ${({ theme }) => theme.spacing.spacing2};
  color: ${({ theme }) => theme.colors.gray.gray10};
`;

const GoToDashboardButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  border-radius: ${({ theme }) => theme.radius.radius2};
  padding: ${({ theme }) => theme.spacing.spacing2};
  color: ${({ theme }) => theme.colors.gray.gray0};
  background-color: ${({ theme }) => theme.colors.semantic.primary};
`;

interface Question {
  id: number; // 문제 고유 ID
  questionText: string; // 문제 텍스트
  options: string[]; // 오답 목록
  answer: string; // 정답
  explanation: string; // 해설
}

type SolveResultProps = {
  questions: Question[];
  solvedCheck: Set<number>;
  setSelectedMenu: React.Dispatch<React.SetStateAction<string>>;
};

function SolveResult({ questions, solvedCheck, setSelectedMenu }: SolveResultProps) {
  return (
    <>
      <SolveResultTitle>문제 풀이 완료!</SolveResultTitle>
      <SolveResultDescription>수고하셨습니다. 결과를 확인해보세요.</SolveResultDescription>
      <ResultCardsWrapper>
        <ResultCard>
          <ResultCardTitle>결과 요약</ResultCardTitle>
          <ResultStats>
            <ResultStatItem>
              <ResultStatLabel>전체 문제</ResultStatLabel>
              <ResultStatValue>{questions.length}문제</ResultStatValue>
            </ResultStatItem>
            <ResultStatItem>
              <ResultStatLabel>답변한 문제</ResultStatLabel>
              <ResultStatValue>{solvedCheck.size}문제</ResultStatValue>
            </ResultStatItem>
            <ResultStatItem>
              <ResultStatLabel>정답 수</ResultStatLabel>
              <ResultStatValue>0문제</ResultStatValue>
            </ResultStatItem>
          </ResultStats>
        </ResultCard>
        <ResultCard>
          <ResultCardTitle>점수</ResultCardTitle>
          <ResultScoreWrapper>
            <ResultScore>0점</ResultScore>
            <ResultScoreDescription>다시 공부해보세요!</ResultScoreDescription>
          </ResultScoreWrapper>
        </ResultCard>
      </ResultCardsWrapper>
      <ResultActions>
        <ReviewWrongAnswersButton onClick={() => setSelectedMenu('오답노트')}>
          오답노트 확인
        </ReviewWrongAnswersButton>
        <RetryButton onClick={() => setSelectedMenu('문제집 생성')}>다시 생성하기</RetryButton>
        <GoToDashboardButton onClick={() => setSelectedMenu('대시보드')}>
          대시보드로 이동
        </GoToDashboardButton>
      </ResultActions>
    </>
  );
}

export default SolveResult;
