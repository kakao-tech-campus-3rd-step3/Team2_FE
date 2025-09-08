import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { LucideFileText } from 'lucide-react';

const FileContentBox = styled.div<{ isSelected: boolean }>`
  width: 100%;
  border-radius: ${({theme})=>theme.radius.radius1};
  border: 1px solid ${({theme})=>theme.colors.border.border1};
  height: 50px;
  margin: 5px 0;
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: ${({ isSelected, theme }) =>
  isSelected ? theme.colors.green.green2 : theme.colors.gray.gray0};
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

const RadioInput = styled.input`
  width: 10px;
  height: 10px;
`;

const FileIcon = styled(LucideFileText)`
  margin: 10px;
`;

const FileInfoBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FileInfoUnderBox = styled.div`
  width: 100%;
  display: flex;
`;

const FileName = styled.h4`
  font-size: 0.85rem;
`;

const FileInfo = styled.span`
  font-size: 0.7rem;
  color: grey;
`;

interface FileItemProps {
  file: {
    name: string;
    size: string;
    pages: string;
    date: string;
  };
  isSelected: boolean;
  onClick: () => void;
}

const PdfFileItem = ({ file, isSelected, onClick }: FileItemProps) => {
  const FILE_INFO_SEPARATOR = ' · ';
  const fileInfoItems = [file.size, file.pages, file.date];
  const theme = useTheme();

  return (
    <FileContentBox isSelected={isSelected} onClick={onClick}>
      <RadioInput type="radio" name="pdf-selection" checked={isSelected} readOnly />
      <FileIcon size={16} color={theme.colors.semantic.primary} />
      <FileInfoBox>
        <FileName>{file.name}</FileName>
        <FileInfoUnderBox>
          <FileInfo>{fileInfoItems.join(FILE_INFO_SEPARATOR)}</FileInfo>
        </FileInfoUnderBox>
      </FileInfoBox>
    </FileContentBox>
  );
};

export default PdfFileItem;
