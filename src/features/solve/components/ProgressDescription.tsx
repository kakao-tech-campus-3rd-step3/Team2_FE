import styled from '@emotion/styled';
import CommonProgress from '@/shared/components/ProgressBar/CommonProgress';

const ProgressDescriptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProgressDescriptionTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};
`;

const ProgressDescriptionPercentTxt = styled.span`
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};
`;

type ProgressDescriptionProps = {
  percentageOfProblemSolved: number;
};

function ProgressDescription({ percentageOfProblemSolved }: ProgressDescriptionProps) {
  return (
    <>
      <ProgressDescriptionWrapper>
        <ProgressDescriptionTitle>진행상황</ProgressDescriptionTitle>
        <ProgressDescriptionPercentTxt>{percentageOfProblemSolved}%</ProgressDescriptionPercentTxt>
      </ProgressDescriptionWrapper>
      <CommonProgress progress={percentageOfProblemSolved} stepLabels={[]}></CommonProgress>
    </>
  );
}

export default ProgressDescription;
