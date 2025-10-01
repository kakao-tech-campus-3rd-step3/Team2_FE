import styled from '@emotion/styled';
import Spinner from '@/features/create/components/Spinner';
import Spacer from '@/shared/components/Spacer';
import { useEffect, useState } from 'react';
import Complete from '@/features/create/components/Complete';
import api from '@/shared/api/axiosClient';
import type { QuestionType } from '@/features/create/constants/questionTypeConstants';
import { QUESTION_TYPE_MAP } from '@/features/create/constants/questionTypeConstants';

interface CreateRequestProps {
  selectedFile: { id: string; name: string | null } | null;
  onReset: () => void;
  questionSetReady: boolean;
  questionSetId: number;
  setQuestionSetId: (id: number) => void;
  setQuestionSetReady: (isReady: boolean) => void;
  questionType: QuestionType | null;
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

const NextComponent: React.FC<{
  fileName: string | null;
  onReset: () => void;
  questionSetId: number;
}> = ({ fileName, onReset, questionSetId }) => (
  <Container>
    <Complete fileName={fileName} onReset={onReset} questionSetId={questionSetId} />
  </Container>
);

const CreateRequest: React.FC<CreateRequestProps> = ({
  selectedFile,
  onReset,
  questionSetReady,
  questionSetId,
  setQuestionSetId,
  setQuestionSetReady,
  questionType,
}) => {
  const [status, setStatus] = useState<'requesting' | 'error'>('requesting');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedFile || !questionType) return;

    const createQuestionSet = async () => {
      setQuestionSetId(0);
      setQuestionSetReady(false);
      setStatus('requesting');
      setError(null);

      try {
        await api.post('/question-set', {
          title: selectedFile.name,
          difficulty: 'EASY',
          questionCount: 10,
          type: questionType,
          sourceIds: [parseInt(selectedFile.id)],
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`문제집 생성 중 오류: ${err.message}`);
        } else {
          setError('문제집 생성 중 알 수 없는 오류가 발생했습니다.');
        }
        setStatus('error');
      }
    };

    createQuestionSet();
  }, [selectedFile, questionType, setQuestionSetId, setQuestionSetReady]);

  if (questionSetReady) {
    return (
      <NextComponent
        fileName={selectedFile?.name ?? null}
        onReset={onReset}
        questionSetId={questionSetId}
      />
    );
  }

  if (status === 'error') {
    return (
      <Container>
        <NoticeTitle>문제 생성 중 오류가 발생했습니다.</NoticeTitle>
        <ErrorMessage>{error}</ErrorMessage>
        <Spacer height="20px" />
        <RetryButton onClick={onReset}>문제 다시 생성하기</RetryButton>
      </Container>
    );
  }

  return (
    <Container>
      <Spinner />
      <Spacer height="25px" />
      <NoticeTitle>AI가 문제를 생성하고 있습니다.</NoticeTitle>
      <NoticeContent>
        선택하신 PDF에서 <NoticeContentHighlight>10개</NoticeContentHighlight>의{' '}
        <NoticeContentHighlight>
          {questionType ? QUESTION_TYPE_MAP.get(questionType)?.title : '알 수 없음'}
        </NoticeContentHighlight>{' '}
        문제를 생성하고 있어요
      </NoticeContent>
    </Container>
  );
};

export default CreateRequest;
