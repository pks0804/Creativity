// "연구 분야" 페이지 내용 (기존 홈페이지 Research 페이지에서 옮겨 옴)
// image 는 public/images 폴더의 파일 이름입니다. 파일이 아직 없으면 "이미지 준비 중"으로 표시됩니다.

export interface FeaturedPaper {
  title: string;
  abstract: string;
  reference: string;
  doi: string;
  image?: string;
}

export interface ResearchArea {
  id: string;
  title: string;
  paragraphs: string[];
  video?: { youtubeId: string; title: string };
  featured?: FeaturedPaper[];
  examples?: { label: string; url: string }[];
}

export const RESEARCH_OVERVIEW_IMAGES = [
  { src: '/images/research-overview.jpg', caption: 'Protein Modulating Drug Discovery' },
  { src: '/images/research-examples.jpg', caption: 'Protein Modulating Drug Examples' },
];

export const RESEARCH_AREAS: ResearchArea[] = [
  {
    id: 'protac',
    title: 'PROTAC Discovery',
    paragraphs: [
      "Proteolysis Targeting Chimeras (PROTACs) represent a paradigm shift in drug development. Unlike traditional small molecules that inhibit proteins, PROTACs harness the cell's own machinery to selectively degrade target proteins. This innovative approach opens new avenues for treating diseases that were once considered challenging to address.",
      'At the forefront of modern pharmacology, PROTACs hold the promise of precise and potent therapeutic interventions. By leveraging the principles of targeted protein degradation, we aim to revolutionize the way we combat diseases, including those driven by undruggable targets.',
      "Our lab is dedicated to advancing PROTAC discovery through cutting-edge design, synthesis, and validation strategies. We believe that collaboration and innovation are fundamental to unlocking the full potential of this transformative technology. Together, we're poised to shape the future of medicine through the development of next-generation therapeutics.",
    ],
    video: { youtubeId: 'mpH3ur97_qk', title: 'Introduction of PROTAC (Korean)' },
  },
  {
    id: 'bridged-protac',
    title: 'Advanced PROTAC Discovery: Bridged PROTAC',
    paragraphs: [],
    featured: [
      {
        title: 'Bridged Proteolysis Targeting Chimera (PROTAC) Enables Degradation of Undruggable Targets',
        abstract:
          "Proteolysis Targeting Chimeras (PROTACs) are attractive therapeutic modalities for degrading disease-causing proteins. While many PROTACs have been developed for numerous protein targets, current small-molecule PROTAC approaches cannot target undruggable proteins that do not have small-molecule binders. Here, we present a novel PROTAC approach, termed bridged PROTAC, which utilizes a small-molecule binder of the target protein's binding partner to recruit the protein complex into close proximity with an E3 ubiquitin ligase to target undruggable proteins. Applying this bridged PROTAC strategy, we discovered MS28, the first-in-class degrader of cyclin D1, which lacks a small-molecule binder. MS28 effectively degrades cyclin D1, with faster degradation kinetics and superior degradation efficiency than CDK4/6, through recruiting the CDK4/6-cyclin D1 complex to the von Hippel–Lindau E3 ligase. MS28 also suppressed the proliferation of cancer cells more effectively than CDK4/6 inhibitors and degraders. Altogether, the bridged PROTAC strategy could provide a generalizable platform for targeting undruggable proteins.",
        reference: 'J. Am. Chem. Soc. 2022, 144, 49, 22622–22632.',
        doi: '10.1021/jacs.2c09255',
        image: '/images/toc-bridged-protac.jpg',
      },
    ],
    video: { youtubeId: '1-wepOANB_U', title: 'Introduction of Bridged PROTAC (Korean)' },
  },
  {
    id: 'covalent',
    title: 'Covalent Inhibitor Discovery',
    paragraphs: [
      'Covalent inhibitors represent a powerful class of compounds in the realm of drug discovery. Unlike traditional non-covalent inhibitors, covalent compounds form a durable bond with their target proteins, offering enhanced selectivity and prolonged pharmacological effects. This distinctive mode of action has garnered significant interest in recent years.',
      'At our lab, we are at the forefront of covalent inhibitor research, dedicated to pioneering innovative strategies for the design and development of these promising therapeutics. Through meticulous molecular design and rigorous validation, we aim to create tailored covalent inhibitors targeting a diverse range of disease-associated proteins.',
      'Our collaborative approach, combining expertise in chemistry, biology, and computational methods, allows us to navigate the complexities of covalent binding, ensuring the precision and efficacy of our inhibitors. Together, we are shaping the future of medicine with the next generation of covalent therapeutics.',
    ],
    featured: [
      {
        title: 'Discovery of the First-in-Class G9a/GLP Covalent Inhibitors',
        abstract:
          'The highly homologous protein lysine methyltransferases G9a and GLP, which catalyze mono- and dimethylation of histone H3 lysine 9 (H3K9), have been implicated in various human diseases. To investigate functions of G9a and GLP in human diseases, we and others reported several noncovalent reversible small-molecule inhibitors of G9a and GLP. Here, we report the discovery of the first-in-class G9a/GLP covalent irreversible inhibitors, 1 and 8 (MS8511), by targeting a cysteine residue at the substrate binding site. We characterized these covalent inhibitors in enzymatic, mass spectrometry based and cellular assays and using X-ray crystallography. Compared to the noncovalent G9a/GLP inhibitor UNC0642, covalent inhibitor 8 displayed improved potency in enzymatic and cellular assays. Interestingly, compound 8 also displayed potential kinetic preference for covalently modifying G9a over GLP. Collectively, compound 8 could be a useful chemical tool for studying the functional roles of G9a and GLP by covalently modifying and inhibiting these methyltransferases.',
        reference: 'J. Med. Chem. 2022, 65, 15, 10506–10522.',
        doi: '10.1021/acs.jmedchem.2c00652',
        image: '/images/toc-g9a-covalent.jpg',
      },
    ],
  },
  {
    id: 'ptm',
    title: 'Discovery of Post-Translational Modification (PTM) Modulators',
    paragraphs: [
      'Ultimately, our lab aims to broaden the scope of heterobifunctional technology for fine-tuning the PTM status of the disease-related proteins we target. Leveraging our expertise in PROTACs, our team will engineer heterobifunctional compounds capable of commandeering the PTM process of the designated protein. These innovative molecules hold the potential to usher in a new era, allowing for a comprehensive exploration of the intricate functions associated with the specific PTM status of our target proteins.',
    ],
    featured: [
      {
        title: 'Selective Modulation of OTUB1 Noncanonical Function via a bioPhosTAC Strategy',
        abstract:
          'OTUB1 is a canonical deubiquitinating enzyme that hydrolyzes K48-linked polyubiquitin chains as well as a regulator of several noncanonical pathways controlled by site-specific post-translational modifications. Phosphorylation at tyrosine 26 (Y26) of OTUB1 recently emerged as a key regulatory switch that stabilizes Raptor (central component of mTORC1), thereby enhancing mTORC1 activity and influencing cell growth and metabolism. Selective modulation of Y26 phosphorylation offers an opportunity to elucidate the noncanonical roles of OTUB1 without perturbing its catalytic activity. However, genetic or kinase inhibition strategies lack the specificity to separate these functions. Here, a tyrosine-specific targeted protein dephosphorylation strategy was developed by recruiting the protein tyrosine phosphatase, SHP2, to OTUB1 via a peptide-based bifunctional molecule, termed bioPhosTAC. This bioPhosTAC comprises an OTUB1-binding peptide linked to an SHP2-binding peptide through a short linker, enabling proximity-induced Y26 dephosphorylation. The bioPhosTAC selectively reduced OTUB1 Y26 phosphorylation, resulting in Raptor-related mitochondrial fusion and Bim upregulation. This study represents the first demonstration of a peptide-based SHP2-mediated bioPhosTAC system for selective tyrosine dephosphorylation through induced proximity. These findings provide a new chemical biology tool for dissecting the noncanonical roles of OTUB1 and broaden the scope of targeted protein dephosphorylation strategies to tyrosine phosphorylation, potentially allowing precise modulation of phospho-dependent signaling.',
        reference: 'Seo SU, …, Park KS, Kwon TK. Adv. Sci. 2026, e77265.',
        doi: '10.1002/advs.77265',
        image: '/images/toc-otub1-biophostac.jpg',
      },
    ],
    examples: [
      { label: 'Deubiquitination', url: 'https://www.nature.com/articles/s41589-022-00971-2' },
      { label: 'Acetylation', url: 'https://pubs.acs.org/doi/10.1021/jacs.3c04640' },
      { label: 'Phosphorylation', url: 'https://pubs.acs.org/doi/10.1021/jacs.0c05537' },
      { label: 'Dephosphorylation', url: 'https://pubs.acs.org/doi/abs/10.1021/jacs.2c11706' },
    ],
  },
];
