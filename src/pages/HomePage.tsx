import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { listRecentResearch } from '../services/researchService';
import type { Research } from '../services/types';
import { LAB_INTRO } from '../lib/siteConfig';
import { formatDate } from '../lib/format';
import { EmptyState, ErrorMessage, Loading, toMessage } from '../components/StatusMessage';

export default function HomePage() {
  const { user } = useAuth();
  const [items, setItems] = useState<Research[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // 자료 목록은 구성원 전용이므로(2단계 보안 규칙과 동일), 로그인했을 때만 불러옵니다.
    if (!user) return;
    setLoading(true);
    setError('');
    listRecentResearch(5)
      .then(setItems)
      .catch((e: unknown) => setError(toMessage(e)))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="space-y-8">
      <section className="card">
        <h1 className="mb-2 text-2xl font-bold">{LAB_INTRO.title}</h1>
        <p className="leading-relaxed text-slate-700">{LAB_INTRO.description}</p>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">최근 연구 자료</h2>
          {user && <Link to="/research" className="text-sm text-blue-700 hover:underline">전체 보기 →</Link>}
        </div>

        {!user ? (
          <EmptyState>
            <p className="mb-3">연구실 구성원은 로그인 후 자료를 볼 수 있습니다.</p>
            <Link to="/login" className="btn-primary">로그인하기</Link>
          </EmptyState>
        ) : loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : items.length === 0 ? (
          <EmptyState>아직 등록된 연구 자료가 없습니다.</EmptyState>
        ) : (
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id}>
                <Link to={`/research/${item.id}`} className="card block hover:border-blue-300">
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{formatDate(item.createdAt)}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
