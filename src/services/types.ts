// 사이트에서 다루는 데이터의 "모양"을 정의합니다.

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

// '최근 논문' 탭의 논문 한 건 (처음 '수업 자료'로 만들어 이름이 Lecture, course 는 '분류')
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
export type LectureInput = Pick<Lecture, 'title' | 'course' | 'links'>;
