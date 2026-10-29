import { JOIN_ENGLISH, JOIN_KOREAN } from '../content/joinUs';
import { CONTACT } from '../content/labInfo';
import { PageHeader } from '../components/PageHeader';
import { IconMail, IconPin, IconUserPlus } from '../components/Icons';

export default function JoinUsPage() {
  return (
    <div className="space-y-8">
      <PageHeader icon={<IconUserPlus className="h-6 w-6" />} title="지원 안내" description="Join Us · 대학원생·학부연구생 모집" />

      <section className="card space-y-4 text-[15px] leading-8 text-slate-700">
        <h2 className="text-lg font-bold text-slate-900">연구실 소개 및 모집 안내</h2>
        {JOIN_KOREAN.map((text) => <p key={text.slice(0, 20)}>{text}</p>)}
      </section>

      <section className="card space-y-5">
        <h2 className="text-lg font-bold text-slate-900">We are hiring!</h2>
        <p className="text-[15px] leading-8 text-slate-700">{JOIN_ENGLISH.intro}</p>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-5">
            <h3 className="mb-3 font-bold text-slate-900">Responsibilities</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              {JOIN_ENGLISH.responsibilities.map((item) => <li key={item}>✓ {item}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl bg-slate-50 p-5">
            <h3 className="mb-3 font-bold text-slate-900">Qualifications</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              {JOIN_ENGLISH.qualifications.map((item) => <li key={item}>✓ {item}</li>)}
            </ul>
          </div>
        </div>
        <p className="text-sm text-slate-700">{JOIN_ENGLISH.closing}</p>
      </section>

      <section className="flex flex-col gap-4 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="space-y-2 text-sm text-brand-100">
          <p className="text-lg font-bold text-white">지원 및 문의</p>
          <p className="flex items-start gap-2"><IconMail className="mt-0.5 h-4 w-4 shrink-0" />{CONTACT.email} (CV, 자기소개서, 성적증명서)</p>
          <p className="flex items-start gap-2"><IconPin className="mt-0.5 h-4 w-4 shrink-0" />{CONTACT.addressKorean}</p>
        </div>
        <a href={`mailto:${CONTACT.email}`} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-800 shadow-lg transition hover:bg-brand-50">
          <IconMail className="h-4 w-4" /> 이메일 보내기
        </a>
      </section>
    </div>
  );
}
