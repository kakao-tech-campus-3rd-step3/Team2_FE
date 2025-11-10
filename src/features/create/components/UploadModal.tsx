import { useState, useCallback, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { CloudUpload } from 'lucide-react';
import Spacer from '@/shared/components/Spacer';
import useDragAndDrop from '@/features/create/hooks/useDragAndDrop';

const MAX_FILE_SIZE_MB = 20;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.green.green2};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledCloudUpload = styled(CloudUpload)<{ size?: number | string }>`
  width: ${({ size }) => (typeof size === 'number' ? `${size}px` : size)};
  height: ${({ size }) => (typeof size === 'number' ? `${size}px` : size)};
  stroke: ${({ theme }) => theme.colors.semantic.primary};
  stroke-width: 2;
`;

const ModalOverlay = styled.div<{ isVisible: boolean }>`
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
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

const ModalContent = styled.div<{ isVisible: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 24px 28px;
  border-radius: ${({ theme }) => theme.radius.radius3};
  width: 500px;
  text-align: center;
  position: relative;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '20px')});
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.h4`
  width: 100%;
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  text-align: left;
`;

const Subtitle = styled.span`
  display: block;
  width: 100%;
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  text-align: left;
  color: ${({ theme }) => theme.colors.gray.gray6};
  margin-top: 4px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 24px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray.gray7};
  &:hover {
    color: ${({ theme }) => theme.colors.gray.gray9};
  }
`;

const DropZone = styled.div<{ isActive: boolean }>`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 16px;
  min-height: 170px;
  border: 2px dashed
    ${({ theme, isActive }) =>
      isActive ? theme.colors.semantic.primary : theme.colors.border.border1};
  border-radius: ${({ theme }) => theme.radius.radius3};
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.green.green1 : theme.colors.background.foreground};
`;

const DropZoneText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.default};
  font-size: ${({ theme }) => theme.typography.body1Regular.fontSize};
  font-weight: 500;
`;

const DropZoneSubText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray.gray7};
  font-size: ${({ theme }) => theme.typography.body3Regular.fontSize};
`;

const HiddenInput = styled.input`
  display: none;
`;

interface UploadModalProps {
  onClose: () => void;
  onFileUpload: (file: File) => void;
}

const UploadModal = ({ onClose, onFileUpload }: UploadModalProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  const handleFile = useCallback(
    (file: File | null) => {
      if (!file) return;

      if (file.type !== 'application/pdf') {
        alert('PDF 파일만 업로드할 수 있습니다.');
        if (inputRef.current) inputRef.current.value = '';
        return;
      }

      const maxSizeBytes = MAX_FILE_SIZE_MB * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        alert(`파일 크기는 ${MAX_FILE_SIZE_MB}MB 이하만 업로드할 수 있습니다.`);
        if (inputRef.current) inputRef.current.value = '';
        return;
      }

      onFileUpload(file);
      handleClose();
      if (inputRef.current) inputRef.current.value = '';
    },
    [onFileUpload, handleClose],
  );

  const { isDragging, handleDragIn, handleDragOut, handleDragOver, handleDrop } = useDragAndDrop({
    onDropFile: handleFile,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFile(file);
  };

  const handleZoneClick = () => {
    inputRef.current?.click();
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return (
    <ModalOverlay isVisible={isVisible} onClick={handleClose}>
      <ModalContent isVisible={isVisible} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        <TitleBox>
          <Title>PDF 파일 업로드</Title>
          <Subtitle>문제 생성에 사용할 PDF 파일을 업로드하세요</Subtitle>
        </TitleBox>
        <Spacer height={'16px'} />
        <DropZone
          onClick={handleZoneClick}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          isActive={isDragging || isHovering}
        >
          <IconWrapper>
            <StyledCloudUpload size={25} />
          </IconWrapper>
          <DropZoneText>파일을 여기로 드래그하거나 클릭하세요</DropZoneText>
          <DropZoneSubText>PDF 파일만 지원 · 최대 1개 · 최대 {MAX_FILE_SIZE_MB}MB</DropZoneSubText>
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
