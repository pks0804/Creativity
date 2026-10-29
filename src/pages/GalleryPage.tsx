import { GALLERY } from '../content/people';
import { PageHeader } from '../components/PageHeader';
import { SectionHeading } from '../components/SectionHeading';
import { Photo } from '../components/Photo';
import { IconPhoto } from '../components/Icons';

export default function GalleryPage() {
  return (
    <div className="space-y-12">
      <PageHeader icon={<IconPhoto className="h-6 w-6" />} title="사진" description="Group Photo · 연구실의 순간들" />
      {GALLERY.map((album) => (
        <section key={album.title}>
          <SectionHeading title={album.title} />
          {album.photos.length === 1 ? (
            // 사진이 한 장이면 세로 사진도 잘리지 않게 원래 비율(세로형)로 크게 보여줍니다.
            <div className="max-w-sm">
              <Photo src={album.photos[0]} alt={album.title} className="aspect-[2/3]" />
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {album.photos.map((src, i) => (
                <Photo key={src} src={src} alt={`${album.title} ${i + 1}`} />
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
