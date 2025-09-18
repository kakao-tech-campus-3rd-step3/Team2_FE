import styled from '@emotion/styled';
import type { QuestionSet } from '@/features/solve/types/question';
import { useEffect, useState } from 'react';

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

type SolveResultProps = {
  questionLength: number;
  solvedCheck: Map<number, string>;
  setSelectedMenu: React.Dispatch<React.SetStateAction<string>>;
  questions: QuestionSet;
};

function SolveResult({
  questionLength,
  solvedCheck,
  setSelectedMenu,
  questions,
}: SolveResultProps) {
  const [correctCount, setCorrectCount] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let correct = 0;

    questions.questions.forEach((q, idx) => {
      const qNo = idx + 1;
      const userAnswer = solvedCheck.get(qNo);

      if (userAnswer && userAnswer.trim() === q.answer.trim()) {
        correct++;
      }
    });

    setCorrectCount(correct);
    setScore(Math.round((correct / questionLength) * 100)); 
  }, [questions, solvedCheck, questionLength]);

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
              <ResultStatValue>{questionLength}문제</ResultStatValue>
            </ResultStatItem>
            <ResultStatItem>
              <ResultStatLabel>답변한 문제</ResultStatLabel>
              <ResultStatValue>{solvedCheck.size}문제</ResultStatValue>
            </ResultStatItem>
            <ResultStatItem>
              <ResultStatLabel>정답 수</ResultStatLabel>
              <ResultStatValue>{correctCount}문제</ResultStatValue>
            </ResultStatItem>
          </ResultStats>
        </ResultCard>
        <ResultCard>
          <ResultCardTitle>점수</ResultCardTitle>
          <ResultScoreWrapper>
            <ResultScore>{score}점</ResultScore>
            <ResultScoreDescription>{score === 100
                ? '완벽합니다!'
                : score >= 70
                ? '잘하셨어요!'
                : '다시 공부해보세요!'}</ResultScoreDescription>
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
