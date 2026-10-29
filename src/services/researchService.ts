// 연구 자료 읽기/쓰기 함수 모음 (Firestore 'research' 컬렉션)
// 읽기는 누구나(로그인 불필요), 쓰기는 관리자만 가능합니다. (firestore.rules 와 같은 규칙)
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { requireAdmin } from './authService';
import { deleteCommentsOfResearch } from './commentService';
import { fromDoc } from './firestoreHelpers';
import type { Research, ResearchInput } from './types';

const researchCol = collection(db, 'research');

export async function listResearch(): Promise<Research[]> {
  const snap = await getDocs(query(researchCol, orderBy('createdAt', 'desc')));
  return snap.docs.map((d) => fromDoc<Research>(d));
}

export async function listRecentResearch(count = 5): Promise<Research[]> {
  const all = await listResearch();
  return all.slice(0, count);
}

export async function getResearch(id: string): Promise<Research | null> {
  const snap = await getDoc(doc(researchCol, id));
  return snap.exists() ? fromDoc<Research>(snap) : null;
}

export async function createResearch(input: ResearchInput): Promise<Research> {
  const user = await requireAdmin();
  const data: Omit<Research, 'id'> = {
    ...input,
    authorId: user.uid,
    authorName: user.name,
    createdAt: new Date().toISOString(),
  };
  const ref = await addDoc(researchCol, data);
  return { ...data, id: ref.id };
}

export async function updateResearch(id: string, input: ResearchInput): Promise<void> {
  await requireAdmin();
  // 작성자·작성일은 그대로 두고, 폼에서 고친 내용만 바꿉니다.
  await updateDoc(doc(researchCol, id), { ...input });
}

export async function deleteResearch(id: string): Promise<void> {
  await requireAdmin();
  // 자료가 지워지면 그 자료의 토론 댓글도 함께 정리합니다.
  await deleteCommentsOfResearch(id);
  await deleteDoc(doc(researchCol, id));
}

// 준비된 자료(src/data/preparedContent.ts)를 한 번에 등록합니다. (관리자 전용)
// 같은 제목이 이미 있으면 건너뛰어 중복을 막고, 실제로 추가한 개수를 돌려줍니다.
export async function importResearch(items: (ResearchInput & { createdAt: string })[]): Promise<number> {
  const user = await requireAdmin();
  const existing = new Set((await listResearch()).map((item) => item.title));
  const toAdd = items.filter((item) => !existing.has(item.title));
  const batch = writeBatch(db);
  for (const item of toAdd) {
    const data: Omit<Research, 'id'> = { ...item, authorId: user.uid, authorName: user.name };
    batch.set(doc(researchCol), data);
  }
  await batch.commit();
  return toAdd.length;
}
