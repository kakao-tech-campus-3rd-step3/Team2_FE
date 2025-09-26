import { EventSourcePolyfill, type Event } from 'event-source-polyfill';
import { getToken } from './tokenManager';

const SSE_SUB_URL = '/api/notifications/subscribe';

interface onQuestionSetCreationCompletePayload {
  success: boolean;
  questionSetId: number;
  message: string;
}
type EventCallback = (v: Event) => void;

const EVENT_NAME = {
  QUESTION_SET_CREATION_COMPLETE: 'questionSetCreationComplete',
  HANDSHAKE_COMPLETE: 'handShakeComplete',
} as const;

export class NotificationSse {
  private eventSource: EventSourcePolyfill;

  constructor() {
    const token = getToken();
    if (!token) {
      console.error('SSE 연결 실패: 인증 토큰이 없습니다.');
      // 필요하다면 여기서 연결을 시도하지 않고 바로 반환할 수 있습니다.
      // return null;
    }

    this.eventSource = new EventSourcePolyfill(SSE_SUB_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  }

  onOpen(callback: EventCallback) {
    this.eventSource.addEventListener('open', callback);
  }

  onError(callback: EventCallback) {
    this.eventSource.addEventListener('error', callback);
  }

  onHandShake(callback: EventCallback) {
    this.eventSource.addEventListener(EVENT_NAME.HANDSHAKE_COMPLETE, callback);
  }

  readyState() {
    // 0 = CONNECTING, 1 = OPEN, 2 = CLOSED
    return this.eventSource.readyState;
  }

  onQuestionCreationComplete(callback: (v: onQuestionSetCreationCompletePayload) => void) {
    this.eventSource.addEventListener(EVENT_NAME.QUESTION_SET_CREATION_COMPLETE, (v) => {
      const data: onQuestionSetCreationCompletePayload = JSON.parse((v as MessageEvent).data); // d.ts에 custom event 정의 없어서 임의로 캐스팅
      callback(data);
    });
  }

  onCustom(eventName: string, callback: (v: Event) => void) {
    this.eventSource.addEventListener(eventName, callback);
  }

  removeListener(eventName: string, callback: (v: Event) => void) {
    this.eventSource.removeEventListener(eventName, callback);
  }

  close() {
    this.eventSource.close();
  }
}
