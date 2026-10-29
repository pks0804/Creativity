import type { LinkItem } from '../services/types';
import { isSafeUrl } from '../lib/url';
import { useAuth } from '../contexts/AuthContext';
import { PaperLink } from './PaperLink';

// 외부 링크 목록. 열기 권한(로그인) 처리는 PaperLink 가 맡습니다.
export function LinkList({ links }: { links: LinkItem[] }) {
  const { user } = useAuth();
  const safeLinks = links.filter((link) => isSafeUrl(link.url));
  if (safeLinks.length === 0) return null;

  return (
    <div className="space-y-2">
      <ul className="flex flex-wrap gap-2">
        {safeLinks.map((link, index) => (
          <li key={`${link.url}-${index}`} className="max-w-full">
            <PaperLink url={link.url}>{link.label || new URL(link.url).hostname}</PaperLink>
          </li>
        ))}
      </ul>
      {!user && <p className="text-xs text-slate-400">🔒 링크는 로그인한 구성원만 열 수 있습니다.</p>}
    </div>
  );
}
