// 저장된 날짜(ISO 문자열)를 "2026. 10. 28." 형태로 보여줍니다.
export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('ko-KR');
}

export function formatDateTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' });
}

// "약동학, 임상, 약동학" → ["약동학", "임상"] (공백 제거, 빈 값·중복 제거)
export function parseTags(input: string): string[] {
  const tags = input
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag !== '');
  return Array.from(new Set(tags));
}
