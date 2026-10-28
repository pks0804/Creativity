import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FOOTER_NOTICE, LAB_INTRO, SITE_NAME } from '../lib/siteConfig';
import { Avatar } from './Avatar';
import { IconAlert, IconCapsule, IconClose, IconMenu } from './Icons';

const NAV_ITEMS = [
  { to: '/', label: '홈', end: true },
  { to: '/research', label: '연구 자료', end: false },
  { to: '/lectures', label: '수업 자료', end: false },
];

const desktopNavClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3.5 py-2 text-sm font-medium transition ${
    isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`;

const mobileNavClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-xl px-4 py-3 text-base font-medium ${
    isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-50'
  }`;

export function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // 페이지를 옮기면 모바일 메뉴를 닫고 화면 맨 위로 올립니다.
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-md shadow-brand-900/20">
              <IconCapsule className="h-5 w-5" />
            </span>
            <span className="truncate text-base font-bold tracking-tight text-slate-900">{SITE_NAME}</span>
          </Link>

          {/* 넓은 화면용 메뉴 */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={desktopNavClass}>
                {item.label}
              </NavLink>
            ))}
            <span className="mx-2 h-6 w-px bg-slate-200" />
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Avatar name={user.name} size="sm" />
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                    <p className="text-[11px] text-slate-500">{user.role === 'admin' ? '교수 · 관리자' : '대학원생'}</p>
                  </div>
                </div>
                <button onClick={handleLogout} className="btn-secondary px-3 py-1.5 text-xs">로그아웃</button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary py-2">로그인</Link>
            )}
          </nav>

          {/* 모바일용 메뉴 버튼 */}
          <button
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-slate-100 bg-white px-4 pb-4 pt-2 md:hidden">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={mobileNavClass}>
                {item.label}
              </NavLink>
            ))}
            <div className="mt-2 border-t border-slate-100 pt-3">
              {user ? (
                <div className="flex items-center justify-between gap-3 px-2">
                  <div className="flex items-center gap-2">
                    <Avatar name={user.name} size="sm" />
                    <span className="text-sm font-semibold">{user.name}</span>
                    <span className="text-xs text-slate-500">{user.role === 'admin' ? '교수' : '대학원생'}</span>
                  </div>
                  <button onClick={handleLogout} className="btn-secondary px-3 py-1.5 text-xs">로그아웃</button>
                </div>
              ) : (
                <Link to="/login" className="btn-primary w-full">로그인</Link>
              )}
            </div>
          </nav>
        )}
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <Outlet />
      </main>

      <footer className="mt-10 bg-brand-950 text-brand-100">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
            <IconAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
            <p>{FOOTER_NOTICE}</p>
          </div>
          <div className="mt-6 flex flex-col gap-1 text-xs text-brand-300 sm:flex-row sm:justify-between">
            <span>{LAB_INTRO.title}</span>
            <span>© {new Date().getFullYear()} {SITE_NAME}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
