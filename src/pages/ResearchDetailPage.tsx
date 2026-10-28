import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { deleteResearch, getResearch } from '../services/researchService';
import type { Research } from '../services/types';
import { formatDate } from '../lib/format';
import { LinkList } from '../components/LinkList';
import { CommentSection } from '../components/CommentSection';
import { EmptyState, ErrorMessage, Loading, toMessage } from '../components/StatusMessage';

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
      <EmptyState>
        <p className="mb-3">자료를 찾을 수 없습니다.</p>
        <Link to="/research" className="btn-secondary">목록으로</Link>
      </EmptyState>
    );
  }

  return (
    <div className="space-y-6">
      <Link to="/research" className="text-sm text-blue-700 hover:underline">← 연구 자료 목록</Link>

      <article className="card space-y-4">
        <div>
          <h1 className="text-2xl font-bold break-words">{item.title}</h1>
          <p className="mt-1 text-sm text-slate-500">{item.authorName} · {formatDate(item.createdAt)}</p>
        </div>
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">#{tag}</span>
            ))}
          </div>
        )}
        {/* whitespace-pre-wrap: 입력한 줄바꿈을 그대로 보여주기 위함 */}
        <p className="whitespace-pre-wrap break-words leading-relaxed text-slate-700">{item.summary}</p>
        <LinkList links={item.links} />

        {isAdmin && (
          <div className="flex gap-2 border-t border-slate-100 pt-4">
            <Link to={`/research/${item.id}/edit`} className="btn-secondary">수정</Link>
            <button onClick={handleDelete} className="btn-danger">삭제</button>
          </div>
        )}
      </article>

      <CommentSection researchId={item.id} />
    </div>
  );
}
