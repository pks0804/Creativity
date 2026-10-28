// 사이트를 처음 열 때 교수님이 "불러오기" 버튼 한 번으로 Firestore에 넣을 수 있도록 준비해 둔 자료입니다.
// - 연구 자료: Google Scholar 프로필 기준 최근 5년(2022~2026) 학술지 논문
//   (학회 초록, 프리프린트, 학술지 안내 글, 책 챕터는 제외)
// - 수업 자료: TPD·PROTAC·유도 근접 분야에서 인용이 많은 고영향 논문 5편
// createdAt 에는 논문 출판일(온라인 게재일)을 넣어, 목록이 최신 논문 순으로 정렬되게 했습니다.
// 이미 같은 제목의 자료가 있으면 건너뛰므로 버튼을 여러 번 눌러도 중복되지 않습니다.
import type { LectureInput, ResearchInput } from '../services/types';

export type PreparedResearch = ResearchInput & { createdAt: string };
export type PreparedLecture = LectureInput & { createdAt: string };

const doi = (id: string) => ({ label: 'DOI (논문 원문)', url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: 'PubMed', url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

export const PREPARED_RESEARCH: PreparedResearch[] = [
  {
    title: 'Induced proximity for dephosphorylation',
    summary:
      'Trends in Pharmacological Sciences (2026) · 제1저자\n\n' +
      '탈인산화효소(phosphatase)를 표적 단백질 가까이 끌어와 인산기를 선택적·가역적으로 제거하는 "유도 근접 탈인산화" 전략을 정리한 포럼 논문입니다. 작용 원리, 최근 연구 동향, 치료적 의미를 다룹니다.',
    tags: ['유도근접', '탈인산화', '리뷰'],
    links: [doi('10.1016/j.tips.2026.02.010'), pubmed('41887949')],
    createdAt: '2026-03-25T00:00:00.000Z',
  },
  {
    title: 'Selective Modulation of OTUB1 Noncanonical Function via a bioPhosTAC Strategy',
    summary:
      'Advanced Science (2026)\n\n' +
      '펩타이드 기반 이중기능 분자(bioPhosTAC)로 티로신 탈인산화효소 SHP2를 OTUB1에 끌어와 Y26 인산화만 선택적으로 낮춘 연구입니다. 효소 활성은 건드리지 않고 OTUB1의 비정형(noncanonical) 기능을 분리해 볼 수 있는 화학생물학 도구를 제시했습니다.',
    tags: ['유도근접', '탈인산화', 'PhosTAC'],
    links: [doi('10.1002/advs.77265')],
    createdAt: '2026-08-20T00:00:00.000Z',
  },
  {
    title:
      'DR. DEGMON: self-explainable deep neural network for drug-induced cell viability prediction incorporating differentially expressed genes and gene ontology',
    summary:
      'BMC Medical Genomics (2026)\n\n' +
      '약물 처리 후 차등 발현 유전자와 Gene Ontology 구조를 신경망에 반영해 암세포 생존율을 예측하고, 어떤 유전자·경로가 예측에 기여했는지 설명할 수 있는 딥러닝 모델(DR.DEGMON)을 제안했습니다.',
    tags: ['인공지능', '약물반응예측'],
    links: [doi('10.1186/s12920-026-02434-2'), pubmed('42482086')],
    createdAt: '2026-07-21T00:00:00.000Z',
  },
  {
    title: 'Discovery of a Potent, Selective, and In Vivo Efficacious Covalent Inhibitor for Lysine Methyltransferase SETD8',
    summary:
      'Journal of Medicinal Chemistry (2026)\n\n' +
      '프로피올아마이드 공유결합 탄두를 가진 SETD8 공유결합 억제제 MS2928을 개발했습니다. 질량분석·X선 결정구조로 결합 방식을 확인했고, SETD8 고발현 다발골수종 세포와 이종이식 마우스 모델에서 효과를 보였습니다.',
    tags: ['공유결합억제제', '후성유전학', '다발골수종'],
    links: [doi('10.1021/acs.jmedchem.5c02958'), pubmed('41693203')],
    createdAt: '2026-02-15T00:00:00.000Z',
  },
  {
    title: 'Advancing PROTAC discovery through artificial intelligence: opportunities, challenges, and future directions',
    summary:
      'Pharmaceuticals (2025) · 제1저자\n\n' +
      'PROTAC 설계 과정(삼원 복합체 구조 예측, 분해 가능성 예측, 링커 설계, ADME 예측)에 인공지능을 어떻게 활용할 수 있는지와 남은 과제를 정리한 리뷰입니다.',
    tags: ['PROTAC', '인공지능', '리뷰'],
    links: [doi('10.3390/ph18121793'), pubmed('41471282')],
    createdAt: '2025-11-25T00:00:00.000Z',
  },
  {
    title: 'Development of a brain-penetrant G9a methylase inhibitor to target Alzheimer’s disease-associated proteopathology',
    summary:
      'Nature Communications (2025)\n\n' +
      '히스톤 메틸전이효소 G9a가 알츠하이머병 관련 단백질의 번역을 비정형적으로 조절한다는 기전을 밝히고, 뇌 투과성 G9a 억제제 MS1262가 여러 알츠하이머 마우스 모델에서 학습·기억 기능을 회복시킴을 보였습니다.',
    tags: ['후성유전학', 'G9a', '알츠하이머'],
    links: [doi('10.1038/s41467-025-59128-z'), pubmed('40328756')],
    createdAt: '2025-05-07T00:00:00.000Z',
  },
  {
    title: 'PROTAC delivery strategies for overcoming physicochemical properties and physiological barriers in targeted protein degradation',
    summary:
      'Pharmaceutics (2025)\n\n' +
      '분자량이 크고 소수성이 높은 PROTAC의 낮은 용해도·투과성·빠른 소실·hook effect 문제를 고분자 미셀, 지질 나노입자, 리포좀, 엑소좀 등 제형 기술로 극복하려는 전략을 정리한 리뷰입니다.',
    tags: ['PROTAC', '약물전달', '리뷰'],
    links: [doi('10.3390/pharmaceutics17040501'), pubmed('40284496')],
    createdAt: '2025-04-09T00:00:00.000Z',
  },
  {
    title: 'Epigenomic analysis identifies DTP subpopulation using HOPX to develop targeted therapy resistance in lung adenocarcinoma',
    summary:
      'iScience (2025)\n\n' +
      '단일세포 염색질 접근성 분석으로 폐선암 표적치료 내성의 원인인 약물 내성 지속세포(DTP) 하위집단을 찾고, HOPX가 NF-κB 활성과 억제성 히스톤 변형을 조절함을 보였습니다. 표적치료에 NF-κB 또는 히스톤 메틸전이효소 억제제를 병용하면 재성장이 거의 억제되었습니다.',
    tags: ['후성유전학', '폐암', '약물내성'],
    links: [doi('10.1016/j.isci.2025.112387'), pubmed('40352726')],
    createdAt: '2025-04-13T00:00:00.000Z',
  },
  {
    title: 'Newly developed oral bioavailable EHMT2 inhibitor as a potential epigenetic therapy for Prader-Willi syndrome',
    summary:
      'Molecular Therapy (2024)\n\n' +
      '기존 EHMT2/G9a 억제제 UNC0642의 낮은 뇌 투과성과 경구 생체이용률을 개선한 MS152를 개발해, 프라더-윌리 증후군 환자 섬유아세포와 마우스 모델에서 침묵된 유전자를 다시 발현시켰습니다.',
    tags: ['후성유전학', 'G9a', '희귀질환'],
    links: [doi('10.1016/j.ymthe.2024.05.034'), pubmed('38796700')],
    createdAt: '2024-05-24T00:00:00.000Z',
  },
  {
    title: 'Discovery and characterization of a novel cereblon-recruiting PRC1 bridged PROTAC degrader',
    summary:
      'Journal of Medicinal Chemistry (2024)\n\n' +
      'Bridged PROTAC 전략에 E3 리가아제 cereblon(CRBN)도 쓸 수 있음을 처음 보인 연구입니다. EED에 결합하는 CRBN 기반 분해제 MS181이 PRC1 구성요소 BMI1·RING1B를 선택적으로 분해했습니다.',
    tags: ['PROTAC', 'Bridged PROTAC', '후성유전학'],
    links: [doi('10.1021/acs.jmedchem.4c00538'), pubmed('38607318')],
    createdAt: '2024-04-12T00:00:00.000Z',
  },
  {
    title: 'Discovery of the first-in-class G9a/GLP PROTAC degrader',
    summary:
      'Journal of Medicinal Chemistry (2024)\n\n' +
      '최초의 G9a/GLP PROTAC 분해제 MS8709를 개발했습니다. 유비퀴틴-프로테아좀 의존적으로 G9a/GLP를 분해하며, 전립선암·백혈병·폐암 세포에서 기존 억제제(UNC0642)보다 우수한 성장 억제를 보였습니다.',
    tags: ['PROTAC', 'G9a', '후성유전학'],
    links: [doi('10.1021/acs.jmedchem.3c02394'), pubmed('38602846')],
    createdAt: '2024-04-11T00:00:00.000Z',
  },
  {
    title: 'Discovery of a potent, selective, and cell-active SPIN1 inhibitor',
    summary:
      'Journal of Medicinal Chemistry (2024)\n\n' +
      '구조-활성 관계 연구로 메틸-라이신 리더 단백질 SPIN1의 선택적 억제제 MS8535와 음성 대조 화합물을 개발했습니다. 38개 후성유전 표적 대비 높은 선택성과 마우스 생체이용률을 확인했습니다.',
    tags: ['후성유전학', '화학탐침'],
    links: [doi('10.1021/acs.jmedchem.4c00121'), pubmed('38533580')],
    createdAt: '2024-03-27T00:00:00.000Z',
  },
  {
    title: 'Discovery of a novel, highly potent EZH2 PROTAC degrader for targeting non-canonical oncogenic functions of EZH2',
    summary:
      'European Journal of Medicinal Chemistry (2024)\n\n' +
      'VHL을 이용하는 고효능 EZH2 PROTAC 분해제 MS8847을 개발했습니다. 촉매 억제제로는 막을 수 없는 EZH2의 비촉매 기능까지 억제하며, MLL 재배열 급성골수성백혈병과 삼중음성유방암 세포에서 효과를 보였습니다.',
    tags: ['PROTAC', 'EZH2', '암'],
    links: [doi('10.1016/j.ejmech.2024.116154'), pubmed('38295690')],
    createdAt: '2024-01-26T00:00:00.000Z',
  },
  {
    title: 'Targeted degradation of PRC1 components, BMI1 and RING1B, via a novel protein complex degrader strategy',
    summary:
      'Advanced Science (2023) · 제1저자\n\n' +
      '표적 단백질의 결합 파트너(EED)를 이용해 단백질 복합체째 분해하는 전략으로, 최초의 PRC1 핵심 구성요소(BMI1·RING1B) 분해제 MS147을 개발했습니다. PRC2 억제제/분해제에 반응하지 않는 암세포의 증식도 억제했습니다.',
    tags: ['PROTAC', 'Bridged PROTAC', '후성유전학'],
    links: [doi('10.1002/advs.202205573')],
    createdAt: '2023-02-03T00:00:00.000Z',
  },
  {
    title: 'Bridged proteolysis targeting chimera (PROTAC) enables degradation of undruggable targets',
    summary:
      'Journal of the American Chemical Society (2022)\n\n' +
      '저분자 결합체가 없는 "약물화 불가능(undruggable)" 단백질을, 그 결합 파트너의 리간드를 다리로 삼아 E3 리가아제 근처로 끌어와 분해하는 Bridged PROTAC 개념을 제시했습니다. 최초의 cyclin D1 분해제 MS28을 개발했습니다.',
    tags: ['PROTAC', 'Bridged PROTAC', '유도근접'],
    links: [doi('10.1021/jacs.2c09255'), pubmed('36448571')],
    createdAt: '2022-11-30T00:00:00.000Z',
  },
  {
    title: 'A cryptic transactivation domain of EZH2 binds AR and AR’s splice variant, promoting oncogene activation and tumorous transformation',
    summary:
      'Nucleic Acids Research (2022)\n\n' +
      'EZH2의 숨겨진 전사활성 도메인이 안드로겐 수용체(AR)와 변이체 AR-V7에 결합해 전립선암 발암 유전자를 활성화하는 기전을 밝혔습니다.',
    tags: ['EZH2', '후성유전학', '전립선암'],
    links: [doi('10.1093/nar/gkac861'), pubmed('36300627')],
    createdAt: '2022-10-01T00:00:00.000Z',
  },
  {
    title: 'Discovery of a first-in-class degrader for nuclear receptor binding SET domain protein 2 (NSD2) and Ikaros/Aiolos',
    summary:
      'Journal of Medicinal Chemistry (2022)\n\n' +
      '최초의 NSD2 PROTAC 분해제 MS159와 대조 화합물을 개발했습니다. CRBN 의존적으로 NSD2와 IKZF1/3을 분해하며, 다발골수종 세포 성장을 모(母)화합물보다 효과적으로 억제했습니다.',
    tags: ['PROTAC', 'NSD2', '다발골수종'],
    links: [doi('10.1021/acs.jmedchem.2c00807'), pubmed('35895319')],
    createdAt: '2022-07-27T00:00:00.000Z',
  },
  {
    title: 'Discovery of the first-in-class G9a/GLP covalent inhibitors',
    summary:
      'Journal of Medicinal Chemistry (2022) · 제1저자\n\n' +
      '기질 결합 부위의 시스테인을 표적으로 하는 최초의 G9a/GLP 공유결합 비가역 억제제(MS8511)를 개발하고, 효소·세포 실험과 X선 결정구조로 특성을 규명했습니다.',
    tags: ['공유결합억제제', 'G9a', '후성유전학'],
    links: [doi('10.1021/acs.jmedchem.2c00652'), pubmed('35763668')],
    createdAt: '2022-06-28T00:00:00.000Z',
  },
  {
    title: 'Targeting triple-negative breast cancer by a novel proteolysis targeting chimera degrader of enhancer of zeste homolog 2',
    summary:
      'ACS Pharmacology & Translational Science (2022)\n\n' +
      '삼중음성유방암에서 EZH2의 촉매 활성보다 단백질 자체의 과발현이 중요하다는 점에 착안해, EZH2 PROTAC 분해제 MS8815를 개발하고 환자 유래 세포에서도 효과를 확인했습니다.',
    tags: ['PROTAC', 'EZH2', '유방암'],
    links: [doi('10.1021/acsptsci.2c00100'), pubmed('35837138')],
    createdAt: '2022-06-24T00:00:00.000Z',
  },
  {
    title: 'EZH2 noncanonically binds cMyc and p300 through a cryptic transactivation domain to mediate gene activation and promote oncogenesis',
    summary:
      'Nature Cell Biology (2022)\n\n' +
      '급성 백혈병에서 EZH2가 PRC2와 무관하게 cMyc·p300과 결합해 유전자를 활성화하는 비정형 기능을 밝히고, 두 기능을 모두 제거하는 EZH2 PROTAC 분해제 MS177을 개발했습니다.',
    tags: ['PROTAC', 'EZH2', '백혈병'],
    links: [doi('10.1038/s41556-022-00850-x'), pubmed('35210568')],
    createdAt: '2022-02-24T00:00:00.000Z',
  },
  {
    title: 'Discovery of potent, selective, and in vivo efficacious AKT kinase protein degraders via structure–activity relationship studies',
    summary:
      'Journal of Medicinal Chemistry (2022)\n\n' +
      'AKT 분해제 MS21 개발로 이어진 구조-활성 관계 연구를 보고하고, VHL 기반 MS143과 CRBN 기반 MS5033을 새로 개발했습니다. MS143은 이종이식 모델에서 독성 없이 종양 성장을 억제했습니다.',
    tags: ['PROTAC', 'AKT', '암'],
    links: [doi('10.1021/acs.jmedchem.1c02165'), pubmed('35119851')],
    createdAt: '2022-02-04T00:00:00.000Z',
  },
  {
    title: 'A NSD3-targeted PROTAC suppresses NSD3 and cMyc oncogenic nodes in cancer cells',
    summary:
      'Cell Chemical Biology (2022)\n\n' +
      'NSD3 길항제 BI-9321과 VHL 리간드를 연결한 PROTAC MS9715를 개발해, NSD3와 연관된 cMyc 발암 경로를 함께 억제함을 보였습니다. 단순 길항제보다 분해가 더 효과적인 치료 전략임을 제시했습니다.',
    tags: ['PROTAC', 'NSD3', '암'],
    links: [doi('10.1016/j.chembiol.2021.08.004'), pubmed('34469831')],
    createdAt: '2021-08-31T00:00:00.000Z',
  },
];

// 수업 자료: TPD·PROTAC·유도 근접 분야 핵심 논문 5편 (Crossref 피인용 수 기준으로 선별)
export const PREPARED_LECTURES: PreparedLecture[] = [
  {
    title: 'PROTAC targeted protein degraders: the past is prologue (Békés, Langley, Crews · Nat Rev Drug Discov 2022)',
    course: '표적 단백질 분해(TPD) · PROTAC',
    links: [doi('10.1038/s41573-021-00371-6')],
    createdAt: '2022-01-18T00:00:00.000Z',
  },
  {
    title: 'Targeted protein degradation: mechanisms, strategies and application (Zhao et al. · Signal Transduct Target Ther 2022)',
    course: '표적 단백질 분해(TPD) · PROTAC',
    links: [doi('10.1038/s41392-022-00966-4')],
    createdAt: '2022-04-04T00:00:00.000Z',
  },
  {
    title: 'Protein degraders enter the clinic — a new approach to cancer therapy (Chirnomas, Hornberger, Crews · Nat Rev Clin Oncol 2023)',
    course: '표적 단백질 분해(TPD) · PROTAC',
    links: [doi('10.1038/s41571-023-00736-3')],
    createdAt: '2023-02-13T00:00:00.000Z',
  },
  {
    title: 'The rise of molecular glues (Schreiber · Cell 2021)',
    course: '유도 근접(Induced Proximity)',
    links: [doi('10.1016/j.cell.2020.12.020')],
    createdAt: '2021-01-01T00:00:00.000Z',
  },
  {
    title: 'Rewiring cancer drivers to activate apoptosis (Gourisankar et al. · Nature 2023)',
    course: '유도 근접(Induced Proximity)',
    links: [doi('10.1038/s41586-023-06348-2')],
    createdAt: '2023-07-26T00:00:00.000Z',
  },
];
