// 로그인 상태를 사이트 전체에서 함께 쓰기 위한 Context 입니다.
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { getCurrentUser, signInWithGoogle, signOut } from '../services/authService';
import type { Role, User } from '../services/types';

interface AuthContextValue {
  user: User | null;
  isAdmin: boolean;
  loading: boolean; // 처음 로그인 상태를 확인하는 중인지
  login: (role?: Role) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (role?: Role) => {
    setUser(await signInWithGoogle(role));
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
