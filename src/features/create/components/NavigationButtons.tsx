import styled from '@emotion/styled';

interface NavigationButtonsProps {
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  nextDisabled?: boolean; // 선택적 프로퍼티로 추가
}

const Hr = styled.hr`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border.border0};
  border: none;
  margin: ${({ theme }) => theme.spacing.spacing4};
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PrevButton = styled.button<{ disabled?: boolean }>`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border.border0};
  border-radius: ${({ theme }) => theme.radius.radius1};
  font-size: ${({ theme }) => theme.typography.body2Bold.fontSize};
  color: ${({ theme, disabled }) => (disabled ? theme.colors.gray.gray5 : theme.colors.gray.gray6)};
  width: 55px;
  padding: 5px;
  font-weight: ${({ theme }) => theme.typography.body2Bold.fontWeight};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const NextButton = styled.button<{ disabled?: boolean }>`
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.gray.gray5 : theme.colors.semantic.primary};
  border-radius: ${({ theme }) => theme.radius.radius1};
  font-size: ${({ theme }) => theme.typography.body2Bold.fontSize};
  color: ${({ theme }) => theme.colors.gray.gray0};
  width: 55px;
  padding: 5px;
  font-weight: ${({ theme }) => theme.typography.body2Bold.fontWeight};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const NavigationButtons = ({
  onNext,
  onPrev,
  isFirst,
  isLast,
  nextDisabled = false,
}: NavigationButtonsProps) => {
  return (
    <>
      <Hr />
      <ButtonBox>
        <PrevButton disabled={isFirst} onClick={onPrev}>
          이전
        </PrevButton>
        <NextButton disabled={nextDisabled || isLast} onClick={onNext}>
          다음
        </NextButton>
      </ButtonBox>
    </>
  );
};

export default NavigationButtons;
