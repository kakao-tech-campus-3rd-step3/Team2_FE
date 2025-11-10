import styled from '@emotion/styled';
import { ArrowLeft } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

import type { QuestionSet } from '@/features/solve/types/question';
import type { MarkingRequest } from '../../types/MarkingRequest';
import { showToast } from '@/shared/utils/toast';

const QuestionAreaWrapper = styled.div`
  margin-right: ${({ theme }) => theme.spacing.spacing3};
  flex: 3;

  background-color: ${({ theme }) => theme.colors.gray.gray0};
  border: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  padding: ${({ theme }) => theme.spacing.spacing4};
  border-radius: ${({ theme }) => theme.radius.radius2};

  @media (max-width: 1050px), (max-height: 400px) {
    margin-right: 0;
  }
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
  min-height: 80px;
  display: flex;
  align-items: center;
`;

const OptionList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
`;

const OptionItem = styled.p<{ active?: boolean }>`
  cursor: pointer;
  &:hover {
    background-color: ${({ active, theme }) =>
      active ? theme.colors.gray.gray3 : theme.colors.gray.gray1};
  }
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

const ExplanationBox = styled.div`
  background-color: ${({ theme }) => theme.colors.gray.gray1};
  border-radius: ${({ theme }) => theme.radius.radius2};
  padding: ${({ theme }) => theme.spacing.spacing2} ${({ theme }) => theme.spacing.spacing4};
  margin-top: ${({ theme }) => theme.spacing.spacing3};
`;

const ExplanationBoxTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.label2Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Bold.lineHeight};
`;

const AnswerTxt = styled.p`
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};
`;

const ExplanationTxt = styled.p`
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};
`;

type QuestionAreaProps = {
  currentQuestionIndex: number;
  questions: QuestionSet;
  solvedCheck: MarkingRequest[];
  setSolvedCheck: React.Dispatch<React.SetStateAction<MarkingRequest[]>>;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsAllSolved: React.Dispatch<React.SetStateAction<boolean>>;
  isExplanationPage: boolean;
};

function MultipleChoiceSolve({
  currentQuestionIndex,
  questions,
  solvedCheck,
  setSolvedCheck,
  setCurrentQuestionIndex,
  setIsAllSolved,
  isExplanationPage,
}: QuestionAreaProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null); // 어떤 선지가 선택되어있는지

  const markSolved = (optionText: string) => {
    const question = questions.questions.at(currentQuestionIndex - 1);
    if (!question) {
      showToast('문제 id를 찾을 수 없습니다.');
      return;
    }

    setSolvedCheck((prev) => {
      return [
        ...prev.filter((v) => v.questionId !== question.id),
        { questionId: question.id, memberAnswer: optionText, memberAnswerType: 'string' },
      ];
    });
  };

  const goPrev = () => {
    if (currentQuestionIndex > 1) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goNext = () => {
    if (currentQuestionIndex < questions.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (
      currentQuestionIndex === questions.questions.length &&
      solvedCheck.length === questions.questions.length
    ) {
      setIsAllSolved(true);
    } else if (
      currentQuestionIndex === questions.questions.length &&
      solvedCheck.length !== questions.questions.length
    ) {
      showToast('모든 문제를 체크해야 넘어갈 수 있습니다');
    }
  };

  useEffect(() => {
    const currentQuestion = questions.questions.at(currentQuestionIndex - 1);
    if (!currentQuestion) return;

    // solvedCheck 배열에서 현재 문제의 기록 찾기
    const solved = solvedCheck.find((v) => v.questionId === currentQuestion.id);
    if (solved) {
      // options 배열에서 선택된 보기의 인덱스 찾아서 복원
      const idx = currentQuestion.options.findIndex((opt) => opt === solved.memberAnswer);
      setSelectedOption(idx);
    } else {
      setSelectedOption(null);
    }
  }, [currentQuestionIndex, solvedCheck, questions]);

  return (
    <QuestionAreaWrapper>
      <QuestionAreaHeader>
        <QuestionAreaTitle>문제 {currentQuestionIndex}</QuestionAreaTitle>
      </QuestionAreaHeader>
      <QuestionWrapper>
        <QuestionStem>{questions.questions[currentQuestionIndex - 1].questionText}</QuestionStem>
        <OptionList
          style={{
            pointerEvents: isExplanationPage ? 'none' : 'auto',
            opacity: isExplanationPage ? 0.7 : 1,
          }}
        >
          {questions.questions[currentQuestionIndex - 1].options.map((opt, i) => (
            <OptionItem
              key={i}
              active={selectedOption === i}
              onClick={() => {
                markSolved(opt);
                setSelectedOption(i);
              }}
            >{`${i + 1}. ${opt}`}</OptionItem>
          ))}
        </OptionList>
        {isExplanationPage && (
          <ExplanationBox>
            <ExplanationBoxTitle>정답 및 해설</ExplanationBoxTitle>
            <AnswerTxt>정답 : {questions.questions[currentQuestionIndex - 1].answer}</AnswerTxt>
            <ExplanationTxt>
              {questions.questions[currentQuestionIndex - 1].explanation}
            </ExplanationTxt>
          </ExplanationBox>
        )}
        <QuestionNavigation>
          <PrevButton
            onClick={goPrev}
            style={{
              visibility: currentQuestionIndex === 1 ? 'hidden' : 'visible',
              pointerEvents: currentQuestionIndex === 1 ? 'none' : 'auto',
            }}
          >
            <ArrowLeft size={20} />
            이전
          </PrevButton>
          <NextButton
            onClick={goNext}
            style={{
              visibility:
                currentQuestionIndex === questions.questions.length ? 'hidden' : 'visible',
              pointerEvents: currentQuestionIndex === questions.questions.length ? 'none' : 'auto',
            }}
          >
            다음
            <ArrowRight size={20} />
          </NextButton>
        </QuestionNavigation>
      </QuestionWrapper>
    </QuestionAreaWrapper>
  );
}

export default MultipleChoiceSolve;
