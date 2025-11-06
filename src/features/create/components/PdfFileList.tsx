import styled from '@emotion/styled';
import PdfFileItem from '@/features/create/components/PdfFileItem';
import type { PdfFileListProps, FileData } from '@/features/create/types/types';
import Spacer from '@/shared/components/Spacer';
import Loading from './Loading';
import { useState } from 'react';
import useDebounce from '@/features/create/hooks/useDebounce';

const FileListBox = styled.div`
  background-color: ${({ theme }) => theme.colors.background.foreground};
  border-radius: ${({ theme }) => theme.radius.radius2};
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
  width: 100%;
  padding: 10px 15px;
`;

const FileListFirstBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FileListBoxTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  color: ${({ theme }) => theme.colors.gray.gray6};
`;

const FileUploadButton = styled.button`
  background-color: ${({ theme }) => theme.colors.semantic.primary};
  border-radius: ${({ theme }) => theme.radius.radius1};
  font-size: ${({ theme }) => theme.typography.label2Bold.fontSize};
  color: ${({ theme }) => theme.colors.gray.gray0};
  width: 55px;
  padding: 5px;
  font-weight: ${({ theme }) => theme.typography.label2Bold.fontWeight};
  cursor: pointer;
  border: none;
`;

const FileListSecondBox = styled.div`
  width: 100%;
`;

const FileListSearchInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.gray.gray5};
  padding: 5px;
  width: 100%;
  font-size: ${({ theme }) => theme.typography.label2Bold.fontSize};
  border-radius: ${({ theme }) => theme.radius.radius2};
`;

const FileListDivWithScroll = styled.div`
  overflow: auto;
  width: 100%;
  height: 30dvh;
  min-height: 200px;
  max-height: 700px;
  border-radius: ${({ theme }) => theme.radius.radius2};
`;

const LoadingDiv = styled.div`
  width: 100%;
  height: 30dvh;
  min-height: 200px;
  max-height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.radius2};
  color: ${({ theme }) => theme.colors.gray.gray6};
`;

interface Props extends PdfFileListProps {
  onUploadClick: () => void;
  isLoading: boolean;
  onDelete: (fileId: string) => void;
}

const PdfFileList = ({
  fileList,
  selectedFileId,
  onSelect,
  onUploadClick,
  isLoading,
  onDelete,
}: Props) => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 300);

  const filteredFiles = debouncedSearchText
    ? fileList.filter((file) =>
        file.name
          .normalize('NFC') // 한글 분해형 → 완성형으로 변환(맥의 NFD 방식->NFC 전환)
          .toLowerCase()
          .includes(debouncedSearchText.trim().normalize('NFC').toLowerCase()),
      )
    : fileList;

  const mapFileDataToItemProps = (file: FileData) => ({
    id: file.id,
    name: file.name,
    size: file.size || 'N/A',
    date: file.date || 'N/A',
  });

  return (
    <FileListBox>
      <FileListFirstBox>
        <FileListBoxTitle>PDF 파일을 선택해주세요.</FileListBoxTitle>
        <FileUploadButton onClick={onUploadClick}>업로드</FileUploadButton>
      </FileListFirstBox>

      <Spacer height="12px" />

      <FileListSecondBox>
        <FileListSearchInput
          placeholder="PDF 파일 검색"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Spacer height="12px" />
        <FileListDivWithScroll>
          {isLoading ? (
            <LoadingDiv>
              <Loading size="25px" />
            </LoadingDiv>
          ) : filteredFiles.length === 0 ? (
            <LoadingDiv>
              {debouncedSearchText ? '검색 결과가 없습니다.' : '업로드된 PDF가 없습니다.'}
            </LoadingDiv>
          ) : (
            filteredFiles.map((file) => (
              <PdfFileItem
                key={file.id}
                file={mapFileDataToItemProps(file)}
                isSelected={selectedFileId === file.id}
                onClick={() => onSelect(file.id)}
                onDelete={() => onDelete(file.id)}
              />
            ))
          )}
        </FileListDivWithScroll>
      </FileListSecondBox>
    </FileListBox>
  );
};

export default PdfFileList;
