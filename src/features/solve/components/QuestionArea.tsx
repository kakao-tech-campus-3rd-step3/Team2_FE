import styled from '@emotion/styled';
import { ArrowLeft } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

const QuestionAreaWrapper = styled.div`
  margin-right: ${({ theme }) => theme.spacing.spacing3};
  flex: 3;

  background-color: ${({ theme }) => theme.colors.gray.gray0};
  border: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  padding: ${({ theme }) => theme.spacing.spacing4};
  border-radius: ${({ theme }) => theme.radius.radius2};
`;

const QuestionAreaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.spacing10};
`;

const QuestionAreaTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.label1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.label1Bold.lineHeight};
`;

const QuestionWrapper = styled.div``;

const QuestionStem = styled.p`
  margin: ${({ theme }) => theme.spacing.spacing8} 0;
`;

const OptionList = styled.p``;

const OptionItem = styled.p`
  cursor: pointer;
`;

const QuestionNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.spacing5};
`;

const PrevButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  border-radius: ${({ theme }) => theme.radius.radius2};
  padding: ${({ theme }) => theme.spacing.spacing2};

  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};

  color: ${({ theme }) => theme.colors.gray.gray10};
  display: flex;
  align-items: center;
`;

const NextButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  border-radius: ${({ theme }) => theme.radius.radius2};
  padding: ${({ theme }) => theme.spacing.spacing2};

  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};

  background-color: ${({ theme }) => theme.colors.green.green6};
  color: ${({ theme }) => theme.colors.gray.gray0};
  display: flex;
  align-items: center;
`;

interface Question {
  id: number;
  stem: string;
  options: string[];
  answer: number;
}

type QuestionAreaProps = {
  currentQuestionIndex: number;
  questions: Question[];
  setSolvedCheck: React.Dispatch<React.SetStateAction<Set<number>>>;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsAllSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

function QuestionArea({ currentQuestionIndex, questions, setSolvedCheck,setCurrentQuestionIndex,setIsAllSolved }: QuestionAreaProps) {
  const markSolved = (qNo: number) => {
    setSolvedCheck((prev) => {
      const next = new Set(prev);
      next.add(qNo); // qNo 문제를 '완료'로 기록
      return next;
    });
  };

  const goPrev = () => {
    if (currentQuestionIndex > 1) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goNext = () => {
    if (currentQuestionIndex < 10) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if(currentQuestionIndex === 10) {
        setIsAllSolved(true);
    }
  };

  return (
    <QuestionAreaWrapper>
      <QuestionAreaHeader>
        <QuestionAreaTitle>문제 {currentQuestionIndex}</QuestionAreaTitle>
      </QuestionAreaHeader>
      <QuestionWrapper>
        <QuestionStem>{questions[currentQuestionIndex - 1].stem}</QuestionStem>
        <OptionList>
          {questions[currentQuestionIndex - 1].options.map((opt, i) => (
            <OptionItem
              key={i}
              onClick={() => markSolved(currentQuestionIndex)}
            >{`${i + 1}. ${opt}`}</OptionItem>
          ))}
        </OptionList>

        <QuestionNavigation>
          <PrevButton onClick={goPrev} disabled={currentQuestionIndex === 1}>
            <ArrowLeft size={20} />
            이전
          </PrevButton>
          <NextButton onClick={goNext}>
            다음
            <ArrowRight size={20} />
          </NextButton>
        </QuestionNavigation>
      </QuestionWrapper>
    </QuestionAreaWrapper>
  );
}

export default QuestionArea;
