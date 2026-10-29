// 논문 등 외부 자료 링크. 로그인한 구성원만 바로 열 수 있고,
// 로그인하지 않은 방문자에게는 로그인 화면으로 안내하는 버튼으로 바뀝니다.
import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { isSafeUrl } from '../lib/url';
import { IconExternal, IconLock } from './Icons';

interface Props {
  url: string;
  children: ReactNode;
  className?: string;
}

const DEFAULT_CLASS =
  'group inline-flex max-w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700';

export function PaperLink({ url, children, className = DEFAULT_CLASS }: Props) {
  const { user } = useAuth();
  const location = useLocation();

  // http/https 가 아닌 주소는 보여주지 않습니다.
  if (!isSafeUrl(url)) return null;

  if (!user) {
    return (
      <Link
        to="/login"
        state={{ from: location.pathname }}
        className={className}
        title="로그인하면 논문 원문 링크를 열 수 있습니다"
      >
        <span className="truncate">{children}</span>
        <IconLock className="h-4 w-4 shrink-0 text-slate-400" />
      </Link>
    );
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
      <span className="truncate">{children}</span>
      <IconExternal className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-brand-500" />
    </a>
  );
}
