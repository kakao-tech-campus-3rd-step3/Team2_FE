import { EventSourcePolyfill } from 'event-source-polyfill';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const SSE_SUB_URL = '/api/notifications/subscribe';
const BASIC_USER = import.meta.env.VITE_BASIC_USER;
const BASIC_PASS = import.meta.env.VITE_BASIC_PASS;

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

  const encodedCredentials = btoa(`${BASIC_USER}:${BASIC_PASS}`);

  const eventSource = new EventSourcePolyfill(`${BASE_URL}${SSE_SUB_URL}`, {
    withCredentials: true,
    headers: {
      'Authorization': `Basic ${encodedCredentials}`,
    },
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
