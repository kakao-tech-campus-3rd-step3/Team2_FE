import styled from '@emotion/styled';
import Spacer from '@/shared/components/Spacer';
import CommonProgress from '@/shared/components/ProgressBar/CommonProgress';

const SummaryInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.gray.gray5};
  padding: 20px;
  border-radius: ${({ theme }) => theme.radius.radius4};
  gap: 16px;
  background-color: white;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SummaryTitleBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const SummaryRightBox = styled(SummaryTitleBox)`
  text-align: right;
`;

const SummaryTitleState = styled.h3`
  font-size: ${({ theme }) => theme.typography.title2Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title2Bold.fontWeight};
`;

const SummaryTitleSubState = styled.h4`
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body2Regular.fontWeight};
  color: ${({ theme }) => theme.colors.gray.gray6};
`;

const SummaryProgressPercent = styled.h3`
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  color: ${({ theme }) => theme.colors.semantic.primary};
`;

const SummaryProgressPercentInfo = styled.h4`
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body2Regular.fontWeight};
  color: ${({ theme }) => theme.colors.gray.gray6};
`;

interface LibraryProgressSummaryProps {
  percent: number;
}

const LibraryProgressSummary = ({ percent }: LibraryProgressSummaryProps) => {
  const progress = Math.min(Math.max(percent, 0), 100);

  return (
    <SummaryInfoBox>
      <TopRow>
        <SummaryTitleBox>
          <SummaryTitleState>학습 진행률</SummaryTitleState>
          <Spacer height={'4px'} />
          <SummaryTitleSubState>학습 진행 상황을 확인하세요</SummaryTitleSubState>
        </SummaryTitleBox>
        <SummaryRightBox>
          <SummaryProgressPercent>{progress}%</SummaryProgressPercent>
          <Spacer height={'4px'} />
          <SummaryProgressPercentInfo>완료율</SummaryProgressPercentInfo>
        </SummaryRightBox>
      </TopRow>
      <CommonProgress progress={progress} stepLabels={[]} width="100%" animate={true} />
    </SummaryInfoBox>
  );
};

export default LibraryProgressSummary;
