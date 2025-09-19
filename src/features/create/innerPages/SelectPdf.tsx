import { useState, useEffect } from 'react';
import PdfFileList from '@/features/create/components/PdfFileList';
import type { FileData } from '@/features/create/types/types';
import Title from '@/features/create/components/Title';
import StyledSubTitle from '@/features/create/components/Subtitle';
import Spacer from '@/shared/components/Spacer';
import { uploadPdfFile } from '@/features/create/utils/upload/uploadPdfFile';
import { getPdfFileList } from '@/features/create/utils/getPdfFileList';

interface Step1Props {
  onValidChange: (valid: boolean) => void;
  onSelectFile: (fileInfo: { id: string; name: string }) => void;
}

const SelectPdf = ({ onValidChange, onSelectFile }: Step1Props) => {
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [fileList, setFileList] = useState<FileData[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  // ✅ useEffect 의존성 수정
  useEffect(() => {
    onValidChange(false);

    const fetchFileList = async () => {
      try {
        const files = await getPdfFileList();
        setFileList(files);
      } catch {
        alert('PDF 목록을 불러오는 데 실패했습니다.');
      } finally {
        setIsLoadingList(false);
      }
    };

    fetchFileList();
  }, []);

  const handleSelectFile = (fileId: string | null) => {
    setSelectedFileId(fileId);
    onValidChange(!!fileId);

    if (fileId) {
      const selected = fileList.find((file) => file.id === fileId);
      if (selected) {
        onSelectFile({ id: fileId, name: selected.name });
      }
    }
  };

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const uploadedFile = await uploadPdfFile(file);

      setFileList((prev) => [uploadedFile, ...prev]);
      handleSelectFile(uploadedFile.id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('파일 업로드 실패');
      }
    }
    setIsUploading(false);
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
        onSelect={handleSelectFile}
        onAddFile={handleUpload}
        isLoading={isLoadingList || isUploading}
      />
    </>
  );
};

export default SelectPdf;
