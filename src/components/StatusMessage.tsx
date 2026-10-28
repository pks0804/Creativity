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

// 서비스에서 던진 에러를 사용자에게 보여줄 문장으로 바꿉니다.
export function toMessage(error: unknown): string {
  return error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
}
