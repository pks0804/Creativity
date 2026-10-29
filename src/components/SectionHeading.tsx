// 페이지 안의 소제목 (작은 영문 라벨 + 제목)
export function SectionHeading({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="mb-5">
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">{eyebrow}</p>}
      <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{title}</h2>
    </div>
  );
}
