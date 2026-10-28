// 연구 자료 읽기/쓰기 함수 모음 (Firestore 'research' 컬렉션)
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
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { requireAdmin, requireUser } from './authService';
import { deleteCommentsOfResearch } from './commentService';
import { fromDoc } from './firestoreHelpers';
import type { Research, ResearchInput } from './types';

const researchCol = collection(db, 'research');

export async function listResearch(): Promise<Research[]> {
  await requireUser();
  const snap = await getDocs(query(researchCol, orderBy('createdAt', 'desc')));
  return snap.docs.map((d) => fromDoc<Research>(d));
}

export async function listRecentResearch(count = 5): Promise<Research[]> {
  const all = await listResearch();
  return all.slice(0, count);
}

export async function getResearch(id: string): Promise<Research | null> {
  await requireUser();
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
