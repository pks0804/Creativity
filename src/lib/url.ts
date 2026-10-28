import type { LinkItem } from '../services/types';

// javascript: 같은 위험한 주소를 막기 위해 http/https 주소만 허용합니다.
export function isSafeUrl(value: string): boolean {
  try {
    const url = new URL(value.trim());
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

// 라벨과 주소를 정리하고, 둘 다 빈 줄은 버립니다.
export function cleanLinks(links: LinkItem[]): LinkItem[] {
  return links
    .map((link) => ({ label: link.label.trim(), url: link.url.trim() }))
    .filter((link) => link.label !== '' || link.url !== '');
}

// 폼 제출 전 링크 검사. 문제가 없으면 null, 있으면 사용자에게 보여줄 메시지를 돌려줍니다.
export function validateLinks(links: LinkItem[]): string | null {
  for (const link of links) {
    if (link.url === '') return `"${link.label}" 링크의 주소를 입력해 주세요.`;
    if (!isSafeUrl(link.url)) {
      return `주소는 http:// 또는 https:// 로 시작해야 합니다: ${link.url}`;
    }
  }
  return null;
}
