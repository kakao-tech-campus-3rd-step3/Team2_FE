import { useState, useCallback, useRef } from 'react';

type UseDragAndDropParams = {
  onDropFile: (file: File) => void;
  fileType?: string;
};

const useDragAndDrop = ({ onDropFile, fileType = 'application/pdf' }: UseDragAndDropParams) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback(
    (e: React.DragEvent) => {
      handleDrag(e);
      dragCounter.current++;
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        setIsDragging(true);
      }
    },
    [handleDrag],
  );

  const handleDragOut = useCallback(
    (e: React.DragEvent) => {
      handleDrag(e);
      dragCounter.current--;
      if (dragCounter.current === 0) {
        setIsDragging(false);
      }
    },
    [handleDrag],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      handleDrag(e);
      dragCounter.current = 0;
      setIsDragging(false);
      const files = e.dataTransfer.files;
      if (files && files.length === 1) {
        const file = files[0];
        if (file.type !== fileType) {
          alert(`${fileType.split('/')[1].toUpperCase()} 파일만 업로드할 수 있습니다.`);
          return;
        }
        onDropFile(file);
      } else {
        alert(`${fileType.split('/')[1].toUpperCase()} 파일 1개만 업로드할 수 있습니다.`);
      }
    },
    [handleDrag, onDropFile, fileType],
  );

  return {
    isDragging,
    handleDragIn,
    handleDragOut,
    handleDragOver: handleDrag,
    handleDrop,
  };
};

export default useDragAndDrop;
