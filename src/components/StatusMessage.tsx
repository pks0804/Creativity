// 로딩 / 빈 목록 / 에러 상태를 같은 모양으로 보여주는 작은 컴포넌트들
import type { ReactNode } from 'react';

export function Loading({ text = '불러오는 중입니다…' }: { text?: string }) {
  return <p className="py-10 text-center text-slate-500">{text}</p>;
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 py-10 text-center text-slate-500">
      {children}
    </div>
  );
}

export function ErrorMessage({ message }: { message: string }) {
  return (
    <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
      {message}
    </p>
  );
}

// 서비스에서 던진 에러를 사용자에게 보여줄 문장으로 바꿉니다.
export function toMessage(error: unknown): string {
  return error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
}
