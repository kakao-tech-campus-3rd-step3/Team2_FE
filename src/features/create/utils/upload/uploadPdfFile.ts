import api from '@/shared/api/axiosClient';
import axios from 'axios';

interface UploadPresignResponse {
  uploadUrl: string;
  uploadId: string;
  filePath: string;
  originalName: string;
  contentType: string;
  fileSizeBytes: number;
}

interface UploadResponse {
  id: string;
  name: string;
  size: string;
  date: string;
  new: boolean;
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
    // 1단계: presigned URL 요청
    const { data: presignData }: { data: UploadPresignResponse } = await api.post(
      '/learning/source/upload',
      metadata,
    );

    const { uploadUrl, uploadId, filePath, originalName, contentType, fileSizeBytes } = presignData;

    if (!uploadUrl || !uploadId || !filePath) {
      throw new Error('프리사인드 URL 발급 실패: 필수 응답 누락');
    }

    // 2단계: S3로 파일 업로드
    await axios.put(uploadUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    });

    // 3단계: 업로드 완료 알림
    await api.post('/learning/source/upload-complete', {
      uploadId,
      filePath,
      originalName,
      contentType,
      fileSizeBytes,
    });

    return {
      id: uploadId,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      date: new Date().toISOString().split('T')[0].replace(/-/g, '. ') + '.',
      new: true,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('업로드 실패:', error.message);
      throw new Error(error.message);
    } else {
      console.error('업로드 실패: 알 수 없는 에러', error);
      throw new Error('알 수 없는 에러가 발생했습니다.');
    }
  }
};
