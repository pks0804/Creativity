// 각 목록 페이지 상단의 제목 영역 (아이콘 + 제목 + 설명 + 오른쪽 버튼)
import type { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export function PageHeader({ icon, title, description, action }: Props) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-start gap-4">
        <div className="hidden rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 p-3 text-white shadow-lg shadow-brand-900/15 sm:block">
          {icon}
        </div>
        <div>
          <h1 className="page-title">{title}</h1>
          <p className="mt-1 text-sm text-slate-500 sm:text-base">{description}</p>
        </div>
      </div>
      {action}
    </div>
  );
}
