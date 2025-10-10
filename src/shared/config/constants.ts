// 메뉴 상수
export const MENUS = {
  DASHBOARD: '대시보드',
  SOURCE: '학습소스 관리',
  CREATE: '문제집 생성',
  LIBRARY: '나의 문제집',
  WRONG: '오답노트',
} as const;

// 메뉴 상수 타입
export type Menu = (typeof MENUS)[keyof typeof MENUS];

// 레이아웃 상수
export const MIN_WIDTH = '1260px';
export const MIN_HEIGHT = '640px';
