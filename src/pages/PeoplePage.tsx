import { CONTACT, LAB } from '../content/labInfo';
import { MEMBERS_BY_YEAR, MEMBER_PHOTOS, PI_PROFILE } from '../content/people';
import { PageHeader } from '../components/PageHeader';
import { SectionHeading } from '../components/SectionHeading';
import { Photo } from '../components/Photo';
import { IconExternal, IconMail, IconPin, IconUsers } from '../components/Icons';

export default function PeoplePage() {
  return (
    <div className="space-y-14">
      <PageHeader icon={<IconUsers className="h-6 w-6" />} title="구성원" description="People · 지도교수와 연구실 구성원" />

      {/* 지도교수 */}
      <section className="card grid gap-8 md:grid-cols-[16rem_1fr]">
        <Photo src={PI_PROFILE.photo} alt={CONTACT.piName} className="aspect-[3/4]" />
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold text-brand-600">Principal Investigator</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{CONTACT.piName}</h2>
            <p className="mt-1 text-slate-600">
              {CONTACT.title} · {LAB.college}, {LAB.university}
            </p>
          </div>
          <div className="space-y-2 text-sm text-slate-600">
            <p className="flex items-start gap-2"><IconMail className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" /><a href={`mailto:${CONTACT.email}`} className="hover:text-brand-700 hover:underline">{CONTACT.email}</a></p>
            <p className="flex items-start gap-2"><IconPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />{CONTACT.address}</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="mb-2 font-bold text-slate-900">Education</h3>
              <ul className="space-y-1.5 text-sm text-slate-600">
                {PI_PROFILE.education.map((item) => <li key={item}>· {item}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-bold text-slate-900">Professional Experience</h3>
              <ul className="space-y-1.5 text-sm text-slate-600">
                {PI_PROFILE.experience.map((item) => <li key={item}>· {item}</li>)}
              </ul>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary">LinkedIn <IconExternal className="h-4 w-4" /></a>
            <a href={CONTACT.scholar} target="_blank" rel="noopener noreferrer" className="btn-secondary">Google Scholar <IconExternal className="h-4 w-4" /></a>
          </div>
        </div>
      </section>

      {/* 연도별 구성원 */}
      <section>
        <SectionHeading eyebrow="Lab Members" title="연구실 구성원" />
        <ul className="grid gap-3 md:grid-cols-2">
          {MEMBERS_BY_YEAR.map((group) => (
            <li key={group.year} className="card">
              <p className="text-sm font-bold text-brand-600">{group.year}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{group.members}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 단체 사진 */}
      <section>
        <SectionHeading eyebrow="Photos" title="함께한 사람들" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MEMBER_PHOTOS.map((photo) => (
            <figure key={photo.src} className="card space-y-3 p-3 sm:p-3">
              <Photo src={photo.src} alt={photo.title} />
              <figcaption className="px-1 pb-1">
                <p className="font-semibold text-slate-800">{photo.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{photo.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
