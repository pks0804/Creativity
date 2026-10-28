// 연구 자료의 토론 댓글 함수 모음 (localStorage 임시 구현)
import { requireAdmin, requireUser } from './authService';
import { KEYS, newId, readList, writeList } from './storage';
import type { Comment, User } from './types';

export const MAX_COMMENT_LENGTH = 2000;

// 대화 흐름대로 읽히도록 오래된 댓글이 위에 옵니다.
export async function listComments(researchId: string): Promise<Comment[]> {
  await requireUser();
  return readList<Comment>(KEYS.comments)
    .filter((comment) => comment.researchId === researchId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export async function createComment(researchId: string, text: string): Promise<Comment> {
  const user = await requireUser();
  const trimmed = text.trim();
  if (trimmed === '') throw new Error('댓글 내용을 입력해 주세요.');
  if (trimmed.length > MAX_COMMENT_LENGTH) {
    throw new Error(`댓글은 ${MAX_COMMENT_LENGTH}자까지 쓸 수 있습니다.`);
  }
  // 작성자는 항상 "현재 로그인한 본인"으로 기록합니다.
  const comment: Comment = {
    id: newId(),
    researchId,
    text: trimmed,
    authorId: user.uid,
    authorName: user.name,
    createdAt: new Date().toISOString(),
  };
  writeList(KEYS.comments, [...readList<Comment>(KEYS.comments), comment]);
  return comment;
}

// 화면에서 삭제 버튼을 보여줄지 판단할 때도 같은 규칙을 씁니다.
export function canDeleteComment(user: User | null, comment: Comment): boolean {
  if (!user) return false;
  return user.role === 'admin' || user.uid === comment.authorId;
}

export async function deleteComment(id: string): Promise<void> {
  const user = await requireUser();
  const list = readList<Comment>(KEYS.comments);
  const target = list.find((comment) => comment.id === id);
  if (!target) return;
  if (!canDeleteComment(user, target)) throw new Error('본인 댓글만 삭제할 수 있습니다.');
  writeList(KEYS.comments, list.filter((comment) => comment.id !== id));
}

// 연구 자료 삭제 시 함께 호출됩니다. (관리자 전용)
export async function deleteCommentsOfResearch(researchId: string): Promise<void> {
  await requireAdmin();
  writeList(
    KEYS.comments,
    readList<Comment>(KEYS.comments).filter((comment) => comment.researchId !== researchId),
  );
}
