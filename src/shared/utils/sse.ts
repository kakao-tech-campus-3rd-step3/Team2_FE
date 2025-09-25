import { EventSourcePolyfill } from 'event-source-polyfill';
import { getToken } from './tokenManager';

const SSE_SUB_URL = '/api/notifications/subscribe';

interface onQuestionSetCreationCompletePayload {
  success: boolean;
  questionSetId: number;
  message: string;
}
interface NotificationCallbacks {
  onOpen?: () => void;
  onHandShake?: () => void; // TODO: backend 수정 후 payload 타입 정의
  onQuestionSetCreationComplete?: (payload: onQuestionSetCreationCompletePayload) => void;
}

const EVENT_NAME = {
  OPEN: 'open',
  HANDSHAKE: 'handShakeComplete',
  QUESTION_SET_CREATION_COMPLETE: 'questionSetCreationComplete',
} as const;

export function createEventSource(callback: NotificationCallbacks) {
  const {
    onOpen,
    onHandShake,
    onQuestionSetCreationComplete: onQuestionCreationComplete,
  } = callback;

  const token = getToken();
  if (!token) {
    console.error('SSE 연결 실패: 인증 토큰이 없습니다.');
    // 필요하다면 여기서 연결을 시도하지 않고 바로 반환할 수 있습니다.
    // return null;
  }

  const eventSource = new EventSourcePolyfill(SSE_SUB_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  if (onOpen) {
    eventSource.addEventListener(EVENT_NAME.OPEN, () => {
      onOpen();
    });
  }

  if (onHandShake) {
    eventSource.addEventListener(EVENT_NAME.HANDSHAKE, () => {
      onHandShake();
    });
  }

  if (onQuestionCreationComplete) {
    eventSource.addEventListener(EVENT_NAME.QUESTION_SET_CREATION_COMPLETE, (v) => {
      const data: onQuestionSetCreationCompletePayload = JSON.parse((v as MessageEvent).data); // d.ts에 custom event 정의 없어서 임의로 캐스팅
      onQuestionCreationComplete(data);
    });
  }

  return eventSource;
}
