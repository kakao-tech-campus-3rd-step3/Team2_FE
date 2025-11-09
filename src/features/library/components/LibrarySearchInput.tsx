import type { InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';

type LibrarySearchInputProps = InputHTMLAttributes<HTMLInputElement>;

const LibrarySearchInput = (props: LibrarySearchInputProps) => {
  return <StyledInput {...props} />;
};

export default LibrarySearchInput;

const StyledInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
  padding: 12px 16px;
  width: 100%;
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  border-radius: ${({ theme }) => theme.radius.radius3};
  background-color: ${({ theme }) => theme.colors.background.foreground};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.semantic.primary};
  }
`;
