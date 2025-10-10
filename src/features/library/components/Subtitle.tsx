import styled from '@emotion/styled';

const StyledSubTitle = styled.span`
  display: block;
  width: 100%;
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  text-align: left;
  padding: 0px 0px 10px 10px;
  color: ${({ theme }) => theme.colors.gray.gray6};
`;

export default StyledSubTitle;
