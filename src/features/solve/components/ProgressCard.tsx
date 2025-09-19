import styled from '@emotion/styled';

const ProgressCardWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.gray.gray0};

  border: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  padding: ${({ theme }) => theme.spacing.spacing4};
  border-radius: ${({ theme }) => theme.radius.radius2};

  flex: 1;
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

type ProgressCardProps = {
  questionLength: number;
  solvedCheck: Map<number, string>;
};
function ProgressCard({ questionLength, solvedCheck }: ProgressCardProps) {
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
          <ProgressStatValue>{solvedCheck.size}</ProgressStatValue>
        </ProgressStatItem>
        <ProgressStatItem>
          <ProgressStatLabel>남은 문제</ProgressStatLabel>
          <ProgressStatValue>{questionLength - solvedCheck.size}</ProgressStatValue>
        </ProgressStatItem>
      </ProgressStats>
    </ProgressCardWrapper>
  );
}

export default ProgressCard;
