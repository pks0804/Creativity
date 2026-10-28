import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { deleteLecture, listLectures } from '../services/lectureService';
import type { Lecture } from '../services/types';
import { formatDate } from '../lib/format';
import { LinkList } from '../components/LinkList';
import { EmptyState, ErrorMessage, Loading, toMessage } from '../components/StatusMessage';

export default function LectureListPage() {
  const { isAdmin } = useAuth();
  const [items, setItems] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    listLectures()
      .then(setItems)
      .catch((e: unknown) => setError(toMessage(e)))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('이 수업 자료를 삭제할까요?')) return;
    try {
      await deleteLecture(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (e) {
      setError(toMessage(e));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-bold">수업 자료</h1>
        {isAdmin && <Link to="/lectures/new" className="btn-primary">+ 수업 자료 등록</Link>}
      </div>

      {error && <ErrorMessage message={error} />}

      {loading ? (
        <Loading />
      ) : items.length === 0 ? (
        <EmptyState>아직 등록된 수업 자료가 없습니다.</EmptyState>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id} className="card space-y-2">
              <div>
                <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">{item.course}</span>
                <p className="mt-1 font-semibold break-words">{item.title}</p>
                <p className="text-xs text-slate-500">{item.authorName} · {formatDate(item.createdAt)}</p>
              </div>
              <LinkList links={item.links} />
              {isAdmin && (
                <div className="flex gap-2">
                  <Link to={`/lectures/${item.id}/edit`} className="btn-secondary">수정</Link>
                  <button onClick={() => handleDelete(item.id)} className="btn-danger">삭제</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
