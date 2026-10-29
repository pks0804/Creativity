import { useMemo, useState } from 'react';
import { PUBLICATIONS } from '../content/publications';
import { CONTACT } from '../content/labInfo';
import { PageHeader } from '../components/PageHeader';
import { IconDoc, IconExternal, IconSearch } from '../components/Icons';

// 저자 목록에서 교수님 이름(Park KS, Park, K.-S. 등)을 굵게 표시합니다.
const PI_NAME_PATTERN = /(Park,?\s?K\.?\s?[-–]?\s?S\.?|Park\s?KS|Park\s?K\.)/;

function HighlightPI({ text }: { text: string }) {
  const parts = text.split(PI_NAME_PATTERN);
  return (
    <>
      {parts.map((part, i) =>
        PI_NAME_PATTERN.test(part) ? (
          <strong key={i} className="font-semibold text-brand-700">{part}</strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export default function PublicationsPage() {
  const [keyword, setKeyword] = useState('');
  const total = PUBLICATIONS.reduce((sum, group) => sum + group.items.length, 0);

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    if (!k) return PUBLICATIONS;
    return PUBLICATIONS.map((group) => ({
      ...group,
      items: group.items.filter((item) => item.toLowerCase().includes(k)),
    })).filter((group) => group.items.length > 0);
  }, [keyword]);

  return (
    <div>
      <PageHeader
        icon={<IconDoc className="h-6 w-6" />}
        title="Publications"
        description={`총 ${total}편 (* 공동 제1저자, # 교신저자)`}
        action={
          <a href={CONTACT.scholar} target="_blank" rel="noopener noreferrer" className="btn-secondary self-start sm:self-auto">
            Google Scholar <IconExternal className="h-4 w-4" />
          </a>
        }
      />

      <div className="relative mb-8">
        <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          className="input pl-10"
          placeholder="제목, 저자, 학술지로 검색 (예: PROTAC, J Med Chem)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="py-10 text-center text-sm text-slate-500">검색 결과가 없습니다.</p>
      ) : (
        <div className="space-y-8">
          {filtered.map((group) => (
            <section key={group.year} className="grid gap-3 md:grid-cols-[6rem_1fr]">
              <h2 className="text-2xl font-bold tracking-tight text-brand-600 md:sticky md:top-24 md:self-start">{group.year}</h2>
              <ol className="space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-sm leading-relaxed text-slate-700 shadow-sm">
                    <HighlightPI text={item} />
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
