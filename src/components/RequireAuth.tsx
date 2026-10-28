// 로그인하지 않은 사람이 들어오면 /login 으로 보냅니다.
// 로그인 후 원래 가려던 페이지로 돌아갈 수 있도록 주소를 함께 넘깁니다.
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ErrorMessage, Loading } from './StatusMessage';

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loading text="로그인 상태를 확인하는 중입니다…" />;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <>{children}</>;
}

// 등록·수정 페이지처럼 관리자(교수)만 들어갈 수 있는 곳에 씌웁니다.
export function RequireAdmin({ children }: { children: ReactNode }) {
  const { isAdmin } = useAuth();
  return (
    <RequireAuth>
      {isAdmin ? children : <ErrorMessage message="관리자(교수)만 접근할 수 있는 페이지입니다." />}
    </RequireAuth>
  );
}
