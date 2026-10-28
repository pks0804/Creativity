// Firebase 연결 설정을 한곳에서 만듭니다.
// 설정값은 코드에 직접 쓰지 않고 환경변수(.env / Netlify 환경변수)에서 읽습니다.
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

const env = import.meta.env;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

// 환경변수가 빠졌을 때 사이트가 하얀 화면으로 멈추지 않고 안내 문구를 보여주기 위해 확인합니다.
export const missingFirebaseEnv: string[] = Object.entries({
  VITE_FIREBASE_API_KEY: firebaseConfig.apiKey,
  VITE_FIREBASE_AUTH_DOMAIN: firebaseConfig.authDomain,
  VITE_FIREBASE_PROJECT_ID: firebaseConfig.projectId,
  VITE_FIREBASE_APP_ID: firebaseConfig.appId,
})
  .filter(([, value]) => !value)
  .map(([key]) => key);

// 값이 비어 있으면 Firebase가 시작하자마자 오류를 내므로, 임시 값을 넣어 안내 화면까지는 뜨게 합니다.
const app = initializeApp(
  missingFirebaseEnv.length > 0
    ? { apiKey: 'missing', authDomain: 'missing', projectId: 'missing', appId: 'missing' }
    : firebaseConfig,
);
export const auth = getAuth(app);
export const db = getFirestore(app);

// 개발자가 내 컴퓨터에서 Firebase 에뮬레이터로 시험할 때만 사용합니다. (실제 사이트에서는 꺼져 있음)
if (env.VITE_USE_FIREBASE_EMULATOR === 'true') {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
}
