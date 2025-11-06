// External libraries
import { useState, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from '@emotion/styled';

// Feature components & types
import SelectPdf from '@/features/create/innerPages/SelectPdf';
import ChooseType from '@/features/create/innerPages/ChooseType';
import CreateSummary from '@/features/create/innerPages/CreateSummary';
import CreateRequest from '@/features/create/innerPages/CreateRequest';
import NavigationButtons from '@/features/create/components/NavigationButtons';
import type { QuestionType } from '@/features/create/constants/questionTypeConstants';

// Shared components
import PageLayout from '@/shared/components/Layout/PageLayout';
import CommonProgress from '@/shared/components/ProgressBar/CommonProgress';
import Spacer from '@/shared/components/Spacer';

const stepLabels = ['PDF 선택', '문제 유형', '생성 요약', '생성하기'];
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background.background};
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  justify-content: flex-start;
`;

const CreateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;

  @media (max-width: 1050px), (max-height: 400px) {
    max-width: 100%;
    padding: 0 ${({ theme }) => theme.spacing.spacing3};
  }
`;

const CreateContainer = styled.div`
  width: 100%;
  min-height: 380px;
  max-height: 880px;
  height: calc(30dvh + 180px);
`;

type CreateProps = {
  questionSetId: number;
  questionSetReady: boolean;
  setQuestionSetId: React.Dispatch<React.SetStateAction<number>>;
  setQuestionSetReady: React.Dispatch<React.SetStateAction<boolean>>;
};

const Create = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState<{ id: string; name: string } | null>(null);
  const [questionType, setQuestionType] = useState<QuestionType | null>(null);

  const { questionSetId, questionSetReady, setQuestionSetId, setQuestionSetReady } =
    useOutletContext<CreateProps>();

  const [stepValidity, setStepValidity] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
    3: true,
    4: false,
  });

  const handleStep1ValidChange = useCallback((isValid: boolean) => {
    setStepValidity((prev) => ({ ...prev, 1: isValid }));
  }, []);

  const handleStep2ValidChange = useCallback((isValid: boolean) => {
    setStepValidity((prev) => ({ ...prev, 2: isValid }));
  }, []);

  const handleStep3ValidChange = useCallback((isValid: boolean) => {
    setStepValidity((prev) => ({ ...prev, 3: isValid }));
  }, []);

  const handleSelectFile = useCallback((fileInfo: { id: string; name: string } | null) => {
    setSelectedFile(fileInfo);
  }, []);

  const handleSelectType = useCallback((type: QuestionType) => {
    setQuestionType(type);
  }, []);

  const isNextDisabled = !stepValidity[currentStep];

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <SelectPdf
            selectedFileId={selectedFile?.id ?? null}
            onValidChange={handleStep1ValidChange}
            onSelectFile={handleSelectFile}
          />
        );
      case 2:
        return (
          <ChooseType
            selectedType={questionType}
            onValidChange={handleStep2ValidChange}
            onSelectType={handleSelectType}
          />
        );
      case 3:
        return (
          <CreateSummary
            selectedFile={selectedFile}
            questionType={questionType}
            onValidChange={handleStep3ValidChange}
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

  const progress = (currentStep / stepLabels.length) * 100;

  return (
    <Container>
      <PageLayout>
        <CreateWrapper>
          <Spacer height="20px" />
          <CommonProgress progress={progress} stepLabels={stepLabels} width="100%" />
          <CreateContainer>{renderStepComponent()}</CreateContainer>
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
    </Container>
  );
};

export default Create;
