import { useState, useEffect } from 'react';
import PdfFileList from '@/features/create/components/PdfFileList';
import type { FileData } from '@/features/create/types/types';
import Title from '@/features/create/components/Title';
import StyledSubTitle from '@/features/create/components/Subtitle';
import Spacer from '@/shared/components/Spacer';

interface Step1Props {
  onValidChange: (valid: boolean) => void;
}

const Step1 = ({ onValidChange }: Step1Props) => {
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [fileList, setFileList] = useState<FileData[]>(() =>
    Array.from({ length: 8 }, (_, idx) => ({
      id: `file-${idx}`,
      name: '컴퓨터 네트워크.pdf',
      size: '2.4 MB',
      pages: '156p',
      date: '2024. 2. 13.',
    })),
  );

  useEffect(() => {
    // selectedFileId가 있을 때만 유효하다고 부모에게 알림
    onValidChange(!!selectedFileId);
  }, [selectedFileId, onValidChange]);

  const handleUpload = (file: File) => {
    const newFile: FileData = {
      id: `file-${Date.now()}`,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      pages: '??p', // 필요시 업데이트(라이브러리든 API든 협의 필요)
      date: new Date().toISOString().split('T')[0].replace(/-/g, '. '),
    };

    setFileList((prev) => [newFile, ...prev]);
    setSelectedFileId(newFile.id);
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
        onSelect={setSelectedFileId}
        onUpload={handleUpload}
      />
    </>
  );
};

export default Step1;
