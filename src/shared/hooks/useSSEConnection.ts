import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationSse } from '@/shared/utils/sse';
import { showToast } from '../utils/toast';
import { useAuth } from '@/app/auth/useAuth';

export const useSSEConnection = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const esRef = useRef<NotificationSse | null>(null);
  const [questionSetReady, setQuestionSetReady] = useState<boolean>(false);
  const [questionSetId, setQuestionSetId] = useState<number>(0);

  useEffect(() => {
    // 1. 인증되지 않았으면 아무것도 하지 않고, 기존 연결이 있다면 정리한다.
    if (!isAuthenticated) {
      if (esRef.current) {
        esRef.current.close();
        esRef.current = null;
      }
      return;
    }

    // 2. 이미 연결이 존재하면 중복 생성을 방지한다.
    if (esRef.current) {
      return;
    }

    // SSE 타임아웃 에러 메시지를 필터링하기 위한 console.error 오버라이드
    const originalError = console.error;
    console.error = (...args: unknown[]) => {
      const message = args[0]?.toString() || '';
      // SSE 타임아웃 관련 에러는 무시
      if (message.includes('No activity within') || message.includes('[SSE] 에러 발생')) {
        return;
      }
      originalError.apply(console, args);
    };

    const es = new NotificationSse();
    esRef.current = es;

    // onOpen, onHandShake는 로그용이므로 생략
    es.onError((e) => {
      const errorEvent = e as ErrorEvent;
      // 타임아웃으로 인한 자동 재연결은 정상 동작이므로 로그 출력 안 함
      if (errorEvent.message && errorEvent.message.includes('No activity within')) {
        // 재연결은 라이브러리가 자동으로 처리하므로 아무것도 안 함
        return;
      }
      // 실제 에러만 콘솔에 표시 (오버라이드된 console.error 사용)
      //   originalError('[SSE] 에러 발생:', e);
    });

    es.onQuestionCreationComplete((payload) => {
      if (payload.success) {
        setQuestionSetReady(true); // 문제집 생성 완료 상태 변경
        setQuestionSetId(payload.questionSetId); // 만들어진 문제집 id 상태 변경
        showToast(payload.message, {
          onClick: () => {
            navigate(`/solve/${payload.questionSetId}`);
          },
        });
      } else {
        showToast(payload.message || '문제집 생성에 실패했습니다.');
      }
    });

    // 컴포넌트 언마운트 시 SSE 연결 정리 및 console.error 복원
    return () => {
      es.close();
      console.error = originalError; // console.error 원래대로 복원
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const closeConnection = () => {
    if (esRef.current) {
      esRef.current.close();
    }
  };

  return {
    questionSetReady,
    questionSetId,
    setQuestionSetReady,
    setQuestionSetId,
    closeConnection,
  };
};
