// 로그인 상태를 사이트 전체에서 함께 쓰기 위한 Context 입니다.
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { signInWithGoogle, signOut, subscribeAuth } from '../services/authService';
import type { User } from '../services/types';

interface AuthContextValue {
  user: User | null;
  isAdmin: boolean;
  loading: boolean; // 처음 로그인 상태를 확인하는 중인지
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 새로고침하거나 다른 탭에서 로그아웃해도 로그인 상태가 자동으로 맞춰지도록 구독합니다.
  useEffect(
    () =>
      subscribeAuth((nextUser) => {
        setUser(nextUser);
        setLoading(false);
      }),
    [],
  );

  const login = useCallback(async () => {
    setUser(await signInWithGoogle());
  }, []);

  const logout = useCallback(async () => {
    await signOut();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin: user?.role === 'admin', loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth 는 AuthProvider 안에서만 사용할 수 있습니다.');
  return value;
}
