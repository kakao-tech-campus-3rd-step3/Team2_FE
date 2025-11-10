import styled from '@emotion/styled';
import type { MarkingRequest } from '../types/MarkingRequest';
import type { QuestionSet } from '@/features/solve/types/question';
import { showToast } from '@/shared/utils/toast';

const ProgressCardWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.gray.gray0};

  border: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  padding: ${({ theme }) => theme.spacing.spacing4};
  border-radius: ${({ theme }) => theme.radius.radius2};

  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h6`
  font-size: ${({ theme }) => theme.typography.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.label1Bold.lineHeight};
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};
  padding-bottom: ${({ theme }) => theme.spacing.spacing3};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray4};
`;

const ProgressStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.spacing3};
  margin-bottom: ${({ theme }) => theme.spacing.spacing5};
`;

const ProgressStatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.spacing2} ${({ theme }) => theme.spacing.spacing3};
  background-color: ${({ theme }) => theme.colors.gray.gray1};
  border-radius: ${({ theme }) => theme.radius.radius2};
`;

const ProgressStatLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.body2Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray7};
`;

const ProgressStatValue = styled.span`
  font-size: ${({ theme }) => theme.typography.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.body1Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray10};
`;

const SubmitBtn = styled.button`
  font-size: ${({ theme }) => theme.typography.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.label1Bold.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray0};
  background-color: ${({ theme }) => theme.colors.semantic.primary};
  padding: ${({ theme }) => theme.spacing.spacing3} ${({ theme }) => theme.spacing.spacing4};
  border-radius: ${({ theme }) => theme.radius.radius2};
  transition: background-color 0.2s ease;
  margin-top: auto;

  &:hover {
    background-color: ${({ theme }) => theme.colors.green.green7};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.green.green6};
  }
`;
type ProgressCardProps = {
  questionLength: number;
  solvedCheck: MarkingRequest[];
  questions: QuestionSet;
  setIsAllSolved: React.Dispatch<React.SetStateAction<boolean>>;
  isExplanationPage: boolean;
};

function ProgressCard({
  questionLength,
  solvedCheck,
  questions,
  setIsAllSolved,
  isExplanationPage,
}: ProgressCardProps) {
  const goResult = () => {
    if (solvedCheck.length === questions.questions.length) {
      setIsAllSolved(true);
    } else {
      showToast('모든 문제를 체크해야 넘어갈 수 있습니다');
    }
  };
  return (
    <ProgressCardWrapper>
      <CardTitle>진행 현황</CardTitle>
      <ProgressStats>
        <ProgressStatItem>
          <ProgressStatLabel>전체 문제</ProgressStatLabel>
          <ProgressStatValue>{questionLength}</ProgressStatValue>
        </ProgressStatItem>
        <ProgressStatItem>
          <ProgressStatLabel>답변 완료</ProgressStatLabel>
          <ProgressStatValue>{solvedCheck.length}</ProgressStatValue>
        </ProgressStatItem>
        <ProgressStatItem>
          <ProgressStatLabel>남은 문제</ProgressStatLabel>
          <ProgressStatValue>{questionLength - solvedCheck.length}</ProgressStatValue>
        </ProgressStatItem>
      </ProgressStats>
      {!isExplanationPage && <SubmitBtn onClick={goResult}>제출하기</SubmitBtn>}
    </ProgressCardWrapper>
  );
}

export default ProgressCard;
