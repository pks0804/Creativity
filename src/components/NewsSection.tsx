// 홈 화면의 "최신 뉴스" 코너 (내용은 src/content/news.ts 에서 관리)
import { NEWS } from '../content/news';
import { isSafeUrl } from '../lib/url';
import { SectionHeading } from './SectionHeading';
import { Photo } from './Photo';
import { IconExternal } from './Icons';

// "2026-09-09" → "2026.09.09" (시간대에 따라 하루가 밀리지 않도록 문자열 그대로 바꿉니다)
const displayDate = (date: string) => date.replace(/-/g, '.');

export function NewsSection() {
  const items = [...NEWS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  if (items.length === 0) return null;

  return (
    <section>
      <SectionHeading eyebrow="Latest News" title="최신 뉴스" />
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.url}>
            <article className="card grid gap-5 md:grid-cols-[16rem_1fr] md:items-center">
              {item.image && (
                <div className="rounded-xl bg-white ring-1 ring-slate-100">
                  <Photo src={item.image} alt={item.title} className="aspect-[16/9] bg-white object-contain p-2" />
                </div>
              )}
              <div className="min-w-0 space-y-2">
                <p className="text-xs font-medium text-slate-400">
                  <span className="text-brand-600">{displayDate(item.date)}</span> · {item.source}
                </p>
                <h3 className="text-lg font-bold leading-snug text-slate-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{item.summary}</p>
                {isSafeUrl(item.url) && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 pt-1 text-sm font-semibold text-brand-600 hover:text-brand-800"
                  >
                    기사 전문 보기 <IconExternal className="h-4 w-4" />
                  </a>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
