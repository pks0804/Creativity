// 연구 자료의 토론 댓글 함수 모음 (Firestore 'comments' 컬렉션)
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { requireAdmin, requireUser } from './authService';
import { fromDoc } from './firestoreHelpers';
import type { Comment, User } from './types';

export const MAX_COMMENT_LENGTH = 2000;

const commentsCol = collection(db, 'comments');

// 대화 흐름대로 읽히도록 오래된 댓글이 위에 옵니다.
// 정렬을 Firestore가 아닌 화면 쪽에서 하는 이유: where + orderBy 를 함께 쓰면
// Firebase 콘솔에서 "색인(index)"을 따로 만들어야 해서, 그 번거로움을 피했습니다.
export async function listComments(researchId: string): Promise<Comment[]> {
  await requireUser();
  const snap = await getDocs(query(commentsCol, where('researchId', '==', researchId)));
  return snap.docs
    .map((d) => fromDoc<Comment>(d))
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export async function createComment(researchId: string, text: string): Promise<Comment> {
  const user = await requireUser();
  const trimmed = text.trim();
  if (trimmed === '') throw new Error('댓글 내용을 입력해 주세요.');
  if (trimmed.length > MAX_COMMENT_LENGTH) {
    throw new Error(`댓글은 ${MAX_COMMENT_LENGTH}자까지 쓸 수 있습니다.`);
  }
  // 작성자는 항상 "현재 로그인한 본인"으로 기록합니다. (보안 규칙도 같은 것을 검사)
  const data: Omit<Comment, 'id'> = {
    researchId,
    text: trimmed,
    authorId: user.uid,
    authorName: user.name,
    createdAt: new Date().toISOString(),
  };
  const ref = await addDoc(commentsCol, data);
  return { ...data, id: ref.id };
}

// 화면에서 삭제 버튼을 보여줄지 판단할 때도 같은 규칙을 씁니다.
export function canDeleteComment(user: User | null, comment: Comment): boolean {
  if (!user) return false;
  return user.role === 'admin' || user.uid === comment.authorId;
}

export async function deleteComment(id: string): Promise<void> {
  await requireUser();
  await deleteDoc(doc(commentsCol, id));
}

// 연구 자료 삭제 시 함께 호출됩니다. (관리자 전용)
export async function deleteCommentsOfResearch(researchId: string): Promise<void> {
  await requireAdmin();
  const snap = await getDocs(query(commentsCol, where('researchId', '==', researchId)));
  // 한 번에 최대 500개까지 지울 수 있어서 나눠서 처리합니다.
  for (let i = 0; i < snap.docs.length; i += 500) {
    const batch = writeBatch(db);
    snap.docs.slice(i, i + 500).forEach((d) => batch.delete(d.ref));
    await batch.commit();
  }
}
