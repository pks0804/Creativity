// 수업 자료 읽기/쓰기 함수 모음 (localStorage 임시 구현)
import { requireAdmin, requireUser } from './authService';
import { KEYS, byNewest, newId, readList, writeList } from './storage';
import type { Lecture, LectureInput } from './types';

export async function listLectures(): Promise<Lecture[]> {
  await requireUser();
  return readList<Lecture>(KEYS.lectures).sort(byNewest);
}

export async function getLecture(id: string): Promise<Lecture | null> {
  await requireUser();
  return readList<Lecture>(KEYS.lectures).find((item) => item.id === id) ?? null;
}

export async function createLecture(input: LectureInput): Promise<Lecture> {
  const user = await requireAdmin();
  const item: Lecture = {
    ...input,
    id: newId(),
    authorId: user.uid,
    authorName: user.name,
    createdAt: new Date().toISOString(),
  };
  writeList(KEYS.lectures, [...readList<Lecture>(KEYS.lectures), item]);
  return item;
}

export async function updateLecture(id: string, input: LectureInput): Promise<void> {
  await requireAdmin();
  const list = readList<Lecture>(KEYS.lectures);
  if (!list.some((item) => item.id === id)) throw new Error('자료를 찾을 수 없습니다.');
  writeList(
    KEYS.lectures,
    list.map((item) => (item.id === id ? { ...item, ...input } : item)),
  );
}

export async function deleteLecture(id: string): Promise<void> {
  await requireAdmin();
  writeList(
    KEYS.lectures,
    readList<Lecture>(KEYS.lectures).filter((item) => item.id !== id),
  );
}
