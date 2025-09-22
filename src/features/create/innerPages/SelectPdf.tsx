import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();

  const {
    data: fileList = [], // data가 없을 경우를 대비해 기본값으로 빈 배열 설정
    isLoading: isLoadingList,
    isError,
  } = useQuery<FileData[]>({
    queryKey: ['pdfFiles'],
    queryFn: getPdfFileList,
  });

  const { mutate: upload, isPending: isUploading } = useMutation({
    mutationFn: uploadPdfFile,
    onSuccess: (uploadedFile) => {
      queryClient.invalidateQueries({ queryKey: ['pdfFiles'] });

      handleSelectFile(uploadedFile.id, uploadedFile.name);
    },
    onError: (error) => {
      alert(error instanceof Error ? error.message : '파일 업로드 실패');
    },
  });

  useEffect(() => {
    if (isError) {
      alert('PDF 목록을 불러오는 데 실패했습니다.');
    }
  }, [isError]);

  const handleSelectFile = (fileId: string | null, fileName?: string | null) => {
    setSelectedFileId(fileId);
    onValidChange(!!fileId);

    if (fileId) {
      const name = fileName ?? fileList.find((file) => file.id === fileId)?.name;
      if (name) {
        onSelectFile({ id: fileId, name });
      }
    }
  };
  const handleUpload = (file: File) => {
    upload(file);
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
        onSelect={(id) => handleSelectFile(id)}
        onAddFile={handleUpload}
        // 목록 로딩 상태와 업로드 중 상태를 모두 isLoading으로 전달
        isLoading={isLoadingList || isUploading}
      />
    </>
  );
};

export default SelectPdf;
