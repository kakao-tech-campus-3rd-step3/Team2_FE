import { createContext } from 'react';

export interface UserInfo {
  id: string;
  name: string;
}

export interface AuthContext {
  userInfo: UserInfo | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
}

export const AuthContext = createContext<AuthContext | undefined>(undefined);
