import styled from '@emotion/styled';
import PdfFileItem from '@/features/create/components/PdfFileItem';
import type { PdfFileListProps } from '@/features/create/types/types';

const FileListBox = styled.div`
  background-color: #${({ theme }) => theme.colors.background.foreground};
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

const Spacer12 = styled.div`
  height: 12px;
`;

const PdfFileList = ({
  fileList,
  selectedFileId,
  onSelect,
  onUpload,
}: PdfFileListProps & { onUpload: (file: File) => void }) => {
  const handleButtonClick = () => {
    document.getElementById('pdf-upload-input')?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      onUpload(file);
    } else {
      alert('PDF 파일만 업로드 가능합니다.');
    }
    e.target.value = ''; // 같은 파일 재업로드 가능하게 초기화
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
      <Spacer12 />
      <FileListSecondBox>
        <FileListSearchInput placeholder="PDF 파일 검색" />
        <Spacer12 />
        <FileListDivWithScroll>
          {fileList.map((file) => (
            <PdfFileItem
              key={file.id}
              file={file}
              isSelected={selectedFileId === file.id}
              onClick={() => onSelect(file.id)}
            />
          ))}
        </FileListDivWithScroll>
      </FileListSecondBox>
    </FileListBox>
  );
};

export default PdfFileList;
