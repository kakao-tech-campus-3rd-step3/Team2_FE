import api from '@/shared/api/axiosClient';

export const deletePdfFile = async (fileId: string): Promise<void> => {
  const API_URL = `/learning/source/${fileId}`;

  await api.delete(API_URL);
};
