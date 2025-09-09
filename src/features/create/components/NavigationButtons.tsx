import styled from '@emotion/styled';

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

const PrevButton = styled.button`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border.border0};
  border-radius: ${({ theme }) => theme.radius.radius1};
  font-size: ${({ theme }) => theme.typography.body2Bold.fontSize};
  color: ${({ theme }) => theme.colors.gray.gray6};
  width: 55px;
  padding: 5px;
  font-weight: ${({ theme }) => theme.typography.body2Bold.fontWeight};
`;

const NextButton = styled.button`
  background-color: ${({ theme }) => theme.colors.semantic.primary};
  border-radius: ${({ theme }) => theme.radius.radius1};
  font-size: ${({ theme }) => theme.typography.body2Bold.fontSize};
  color: ${({ theme }) => theme.colors.gray.gray0};
  width: 55px;
  padding: 5px;
  font-weight: ${({ theme }) => theme.typography.body2Bold.fontWeight};
`;

const NavigationButtons = () => {
  return (
    <>
      <Hr />
      <ButtonBox>
        <PrevButton>이전</PrevButton>
        <NextButton>다음</NextButton>
      </ButtonBox>
    </>
  );
};

export default NavigationButtons;
