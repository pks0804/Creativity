import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { IS_TEST_LOGIN } from '../services/authService';
import type { Role } from '../services/types';
import { ErrorMessage, toMessage } from '../components/StatusMessage';

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  // 로그인 전에 가려던 페이지가 있으면 그쪽으로 돌려보냅니다.
  const from = (location.state as { from?: string } | null)?.from ?? '/research';

  const handleLogin = async (role: Role) => {
    setBusy(true);
    setError('');
    try {
      await login(role);
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
        <p className="mb-4">{user.name} 님으로 로그인되어 있습니다.</p>
        <Link to="/research" className="btn-primary">연구 자료 보러 가기</Link>
      </div>
    );
  }

  return (
    <div className="card mx-auto max-w-md space-y-4 text-center">
      <h1 className="text-xl font-bold">로그인</h1>
      <p className="text-sm text-slate-600">연구실 구성원만 자료를 볼 수 있습니다.</p>
      {IS_TEST_LOGIN && (
        <p className="rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800">
          현재는 테스트용 로그인입니다. 버튼을 누르면 "테스트 교수"로 로그인됩니다.
        </p>
      )}
      {error && <ErrorMessage message={error} />}
      <button
        onClick={() => handleLogin('admin')}
        disabled={busy}
        className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-3 font-medium hover:bg-slate-50 disabled:opacity-50"
      >
        <span className="text-lg font-bold text-blue-600">G</span>
        Google로 로그인
      </button>
      {IS_TEST_LOGIN && (
        <button
          onClick={() => handleLogin('member')}
          disabled={busy}
          className="text-xs text-slate-500 underline"
        >
          (테스트) 대학원생 권한으로 로그인해 보기
        </button>
      )}
    </div>
  );
}
