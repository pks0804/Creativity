import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { listResearch } from '../services/researchService';
import { listLectures } from '../services/lectureService';
import type { Research } from '../services/types';
import { LAB_INTRO } from '../lib/siteConfig';
import { formatDate } from '../lib/format';
import { EmptyState, ErrorMessage, Loading, toMessage } from '../components/StatusMessage';
import { IconArrowRight, IconBook, IconChat, IconFlask, IconLock } from '../components/Icons';

const FEATURES = [
  { icon: <IconFlask />, title: '연구 자료', text: '논문 정리, 실험 아이디어, 발표 자료를 태그로 정리해 공유합니다.', to: '/research' },
  { icon: <IconBook />, title: '수업 자료', text: '과목별 강의 슬라이드와 참고 자료 링크를 한곳에 모았습니다.', to: '/lectures' },
  { icon: <IconChat />, title: '토론', text: '연구 자료마다 댓글로 질문하고 의견을 나눌 수 있습니다.', to: '/research' },
];

export default function HomePage() {
  const { user } = useAuth();
  const [recent, setRecent] = useState<Research[]>([]);
  const [counts, setCounts] = useState({ research: 0, lectures: 0, courses: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // 자료 목록은 구성원 전용이므로(2단계 보안 규칙과 동일), 로그인했을 때만 불러옵니다.
    if (!user) return;
    setLoading(true);
    setError('');
    Promise.all([listResearch(), listLectures()])
      .then(([research, lectures]) => {
        setRecent(research.slice(0, 5));
        setCounts({
          research: research.length,
          lectures: lectures.length,
          courses: new Set(lectures.map((lecture) => lecture.course)).size,
        });
      })
      .catch((e: unknown) => setError(toMessage(e)))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="space-y-14">
      {/* 상단 소개(히어로) 영역 */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 px-6 py-12 text-white shadow-xl shadow-brand-900/20 sm:px-12 sm:py-16">
        <HeroPattern />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-brand-100 ring-1 ring-white/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            Pharmaceutical Sciences Lab
          </span>
          <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {LAB_INTRO.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-brand-100 sm:text-lg">{LAB_INTRO.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {user ? (
              <>
                <Link to="/research" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-800 shadow-lg transition hover:bg-brand-50">
                  연구 자료 보기 <IconArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/lectures" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/20">
                  수업 자료 보기
                </Link>
              </>
            ) : (
              <Link to="/login" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-800 shadow-lg transition hover:bg-brand-50">
                구성원 로그인 <IconArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>

        {user && !loading && !error && (
          <dl className="relative mt-10 grid max-w-xl grid-cols-3 gap-3">
            <Stat label="연구 자료" value={counts.research} />
            <Stat label="수업 자료" value={counts.lectures} />
            <Stat label="개설 과목" value={counts.courses} />
          </dl>
        )}
      </section>

      {/* 기능 소개 카드 */}
      <section className="grid gap-4 sm:grid-cols-3">
        {FEATURES.map((feature) => (
          <Link key={feature.title} to={feature.to} className="card card-hover group">
            <div className="mb-4 inline-flex rounded-xl bg-brand-50 p-2.5 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
              {feature.icon}
            </div>
            <h3 className="font-bold text-slate-900">{feature.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{feature.text}</p>
          </Link>
        ))}
      </section>

      {/* 최근 연구 자료 */}
      <section>
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">최근 연구 자료</h2>
            <p className="mt-1 text-sm text-slate-500">새로 올라온 자료 5개</p>
          </div>
          {user && (
            <Link to="/research" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-800">
              전체 보기 <IconArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        {!user ? (
          <EmptyState icon={<IconLock />}>
            <p className="mb-4">연구실 구성원은 로그인 후 자료를 볼 수 있습니다.</p>
            <Link to="/login" className="btn-primary">로그인하기</Link>
          </EmptyState>
        ) : loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : recent.length === 0 ? (
          <EmptyState icon={<IconFlask />}>아직 등록된 연구 자료가 없습니다.</EmptyState>
        ) : (
          <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            {recent.map((item) => (
              <li key={item.id}>
                <Link to={`/research/${item.id}`} className="group flex items-center gap-4 px-5 py-4 transition hover:bg-brand-50/50">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-slate-800 group-hover:text-brand-700">{item.title}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      {item.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="tag">#{tag}</span>
                      ))}
                    </div>
                  </div>
                  <span className="hidden shrink-0 text-xs text-slate-400 sm:block">{formatDate(item.createdAt)}</span>
                  <IconArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand-500" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
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
