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
  height: 600px;
`;

const Create = () => {
  const stepLabels = ['PDF 선택', '설정', '생성하기'];

  const [currentStep, setCurrentStep] = useState(1); // 1부터 시작

  const handleNext = () => {
    if (currentStep < stepLabels.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      default:
        return null;
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
      />
    </PageLayout>
  );
};

export default Create;
