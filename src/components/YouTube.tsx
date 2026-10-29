// 유튜브 영상 삽입 (youtube-nocookie: 재생 전에는 추적 쿠키를 남기지 않는 주소)
export function YouTube({ id, title }: { id: string; title: string }) {
  return (
    <figure className="space-y-2">
      <div className="aspect-video overflow-hidden rounded-2xl bg-slate-900 shadow-sm">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <figcaption className="text-sm text-slate-500">▶ {title}</figcaption>
    </figure>
  );
}
