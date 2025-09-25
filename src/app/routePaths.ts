export const ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
  LOGIN_SUCCESS: '/login-success', // 카카오 로그인 성공 리다이렉트
  DASHBOARD: '/dashboard',
  SOURCE: '/source',
  CREATE: '/create',
  SOLVE: '/solve/:questionSetId',
  LIBRARY: '/library',
  WRONG: '/wrong',
  TEST_CORS: '/test/cors',
} as const;
