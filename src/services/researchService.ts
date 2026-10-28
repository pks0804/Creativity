// 연구 자료 읽기/쓰기 함수 모음 (localStorage 임시 구현)
// 모든 함수가 Promise 를 돌려주므로, Firestore로 바꿔도 화면 코드는 그대로입니다.
import { requireAdmin, requireUser } from './authService';
import { deleteCommentsOfResearch } from './commentService';
import { KEYS, byNewest, newId, readList, writeList } from './storage';
import type { Research, ResearchInput } from './types';

export async function listResearch(): Promise<Research[]> {
  await requireUser();
  return readList<Research>(KEYS.research).sort(byNewest);
}

export async function listRecentResearch(count = 5): Promise<Research[]> {
  const all = await listResearch();
  return all.slice(0, count);
}

export async function getResearch(id: string): Promise<Research | null> {
  await requireUser();
  return readList<Research>(KEYS.research).find((item) => item.id === id) ?? null;
}

export async function createResearch(input: ResearchInput): Promise<Research> {
  const user = await requireAdmin();
  const item: Research = {
    ...input,
    id: newId(),
    authorId: user.uid,
    authorName: user.name,
    createdAt: new Date().toISOString(),
  };
  writeList(KEYS.research, [...readList<Research>(KEYS.research), item]);
  return item;
}

export async function updateResearch(id: string, input: ResearchInput): Promise<void> {
  await requireAdmin();
  const list = readList<Research>(KEYS.research);
  if (!list.some((item) => item.id === id)) throw new Error('자료를 찾을 수 없습니다.');
  writeList(
    KEYS.research,
    list.map((item) => (item.id === id ? { ...item, ...input } : item)),
  );
}

export async function deleteResearch(id: string): Promise<void> {
  await requireAdmin();
  writeList(
    KEYS.research,
    readList<Research>(KEYS.research).filter((item) => item.id !== id),
  );
  // 자료가 지워지면 그 자료의 토론 댓글도 함께 정리합니다.
  await deleteCommentsOfResearch(id);
}
