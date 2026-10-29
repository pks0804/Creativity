// 홈 화면 "최신 뉴스" 코너에 보이는 연구실 소식입니다.
// 새 소식은 배열 맨 앞에 하나 더 추가하면 됩니다. (날짜 최신순으로 최대 3개가 홈에 보입니다)
// image 는 선택 사항입니다. public/images 폴더의 그림 경로를 적어 주세요.

export interface NewsItem {
  date: string; // YYYY-MM-DD
  title: string;
  source: string;
  summary: string;
  url: string;
  image?: string;
}

export const NEWS: NewsItem[] = [
  {
    date: '2026-09-09',
    title: '단백질 신호만 선택 제거 ‘bioPhosTAC’ 개발',
    source: 'BRIC Bio뉴스 (Bio통신원 · 계명대학교)',
    summary:
      '계명대 권택규·박광수 교수, 연세대 신동혁 교수 공동연구팀이 원하는 단백질의 특정 인산화 신호만 선택적으로 제거하는 bioPhosTAC 기술을 개발해 Advanced Science에 게재했습니다. 탈인산화 효소 SHP2를 OTUB1 가까이 끌어와 Y26 인산화만 정밀하게 제거했고, 암세포 선택적 사멸과 동물 모델에서의 종양 억제 효과를 확인했습니다.',
    url: 'https://www.ibric.org/bric/trend/bio-news.do?mode=view&articleNo=10053550',
    image: '/images/toc-otub1-biophostac.png',
  },
];
