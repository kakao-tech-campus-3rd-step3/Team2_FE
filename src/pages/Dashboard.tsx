// External libraries
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { BookOpen, CheckCircle, Target, Flame } from 'lucide-react';

// Auth
import { useAuth } from '@/app/auth/useAuth';

// Feature components & types
import CalendarHeatmapCompo from '@/features/dashboard/components/CalendarHeatmapCompo';
import StatsCard from '@/features/dashboard/components/StatsCard';
import type { LearnStatsResponse } from '@/features/dashboard/types/learnStats';
import type { DailyStatsResponse } from '@/features/dashboard/types/dailyStats';

// Shared components & utils
import api from '@/shared/api/axiosClient';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background.background};
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  justify-content: flex-start;
`;

const DashboardWrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: ${({ theme }) => theme.spacing.spacing5};
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  justify-content: flex-start;

  @media (max-width: 1050px), (max-height: 400px) {
    max-width: 100%;
    padding: ${({ theme }) => theme.spacing.spacing3};
    overflow-x: hidden;
  }
`;

const DashboardTitle = styled.h1`
  width: 100%;
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title1Bold.lineHeight};
  text-align: left;
  margin-bottom: 5px;
`;

const DashboardDescription = styled.p`
  display: block;
  width: 100%;
  font-size: ${({ theme }) => theme.typography.subtitle2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.subtitle2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.subtitle2Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray6};
  text-align: left;
`;

const DashboardStatCardWrapper = styled.div`
  display: flex;
  margin-top: ${({ theme }) => theme.spacing.spacing5};
  justify-content: space-between;

  @media (max-width: 1050px), (max-height: 400px) {
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.spacing3};
  }
`;

function Dashboard() {
  const { userInfo, isAuthLoading } = useAuth();
  const memberId = userInfo?.id;

  const { data } = useQuery<LearnStatsResponse>({
    queryKey: ['learnStats', memberId],
    queryFn: async () => {
      const res = await api.get<LearnStatsResponse>(`/members/${memberId}/learn-stats`);
      return res.data;
    },
    enabled: !!memberId && !isAuthLoading,
  });

  const today = new Date();
  const toYear = today.getFullYear();
  const toMonth = String(today.getMonth() + 1).padStart(2, '0');
  const toDay = String(today.getDate()).padStart(2, '0');
  const to = `${toYear}-${toMonth}-${toDay}`;

  const fromDate = new Date(today);
  fromDate.setFullYear(fromDate.getFullYear() - 1);
  const fromYear = fromDate.getFullYear();
  const fromMonth = String(fromDate.getMonth() + 1).padStart(2, '0');
  const fromDay = String(fromDate.getDate()).padStart(2, '0');
  const from = `${fromYear}-${fromMonth}-${fromDay}`;

  const { data: dailyValues } = useQuery<DailyStatsResponse>({
    queryKey: ['dailyStatsValues', memberId, from, to],
    queryFn: async () => {
      if (!memberId) return [] as DailyStatsResponse;
      const res = await api.get<DailyStatsResponse>(
        `/members/${memberId}/daily-stats?from=${from}&to=${to}`,
      );
      return res.data;
    },
    enabled: !!memberId && !isAuthLoading,
  });

  const statsCards = [
    {
      icon: BookOpen,
      count: data?.totalQuestionSetCount ?? 0,
      description: '총 문제집 수',
      bgColor: '#dbeafe',
      iconColor: '#3b82f6',
    },
    {
      icon: CheckCircle,
      count: data?.weeklySolvedQuestionCount ?? 0,
      description: '이번 주 푼 문제',
      bgColor: '#dcfce7',
      iconColor: '#22c55e',
    },
    {
      icon: Target,
      count: data?.totalSolvedQuestionCount ?? 0,
      description: '총 푼 문제수',
      bgColor: '#f3f4f6',
      iconColor: '#a855f7',
    },
    {
      icon: Flame,
      count: data?.consecutiveLearningDays ?? 0,
      description: '연속 학습일',
      bgColor: '#fee2e2',
      iconColor: '#f97316',
    },
  ];

  return (
    <Container>
      <DashboardWrapper>
        <DashboardTitle>학습 현황</DashboardTitle>
        <DashboardDescription>오늘도 열심히 공부하고 계시네요! 📚</DashboardDescription>
        <DashboardStatCardWrapper>
          {statsCards.map((card, index) => (
            <StatsCard
              key={index}
              icon={card.icon}
              count={card.count}
              description={card.description}
              bgColor={card.bgColor}
              iconColor={card.iconColor}
            />
          ))}
        </DashboardStatCardWrapper>
        <CalendarHeatmapCompo values={dailyValues ?? []} startDate={from} endDate={to} />
      </DashboardWrapper>
    </Container>
  );
}

export default Dashboard;
