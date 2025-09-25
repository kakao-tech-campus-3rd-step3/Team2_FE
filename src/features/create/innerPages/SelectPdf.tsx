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
    data: fileList = [],
    isLoading: isLoadingList,
    isError,
  } = useQuery<FileData[]>({
    queryKey: ['pdfFiles'],
    queryFn: getPdfFileList,
  });

  // ✅ 수정된 부분
  const { mutate: upload, isPending: isUploading } = useMutation({
    mutationFn: uploadPdfFile,
    onSuccess: () => {
      // 업로드 성공 시, 파일 목록 쿼리만 무효화시켜서 목록을 다시 불러옵니다.
      // 자동 선택 로직을 제거했습니다.
      queryClient.invalidateQueries({ queryKey: ['pdfFiles'] });
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
    onValidChange(!!fileId); // 파일이 선택되거나, 선택이 해제될 때만 valid 상태 변경

    if (fileId) {
      const name = fileName ?? fileList.find((file) => file.id === fileId)?.name;
      if (name) {
        onSelectFile({ id: fileId, name });
      }
    }
  };

  const handleUpload = (file: File) => {
    // 업로드를 시작할 때, 기존 선택을 해제하고 다음 버튼을 비활성화
    setSelectedFileId(null);
    onValidChange(false);
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
        isLoading={isLoadingList || isUploading}
      />
    </>
  );
};

export default SelectPdf;
