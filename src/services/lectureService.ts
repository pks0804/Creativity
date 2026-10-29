// 수업 자료 읽기/쓰기 함수 모음 (Firestore 'lectures' 컬렉션)
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
import { fromDoc } from './firestoreHelpers';
import type { Lecture, LectureInput } from './types';

const lecturesCol = collection(db, 'lectures');

export async function listLectures(): Promise<Lecture[]> {
  const snap = await getDocs(query(lecturesCol, orderBy('createdAt', 'desc')));
  return snap.docs.map((d) => fromDoc<Lecture>(d));
}

export async function getLecture(id: string): Promise<Lecture | null> {
  const snap = await getDoc(doc(lecturesCol, id));
  return snap.exists() ? fromDoc<Lecture>(snap) : null;
}

export async function createLecture(input: LectureInput): Promise<Lecture> {
  const user = await requireAdmin();
  const data: Omit<Lecture, 'id'> = {
    ...input,
    authorId: user.uid,
    authorName: user.name,
    createdAt: new Date().toISOString(),
  };
  const ref = await addDoc(lecturesCol, data);
  return { ...data, id: ref.id };
}

export async function updateLecture(id: string, input: LectureInput): Promise<void> {
  await requireAdmin();
  await updateDoc(doc(lecturesCol, id), { ...input });
}

export async function deleteLecture(id: string): Promise<void> {
  await requireAdmin();
  await deleteDoc(doc(lecturesCol, id));
}

// 준비된 수업 자료를 한 번에 등록합니다. (관리자 전용, 같은 제목은 건너뜀)
export async function importLectures(items: (LectureInput & { createdAt: string })[]): Promise<number> {
  const user = await requireAdmin();
  const existing = new Set((await listLectures()).map((item) => item.title));
  const toAdd = items.filter((item) => !existing.has(item.title));
  const batch = writeBatch(db);
  for (const item of toAdd) {
    const data: Omit<Lecture, 'id'> = { ...item, authorId: user.uid, authorName: user.name };
    batch.set(doc(lecturesCol), data);
  }
  await batch.commit();
  return toAdd.length;
}
