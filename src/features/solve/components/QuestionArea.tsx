import styled from '@emotion/styled';
import { ArrowLeft } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import type { QuestionSet } from '@/features/solve/types/question';

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

const OptionList = styled.div``;

const OptionItem = styled.p<{ active?: boolean }>`
  cursor: pointer;
  color: ${({ active, theme }) =>
    active ? theme.colors.semantic.primary : theme.colors.gray.gray7};
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

type QuestionAreaProps = {
  currentQuestionIndex: number;
  questions: QuestionSet;
  solvedCheck: Map<number, string>;
  setSolvedCheck: React.Dispatch<React.SetStateAction<Map<number, string>>>;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsAllSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

function QuestionArea({
  currentQuestionIndex,
  questions,
  solvedCheck,
  setSolvedCheck,
  setCurrentQuestionIndex,
  setIsAllSolved,
}: QuestionAreaProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null); // 어떤 선지가 선택되어있는지

  const markSolved = (qNo: number, optionText: string) => {
    setSolvedCheck((prev) => {
      const next = new Map(prev);
      next.set(qNo, optionText);
      return next;
    });
  };

  const goPrev = () => {
    if (currentQuestionIndex > 1) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goNext = () => {
    if (currentQuestionIndex < questions.questionLength) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (
      currentQuestionIndex === questions.questionLength &&
      solvedCheck.size === questions.questionLength
    ) {
      setIsAllSolved(true);
    } else if (
      currentQuestionIndex === questions.questionLength &&
      solvedCheck.size !== questions.questionLength
    ) {
      toast('모든 문제를 체크해야 넘어갈 수 있습니다');
    }
  };

  useEffect(() => {
    setSelectedOption(null);
  }, [currentQuestionIndex]);

  return (
    <QuestionAreaWrapper>
      <QuestionAreaHeader>
        <QuestionAreaTitle>문제 {currentQuestionIndex}</QuestionAreaTitle>
      </QuestionAreaHeader>
      <QuestionWrapper>
        <QuestionStem>{questions.questions[currentQuestionIndex - 1].questionText}</QuestionStem>
        <OptionList>
          {questions.questions[currentQuestionIndex - 1].options.map((opt, i) => (
            <OptionItem
              key={i}
              active={selectedOption === i}
              onClick={() => {
                markSolved(currentQuestionIndex, opt);
                setSelectedOption(i);
              }}
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
