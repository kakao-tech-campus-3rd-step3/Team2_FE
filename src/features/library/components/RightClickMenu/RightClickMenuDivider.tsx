import styled from '@emotion/styled';

const StyledDivider = styled.li`
  height: 1px;
  background-color: #e0e0e0;
  margin: 4px 0;
  padding: 0;
  cursor: default;
`;

function RightClickMenuDivider() {
  return <StyledDivider />;
}

export default RightClickMenuDivider;
