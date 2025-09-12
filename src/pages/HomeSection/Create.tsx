import { useState } from 'react';
import CommonProgress from '@/shared/components/ProgressBar/CommonProgress';
import PageLayout from '@/shared/components/Layout/PageLayout';
import Step1 from '@/features/create/innerPages/Step1';
import Step2 from '@/features/create/innerPages/Step2';
import Step3 from '@/features/create/innerPages/Step3';
import NavigationButtons from '@/features/create/components/NavigationButtons';
import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  min-height: 400px;
`;

const Create = () => {
  const stepLabels = ['PDF 선택', '설정', '생성하기'];
  const [currentStep, setCurrentStep] = useState(1);

  // 각 스텝별 유효성 상태 (초기값은 false, 필요에 따라 조정)
  const [stepValidity, setStepValidity] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
    3: false,
  });

  // 다음 버튼 활성/비활성 결정: 현재 스텝이 유효하지 않으면 비활성
  const isNextDisabled = !stepValidity[currentStep];

  // 각 Step 컴포넌트에 onValidChange 콜백 넘겨서 유효성 상태를 갱신
  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            onValidChange={(isValid) => setStepValidity((prev) => ({ ...prev, 1: isValid }))}
          />
        );
      case 2:
        return (
          <Step2
            onValidChange={(isValid) => setStepValidity((prev) => ({ ...prev, 2: isValid }))}
          />
        );
      case 3:
        return (
          <Step3
            onValidChange={(isValid) => setStepValidity((prev) => ({ ...prev, 3: isValid }))}
          />
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (!isNextDisabled && currentStep < stepLabels.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const progress = ((currentStep - 1) / (stepLabels.length - 1)) * 100;

  return (
    <PageLayout>
      <CommonProgress progress={progress} stepLabels={stepLabels} width="100%" />
      <Container>{renderStepComponent()}</Container>

      <NavigationButtons
        onNext={handleNext}
        onPrev={handlePrev}
        isFirst={currentStep === 1}
        isLast={currentStep === stepLabels.length}
        nextDisabled={isNextDisabled}
      />
    </PageLayout>
  );
};

export default Create;