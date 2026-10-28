// 사이트에서 다루는 데이터의 "모양"을 정의합니다.
// 나중에 Firestore로 바꿔도 이 모양은 그대로 유지합니다.

export type Role = 'admin' | 'member';

export interface User {
  uid: string;
  name: string;
  email: string;
  role: Role;
}

export interface LinkItem {
  label: string;
  url: string;
}

export interface Research {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  links: LinkItem[];
  authorId: string;
  authorName: string;
  createdAt: string; // ISO 형식 날짜 문자열
}

export interface Comment {
  id: string;
  researchId: string;
  text: string;
  authorId: string;
  authorName: string;
  createdAt: string;
}

export interface Lecture {
  id: string;
  title: string;
  course: string;
  links: LinkItem[];
  authorId: string;
  authorName: string;
  createdAt: string;
}

// 등록·수정 폼에서 사용자가 직접 입력하는 부분만 모은 타입
// (작성자·날짜·id는 서비스가 자동으로 채웁니다)
export type ResearchInput = Pick<Research, 'title' | 'summary' | 'tags' | 'links'>;
export type LectureInput = Pick<Lecture, 'title' | 'course' | 'links'>;
