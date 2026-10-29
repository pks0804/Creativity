import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { deleteLecture, importLectures, listLectures } from '../services/lectureService';
import type { Lecture } from '../services/types';
import { formatDate } from '../lib/format';
import { LinkList } from '../components/LinkList';
import { PageHeader } from '../components/PageHeader';
import { ImportPreparedCard } from '../components/ImportPreparedCard';
import { PREPARED_LECTURES } from '../data/preparedContent';
import { EmptyState, ErrorMessage, Loading, toMessage } from '../components/StatusMessage';
import { IconBook, IconEdit, IconPlus, IconTrash } from '../components/Icons';

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

  // 분류(TPD·PROTAC / 유도 근접 등)별로 묶어서 보여줍니다.
  const groups = useMemo(() => {
    const map = new Map<string, Lecture[]>();
    for (const item of items) map.set(item.course, [...(map.get(item.course) ?? []), item]);
    return Array.from(map.entries());
  }, [items]);

  const missingPrepared = PREPARED_LECTURES.filter((p) => !items.some((item) => item.title === p.title));

  const handleImport = async () => {
    await importLectures(missingPrepared);
    setItems(await listLectures());
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('이 논문을 목록에서 삭제할까요?')) return;
    try {
      await deleteLecture(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (e) {
      setError(toMessage(e));
    }
  };

  return (
    <div>
      <PageHeader
        icon={<IconBook className="h-6 w-6" />}
        title="최근 논문"
        description="표적 단백질 분해(TPD)·PROTAC·유도 근접 분야의 주목할 만한 최근 논문입니다."
        action={isAdmin && (
          <Link to="/papers/new" className="btn-primary self-start sm:self-auto">
            <IconPlus className="h-4 w-4" /> 논문 등록
          </Link>
        )}
      />

      {error && <div className="mb-4"><ErrorMessage message={error} /></div>}

      {isAdmin && !loading && !error && (
        <ImportPreparedCard
          missingCount={missingPrepared.length}
          description="TPD·PROTAC·유도 근접 분야에서 인용이 많은 고영향 논문입니다. 한 번만 누르면 됩니다."
          onImport={handleImport}
        />
      )}

      {loading ? (
        <Loading />
      ) : items.length === 0 ? (
        <EmptyState icon={<IconBook />}>아직 등록된 논문이 없습니다.</EmptyState>
      ) : (
        <div className="space-y-10">
          {groups.map(([course, lectures]) => (
            <section key={course}>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
                <span className="h-5 w-1.5 rounded-full bg-brand-500" />
                {course}
                <span className="text-sm font-medium text-slate-400">{lectures.length}</span>
              </h2>
              <ul className="grid gap-4 md:grid-cols-2">
                {lectures.map((item) => (
                  <li key={item.id} className="card flex flex-col gap-4">
                    <div>
                      <h3 className="break-words text-base font-bold text-slate-900">{item.title}</h3>
                      <p className="mt-1 text-xs text-slate-400">{item.authorName} · {formatDate(item.createdAt)}</p>
                    </div>
                    <div className="flex-1"><LinkList links={item.links} /></div>
                    {isAdmin && (
                      <div className="flex gap-2 border-t border-slate-100 pt-4">
                        <Link to={`/papers/${item.id}/edit`} className="btn-secondary px-3 py-1.5 text-xs">
                          <IconEdit className="h-3.5 w-3.5" /> 수정
                        </Link>
                        <button onClick={() => handleDelete(item.id)} className="btn-danger px-3 py-1.5 text-xs">
                          <IconTrash className="h-3.5 w-3.5" /> 삭제
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
