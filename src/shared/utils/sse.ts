import { EventSourcePolyfill, type Event } from 'event-source-polyfill';
import { getToken } from './tokenManager';
import { API_ORIGIN, joinRuntimeUrl } from '@/shared/config/runtimePaths';

const SSE_SUB_URL = joinRuntimeUrl(API_ORIGIN, '/api/notifications/subscribe');

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
      throw new Error('[SSE] 인증 토큰이 없어 SSE 연결을 생성할 수 없습니다.');
    }

    const urlWithToken = `${SSE_SUB_URL}?token=${token}`;

    this.eventSource = new EventSourcePolyfill(urlWithToken, {
      withCredentials: true,
      heartbeatTimeout: 120000,
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
