// "최근 논문" 탭에 교수님이 "한 번에 불러오기" 버튼으로 Firestore에 넣을 수 있도록 준비해 둔 논문 10편입니다.
// TPD·PROTAC·유도 근접 분야에서 인용이 많은 고영향 논문을 Crossref 피인용 수 기준으로 선별했습니다.
// createdAt 에는 논문 출판일을 넣어 분류별로 최신 논문이 위에 오게 했습니다.
// 이미 같은 제목이 있으면 건너뛰므로 버튼을 여러 번 눌러도 중복되지 않습니다.
import type { LectureInput } from '../services/types';

export type PreparedLecture = LectureInput & { createdAt: string };

const doi = (id: string) => ({ label: 'DOI (논문 원문)', url: `https://doi.org/${id}` });

const TPD = '표적 단백질 분해(TPD) · PROTAC';
const PROXIMITY = '유도 근접(Induced Proximity)';

export const PREPARED_LECTURES: PreparedLecture[] = [
  // 표적 단백질 분해(TPD) · PROTAC
  {
    title: 'PROTAC targeted protein degraders: the past is prologue (Békés, Langley, Crews · Nat Rev Drug Discov 2022)',
    course: TPD,
    links: [doi('10.1038/s41573-021-00371-6')],
    createdAt: '2022-01-18T00:00:00.000Z',
  },
  {
    title: 'Targeted protein degradation: mechanisms, strategies and application (Zhao et al. · Signal Transduct Target Ther 2022)',
    course: TPD,
    links: [doi('10.1038/s41392-022-00966-4')],
    createdAt: '2022-04-04T00:00:00.000Z',
  },
  {
    title: 'PROTACs: past, present and future (Li, Crews · Chem Soc Rev 2022)',
    course: TPD,
    links: [doi('10.1039/d2cs00193d')],
    createdAt: '2022-01-01T00:00:00.000Z',
  },
  {
    title: 'Protein degraders enter the clinic — a new approach to cancer therapy (Chirnomas, Hornberger, Crews · Nat Rev Clin Oncol 2023)',
    course: TPD,
    links: [doi('10.1038/s41571-023-00736-3')],
    createdAt: '2023-02-13T00:00:00.000Z',
  },
  {
    title: 'Targeted protein degradation: advances in drug discovery and clinical practice (Zhong et al. · Signal Transduct Target Ther 2024)',
    course: TPD,
    links: [doi('10.1038/s41392-024-02004-x')],
    createdAt: '2024-11-06T00:00:00.000Z',
  },
  // 유도 근접(Induced Proximity)
  {
    title: 'The rise of molecular glues (Schreiber · Cell 2021)',
    course: PROXIMITY,
    links: [doi('10.1016/j.cell.2020.12.020')],
    createdAt: '2021-01-01T00:00:00.000Z',
  },
  {
    title: 'Proximity-based modalities for biology and medicine (Liu, Ciulli · ACS Cent Sci 2023)',
    course: PROXIMITY,
    links: [doi('10.1021/acscentsci.3c00395')],
    createdAt: '2023-07-14T00:00:00.000Z',
  },
  {
    title: 'Rewiring cancer drivers to activate apoptosis (Gourisankar et al. · Nature 2023)',
    course: PROXIMITY,
    links: [doi('10.1038/s41586-023-06348-2')],
    createdAt: '2023-07-26T00:00:00.000Z',
  },
  {
    title: 'Molecular glues and bifunctional compounds: therapeutic modalities based on induced proximity (Schreiber · Cell Chem Biol 2024)',
    course: PROXIMITY,
    links: [doi('10.1016/j.chembiol.2024.05.004')],
    createdAt: '2024-06-01T00:00:00.000Z',
  },
  {
    title: 'Targeted protein relocalization via protein transport coupling (Ng et al. · Nature 2024)',
    course: PROXIMITY,
    links: [doi('10.1038/s41586-024-07950-8')],
    createdAt: '2024-09-18T00:00:00.000Z',
  },
];
