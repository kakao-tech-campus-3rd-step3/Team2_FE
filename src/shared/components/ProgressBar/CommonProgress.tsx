import { Progress } from '@/shared/components/ProgressBar/ProgressBarSettings';

interface CommonProgressProps {
  progress: number; // 현재 진행률
  stepLabels: string[]; // 라벨 리스트
  width?: number | string; // 너비 (optional, 기본값 지정 가능)
}

// 10, 40, 65, 100 등으로 바꿔서 4단계의 경우 적용할 것

const CommonProgress = ({ progress, stepLabels, width = '100%' }: CommonProgressProps) => {
  return (
    <div style={{ width, padding: 20 }}>
      <Progress value={progress} height="16px" borderRadius="12px" />

      {/* 라벨 영역 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 8,
          fontSize: 14,
          fontWeight: '500',
          color: '#16a34a',
        }}
      >
        {stepLabels.map((label, index) => (
          <div
            key={label}
            style={{
              flex: 1,
              textAlign:
                index === 0 ? 'left' : index === stepLabels.length - 1 ? 'right' : 'center',
              color: progress >= index * 25 ? '#16a34a' : '#aaa',
              fontWeight: progress >= index * 25 ? '700' : '500',
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommonProgress;
