import styled from '@emotion/styled';

const QuestionNavigatorWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.gray.gray0};
  border: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  padding: ${({ theme }) => theme.spacing.spacing4};
  border-radius: ${({ theme }) => theme.radius.radius2};
  margin-top: ${({ theme }) => theme.spacing.spacing4};
`;

const QuestionNavigatorTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.label2Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Bold.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray10};
`;

const QuestionNumberList = styled.div`
  display: flex;
`;

const QuestionNumberItem = styled.div<{ active?: boolean; solved?: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => theme.radius.radiusFull};
  margin: ${({ theme }) => theme.spacing.spacing1};
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};

  background-color: ${({ active, solved, theme }) =>
    active
      ? theme.colors.green.green6
      : solved
        ? theme.colors.green.green7
        : theme.colors.gray.gray3};

  color: ${({ active, solved, theme }) =>
    active ? theme.colors.gray.gray0 : solved ? theme.colors.gray.gray0 : theme.colors.gray.gray7};
`;

type QuestionNavigatorProps = {
  currentQuestionIndex: number;
  solvedCheck: Map<number, string>;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  questionLength: number;
};
function QuestionNavigator({
  currentQuestionIndex,
  solvedCheck,
  setCurrentQuestionIndex,
  questionLength
}: QuestionNavigatorProps) {
  return (
    <QuestionNavigatorWrapper>
      <QuestionNavigatorTitle>문제 바로가기</QuestionNavigatorTitle>
      <QuestionNumberList>
        {Array.from({ length: questionLength }, (_, i) => (
          <QuestionNumberItem
            key={i + 1}
            active={i + 1 === currentQuestionIndex}
            solved={solvedCheck.has(i + 1)}
            onClick={() => setCurrentQuestionIndex(i + 1)}
          >
            {i + 1}
          </QuestionNumberItem>
        ))}
      </QuestionNumberList>
    </QuestionNavigatorWrapper>
  );
}

export default QuestionNavigator;
