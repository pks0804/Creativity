// localStorage 를 다루는 저수준 도우미입니다. (임시 구현 전용)
// Firestore로 바꾸면 이 파일과 seed.ts 는 지워도 됩니다.
import { seedData } from './seed';

const SEED_FLAG_KEY = 'lab:seeded';

export const KEYS = {
  research: 'lab:research',
  lectures: 'lab:lectures',
  comments: 'lab:comments',
  currentUser: 'lab:currentUser',
} as const;

// 처음 실행했을 때 한 번만 샘플 데이터를 채웁니다.
function ensureSeeded(): void {
  if (localStorage.getItem(SEED_FLAG_KEY)) return;
  localStorage.setItem(KEYS.research, JSON.stringify(seedData.research));
  localStorage.setItem(KEYS.lectures, JSON.stringify(seedData.lectures));
  localStorage.setItem(KEYS.comments, JSON.stringify(seedData.comments));
  localStorage.setItem(SEED_FLAG_KEY, '1');
}

export function readList<T>(key: string): T[] {
  ensureSeeded();
  const raw = localStorage.getItem(key);
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    // 저장값이 깨졌을 때 사이트 전체가 멈추지 않도록 빈 목록으로 처리
    return [];
  }
}

export function writeList<T>(key: string, items: T[]): void {
  localStorage.setItem(key, JSON.stringify(items));
}

export function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

// 최신 글이 위로 오도록 정렬
export function byNewest<T extends { createdAt: string }>(a: T, b: T): number {
  return b.createdAt.localeCompare(a.createdAt);
}
