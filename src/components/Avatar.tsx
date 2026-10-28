// 이름 첫 글자로 만든 동그란 프로필 표시. 이름마다 색이 달라 댓글 작성자를 구분하기 쉽습니다.
const COLORS = [
  'bg-brand-100 text-brand-800',
  'bg-amber-100 text-amber-800',
  'bg-violet-100 text-violet-800',
  'bg-rose-100 text-rose-800',
  'bg-emerald-100 text-emerald-800',
  'bg-sky-100 text-sky-800',
];

export function Avatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' }) {
  const index = Array.from(name).reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % COLORS.length;
  const sizeClass = size === 'sm' ? 'h-7 w-7 text-xs' : 'h-9 w-9 text-sm';
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-full font-bold ${sizeClass} ${COLORS[index]}`}>
      {name.trim().charAt(0) || '?'}
    </span>
  );
}
