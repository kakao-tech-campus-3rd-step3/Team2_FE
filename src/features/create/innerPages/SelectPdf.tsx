import { useEffect, useCallback, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import PdfFileList from '@/features/create/components/PdfFileList';
import type { FileData } from '@/features/create/types/types';
import Title from '@/features/create/components/Title';
import StyledSubTitle from '@/features/create/components/Subtitle';
import Spacer from '@/shared/components/Spacer';
import { uploadPdfFile } from '@/features/create/utils/upload/uploadPdfFile';
import { getPdfFileList } from '@/features/create/utils/getPdfFileList';
import { deletePdfFile } from '@/features/create/utils/deletePdfFile';
import UploadModal from '@/features/create/components/UploadModal';

interface Step1Props {
  selectedFileId: string | null;
  onValidChange: (valid: boolean) => void;
  onSelectFile: (fileInfo: { id: string; name: string } | null) => void;
}

const SelectPdf = ({ selectedFileId, onValidChange, onSelectFile }: Step1Props) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    onError: () => {
      alert('파일 업로드에 실패하였습니다.');
    },
  });

  const { mutate: deleteFile } = useMutation({
    mutationFn: deletePdfFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pdfFiles'] });
    },
    onError: (error) => {
      alert(error instanceof Error ? error.message : '파일 삭제 실패');
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

  const handleDeleteFile = useCallback(
    (fileId: string) => {
      const fileToDelete = fileList.find((file) => file.id === fileId);
      if (fileToDelete && window.confirm(`'${fileToDelete.name}' 파일을 삭제하시겠습니까?`)) {
        if (selectedFileId === fileId) {
          onSelectFile(null);
          onValidChange(false);
        }
        deleteFile(fileId);
      }
    },
    [deleteFile, fileList, onSelectFile, onValidChange, selectedFileId],
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
        onUploadClick={() => setIsModalOpen(true)}
        isLoading={isLoadingList || isUploading}
        onDelete={handleDeleteFile}
      />
      {isModalOpen && (
        <UploadModal onClose={() => setIsModalOpen(false)} onFileUpload={handleUpload} />
      )}
    </>
  );
};

export default SelectPdf;
