import { useEffect, useState } from 'react';
import { Progress } from '@/shared/components/ProgressBar/ProgressBarSettings';
import { useTheme } from '@emotion/react';

interface CommonProgressProps {
  progress: number; // 현재 진행률
  stepLabels: string[]; // 라벨 리스트
  width?: number | string; // 너비 (optional, 기본값 지정 가능)
  animate?: boolean; // 애니메이션 여부
}

const CommonProgress = ({
  progress,
  stepLabels,
  width = '100%',
  animate = false,
}: CommonProgressProps) => {
  const theme = useTheme();
  const [animatedProgress, setAnimatedProgress] = useState(animate ? 0 : progress);

  useEffect(() => {
    if (!animate) {
      setAnimatedProgress(progress);
      return;
    }

    // 애니메이션 활성화시 천천히 올라가는 효과
    const timeout = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);

    return () => clearTimeout(timeout);
  }, [progress, animate]);

  return (
    <div style={{ width }}>
      <Progress value={animatedProgress} height="8px" borderRadius="12px" />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 8,
          fontSize: 14,
          visibility: stepLabels.length === 0 ? 'hidden' : 'visible',
          height: stepLabels.length === 0 ? 0 : 'auto',
          overflow: 'hidden',
        }}
      >
        {stepLabels.map((label, index) => {
          const labelProgressThreshold = (100 / (stepLabels.length - 1)) * index;
          const isPassed = animatedProgress >= labelProgressThreshold;

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
