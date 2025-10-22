import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import styled from '@emotion/styled';
import { mockHeatmapData } from '@/features/dashboard/mock/mockHeatmapData';

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

function CalendarHeatmapCompo() {
  return (
    <CalendarHeatmapWrapper>
      <CalendarHeatmap
        startDate={new Date('2025-01-01')}
        endDate={new Date('2025-10-22')}
        values={mockHeatmapData}
        classForValue={(value) => {
          if (!value) return 'color-empty'; // 학습 안 한 날
          if (value.count === 0) return 'color-empty';
          if (value.count < 2) return 'color-scale-1';
          if (value.count < 4) return 'color-scale-2';
          return 'color-scale-3';
        }}
      />
    </CalendarHeatmapWrapper>
  );
}

export default CalendarHeatmapCompo;
