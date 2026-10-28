// 연구 자료 상세 페이지 아래의 토론(댓글) 영역
import { useCallback, useEffect, useState, type FormEvent } from 'react';
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
import { EmptyState, ErrorMessage, Loading, toMessage } from './StatusMessage';

export function CommentSection({ researchId }: { researchId: string }) {
  const { user } = useAuth();
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

  useEffect(() => {
    load();
  }, [load]);

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
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">토론 ({comments.length})</h2>

      {error && <ErrorMessage message={error} />}

      {loading ? (
        <Loading />
      ) : comments.length === 0 ? (
        <EmptyState>아직 댓글이 없습니다. 첫 의견을 남겨 주세요.</EmptyState>
      ) : (
        <ul className="space-y-3">
          {comments.map((comment) => (
            <li key={comment.id} className="card">
              <div className="mb-1 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span>
                  <strong className="text-slate-700">{comment.authorName}</strong> · {formatDateTime(comment.createdAt)}
                </span>
                {canDeleteComment(user, comment) && (
                  <button onClick={() => handleDelete(comment.id)} className="text-red-600 hover:underline">
                    삭제
                  </button>
                )}
              </div>
              <p className="whitespace-pre-wrap break-words text-sm">{comment.text}</p>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="card space-y-2">
        <label htmlFor="comment" className="label">댓글 작성</label>
        <textarea
          id="comment"
          rows={3}
          maxLength={MAX_COMMENT_LENGTH}
          className="input"
          placeholder="의견이나 질문을 남겨 주세요."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn-primary" disabled={saving || text.trim() === ''}>
          {saving ? '등록 중…' : '댓글 등록'}
        </button>
      </form>
    </section>
  );
}
