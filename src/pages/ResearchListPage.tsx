import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { listResearch } from '../services/researchService';
import type { Research } from '../services/types';
import { formatDate } from '../lib/format';
import { EmptyState, ErrorMessage, Loading, toMessage } from '../components/StatusMessage';

export default function ResearchListPage() {
  const { isAdmin } = useAuth();
  const [items, setItems] = useState<Research[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [keyword, setKeyword] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    listResearch()
      .then(setItems)
      .catch((e: unknown) => setError(toMessage(e)))
      .finally(() => setLoading(false));
  }, []);

  // 모든 자료에 쓰인 태그를 모아 필터 버튼으로 보여줍니다.
  const allTags = useMemo(
    () => Array.from(new Set(items.flatMap((item) => item.tags))).sort(),
    [items],
  );

  const filtered = items.filter((item) => {
    const matchTag = selectedTag === '' || item.tags.includes(selectedTag);
    const matchKeyword = item.title.toLowerCase().includes(keyword.trim().toLowerCase());
    return matchTag && matchKeyword;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-bold">연구 자료</h1>
        {isAdmin && <Link to="/research/new" className="btn-primary">+ 연구 자료 등록</Link>}
      </div>

      <input
        className="input"
        placeholder="제목으로 검색"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {['', ...allTags].map((tag) => (
            <button
              key={tag || '__all'}
              onClick={() => setSelectedTag(tag)}
              className={`rounded-full px-3 py-1 text-xs ${
                selectedTag === tag ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              {tag === '' ? '전체' : `#${tag}`}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : filtered.length === 0 ? (
        <EmptyState>{items.length === 0 ? '아직 등록된 연구 자료가 없습니다.' : '조건에 맞는 자료가 없습니다.'}</EmptyState>
      ) : (
        <ul className="space-y-3">
          {filtered.map((item) => (
            <li key={item.id}>
              <Link to={`/research/${item.id}`} className="card block hover:border-blue-300">
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1 line-clamp-2 text-sm text-slate-600">{item.summary}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-2 py-0.5">#{tag}</span>
                  ))}
                  <span>{item.authorName} · {formatDate(item.createdAt)}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
