import styled from '@emotion/styled';
import PdfFileItem from '@/features/create/components/PdfFileItem';
import type { PdfFileListProps } from '@/features/create/types/types';

const FileListBox = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid lightgrey;
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
  font-size: 0.775rem;
  color: grey;
`;

const FileUploadButton = styled.button`
  background-color: #16a34a;
  border-radius: 5px;
  font-size: 0.775rem;
  color: white;
  width: 55px;
  padding: 5px;
  font-weight: bold;
`;

const FileListSecondBox = styled.div`
  width: 100%;
`;

const FileListSearchInput = styled.input`
  border: 1px solid lightgrey;
  padding: 5px;
  width: 100%;
  font-size: 0.75rem;
  border-radius: 6px;
`;

const FileListDivWithScroll = styled.div`
  overflow: auto;
  width: 100%;
  height: 200px;
  border-radius: 5px;
`;

const Spacer12 = styled.div`
  height: 12px;
`;


const PdfFileList = ({ fileList, selectedFileId, onSelect }: PdfFileListProps) => {
  return (
    <FileListBox>
      <FileListFirstBox>
        <FileListBoxTitle>PDF 파일을 선택해주세요.</FileListBoxTitle>
        <FileUploadButton>업로드</FileUploadButton>
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
