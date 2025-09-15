import { EventSourcePolyfill } from 'event-source-polyfill';

// TODO: 환경변수로 관리
const SSE_SUB_URL = 'notification/sub';
const BASE_URL = 'http://local.pull.it.kr:8080';

interface NotificationCallbacks {
  onOpen?: () => void;
  onHandShake?: () => void; // TODO: backend 수정 후 payload 타입 정의
  onQuestionSetCreationComplete?: (payload: onQuestionSetCreationCompletePayload) => void;
}

interface onQuestionSetCreationCompletePayload {
  success: boolean;
  questionSetId: number;
  message: string;
}

const EVENT_NAME = {
  HANDSHAKE: 'handShakeComplete',
  QUESTION_SET_CREATION_COMPLETE: 'questionSetCreationComplete',
} as const;

export function createEventSource(token: string, callback: NotificationCallbacks) {
  const {
    onOpen,
    onHandShake,
    onQuestionSetCreationComplete: onQuestionCreationComplete,
  } = callback;

  const eventSource = new EventSourcePolyfill(`${BASE_URL}/${SSE_SUB_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  if (onOpen) {
    eventSource.addEventListener('open', () => {
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
}
