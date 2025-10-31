import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import styled from '@emotion/styled';
import type { DailyStatItem } from '@/features/dashboard/types/dailyStats';
import { cloneElement } from 'react';
import type { ReactElement, SVGProps } from 'react';
const CalendarHeatmapWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.spacing50};

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
        titleForValue={(value: unknown) => {
          const v = value as DailyStatItem | undefined;
          if (!v) {
            return '';
          }
          return `${v.date}: ${v.count}회`;
        }}
        transformDayElement={(rect) =>
          cloneElement(
            rect as ReactElement,
            { rx: 2, ry: 2 } as unknown as SVGProps<SVGRectElement>,
          )
        }
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
