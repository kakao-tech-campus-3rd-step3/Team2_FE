import { api } from '@/shared/api/axiosClient';

interface UploadResponse {
  id: string;
  name: string;
  size: string;
  pages: string;
  date: string;
}

/**
 * S3 Pre-signed URL 방식으로 PDF 업로드 처리
 */
export const uploadPdfFile = async (file: File): Promise<UploadResponse> => {
  if (file.type !== 'application/pdf') {
    throw new Error('PDF 파일만 업로드 가능합니다.');
  }

  const metadata = {
    fileName: file.name,
    fileSize: file.size,
    contentType: file.type,
  };

  try {
    // 프리사인드 URL 요청 (baseURL + /learning/source/upload)
    const { data: presignData } = await api.post('/learning/source/upload', metadata);

    const { uploadUrl, fileId } = presignData;

    if (!uploadUrl || !fileId) {
      throw new Error('프리사인드 URL 발급 실패: 서버 응답 없음');
    }

    // S3 업로드는 외부 URL로 요청하므로 기본 axios를 사용 (또는 fetch)
    await api.put(uploadUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
    // 업로드 완료 알림
    await api.post('/learning/source/upload-complete', { fileId });

    return {
      id: fileId,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      pages: '??p',
      date: new Date().toISOString().split('T')[0].replace(/-/g, '. '),
    };
  } catch (error: any) {
    console.error('업로드 실패:', error);
    throw error;
  }
};
