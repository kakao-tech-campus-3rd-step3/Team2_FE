import { useState, useCallback, useRef } from 'react';
import styled from '@emotion/styled';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: ${({ theme }) => theme.radius.radius4};
  width: 500px;
  text-align: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const DropZone = styled.div<{ isDragging: boolean }>`
  border: 2px dashed
    ${({ theme, isDragging }) =>
      isDragging ? theme.colors.semantic.primary : theme.colors.border.border1};
  border-radius: ${({ theme }) => theme.radius.radius3};
  padding: 60px 20px;
  cursor: pointer;
  transition: border-color 0.2s;
  background-color: ${({ isDragging, theme }) =>
    isDragging ? '#f0f8ff' : theme.colors.background.foreground};

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.text.default};
    font-size: ${({ theme }) => theme.typography.body1Regular.fontSize};
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

interface UploadModalProps {
  onClose: () => void;
  onFileUpload: (file: File) => void;
}

const UploadModal = ({ onClose, onFileUpload }: UploadModalProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File | null) => {
      if (!file) return;

      if (file.type !== 'application/pdf') {
        alert('PDF 파일만 업로드할 수 있습니다.');
        return;
      }
      onFileUpload(file);
      onClose();
    },
    [onFileUpload, onClose],
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback(
    (e: React.DragEvent) => {
      handleDrag(e);
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        setIsDragging(true);
      }
    },
    [handleDrag],
  );

  const handleDragOut = useCallback(
    (e: React.DragEvent) => {
      handleDrag(e);
      setIsDragging(false);
    },
    [handleDrag],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      handleDrag(e);
      setIsDragging(false);
      const files = e.dataTransfer.files;
      if (files && files.length === 1) {
        handleFile(files[0]);
      } else {
        alert('PDF 파일 1개만 업로드할 수 있습니다.');
      }
    },
    [handleDrag, handleFile],
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFile(file);
  };

  const handleZoneClick = () => {
    inputRef.current?.click();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h3>PDF 파일 업로드</h3>
        <DropZone
          onClick={handleZoneClick}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          isDragging={isDragging}
        >
          <p>여기에 PDF 파일을 드래그 앤 드롭하세요</p>
          <p>또는 클릭하여 파일을 선택하세요</p>
          <HiddenInput
            ref={inputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </DropZone>
      </ModalContent>
    </ModalOverlay>
  );
};

export default UploadModal;
