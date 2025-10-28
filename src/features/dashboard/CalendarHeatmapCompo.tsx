import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import styled from '@emotion/styled';
import type { DailyStatItem } from '@/features/dashboard/types/dailyStats';
const CalendarHeatmapWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.spacing50};
  height: 300px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .react-calendar-heatmap .color-empty {
    fill: ${({ theme }) => theme.colors.gray.gray0};
  }

  .react-calendar-heatmap .color-scale-1 {
    fill: ${({ theme }) => theme.colors.green.green2};
  }

  .react-calendar-heatmap .color-scale-2 {
    fill: ${({ theme }) => theme.colors.green.green4};
  }

  .react-calendar-heatmap .color-scale-3 {
    fill: ${({ theme }) => theme.colors.green.green6};
  }
`;

interface Props {
  values: DailyStatItem[];
  startDate: string;
  endDate: string;
}

function CalendarHeatmapCompo({ values, startDate, endDate }: Props) {
  return (
    <CalendarHeatmapWrapper>
      <CalendarHeatmap
        startDate={new Date(startDate)}
        endDate={new Date(endDate)}
        values={values}
        classForValue={(value) => {
          if (!value) return 'color-empty';
          if (value.count === 0) return 'color-empty';
          if (value.count < 20) return 'color-scale-1';
          if (value.count < 40) return 'color-scale-2';
          return 'color-scale-3';
        }}
      />
    </CalendarHeatmapWrapper>
  );
}

export default CalendarHeatmapCompo;
