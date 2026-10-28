// 등록 폼에서 "라벨 + 주소" 링크를 여러 개 입력하는 부분
import type { LinkItem } from '../services/types';
import { IconPlus, IconTrash } from './Icons';

interface Props {
  links: LinkItem[];
  onChange: (links: LinkItem[]) => void;
}

export function LinksEditor({ links, onChange }: Props) {
  const update = (index: number, field: keyof LinkItem, value: string) => {
    onChange(links.map((link, i) => (i === index ? { ...link, [field]: value } : link)));
  };

  return (
    <div className="space-y-3">
      {links.map((link, index) => (
        <div key={index} className="flex flex-col gap-2 rounded-xl bg-slate-50 p-3 sm:flex-row sm:items-center">
          <input
            className="input sm:w-1/3"
            placeholder="라벨 (예: 발표 슬라이드)"
            value={link.label}
            onChange={(e) => update(index, 'label', e.target.value)}
          />
          <input
            className="input flex-1"
            type="url"
            placeholder="https://drive.google.com/..."
            value={link.url}
            onChange={(e) => update(index, 'url', e.target.value)}
          />
          <button
            type="button"
            className="btn-secondary px-3 text-slate-500 hover:text-red-600"
            onClick={() => onChange(links.filter((_, i) => i !== index))}
            aria-label="이 링크 삭제"
          >
            <IconTrash className="h-4 w-4" />
            <span className="sm:hidden">삭제</span>
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn-secondary w-full border-dashed text-brand-700"
        onClick={() => onChange([...links, { label: '', url: '' }])}
      >
        <IconPlus className="h-4 w-4" />
        링크 추가
      </button>
      <p className="text-xs text-slate-500">
        파일은 Google Drive 등에 올린 뒤 공유 링크만 입력해 주세요. (http/https 주소만 가능)
      </p>
    </div>
  );
}
