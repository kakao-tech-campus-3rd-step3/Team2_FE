import styled from '@emotion/styled';
import { ArrowLeft } from 'lucide-react';
import type { QuestionSet } from '@/features/solve/types/question';
import { useNavigate } from 'react-router-dom';

const SolveHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.spacing5};
`;

const BackBtnTitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const SolveHeaderBackBtn = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  border-radius: ${({ theme }) => theme.radius.radius2};
  padding: ${({ theme }) => `${theme.spacing.spacing2} ${theme.spacing.spacing3}`};
  color: ${({ theme }) => theme.colors.gray.gray10};

  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};

  color: ${({ theme }) => theme.colors.gray.gray10};
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: fit-content;
`;

const SolveHeaderBackBtnTxt = styled.span`
  margin-left: ${({ theme }) => theme.spacing.spacing2};
`;

const TitleDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${({ theme }) => theme.spacing.spacing4};
`;

const SolveTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title1Bold.lineHeight};
`;

const SolveDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.subtitle2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.subtitle2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.subtitle2Regular.lineHeight};
`;

type SolveHeaderProps = {
  currentQuestionIndex: number;
  title: string;
  questionLength: number;
  questions: QuestionSet;
};

function SolveHeader({ title, questionLength, questions }: SolveHeaderProps) {
  const navigate = useNavigate();

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case 'MULTIPLE_CHOICE':
        return '객관식';
      case 'TRUE_FALSE':
        return '참/거짓';
      case 'SHORT_ANSWER':
        return '단답형';
      default:
        return '기타';
    }
  };

  return (
    <SolveHeaderWrapper>
      <BackBtnTitleWrapper>
        <SolveHeaderBackBtn onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          <SolveHeaderBackBtnTxt>돌아가기</SolveHeaderBackBtnTxt>
        </SolveHeaderBackBtn>
        <TitleDescriptionWrapper>
          <SolveTitle>{title}</SolveTitle>
          <SolveDescription>
            {getQuestionTypeLabel(questions.type)} {questionLength}문제
          </SolveDescription>
        </TitleDescriptionWrapper>
      </BackBtnTitleWrapper>
    </SolveHeaderWrapper>
  );
}

export default SolveHeader;
