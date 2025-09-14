import { useState } from 'react';
import CommonProgress from '@/shared/components/ProgressBar/CommonProgress';
import PageLayout from '@/shared/components/Layout/PageLayout';
import SelectPdf from '@/features/create/innerPages/SelectPdf';
import CreateSummary from '@/features/create/innerPages/CreateSummary';
import NavigationButtons from '@/features/create/components/NavigationButtons';
import styled from '@emotion/styled';

const CreateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  height: 500px;
  background-color: ${({ theme }) => theme.colors.gray.gray2};
`;

const Container = styled.div`
  width: 100%;
  min-height: 400px;
`;

type CreateProps = {
  setSelectedMenu: React.Dispatch<React.SetStateAction<string>>;
};

const Create = ({ setSelectedMenu }: CreateProps) => {
  const stepLabels = ['PDF 선택', '설정', '생성하기'];
  const [currentStep, setCurrentStep] = useState(1);

  // 각 스텝별 유효성 상태 (초기값은 false, 필요에 따라 조정)
  const [stepValidity, setStepValidity] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
  });

  // 다음 버튼 활성/비활성 결정: 현재 스텝이 유효하지 않으면 비활성
  const isNextDisabled = !stepValidity[currentStep];

  // 각 Step 컴포넌트에 onValidChange 콜백 넘겨서 유효성 상태를 갱신
  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <SelectPdf
            onValidChange={(isValid) => setStepValidity((prev) => ({ ...prev, 1: isValid }))}
          />
        );
      case 2:
        return (
          <CreateSummary
            onValidChange={(isValid) => setStepValidity((prev) => ({ ...prev, 2: isValid }))}
            setSelectedMenu={setSelectedMenu}
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
      <CreateWrapper>
        <CommonProgress progress={progress} stepLabels={stepLabels} width="100%" />
        <Container>{renderStepComponent()}</Container>
        <NavigationButtons
          onNext={handleNext}
          onPrev={handlePrev}
          isFirst={currentStep === 1}
          isLast={currentStep === stepLabels.length}
          nextDisabled={isNextDisabled}
        />
      </CreateWrapper>
    </PageLayout>
  );
};

export default Create;
