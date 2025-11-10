import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import styled from '@emotion/styled';
import type { DailyStatItem } from '@/features/dashboard/types/dailyStats';
import { cloneElement } from 'react';
import type { ReactElement, SVGProps } from 'react';
import { CalendarDays } from 'lucide-react';
const CalendarHeatmapWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.gray.gray0};
  padding: ${({ theme }) => theme.spacing.spacing5};
  margin-top: ${({ theme }) => theme.spacing.spacing10};
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  border-radius: ${({ theme }) => theme.radius.radius3};

  .react-calendar-heatmap .color-empty {
    fill: ${({ theme }) => theme.colors.gray.gray2};
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

const HeatmapScrollWrapper = styled.div`
  @media (max-width: 1050px), (max-height: 400px) {
    overflow-x: auto;

    .react-calendar-heatmap {
      font-size: 12px;
      min-width: 800px;
    }

    .react-calendar-heatmap svg {
      min-height: 150px;
    }
  }
`;

const CalendarHeatmapTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.spacing2} 0;
`;

const CalendarDaysWrapper = styled.div`
  color: ${({ theme }) => theme.colors.semantic.primary};
`;
const CalendarHeatmapTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.body1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.body1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.body1Bold.lineHeight};
  margin-left: ${({ theme }) => theme.spacing.spacing2};
  margin-right: ${({ theme }) => theme.spacing.spacing2};
  color: ${({ theme }) => theme.colors.gray.gray7};
`;

const CalendarHeatmapSupTitle = styled.p`
  font-size: ${({ theme }) => theme.typography.label1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label1Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray7};
`;
interface Props {
  values: DailyStatItem[];
  startDate: string;
  endDate: string;
}

function CalendarHeatmapCompo({ values, startDate, endDate }: Props) {
  return (
    <CalendarHeatmapWrapper>
      <CalendarHeatmapTitleWrapper>
        <CalendarDaysWrapper>
          <CalendarDays size={20} />
        </CalendarDaysWrapper>
        <CalendarHeatmapTitle>학습 활동</CalendarHeatmapTitle>
        <CalendarHeatmapSupTitle>지난 1년간 {values.length}일 학습</CalendarHeatmapSupTitle>
      </CalendarHeatmapTitleWrapper>

      <HeatmapScrollWrapper>
        <CalendarHeatmap
          startDate={new Date(startDate)}
          endDate={new Date(endDate)}
          values={values}
          gutterSize={0.5}
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
            if (value.count < 10) return 'color-scale-1';
            if (value.count < 40) return 'color-scale-2';
            return 'color-scale-3';
          }}
        />
      </HeatmapScrollWrapper>
    </CalendarHeatmapWrapper>
  );
}

export default CalendarHeatmapCompo;
