// "구성원"과 "사진" 페이지 내용 (기존 홈페이지 People / Group Photo 페이지에서 옮겨 옴)
// 사진 파일은 public/images 폴더에 아래 이름으로 넣으면 자동으로 표시됩니다.

export const PI_PROFILE = {
  photo: '/images/pi.jpg',
  education: [
    'Ph.D., Bioscience and Biotechnology, Konkuk University, 2017',
    'M.S., Bioscience and Biotechnology, Konkuk University, 2010',
    'B.S., Molecular Biology, Konkuk University, 2008',
  ],
  experience: [
    'Assistant Professor, Keimyung University, Daegu, Korea (2023 – Present)',
    'Instructor, Icahn School of Medicine at Mount Sinai, New York, USA (2022 – 2023, Advisor: Dr. Jian Jin)',
    'Postdoctoral Fellow, Icahn School of Medicine at Mount Sinai, New York, USA (2017 – 2022, Advisor: Dr. Jian Jin)',
    'Researcher, Samsung Biomedical Research Institute (SBRI), Suwon, Korea (2010 – 2013)',
  ],
};

// 연도별 구성원 명단 (최신이 위)
export const MEMBERS_BY_YEAR = [
  {
    year: '2026',
    members: 'Seo Yoon Jang (MS), Kang Bin Park (MS), Amalia Rifani (MS), Bosung Kim (PharmD candidate), Hanbi Kim (Internship), Dr. Taegum Lee',
  },
  {
    year: '2025',
    members: 'Seo Yoon Jang (MS), Kang Bin Park (MS), Bosung Kim (PharmD candidate), Minju Park (Internship), Dr. Taegum Lee',
  },
  { year: '2024', members: 'Seo Yoon Jang, Kang Bin Park, Bosung Kim, Sumin Park' },
  {
    year: '2023 Winter Break Research Camp',
    members: 'Seo Yoon Jang, Bosung Kim (Awarded), SeounYu Kim, Sumin Park, Hojin Seo, Won-Jae Noh',
  },
];

// 구성원 페이지의 단체 사진
export const MEMBER_PHOTOS = [
  {
    src: '/images/members-2025-spring.jpg',
    title: '2025 Spring',
    caption: 'Kang Bin Park, Seo Yoon Jang, Sumin Park, Bosung Kim, Sangmok Lee',
  },
  {
    src: '/images/members-2025-spring-jin.jpg',
    title: '2025 Spring · PSK with Dr. Jian Jin',
    caption: 'Kang Bin Park, Seo Yoon Jang and Dr. Jian Jin',
  },
  {
    src: '/images/members-2025-may.jpg',
    title: '2025 May',
    caption: 'Kang Bin Park, Seo Yoon Jang, Minju Park, Seung Hyun Lee, Dr. Taegum Lee',
  },
];

// 사진(갤러리) 페이지 앨범
export const GALLERY = [
  {
    title: '2025 Spring · PSK with Dr. Jian Jin',
    photos: ['/images/gallery-2025-jin-1.jpg', '/images/gallery-2025-jin-2.jpg', '/images/gallery-2025-jin-3.jpg'],
  },
  {
    title: '2025 Group Photo',
    photos: ['/images/gallery-2025-group-1.jpg', '/images/gallery-2025-group-2.jpg'],
  },
  {
    title: '2024 Group Photo',
    photos: ['/images/gallery-2024-group.jpg'],
  },
];
