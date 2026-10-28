import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { IS_TEST_LOGIN } from '../services/authService';
import { FOOTER_NOTICE, SITE_NAME } from '../lib/siteConfig';

const navClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3 py-1.5 text-sm ${isActive ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'}`;

export function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-2 px-4 py-3">
          <NavLink to="/" className="font-bold text-blue-700">
            {SITE_NAME}
          </NavLink>
          <nav className="flex flex-wrap items-center gap-1">
            <NavLink to="/" end className={navClass}>홈</NavLink>
            <NavLink to="/research" className={navClass}>연구 자료</NavLink>
            <NavLink to="/lectures" className={navClass}>수업 자료</NavLink>
            {user ? (
              <button onClick={handleLogout} className="rounded-md px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100">
                로그아웃
              </button>
            ) : (
              <NavLink to="/login" className={navClass}>로그인</NavLink>
            )}
          </nav>
        </div>
        {user && (
          <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-2 px-4 pb-2 text-xs text-slate-600">
            <span>
              {user.name} ({user.role === 'admin' ? '교수·관리자' : '대학원생'})
            </span>
            {IS_TEST_LOGIN && (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 font-medium text-amber-800">
                현재는 테스트용 로그인입니다
              </span>
            )}
          </div>
        )}
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <p className="mx-auto max-w-4xl px-4 py-4 text-center text-sm text-red-700">
          ⚠️ {FOOTER_NOTICE}
        </p>
      </footer>
    </div>
  );
}
