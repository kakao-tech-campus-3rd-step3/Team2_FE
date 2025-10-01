import styled from '@emotion/styled';

const StyledTitle = styled.h2`
  width: 100%;
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  text-align: left;
  padding: 5px 10px;
`;

interface TitleProps {
  children: React.ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return <StyledTitle>{children}</StyledTitle>;
};

export default Title;
