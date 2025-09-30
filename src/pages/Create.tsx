import { useState } from 'react';
import CommonProgress from '@/shared/components/ProgressBar/CommonProgress';
import PageLayout from '@/shared/components/Layout/PageLayout';
import SelectPdf from '@/features/create/innerPages/SelectPdf';
import CreateSummary from '@/features/create/innerPages/CreateSummary';
import NavigationButtons from '@/features/create/components/NavigationButtons';
import styled from '@emotion/styled';
import CreateRequest from '@/features/create/innerPages/CreateRequest';
import Spacer from '@/shared/components/Spacer';
import { useOutletContext } from 'react-router-dom';
import ChooseType from '@/features/create/innerPages/ChooseType';

const CreateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  height: 600px;
  background-color: ${({ theme }) => theme.colors.gray.gray2};
`;

const Container = styled.div`
  width: 100%;
  min-height: 400px;
`;

type CreateProps = {
  questionSetId: number;
  questionSetReady: boolean;
  setQuestionSetId: React.Dispatch<React.SetStateAction<number>>;
  setQuestionSetReady: React.Dispatch<React.SetStateAction<boolean>>;
};

const Create = () => {
  const stepLabels = ['PDF 선택', '문제유형', '생성요약', '생성하기'];
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState<{ id: string; name: string } | null>(null);

  const [questionType, setQuestionType] = useState<
    'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT' | null
  >(null);

  const { questionSetId, questionSetReady, setQuestionSetId, setQuestionSetReady } =
    useOutletContext<CreateProps>();

  const [stepValidity, setStepValidity] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
    3: true,
    4: false,
  });

  const isNextDisabled = !stepValidity[currentStep];

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <SelectPdf
            selectedFileId={selectedFile?.id ?? null}
            onValidChange={(isValid) => setStepValidity((prev) => ({ ...prev, 1: isValid }))}
            onSelectFile={(fileInfo) => setSelectedFile(fileInfo)}
          />
        );
      case 2:
        return (
          <ChooseType
            selectedType={questionType}
            onValidChange={(isValid) => setStepValidity((prev) => ({ ...prev, 2: isValid }))}
            onSelectType={(type) => setQuestionType(type)}
          />
        );
      case 3:
        return (
          <CreateSummary
            selectedFile={selectedFile}
            questionType={questionType}
            onValidChange={(isValid) => setStepValidity((prev) => ({ ...prev, 3: isValid }))}
          />
        );
      case 4:
        return (
          <CreateRequest
            selectedFile={selectedFile}
            questionType={questionType}
            onReset={handleReset}
            questionSetReady={questionSetReady}
            questionSetId={questionSetId}
            setQuestionSetId={setQuestionSetId}
            setQuestionSetReady={setQuestionSetReady}
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

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedFile(null);
    setQuestionType(null);
    setStepValidity({ 1: false, 2: false, 3: true, 4: false });
    setQuestionSetId(0);
    setQuestionSetReady(false);
  };

  const progress = ((currentStep - 1) / (stepLabels.length - 1)) * 100;

  return (
    <PageLayout>
      <CreateWrapper>
        <Spacer height="20px" />
        <CommonProgress progress={progress} stepLabels={stepLabels} width="100%" />
        <Container>{renderStepComponent()}</Container>
        {currentStep !== 4 && (
          <NavigationButtons
            onNext={handleNext}
            onPrev={handlePrev}
            isFirst={currentStep === 1}
            isLast={currentStep === stepLabels.length}
            nextDisabled={isNextDisabled}
          />
        )}
      </CreateWrapper>
    </PageLayout>
  );
};

export default Create;
