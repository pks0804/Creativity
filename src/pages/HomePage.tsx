import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { listLectures } from '../services/lectureService';
import { LAB_INTRO } from '../lib/siteConfig';
import { LAB, CONTACT } from '../content/labInfo';
import { COLLABORATE, EXPERTISE, FOCUS_AREAS, HOME_IMAGE, WELCOME } from '../content/homeContent';
import { PUBLICATIONS } from '../content/publications';
import { toMessage } from '../components/StatusMessage';
import { SectionHeading } from '../components/SectionHeading';
import { Photo } from '../components/Photo';
import { NewsSection } from '../components/NewsSection';
import {
  IconArrowRight,
  IconFlask,
  IconMail,
  IconPhone,
  IconPin,
  IconTarget,
  IconCapsule,
  IconUsers,
} from '../components/Icons';

const EXPERTISE_ICONS = [<IconTarget key="t" />, <IconFlask key="f" />, <IconCapsule key="c" />];

export default function HomePage() {
  const { user } = useAuth();
  const [paperCount, setPaperCount] = useState<number | null>(null);
  const publicationCount = PUBLICATIONS.reduce((sum, group) => sum + group.items.length, 0);

  // '최근 논문' 개수 (누구나 볼 수 있으므로 로그인 여부와 상관없이 불러옵니다)
  useEffect(() => {
    listLectures()
      .then((items) => setPaperCount(items.length))
      .catch((e: unknown) => console.warn(toMessage(e)));
  }, []);

  return (
    <div className="space-y-16">
      {/* 상단 소개(히어로) 영역 */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 px-6 py-12 text-white shadow-xl shadow-brand-900/20 sm:px-12 sm:py-16">
        <HeroPattern />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-brand-100 ring-1 ring-white/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            {LAB.fullName}
          </span>
          <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">{LAB_INTRO.title}</h1>
          <p className="mt-3 text-lg font-medium text-brand-200 sm:text-xl">{LAB.tagline}</p>
          <p className="mt-5 text-base leading-relaxed text-brand-100 sm:text-lg">{LAB_INTRO.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/areas" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-800 shadow-lg transition hover:bg-brand-50">
              연구 분야 보기 <IconArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/publications" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/20">
              논문 보기
            </Link>
            {!user && (
              <Link to="/login" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/20">
                구성원 로그인
              </Link>
            )}
          </div>
        </div>

        <dl className="relative mt-10 grid max-w-sm grid-cols-2 gap-3">
          <Stat label="발표 논문" value={publicationCount} />
          <Stat label="최근 논문 소개" value={paperCount ?? '–'} />
        </dl>
      </section>

      {/* 최신 뉴스 */}
      <NewsSection />

      {/* Welcome */}
      <section className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Welcome" title={WELCOME.title} />
          <div className="space-y-4 text-[15px] leading-8 text-slate-700">
            {WELCOME.paragraphs.map((text) => <p key={text.slice(0, 20)}>{text}</p>)}
          </div>
        </div>
        {/* 대표 그림(학술지 표지 그림)은 정사각형이라 잘리지 않게 정사각형 칸에, 원본이 작아 너무 크게 키우지 않습니다. */}
        <div className="mx-auto w-full max-w-sm">
          <Photo src={HOME_IMAGE} alt="No more inhibition, time for degradation — Nature Chemical Biology cover art" className="aspect-square object-contain shadow-lg" />
        </div>
      </section>

      {/* Our Expertise */}
      <section>
        <SectionHeading eyebrow="Our Expertise" title="연구 역량" />
        <div className="grid gap-4 md:grid-cols-3">
          {EXPERTISE.map((item, i) => (
            <div key={item.title} className="card card-hover group">
              <div className="mb-4 inline-flex rounded-xl bg-brand-50 p-2.5 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
                {EXPERTISE_ICONS[i]}
              </div>
              <h3 className="font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Research Focus Areas */}
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80 sm:p-10">
        <SectionHeading eyebrow="Research Focus Areas" title="주요 연구 대상 질환" />
        <div className="grid gap-6 md:grid-cols-3">
          {FOCUS_AREAS.map((item, i) => (
            <div key={item.title} className="border-l-4 border-brand-400 pl-4">
              <p className="text-xs font-semibold text-brand-500">0{i + 1}</p>
              <h3 className="mt-1 font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.text}</p>
            </div>
          ))}
        </div>
        <Link to="/areas" className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-800">
          연구 분야 자세히 보기 <IconArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* Collaborate & Contact */}
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-white sm:p-8">
          <IconUsers className="h-7 w-7 text-brand-200" />
          <h2 className="mt-4 text-xl font-bold">{COLLABORATE.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-100">{COLLABORATE.text}</p>
          <Link to="/join" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-brand-800 transition hover:bg-brand-50">
            학생 모집 안내 <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="card">
          <h2 className="text-xl font-bold text-slate-900">Contact Us</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">{COLLABORATE.contactText}</p>
          <ul className="mt-6 space-y-3 text-sm text-slate-700">
            <li className="font-semibold">{CONTACT.piName}</li>
            <li className="flex items-start gap-2.5"><IconMail className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" /><a href={`mailto:${CONTACT.email}`} className="hover:text-brand-700 hover:underline">{CONTACT.email}</a></li>
            <li className="flex items-start gap-2.5"><IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />Office: {CONTACT.office}</li>
            <li className="flex items-start gap-2.5"><IconPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />{CONTACT.address}</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15 backdrop-blur">
      <dt className="text-xs text-brand-200">{label}</dt>
      <dd className="mt-0.5 text-2xl font-bold">{value}</dd>
    </div>
  );
}

// 히어로 배경의 은은한 분자 구조 무늬 (장식용)
function HeroPattern() {
  return (
    <svg className="pointer-events-none absolute -right-10 -top-10 h-[420px] w-[420px] text-white/10 sm:right-0" viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.5">
        <polygon points="100,40 140,63 140,109 100,132 60,109 60,63" />
        <polygon points="140,109 180,132 180,178 140,200 100,178 100,132" />
        <line x1="100" y1="40" x2="100" y2="5" />
        <line x1="60" y1="63" x2="25" y2="45" />
        <line x1="60" y1="109" x2="25" y2="128" />
        <line x1="108" y1="52" x2="132" y2="66" />
      </g>
      <g fill="currentColor">
        <circle cx="100" cy="5" r="5" />
        <circle cx="25" cy="45" r="5" />
        <circle cx="25" cy="128" r="5" />
        <circle cx="180" cy="132" r="4" />
      </g>
      <circle cx="40" cy="170" r="60" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
    </svg>
  );
}
