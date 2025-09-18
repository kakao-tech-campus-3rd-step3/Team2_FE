import styled from '@emotion/styled';
import Spinner from '@/features/create/components/Spinner';
import Spacer from '@/shared/components/Spacer';
import { useEffect, useState } from 'react';
import Complete from '@/features/create/components/Complete';
import { api } from '@/shared/api/axiosClient';

interface CreateRequestProps {
  selectedFile: { id: string; name: string | null } | null;
  onReset: () => void;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const NoticeTitle = styled.h3`
  width: 100%;
  text-align: center;
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
`;

const NoticeContent = styled.p`
  width: 100%;
  padding: 10px;
  text-align: center;
`;

const NoticeContentHighlight = styled.span`
  color: ${({ theme }) => theme.colors.semantic.primary};
  font-weight: ${({ theme }) => theme.typography.body1Bold.fontWeight};
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 20px;
  text-align: center;
`;

const RetryButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.semantic.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const NextComponent: React.FC<{ fileName: string | null; onReset: () => void }> = ({
  fileName,
  onReset,
}) => (
  <Container>
    <Complete fileName={fileName} onReset={onReset} />
  </Container>
);

const CreateRequest: React.FC<CreateRequestProps> = ({ selectedFile, onReset }) => {
  const [step, setStep] = useState<'loading' | 'next' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const createQuestionSet = async () => {
      try {
        await api.post('/question-set', {
          difficulty: 'EASY', // 난이도 normal로 하면 에러 발생 : 확인 필요
          questionCount: 20,
          type: 'SUBJECTIVE',
          sourceIds: selectedFile ? [parseInt(selectedFile.id)] : [],
        });

        setStep('next');
      } catch (err: any) {
        setError('문제집 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
        setStep('error');
      }
    };

    createQuestionSet();
  }, [selectedFile]);

  if (step === 'next') {
    return <NextComponent fileName={selectedFile?.name ?? null} onReset={onReset} />;
  }

  return (
    <Container>
      {step === 'loading' && (
        <>
          <Spinner />
          <Spacer height="25px" />
          <NoticeTitle>AI가 문제를 생성하고 있습니다.</NoticeTitle>
          <NoticeContent>
            선택하신 PDF에서 <NoticeContentHighlight>20개</NoticeContentHighlight>의{' '}
            <NoticeContentHighlight>객관식</NoticeContentHighlight> 문제를 생성하고 있어요
          </NoticeContent>
        </>
      )}

      {step === 'error' && (
        <>
          <NoticeTitle>문제 생성 중 오류가 발생했습니다.</NoticeTitle>
          <ErrorMessage>{error}</ErrorMessage>
          <Spacer height="20px" />
          <RetryButton onClick={onReset}>문제 다시 생성하기</RetryButton>
        </>
      )}
    </Container>
  );
};

export default CreateRequest;
