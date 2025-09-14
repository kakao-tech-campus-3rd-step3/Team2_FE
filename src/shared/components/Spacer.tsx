import styled from '@emotion/styled';

interface SpacerProps {
  width?: string | number;
  height?: string | number;
}

const Spacer = styled.div<SpacerProps>`
  width: ${({ width }) => (width ? width : 'auto')};
  height: ${({ height }) => (height ? height : 'auto')};
`;

export default Spacer;
