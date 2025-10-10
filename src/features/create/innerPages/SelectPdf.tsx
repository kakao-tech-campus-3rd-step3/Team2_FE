import { useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import PdfFileList from '@/features/create/components/PdfFileList';
import type { FileData } from '@/features/create/types/types';
import Title from '@/features/create/components/Title';
import StyledSubTitle from '@/features/create/components/Subtitle';
import Spacer from '@/shared/components/Spacer';
import { uploadPdfFile } from '@/features/create/utils/upload/uploadPdfFile';
import { getPdfFileList } from '@/features/create/utils/getPdfFileList';

interface Step1Props {
  selectedFileId: string | null;
  onValidChange: (valid: boolean) => void;
  onSelectFile: (fileInfo: { id: string; name: string } | null) => void;
}

const SelectPdf = ({ selectedFileId, onValidChange, onSelectFile }: Step1Props) => {
  const queryClient = useQueryClient();

  const {
    data: fileList = [],
    isLoading: isLoadingList,
    isError,
  } = useQuery<FileData[]>({
    queryKey: ['pdfFiles'],
    queryFn: getPdfFileList,
  });

  const { mutate: upload, isPending: isUploading } = useMutation({
    mutationFn: uploadPdfFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pdfFiles'] });
    },
    onError: (error) => {
      alert(error instanceof Error ? error.message : '파일 업로드 실패');
    },
  });

  const handleSelectFile = useCallback(
    (fileId: string | null) => {
      onValidChange(!!fileId);

      if (fileId) {
        const selected = fileList.find((file) => file.id === fileId);
        if (selected) {
          onSelectFile({ id: selected.id, name: selected.name });
        }
      } else {
        onSelectFile(null);
      }
    },
    [fileList, onSelectFile, onValidChange],
  );

  const handleUpload = useCallback(
    (file: File) => {
      onSelectFile(null);
      onValidChange(false);
      upload(file);
    },
    [onSelectFile, onValidChange, upload],
  );

  useEffect(() => {
    if (isError) {
      alert('PDF 목록을 불러오는 데 실패했습니다.');
    }
  }, [isError]);

  useEffect(() => {
    onValidChange(!!selectedFileId);
  }, [selectedFileId, onValidChange]);

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
