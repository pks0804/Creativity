// 연구 자료 상세 페이지 아래의 토론(댓글) 영역
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  MAX_COMMENT_LENGTH,
  canDeleteComment,
  createComment,
  deleteComment,
  listComments,
} from '../services/commentService';
import type { Comment } from '../services/types';
import { formatDateTime } from '../lib/format';
import { Avatar } from './Avatar';
import { EmptyState, ErrorMessage, Loading, toMessage } from './StatusMessage';
import { IconChat, IconLock } from './Icons';

export function CommentSection({ researchId }: { researchId: string }) {
  const { user } = useAuth();
  const location = useLocation();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [text, setText] = useState('');
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      setComments(await listComments(researchId));
    } catch (e) {
      setError(toMessage(e));
    } finally {
      setLoading(false);
    }
  }, [researchId]);

  // 토론 내용은 연구실 구성원 전용이라 로그인했을 때만 불러옵니다.
  useEffect(() => {
    if (user) load();
  }, [load, user]);

  if (!user) {
    return (
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900">
          <IconChat className="h-5 w-5 text-brand-600" />
          토론
        </h2>
        <EmptyState icon={<IconLock />}>
          <p className="mb-4">토론은 연구실 구성원 전용입니다. 로그인하면 댓글을 보고 남길 수 있습니다.</p>
          <Link to="/login" state={{ from: location.pathname }} className="btn-primary">로그인하기</Link>
        </EmptyState>
      </section>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (text.trim() === '') return;
    setSaving(true);
    setError('');
    try {
      await createComment(researchId, text);
      setText('');
      await load();
    } catch (err) {
      setError(toMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('이 댓글을 삭제할까요?')) return;
    try {
      await deleteComment(id);
      await load();
    } catch (err) {
      setError(toMessage(err));
    }
  };

  return (
    <section className="space-y-5">
      <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900">
        <IconChat className="h-5 w-5 text-brand-600" />
        토론
        <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-sm font-semibold text-brand-700">{comments.length}</span>
      </h2>

      {error && <ErrorMessage message={error} />}

      {loading ? (
        <Loading />
      ) : comments.length === 0 ? (
        <EmptyState icon={<IconChat />}>아직 댓글이 없습니다. 첫 의견을 남겨 주세요.</EmptyState>
      ) : (
        <ul className="space-y-3">
          {comments.map((comment) => (
            <li key={comment.id} className="flex gap-3">
              <Avatar name={comment.authorName} />
              <div className="min-w-0 flex-1 rounded-2xl rounded-tl-sm border border-slate-200/80 bg-white px-4 py-3 shadow-sm">
                <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm">
                    <strong className="text-slate-800">{comment.authorName}</strong>
                    <span className="ml-2 text-xs text-slate-400">{formatDateTime(comment.createdAt)}</span>
                  </p>
                  {canDeleteComment(user, comment) && (
                    <button onClick={() => handleDelete(comment.id)} className="text-xs text-slate-400 hover:text-red-600">
                      삭제
                    </button>
                  )}
                </div>
                <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-700">{comment.text}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="flex gap-3">
        {user && <Avatar name={user.name} />}
        <div className="flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition focus-within:border-brand-400 focus-within:ring-4 focus-within:ring-brand-100">
          <label htmlFor="comment" className="sr-only">댓글 작성</label>
          <textarea
            id="comment"
            rows={3}
            maxLength={MAX_COMMENT_LENGTH}
            className="block w-full resize-none border-0 px-4 py-3 text-sm focus:outline-none"
            placeholder="의견이나 질문을 남겨 주세요."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/60 px-3 py-2">
            <span className="text-xs text-slate-400">{text.length} / {MAX_COMMENT_LENGTH}</span>
            <button type="submit" className="btn-primary px-4 py-2" disabled={saving || text.trim() === ''}>
              {saving ? '등록 중…' : '댓글 등록'}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
