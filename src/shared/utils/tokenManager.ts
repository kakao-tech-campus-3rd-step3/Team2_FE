// 토큰 관리 클로저 (메모리에서 토큰 관리)
const createTokenManager = () => {
  let accessToken: string | null = null;
  return {
    getToken: () => accessToken,
    setToken: (token: string) => {
      accessToken = token;
    },
    clearToken: () => {
      accessToken = null;
    },
  };
};

const { getToken, setToken, clearToken } = createTokenManager();

export { getToken, setToken, clearToken };
