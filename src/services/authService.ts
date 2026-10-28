// 로그인 관련 함수 모음 (Firebase 구글 로그인)
// 구글 계정으로 로그인한 뒤, Firestore의 allowedEmails 명단에 있는 사람만 들어올 수 있습니다.
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import type { Role, User } from './types';

const NOT_ALLOWED_MESSAGE =
  '연구실 구성원 명단에 등록되지 않은 계정입니다. 교수님께 등록을 요청해 주세요.';

// 다른 서비스가 "지금 누가 로그인했는지"를 빨리 확인할 수 있도록 기억해 둡니다.
let currentUser: User | null = null;

// 구글 계정 정보 + allowedEmails 명단의 역할(role)을 합쳐 사이트용 사용자 정보를 만듭니다.
// 명단에 없으면 null 을 돌려줍니다.
async function loadProfile(fbUser: FirebaseUser): Promise<User | null> {
  const email = (fbUser.email ?? '').toLowerCase();
  if (!email) return null;
  const snap = await getDoc(doc(db, 'allowedEmails', email));
  if (!snap.exists()) return null;

  const data = snap.data() as { role?: Role; name?: string };
  return {
    uid: fbUser.uid,
    // 명단에 name 을 적어 두면 그 이름을, 없으면 구글 계정 이름을 씁니다.
    name: data.name || fbUser.displayName || email,
    email,
    role: data.role === 'admin' ? 'admin' : 'member',
  };
}

// 명단 확인까지 끝난 로그인 상태를 알려줍니다. (AuthContext 에서 사용)
// 돌려주는 함수를 호출하면 구독이 끝납니다.
export function subscribeAuth(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, async (fbUser) => {
    if (!fbUser) {
      currentUser = null;
      callback(null);
      return;
    }
    try {
      currentUser = await loadProfile(fbUser);
    } catch {
      currentUser = null;
    }
    // 명단에 없는 계정은 로그인 상태로 남겨두지 않습니다.
    if (!currentUser) await firebaseSignOut(auth);
    callback(currentUser);
  });
}

export async function getCurrentUser(): Promise<User | null> {
  await auth.authStateReady();
  if (!auth.currentUser) return null;
  if (currentUser?.uid !== auth.currentUser.uid) currentUser = await loadProfile(auth.currentUser);
  return currentUser;
}

export async function signInWithGoogle(): Promise<User> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' }); // 여러 구글 계정 중 고를 수 있게
  const result = await signInWithPopup(auth, provider);
  const user = await loadProfile(result.user);
  if (!user) {
    await firebaseSignOut(auth);
    throw new Error(NOT_ALLOWED_MESSAGE);
  }
  currentUser = user;
  return user;
}

export async function signOut(): Promise<void> {
  currentUser = null;
  await firebaseSignOut(auth);
}

// 다른 서비스에서 "로그인/관리자 여부"를 먼저 확인할 때 사용합니다.
// (최종 판단은 Firestore 보안 규칙이 서버에서 다시 합니다)
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
