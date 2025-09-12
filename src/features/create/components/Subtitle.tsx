import styled from '@emotion/styled';

const StyledSubTitle = styled.span`
  display: block;
  width: 100%;
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  text-align: center;
  color: ${({ theme }) => theme.colors.gray.gray6};
`;

interface SubTitleProps {
  children: React.ReactNode;
}

const SubTitle = ({ children }: SubTitleProps) => {
  return <StyledSubTitle>{children}</StyledSubTitle>;
};

export default SubTitle;
