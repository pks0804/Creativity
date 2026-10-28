import type { LinkItem } from '../services/types';
import { isSafeUrl } from '../lib/url';
import { IconExternal } from './Icons';

// 외부 링크 목록. 새 탭으로 열고, http/https 가 아닌 주소는 아예 보여주지 않습니다.
export function LinkList({ links }: { links: LinkItem[] }) {
  const safeLinks = links.filter((link) => isSafeUrl(link.url));
  if (safeLinks.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {safeLinks.map((link, index) => (
        <li key={`${link.url}-${index}`} className="max-w-full">
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex max-w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
          >
            <span className="truncate">{link.label || new URL(link.url).hostname}</span>
            <IconExternal className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-brand-500" />
          </a>
        </li>
      ))}
    </ul>
  );
}
