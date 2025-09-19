import styled from '@emotion/styled';
import PdfFileItem from '@/features/create/components/PdfFileItem';
import type { PdfFileListProps } from '@/features/create/types/types';
import Spacer from '@/shared/components/Spacer';
import Loading from './Loading';
import { useEffect, useState } from 'react';

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
`;

const HiddenInput = styled.input`
  display: none;
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
  height: 200px;
  border-radius: ${({ theme }) => theme.radius.radius2};
`;

const LoadingDiv = styled.div`
  width: 100%;
  height: 200px;
  border: 1px solid lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.radius2};
`;

interface Props extends PdfFileListProps {
  onAddFile: (file: File) => void;
  isLoading: boolean;
}

const PdfFileList = ({ fileList, selectedFileId, onSelect, onAddFile, isLoading }: Props) => {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');

  // debounce: 입력이 멈춘 후 300ms 뒤에 검색어를 업데이트
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText.trim());
    }, 300);

    return () => clearTimeout(handler);
  }, [searchText]);

  // 검색어에 맞게 필터링된 파일 리스트
  const filteredFiles = debouncedSearchText
    ? fileList.filter((file) => file.name.toLowerCase().includes(debouncedSearchText.toLowerCase()))
    : fileList;

  const handleButtonClick = () => {
    document.getElementById('pdf-upload-input')?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    onAddFile(file);
  };

  return (
    <FileListBox>
      <FileListFirstBox>
        <FileListBoxTitle>PDF 파일을 선택해주세요.</FileListBoxTitle>
        <FileUploadButton onClick={handleButtonClick}>업로드</FileUploadButton>
        <HiddenInput
          id="pdf-upload-input"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
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
            <LoadingDiv>검색 결과가 없습니다.</LoadingDiv>
          ) : (
            filteredFiles.map((file) => (
              <PdfFileItem
                key={file.id}
                file={file}
                isSelected={selectedFileId === file.id}
                onClick={() => onSelect(file.id)}
              />
            ))
          )}
        </FileListDivWithScroll>
      </FileListSecondBox>
    </FileListBox>
  );
};

export default PdfFileList;
