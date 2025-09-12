import { Progress } from '@/shared/components/ProgressBar/ProgressBarSettings';
import { useTheme } from '@emotion/react';

interface CommonProgressProps {
  progress: number; // 현재 진행률
  stepLabels: string[]; // 라벨 리스트
  width?: number | string; // 너비 (optional, 기본값 지정 가능)
}

// 진행률은 10, 40, 65, 100 등으로 설정한다고 가정 (4단계로)
const CommonProgress = ({ progress, stepLabels, width = '100%' }: CommonProgressProps) => {
  const theme = useTheme();

  return (
    <div style={{ width }}>
      <Progress value={progress} height="8px" borderRadius="12px" />

      {/* 라벨 영역 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 8,
          fontSize: 14,
        }}
      >
        {stepLabels.map((label, index) => {
          const labelProgressThreshold = (100 / (stepLabels.length - 1)) * index;
          const isPassed = progress >= labelProgressThreshold;

          return (
            <div
              key={label}
              style={{
                flex: 1,
                textAlign:
                  index === 0 ? 'left' : index === stepLabels.length - 1 ? 'right' : 'center',
                color: isPassed ? theme.colors.semantic.primary : theme.colors.gray.gray6,
                fontWeight: isPassed
                  ? theme.typography.title1Bold.fontWeight
                  : theme.typography.title1Regular.fontWeight,
              }}
            >
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommonProgress;
