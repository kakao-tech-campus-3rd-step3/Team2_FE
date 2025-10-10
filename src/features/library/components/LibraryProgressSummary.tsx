import styled from '@emotion/styled';
import { CheckCircle, XCircle } from 'lucide-react';
import { useTheme } from '@emotion/react';
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

const ProgressBarExplainBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

const ExplainItem = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ color }) => color};
`;

interface LibraryProgressSummaryProps {
  totalCount: number;
  completedCount: number;
}

const LibraryProgressSummary = ({ totalCount, completedCount }: LibraryProgressSummaryProps) => {
  const theme = useTheme();
  const noStartCount = totalCount - completedCount;
  const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <SummaryInfoBox>
      <TopRow>
        <SummaryTitleBox>
          <SummaryTitleState>학습 진행률</SummaryTitleState>
          <Spacer height={'4px'} />
          <SummaryTitleSubState>
            완료 {completedCount}개 / 전체 {totalCount}개
          </SummaryTitleSubState>
        </SummaryTitleBox>
        <SummaryRightBox>
          <SummaryProgressPercent>{progress}%</SummaryProgressPercent>
          <Spacer height={'4px'} />
          <SummaryProgressPercentInfo>완료율</SummaryProgressPercentInfo>
        </SummaryRightBox>
      </TopRow>
      <CommonProgress progress={progress} stepLabels={[]} width="100%" animate={true} />
      <ProgressBarExplainBox>
        <ExplainItem color={theme.colors.semantic.primary}>
          <CheckCircle size={15} color={theme.colors.semantic.primary} />
          <SummaryProgressPercentInfo>완료: {completedCount}개</SummaryProgressPercentInfo>
        </ExplainItem>
        <ExplainItem color={theme.colors.gray.gray6}>
          <XCircle size={15} color={theme.colors.gray.gray6} />
          <SummaryProgressPercentInfo>시작 전: {noStartCount}개</SummaryProgressPercentInfo>
        </ExplainItem>
      </ProgressBarExplainBox>
    </SummaryInfoBox>
  );
};

export default LibraryProgressSummary;
