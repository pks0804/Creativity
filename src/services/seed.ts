// 처음 실행 시 보여줄 샘플 데이터입니다. (임시)
import type { Comment, Lecture, Research } from './types';

const PROF = { authorId: 'test-admin', authorName: '테스트 교수' };

export const seedData: { research: Research[]; lectures: Lecture[]; comments: Comment[] } = {
  research: [
    {
      id: 'r1',
      title: '항암제 병용요법의 약동학적 상호작용 분석',
      summary: '두 가지 항암제를 함께 투여했을 때 혈중 농도 변화를 문헌 기반으로 정리한 자료입니다.',
      tags: ['약동학', '항암제'],
      links: [{ label: '정리 문서 (Google Drive)', url: 'https://drive.google.com/' }],
      ...PROF,
      createdAt: '2026-10-01T09:00:00.000Z',
    },
    {
      id: 'r2',
      title: '노인 환자 다약제 복용 실태 문헌 리뷰',
      summary: '65세 이상 환자의 다약제 복용(polypharmacy) 관련 최근 논문을 요약했습니다.',
      tags: ['임상약학', '문헌리뷰'],
      links: [
        { label: 'PubMed 검색 결과', url: 'https://pubmed.ncbi.nlm.nih.gov/' },
        { label: '요약 슬라이드', url: 'https://docs.google.com/' },
      ],
      ...PROF,
      createdAt: '2026-10-10T09:00:00.000Z',
    },
    {
      id: 'r3',
      title: '약물 전달 시스템(DDS) 나노입자 설계 아이디어',
      summary: '지질 나노입자를 이용한 표적 전달 아이디어를 모았습니다. 토론 환영합니다.',
      tags: ['약제학', '나노입자'],
      links: [{ label: '아이디어 노트', url: 'https://docs.google.com/' }],
      ...PROF,
      createdAt: '2026-10-20T09:00:00.000Z',
    },
  ],
  lectures: [
    {
      id: 'l1',
      title: '1주차: 약동학 개론',
      course: '약동학',
      links: [{ label: '강의 슬라이드', url: 'https://drive.google.com/' }],
      ...PROF,
      createdAt: '2026-09-02T09:00:00.000Z',
    },
    {
      id: 'l2',
      title: '2주차: 흡수와 분포',
      course: '약동학',
      links: [
        { label: '강의 슬라이드', url: 'https://drive.google.com/' },
        { label: '참고 자료', url: 'https://www.ncbi.nlm.nih.gov/' },
      ],
      ...PROF,
      createdAt: '2026-09-09T09:00:00.000Z',
    },
  ],
  comments: [
    {
      id: 'c1',
      researchId: 'r1',
      text: '상호작용 기전 부분에서 CYP3A4 관련 내용을 더 찾아보겠습니다.',
      authorId: 'test-member',
      authorName: '테스트 대학원생',
      createdAt: '2026-10-02T10:00:00.000Z',
    },
    {
      id: 'c2',
      researchId: 'r1',
      text: '좋습니다. 다음 랩미팅 때 같이 이야기해 봅시다.',
      ...PROF,
      createdAt: '2026-10-02T12:00:00.000Z',
    },
    {
      id: 'c3',
      researchId: 'r3',
      text: '입자 크기 범위를 어느 정도로 잡을지 궁금합니다.',
      authorId: 'test-member',
      authorName: '테스트 대학원생',
      createdAt: '2026-10-21T10:00:00.000Z',
    },
  ],
};
