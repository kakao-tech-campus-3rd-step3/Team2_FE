import { createContext } from 'react';

export interface UserInfo {
  id: string;
  name: string;
  // TODO: Add other user properties
}

export interface AuthContext {
  userInfo: UserInfo | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
}

export const AuthContext = createContext<AuthContext | undefined>(undefined);
