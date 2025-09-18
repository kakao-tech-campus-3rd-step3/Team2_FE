import { useState } from 'react';
import PdfFileList from '@/features/create/components/PdfFileList';
import type { FileData } from '@/features/create/types/types';
import Title from '@/features/create/components/Title';
import StyledSubTitle from '@/features/create/components/Subtitle';
import Spacer from '@/shared/components/Spacer';
import { uploadPdfFile } from '@/features/create/utils/upload/uploadPdfFile';

interface Step1Props {
  onValidChange: (valid: boolean) => void;
}

const SelectPdf = ({ onValidChange }: Step1Props) => {
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  // 더미 파일 데이터로 초기화
  const [fileList, setFileList] = useState<FileData[]>(() =>
    Array.from({ length: 8 }, (_, idx) => ({
      id: `file-${idx}`,
      name: '컴퓨터 네트워크.pdf',
      size: '2.4 MB',
      pages: '156p',
      date: '2024. 2. 13.',
    })),
  );

  const handleSelectFile = (fileId: string | null) => {
    setSelectedFileId(fileId);
    onValidChange(!!fileId); // 파일 선택 여부에 따라 유효성 체크
  };

  const handleUpload = async (file: File) => {
    try {
      const uploadedFile = await uploadPdfFile(file);

      setFileList((prev) => [uploadedFile, ...prev]);
      handleSelectFile(uploadedFile.id);
    } catch (error: any) {
      alert(error.message || '파일 업로드 실패');
      console.error('파일 업로드 오류:', error);
    }
  };

  return (
    <>
      <Title>PDF 파일을 선택하세요</Title>
      <StyledSubTitle>
        하단의 PDF에서 선택하거나 새로운 PDF를 업로드 해 선택한 후 다음단계로 진행하세요
      </StyledSubTitle>
      <Spacer height="12px" />
      <PdfFileList
        fileList={fileList}
        selectedFileId={selectedFileId}
        onSelect={handleSelectFile} // 선택된 파일을 처리하는 함수 전달
        onAddFile={handleUpload} // 파일 업로드 함수 전달
      />
    </>
  );
};

export default SelectPdf;
