// Firestore 문서를 사이트에서 쓰는 타입으로 바꿔 주는 작은 도우미
import type { DocumentSnapshot } from 'firebase/firestore';

// 문서 내용 + 문서 id 를 합칩니다. (id 는 문서 안에 저장하지 않고 문서 이름으로 씁니다)
export function fromDoc<T extends { id: string }>(snap: DocumentSnapshot): T {
  return { ...(snap.data() as Omit<T, 'id'>), id: snap.id } as T;
}

// 최신 글이 위로 오도록 정렬
export function byNewest<T extends { createdAt: string }>(a: T, b: T): number {
  return b.createdAt.localeCompare(a.createdAt);
}
