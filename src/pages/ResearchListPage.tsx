import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { listResearch } from '../services/researchService';
import type { Research } from '../services/types';
import { formatDate } from '../lib/format';
import { PageHeader } from '../components/PageHeader';
import { EmptyState, ErrorMessage, Loading, toMessage } from '../components/StatusMessage';
import { IconFlask, IconLink, IconPlus, IconSearch } from '../components/Icons';

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
    <div>
      <PageHeader
        icon={<IconFlask className="h-6 w-6" />}
        title="연구 자료"
        description="연구실의 논문 정리·실험 아이디어·발표 자료를 모아 둔 곳입니다."
        action={isAdmin && (
          <Link to="/research/new" className="btn-primary self-start sm:self-auto">
            <IconPlus className="h-4 w-4" /> 연구 자료 등록
          </Link>
        )}
      />

      <div className="mb-6 space-y-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
        <div className="relative">
          <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            className="input pl-10"
            placeholder="제목으로 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {['', ...allTags].map((tag) => (
              <button
                key={tag || '__all'}
                onClick={() => setSelectedTag(tag)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  selectedTag === tag
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-700'
                }`}
              >
                {tag === '' ? '전체' : `#${tag}`}
              </button>
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : filtered.length === 0 ? (
        <EmptyState icon={<IconFlask />}>
          {items.length === 0 ? '아직 등록된 연구 자료가 없습니다.' : '조건에 맞는 자료가 없습니다.'}
        </EmptyState>
      ) : (
        <>
          <p className="mb-3 text-sm text-slate-500">총 <strong className="text-slate-800">{filtered.length}</strong>건</p>
          <ul className="grid gap-4 md:grid-cols-2">
            {filtered.map((item) => (
              <li key={item.id}>
                <Link to={`/research/${item.id}`} className="card card-hover flex h-full flex-col">
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span key={tag} className="tag">#{tag}</span>
                    ))}
                  </div>
                  <h2 className="text-lg font-bold leading-snug text-slate-900">{item.title}</h2>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-500">{item.summary}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-400">
                    <span>{item.authorName} · {formatDate(item.createdAt)}</span>
                    {item.links.length > 0 && (
                      <span className="inline-flex items-center gap-1">
                        <IconLink className="h-3.5 w-3.5" /> {item.links.length}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
