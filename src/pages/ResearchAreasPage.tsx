import { RESEARCH_AREAS, RESEARCH_OVERVIEW_IMAGES } from '../content/researchAreas';
import { PageHeader } from '../components/PageHeader';
import { Photo } from '../components/Photo';
import { YouTube } from '../components/YouTube';
import { PaperLink } from '../components/PaperLink';
import { IconTarget } from '../components/Icons';

export default function ResearchAreasPage() {
  return (
    <div>
      <PageHeader
        icon={<IconTarget className="h-6 w-6" />}
        title="연구 분야"
        description="Protein Modulating Drug Discovery — PROTAC, 공유결합 억제제, 번역 후 변형(PTM) 조절제"
      />

      {/* 상단 개요 그림 2장 */}
      <div className="mb-12 grid gap-4 md:grid-cols-2">
        {RESEARCH_OVERVIEW_IMAGES.map((image) => (
          <figure key={image.src} className="card space-y-3 p-4 sm:p-4">
            <Photo src={image.src} alt={image.caption} className="aspect-[16/10] object-contain" />
            <figcaption className="text-center text-sm font-semibold text-slate-700">{image.caption}</figcaption>
          </figure>
        ))}
      </div>

      {/* 연구 분야 바로가기 */}
      <nav className="mb-10 flex flex-wrap gap-2">
        {RESEARCH_AREAS.map((area, index) => (
          <a key={area.id} href={`#${area.id}`} className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-slate-600 ring-1 ring-slate-200 transition hover:bg-brand-50 hover:text-brand-700 hover:ring-brand-200">
            {index + 1}. {area.title}
          </a>
        ))}
      </nav>

      <div className="space-y-12">
        {RESEARCH_AREAS.map((area, index) => (
          <section key={area.id} id={area.id} className="scroll-mt-24">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-sm font-bold text-white">
                {index + 1}
              </span>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{area.title}</h2>
            </div>

            <div className="card space-y-6">
              {area.paragraphs.length > 0 && (
                <div className="space-y-4 text-[15px] leading-8 text-slate-700">
                  {area.paragraphs.map((text) => (
                    <p key={text.slice(0, 30)}>{text}</p>
                  ))}
                </div>
              )}

              {area.featured?.map((paper) => (
                <article key={paper.doi} className="grid gap-5 rounded-2xl bg-slate-50 p-4 sm:p-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                  {paper.image && <Photo src={paper.image} alt={paper.title} className="aspect-[4/3] bg-white object-contain" />}
                  <div className="min-w-0 space-y-3">
                    <h3 className="font-bold leading-snug text-slate-900">{paper.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{paper.abstract}</p>
                    <p className="text-xs text-slate-500">Reference: {paper.reference}</p>
                    <PaperLink url={`https://doi.org/${paper.doi}`}>논문 원문 (DOI)</PaperLink>
                  </div>
                </article>
              ))}

              {area.examples && (
                <div>
                  <p className="mb-3 text-sm font-semibold text-slate-700">Examples of PTM modulators</p>
                  <ul className="flex flex-wrap gap-2">
                    {area.examples.map((example, i) => (
                      <li key={example.url}>
                        <PaperLink url={example.url}>{i + 1}) {example.label}</PaperLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {area.video && (
                <div className="max-w-2xl">
                  <YouTube id={area.video.youtubeId} title={area.video.title} />
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
