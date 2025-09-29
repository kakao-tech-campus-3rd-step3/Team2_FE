import styled from '@emotion/styled';
import { GraduationCap } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const SolveHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.spacing5};
`;

const BackBtnTitleWrapper = styled.div`
  display: flex;
`;

const SolveHeaderBackBtn = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  border-radius: ${({ theme }) => theme.radius.radius2};
  padding: ${({ theme }) => theme.spacing.spacing1};
  color: ${({ theme }) => theme.colors.gray.gray10};

  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};

  color: ${({ theme }) => theme.colors.gray.gray10};
  display: flex;
  align-items: center;
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

const QuestionIndexViewWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray.gray7};
`;
const QuestionIndexViewTxt = styled.span`
  margin-left: ${({ theme }) => theme.spacing.spacing2};
`;

type SolveHeaderProps = {
  currentQuestionIndex: number;
  title: string;
  questionLength: number;
};

function SolveHeader({ currentQuestionIndex, title, questionLength }: SolveHeaderProps) {
  return (
    <SolveHeaderWrapper>
      <BackBtnTitleWrapper>
        <SolveHeaderBackBtn>
          <ArrowLeft size={20} />
          <Link to="/create">
            <SolveHeaderBackBtnTxt>돌아가기</SolveHeaderBackBtnTxt>
          </Link>
        </SolveHeaderBackBtn>
        <TitleDescriptionWrapper>
          <SolveTitle>{title}</SolveTitle>
          <SolveDescription>객관식 20문제</SolveDescription>
        </TitleDescriptionWrapper>
      </BackBtnTitleWrapper>
      <QuestionIndexViewWrapper>
        <GraduationCap size={16} />
        <QuestionIndexViewTxt>
          {currentQuestionIndex}/{questionLength}
        </QuestionIndexViewTxt>
      </QuestionIndexViewWrapper>
    </SolveHeaderWrapper>
  );
}

export default SolveHeader;
