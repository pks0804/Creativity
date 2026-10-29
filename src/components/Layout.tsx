import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LAB_INTRO, SITE_NAME } from '../lib/siteConfig';
import { Avatar } from './Avatar';
import { IconCapsule, IconClose, IconMail, IconMenu, IconPhone, IconPin } from './Icons';
import { CONTACT, LAB } from '../content/labInfo';

// 상단 메뉴. 모두 누구나 볼 수 있고, 논문 원문 링크는 로그인해야 열립니다.
const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/areas', label: 'Research', end: false },
  { to: '/publications', label: 'Publications', end: false },
  { to: '/people', label: 'People', end: false },
  { to: '/gallery', label: 'Group Photo', end: false },
  { to: '/join', label: 'Join Us', end: false },
  { to: '/papers', label: 'Recent Papers', end: false },
];

const desktopNavClass = ({ isActive }: { isActive: boolean }) =>
  `whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium transition xl:px-3 ${
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
          <nav className="hidden items-center gap-0.5 lg:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={desktopNavClass}>
                {item.label}
              </NavLink>
            ))}
            <span className="mx-1.5 h-6 w-px bg-slate-200" />
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2" title={user.name}>
                  <Avatar name={user.name} size="sm" />
                  <div className="hidden leading-tight xl:block">
                    <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                    <p className="text-[11px] text-slate-500">{user.role === 'admin' ? '교수 · 관리자' : '대학원생'}</p>
                  </div>
                </div>
                <button onClick={handleLogout} className="btn-secondary px-3 py-1.5 text-xs">Logout</button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary whitespace-nowrap py-2">Login</Link>
            )}
          </nav>

          {/* 모바일용 메뉴 버튼 */}
          <button
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
          </button>
        </div>

        {menuOpen && (
          <nav className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-slate-100 bg-white px-4 pb-4 pt-2 lg:hidden">
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
                  <button onClick={handleLogout} className="btn-secondary px-3 py-1.5 text-xs">Logout</button>
                </div>
              ) : (
                <Link to="/login" className="btn-primary w-full">Login</Link>
              )}
            </div>
          </nav>
        )}
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <Outlet />
      </main>

      <footer className="mt-10 bg-brand-950 text-brand-100">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="text-lg font-bold text-white">{LAB.shortName}</p>
              <p className="text-sm text-brand-300">{LAB.fullName}</p>
              <p className="mt-1 text-sm text-brand-300">{LAB.college}, {LAB.university}</p>
            </div>
            <ul className="space-y-2 text-sm text-brand-200">
              <li className="font-semibold text-white">{CONTACT.piName}</li>
              <li className="flex items-start gap-2"><IconMail className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" /><a href={`mailto:${CONTACT.email}`} className="hover:text-white">{CONTACT.email}</a></li>
              <li className="flex items-start gap-2"><IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />Office: {CONTACT.office}</li>
              <li className="flex items-start gap-2"><IconPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />{CONTACT.address}</li>
            </ul>
          </div>
          <p className="mt-8 border-t border-white/10 pt-6 text-xs text-brand-400">© {new Date().getFullYear()} {LAB_INTRO.title}</p>
        </div>
      </footer>
    </div>
  );
}
