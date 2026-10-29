import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { SITE_NAME } from '../lib/siteConfig';
import { ErrorMessage, toMessage } from '../components/StatusMessage';
import { Avatar } from '../components/Avatar';
import { GoogleLogo, IconArrowRight, IconCapsule, IconLock } from '../components/Icons';

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  // 로그인 전에 가려던 페이지가 있으면 그쪽으로 돌려보냅니다.
  const from = (location.state as { from?: string } | null)?.from ?? '/research';

  const handleLogin = async () => {
    setBusy(true);
    setError('');
    try {
      await login();
      navigate(from, { replace: true });
    } catch (e) {
      setError(toMessage(e));
    } finally {
      setBusy(false);
    }
  };

  if (user) {
    return (
      <div className="card mx-auto max-w-md text-center">
        <div className="mb-4 flex justify-center"><Avatar name={user.name} /></div>
        <p className="mb-6 text-slate-700"><strong>{user.name}</strong> 님으로 로그인되어 있습니다.</p>
        <Link to="/research" className="btn-primary">연구 자료 보러 가기 <IconArrowRight className="h-4 w-4" /></Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-900/5 md:grid md:grid-cols-2">
      {/* 왼쪽 브랜드 영역 */}
      <div className="relative hidden flex-col justify-between bg-gradient-to-br from-brand-600 to-brand-900 p-10 text-white md:flex">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
          <IconCapsule className="h-6 w-6" />
        </span>
        <div>
          <h2 className="text-2xl font-bold leading-snug">연구와 수업을<br />함께 나누는 공간</h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-100">
            홈페이지는 누구나 볼 수 있습니다. 등록된 연구실 구성원은 로그인하면 논문 원문 링크를 열고 토론에 참여할 수 있습니다.
          </p>
        </div>
      </div>

      {/* 오른쪽 로그인 영역 */}
      <div className="space-y-6 p-8 sm:p-10">
        <div>
          <div className="mb-4 inline-flex rounded-xl bg-brand-50 p-2.5 text-brand-600 md:hidden">
            <IconLock />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">로그인</h1>
          <p className="mt-1.5 text-sm text-slate-500">{SITE_NAME}에 오신 것을 환영합니다.</p>
        </div>

        {error && <ErrorMessage message={error} />}

        <button
          onClick={handleLogin}
          disabled={busy}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3.5 font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 hover:shadow active:scale-[0.99] disabled:opacity-50"
        >
          <GoogleLogo />
          {busy ? '로그인 중…' : 'Google로 로그인'}
        </button>

        <p className="text-center text-xs leading-relaxed text-slate-400">
          교수님이 등록한 구글 계정만 로그인할 수 있습니다.
        </p>

      </div>
    </div>
  );
}
