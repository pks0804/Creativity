// 로딩 / 빈 목록 / 에러 상태를 같은 모양으로 보여주는 작은 컴포넌트들
import type { ReactNode } from 'react';
import { IconAlert } from './Icons';

export function Loading({ text = '불러오는 중입니다…' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-sm text-slate-500" role="status">
      <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-brand-100 border-t-brand-500" />
      {text}
    </div>
  );
}

export function EmptyState({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-12 text-center text-sm text-slate-500">
      {icon && <div className="mb-3 rounded-2xl bg-brand-50 p-3 text-brand-500">{icon}</div>}
      {children}
    </div>
  );
}

export function ErrorMessage({ message }: { message: string }) {
  return (
    <p role="alert" className="flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
      <IconAlert className="mt-0.5 h-4 w-4 shrink-0" />
      {message}
    </p>
  );
}

// Firebase가 돌려주는 영어 오류 코드를 쉬운 한국어 안내로 바꿉니다.
const FIREBASE_MESSAGES: Record<string, string> = {
  'permission-denied': '권한이 없습니다. 구성원 명단 등록 여부나 역할(admin/member)을 확인해 주세요.',
  unavailable: '서버에 연결할 수 없습니다. 인터넷 연결을 확인한 뒤 다시 시도해 주세요.',
  'not-found': '데이터베이스를 찾을 수 없습니다. Firebase 콘솔에서 Firestore Database를 만들었는지 확인해 주세요.',
  'auth/popup-closed-by-user': '로그인 창이 닫혔습니다. 다시 시도해 주세요.',
  'auth/cancelled-popup-request': '로그인 창이 닫혔습니다. 다시 시도해 주세요.',
  'auth/popup-blocked': '브라우저가 로그인 팝업을 막았습니다. 팝업 허용 후 다시 시도해 주세요.',
  'auth/unauthorized-domain': '이 사이트 주소가 Firebase 승인된 도메인에 없습니다. Firebase 콘솔에서 추가해 주세요.',
  'auth/network-request-failed': '네트워크 오류입니다. 인터넷 연결을 확인해 주세요.',
};

// 서비스에서 던진 에러를 사용자에게 보여줄 문장으로 바꿉니다.
export function toMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const code = String((error as { code: unknown }).code);
    if (FIREBASE_MESSAGES[code]) return FIREBASE_MESSAGES[code];
  }
  return error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
}
