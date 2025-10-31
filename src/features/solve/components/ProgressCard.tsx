import styled from '@emotion/styled';
import type { MarkingRequest } from '../types/MarkingRequest';
import { toast } from 'react-toastify';
import type { QuestionSet } from '@/features/solve/types/question';

const ProgressCardWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.gray.gray0};

  border: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  padding: ${({ theme }) => theme.spacing.spacing4};
  border-radius: ${({ theme }) => theme.radius.radius2};

  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardTitle = styled.h6`
  font-size: ${({ theme }) => theme.typography.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.label1Bold.lineHeight};
  margin-bottom: ${({ theme }) => theme.spacing.spacing6};
`;

const ProgressStats = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProgressStatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.spacing2};
`;

const ProgressStatLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};
`;

const ProgressStatValue = styled.span`
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};
`;

const SubmitBtn = styled.button`
  font-size: ${({ theme }) => theme.typography.label1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label1Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray0};
  background-color: ${({ theme }) => theme.colors.semantic.primary};
  padding: ${({ theme }) => theme.spacing.spacing2} ${({ theme }) => theme.spacing.spacing4};
  border-radius: ${({ theme }) => theme.radius.radius1};
`;
type ProgressCardProps = {
  questionLength: number;
  solvedCheck: MarkingRequest[];
  questions: QuestionSet;
  setIsAllSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

function ProgressCard({
  questionLength,
  solvedCheck,
  questions,
  setIsAllSolved,
}: ProgressCardProps) {
  const goResult = () => {
    if (solvedCheck.length === questions.questions.length) {
      setIsAllSolved(true);
    } else {
      toast('모든 문제를 체크해야 넘어갈 수 있습니다');
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
      <SubmitBtn onClick={goResult}>제출하기</SubmitBtn>
    </ProgressCardWrapper>
  );
}

export default ProgressCard;
