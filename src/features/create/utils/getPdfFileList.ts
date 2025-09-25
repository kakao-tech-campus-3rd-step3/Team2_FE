import api from '@/shared/api/axiosClient';
import type { FileData } from '@/features/create/types/types';

interface ServerPdfFile {
  id: number;
  originalName: string;
  sourceFolderName: string;
  status: string;
  questionSetCount: number;
  pageCount: number | null;
  fileSizeBytes: number;
  createdAt: string;
  recentQuestionGeneratedAt: string | null;
}

const formatBytes = (bytes: number): string => {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(2)} MB`;
};

export const getPdfFileList = async (): Promise<FileData[]> => {
  const response = await api.get<ServerPdfFile[]>('/learning/source');
  const serverData = response.data;

  return serverData.map((file) => ({
    id: String(file.id),
    name: file.originalName,
    size: formatBytes(file.fileSizeBytes),
    date: file.createdAt,
  }));
};
