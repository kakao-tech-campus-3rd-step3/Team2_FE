// 토큰 관리 클로저 (메모리에서 토큰 관리)
const createTokenManager = () => {
  let accessToken: string | null = null;
  return {
    getToken: () => accessToken,
    setToken: (token: string) => {
      console.log('[토큰 관리자] 액세스 토큰이 메모리에 저장되었습니다.');
      accessToken = token;
    },
    clearToken: () => {
      console.log('[토큰 관리자] 액세스 토큰이 메모리에서 삭제되었습니다.');
      accessToken = null;
    },
  };
};

const { getToken, setToken, clearToken } = createTokenManager();

export { getToken, setToken, clearToken };
