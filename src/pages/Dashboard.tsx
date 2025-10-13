import PageLayout from '@/shared/components/Layout/PageLayout';
import styled from '@emotion/styled';
import { BookOpen, CheckCircle, Target, Flame } from 'lucide-react';

const DashboardWrapper = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.spacing5};
`;

const DashboardTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title1Bold.lineHeight};
`;

const DashboardDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.subtitle2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.subtitle2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.subtitle2Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray7};
`;

const DashboardStatCardWrapper = styled.div`
  display: flex;
  margin-top: ${({ theme }) => theme.spacing.spacing5};
  justify-content: space-between;
`;
const DashboardStatCard = styled.div`
  width: 24%;
  height: 175px;
  background-color: ${({ theme }) => theme.colors.gray.gray0};
  border-radius: ${({ theme }) => theme.radius.radius3};
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  padding: ${({ theme }) => theme.spacing.spacing5};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.spacing4};
`;

const BookOpenWrapper = styled.div`
  width: 32px;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.blue.blue0};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.radius2};
  color: #3b82f6;
`;
const CheckCircleWrapper = styled.div`
  width: 32px;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.green.green0};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.radius2};
  color: #22c55e;
`;
const TargetWrapper = styled.div`
  width: 32px;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.gray.gray1};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.radius2};
  color: #a855f7;
`;
const FlameWrapper = styled.div`
  width: 32px;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.red.red0};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.radius2};
  color: #f97316;
`;

const DashboardCardCount = styled.span`
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title1Bold.lineHeight};
`;

const DashboardCardDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.label1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label1Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray7};
`;

function Dashboard() {
  return (
    <PageLayout>
      <DashboardWrapper>
        <DashboardTitle>학습 현황</DashboardTitle>
        <DashboardDescription>오늘도 열심히 공부하고 계시네요! 📚</DashboardDescription>
        <DashboardStatCardWrapper>
          <DashboardStatCard>
            <BookOpenWrapper>
              <BookOpen size={20} />
            </BookOpenWrapper>
            <DashboardCardCount>24</DashboardCardCount>
            <DashboardCardDescription>총 문제집 수</DashboardCardDescription>
          </DashboardStatCard>
          <DashboardStatCard>
            <CheckCircleWrapper>
              <CheckCircle size={20} />
            </CheckCircleWrapper>
            <DashboardCardCount>142</DashboardCardCount>
            <DashboardCardDescription>이번 주 푼 문제</DashboardCardDescription>
          </DashboardStatCard>
          <DashboardStatCard>
            <TargetWrapper>
              <Target size={20} />
            </TargetWrapper>
            <DashboardCardCount>1556</DashboardCardCount>
            <DashboardCardDescription>총 푼 문제수</DashboardCardDescription>
          </DashboardStatCard>
          <DashboardStatCard>
            <FlameWrapper>
              <Flame size={20} />
            </FlameWrapper>
            <DashboardCardCount>12</DashboardCardCount>
            <DashboardCardDescription>연속 학습일</DashboardCardDescription>
          </DashboardStatCard>
        </DashboardStatCardWrapper>
      </DashboardWrapper>
    </PageLayout>
  );
}

export default Dashboard;
