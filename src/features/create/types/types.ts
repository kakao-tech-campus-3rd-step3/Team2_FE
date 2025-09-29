export interface FileData {
  id: string;
  name: string;
  size: string;
  date: string;
}

export interface PdfFileListProps {
  fileList: FileData[];
  selectedFileId: string | null;
  onSelect: (id: string) => void;
}
