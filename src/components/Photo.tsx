// 사진 칸. public/images 에 파일이 아직 없으면 깨진 그림 대신 "이미지 준비 중"을 보여줍니다.
import { useState } from 'react';
import { IconCapsule } from './Icons';

interface Props {
  src: string;
  alt: string;
  className?: string; // 크기·비율 지정용 (예: "aspect-[4/3]")
}

export function Photo({ src, alt, className = 'aspect-[4/3]' }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`flex w-full flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-brand-50 to-slate-100 text-brand-300 ${className}`}>
        <IconCapsule className="h-8 w-8" />
        <span className="text-xs text-slate-400">이미지 준비 중</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`w-full rounded-2xl bg-slate-100 object-cover ${className}`}
    />
  );
}
