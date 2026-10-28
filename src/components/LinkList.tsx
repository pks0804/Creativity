import type { LinkItem } from '../services/types';
import { isSafeUrl } from '../lib/url';

// 외부 링크 목록. 새 탭으로 열고, http/https 가 아닌 주소는 아예 보여주지 않습니다.
export function LinkList({ links }: { links: LinkItem[] }) {
  const safeLinks = links.filter((link) => isSafeUrl(link.url));
  if (safeLinks.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {safeLinks.map((link, index) => (
        <li key={`${link.url}-${index}`}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block max-w-full truncate rounded-md border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-700 hover:bg-blue-100"
          >
            🔗 {link.label || link.url}
          </a>
        </li>
      ))}
    </ul>
  );
}
