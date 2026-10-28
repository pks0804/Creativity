import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { deleteResearch, getResearch } from '../services/researchService';
import type { Research } from '../services/types';
import { formatDate } from '../lib/format';
import { LinkList } from '../components/LinkList';
import { CommentSection } from '../components/CommentSection';
import { Avatar } from '../components/Avatar';
import { EmptyState, ErrorMessage, Loading, toMessage } from '../components/StatusMessage';
import { IconArrowLeft, IconEdit, IconFlask, IconTrash } from '../components/Icons';

export default function ResearchDetailPage() {
  const { id = '' } = useParams();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [item, setItem] = useState<Research | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getResearch(id)
      .then(setItem)
      .catch((e: unknown) => setError(toMessage(e)))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('이 연구 자료와 달린 댓글을 모두 삭제할까요?')) return;
    try {
      await deleteResearch(id);
      navigate('/research');
    } catch (e) {
      setError(toMessage(e));
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!item) {
    return (
      <EmptyState icon={<IconFlask />}>
        <p className="mb-4">자료를 찾을 수 없습니다.</p>
        <Link to="/research" className="btn-secondary">목록으로</Link>
      </EmptyState>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <Link to="/research" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-brand-700">
        <IconArrowLeft className="h-4 w-4" /> 연구 자료 목록
      </Link>

      <article className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
        <div className="h-2 bg-gradient-to-r from-brand-400 via-brand-600 to-brand-800" />
        <div className="space-y-6 p-6 sm:p-10">
          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span key={tag} className="tag">#{tag}</span>
              ))}
            </div>
          )}
          <h1 className="break-words text-2xl font-bold leading-snug tracking-tight text-slate-900 sm:text-3xl">{item.title}</h1>
          <div className="flex items-center gap-3">
            <Avatar name={item.authorName} />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-slate-800">{item.authorName}</p>
              <p className="text-xs text-slate-400">{formatDate(item.createdAt)}</p>
            </div>
          </div>

          {/* whitespace-pre-wrap: 입력한 줄바꿈을 그대로 보여주기 위함 */}
          <p className="whitespace-pre-wrap break-words border-t border-slate-100 pt-6 text-[15px] leading-8 text-slate-700">
            {item.summary || '요약이 없습니다.'}
          </p>

          {item.links.length > 0 && (
            <div className="rounded-2xl bg-slate-50 p-4 sm:p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">관련 링크</p>
              <LinkList links={item.links} />
            </div>
          )}

          {isAdmin && (
            <div className="flex gap-2 border-t border-slate-100 pt-6">
              <Link to={`/research/${item.id}/edit`} className="btn-secondary"><IconEdit className="h-4 w-4" /> 수정</Link>
              <button onClick={handleDelete} className="btn-danger"><IconTrash className="h-4 w-4" /> 삭제</button>
            </div>
          )}
        </div>
      </article>

      <CommentSection researchId={item.id} />
    </div>
  );
}
