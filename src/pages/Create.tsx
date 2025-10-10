import { useState, useCallback } from 'react';
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
import type { QuestionType } from '@/features/create/constants/questionTypeConstants';

const CreateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
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
  const stepLabels = ['PDF 선택', '문제 유형', '생성 요약', '생성하기'];
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

  // 의존성 규칙에 위배사항 발생으로 useCallback으로 안정화 처리
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
