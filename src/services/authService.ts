// 로그인 관련 함수 모음입니다.
// 지금은 "테스트용 로그인"으로, 버튼을 누르면 샘플 사용자로 로그인됩니다.
// 2단계에서 Firebase 구글 로그인으로 이 파일 안쪽만 바꾸면 됩니다.
import { KEYS } from './storage';
import type { Role, User } from './types';

// 화면에 "테스트용 로그인" 배지를 띄울지 결정합니다. Firebase 연동 후 false 로 바꿉니다.
export const IS_TEST_LOGIN = true;

const TEST_USERS: Record<Role, User> = {
  admin: { uid: 'test-admin', name: '테스트 교수', email: 'professor@example.com', role: 'admin' },
  member: { uid: 'test-member', name: '테스트 대학원생', email: 'student@example.com', role: 'member' },
};

export async function getCurrentUser(): Promise<User | null> {
  const raw = localStorage.getItem(KEYS.currentUser);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

// role 인자는 테스트 단계에서 대학원생 권한도 확인해 보기 위한 것입니다.
export async function signInWithGoogle(role: Role = 'admin'): Promise<User> {
  const user = TEST_USERS[role];
  localStorage.setItem(KEYS.currentUser, JSON.stringify(user));
  return user;
}

export async function signOut(): Promise<void> {
  localStorage.removeItem(KEYS.currentUser);
}

// 다른 서비스에서 "로그인/관리자 여부"를 확인할 때 사용합니다.
// (Firestore 보안 규칙이 하는 일을 임시로 흉내 냅니다)
export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) throw new Error('로그인이 필요합니다.');
  return user;
}

export async function requireAdmin(): Promise<User> {
  const user = await requireUser();
  if (user.role !== 'admin') throw new Error('관리자(교수)만 할 수 있는 작업입니다.');
  return user;
}
