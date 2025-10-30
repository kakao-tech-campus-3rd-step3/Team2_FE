import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { LucideFileText, X } from 'lucide-react';

const FILE_INFO_SEPARATOR = ' · ';

const FileContentBox = styled.div<{ isSelected: boolean }>`
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.radius1};
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
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
  flex-shrink: 0;
`;

const FileIcon = styled(LucideFileText)`
  margin: 10px;
  flex-shrink: 0;
`;

const FileInfoBox = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
`;

const FileInfoUnderBox = styled.div`
  width: 100%;
  display: flex;
`;

const FileName = styled.h4`
  font-size: ${({ theme }) => theme.typography.body3Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.body3Bold.fontWeight};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileInfo = styled.span`
  font-size: ${({ theme }) => theme.typography.body4Regular.fontSize};
  color: ${({ theme }) => theme.colors.gray.gray6};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NewItemSpan = styled.span`
  font-size: ${({ theme }) => theme.typography.body4Regular.fontSize};
  color: ${({ theme }) => theme.colors.semantic.primary};
  flex-shrink: 0;
`;

const DeleteIcon = styled(X)`
  color: ${({ theme }) => theme.colors.gray.gray6};
  flex-shrink: 0;
  margin-left: 10px;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.red.red4};
  }
`;

interface FileItemProps {
  file: {
    name: string;
    size: string;
    date: string;
    new?: boolean;
  };
  isSelected: boolean;
  onClick: () => void;
  onDelete: () => void;
}

const PdfFileItem = ({ file, isSelected, onClick, onDelete }: FileItemProps) => {
  const fileInfoItems = [file.size, file.date];
  const theme = useTheme();

  const handleDeleteClick = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <FileContentBox isSelected={isSelected} onClick={onClick}>
      <RadioInput type="radio" name="pdf-selection" checked={isSelected} readOnly />
      <FileIcon size={16} color={theme.colors.semantic.primary} />
      <FileInfoBox>
        <FileName>{file.name}</FileName>
        <FileInfoUnderBox>
          <FileInfo>
            {fileInfoItems.join(FILE_INFO_SEPARATOR)}
            {file.new && <NewItemSpan> new</NewItemSpan>}
          </FileInfo>
        </FileInfoUnderBox>
      </FileInfoBox>
      <DeleteIcon size={18} onClick={handleDeleteClick} />
    </FileContentBox>
  );
};

export default PdfFileItem;
