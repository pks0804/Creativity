// 기존 홈페이지(Google Sites) Publication 페이지에서 옮겨 온 전체 논문 목록입니다.
// 새 논문은 해당 연도 배열 맨 앞에 한 줄(문자열)로 추가하면 됩니다. 연도가 없으면 { year, items } 묶음을 새로 만드세요.
export interface PublicationYear {
  year: number;
  items: string[];
}

export const PUBLICATIONS: PublicationYear[] = [
  {
    year: 2026,
    items: [
      "Chen H*, Dutta RP*, Li Z*, Zhong Y*, Ma A*, Park KS *, Kottur J, Park A, Babault N, Wang K, Wang D, Xiong Y, Kaniskan HÜ, Luo M, Parekh S, Jin J. Discovery of a Potent, Selective, and In Vivo Efficacious Covalent Inhibitor for Lysine Methyltransferase SETD8. J Med Chem. 2026 69(4), 4255-4269.",
      "Park KS, Kwon TK. Induced proximity for dephosphorylation. Trends Pharmacol Sci. 2026 S0165-6147(26)00043-X. doi: 10.1016/j.tips.2026.02.010."
    ]
  },
  {
    year: 2025,
    items: [
      "Tian Y, Bhattacharya R, Yoo S, Jiang F, Park E, Laragranados G, Shen Y, Park KS, Kaniskan HU, Jin J, Hopkins B, Zhu J, Watanabe H. Epigenomic analysis identifies DTP subpopulation using HOPX to develop targeted therapy resistance in lung adenocarcinoma. iScience, 2025, 28(5), p112387.",
      "Xie L, Sheehy RN, Muneer A, Xiong Y, Wrobel JA, Zhang F, Park KS, Velez J, Liu J, Luo YJ, Asrican B, Dong P, Li YD, Damian C, Quintanilla L, Li Y, Xu C, Deshmukh M, Coleman LG Jr, Ming GL, Song H, Wen Z, Jin J, Song J, Chen X. Development of a brain-penetrant G9a methylase inhibitor to target Alzheimer's disease-associated proteopathology. Nat Commun. 2025, 16(1), p4222.",
      "Park KS, Jeon M. Advancing PROTAC Discovery Through Artificial Intelligence: Opportunities, Challenges, and Future Directions. Pharmaceuticals (Basel). 2025 18(12), p1793.",
      "Syahputra EW, Lee H, Cho H, Park HJ, Park KS #, Hwang D#. PROTAC Delivery Strategies for Overcoming Physicochemical Properties and Physiological Barriers in Targeted Protein Degradation. Pharmaceutics. 2025, 17(4), p501."
    ]
  },
  {
    year: 2024,
    items: [
      "Wang SE, Xiong Y, Jang MA, Park KS, Donahue M, Velez J, Jin J, Jiang YH. Newly developed oral bioavailable EHMT2 inhibitor as a potential epigenetic therapy for Prader-Willi syndrome. Mol Ther. 2024, 32(8), 2662-2675.",
      "Velez J, Han Y, Yim H, Yang P, Deng Z, Park KS, Kabir M, Kaniskan HÜ, Xiong Y, Jin J. Discovery of the First-in-Class G9a/GLP PROTAC Degrader. J Med Chem. 2024, 67(8), 6397-6409.",
      "Xiong Y, Greschik H, Johansson C, Seifert L, Gamble V, Park KS, Fagan V, Li F, Chau I, Vedadi M, Arrowsmith CH, Brennan P, Fedorov O, Jung M, Farnie G, Liu J, Oppermann U, Schüle R, Jin J. Discovery of a Potent, Selective, and Cell-Active SPIN1 Inhibitor. J Med Chem. 2024, 11, 67(7), 5837-5853.",
      "Kabir M, Qin L, Luo K, Xiong Y, Sidi RA, Park KS #, Jin J #. Discovery and Characterization of a Novel Cereblon-Recruiting PRC1 Bridged PROTAC Degrader. J Med Chem. 2024, 67(8), 6880-6892.",
      "Velez J, Dale B, Park KS, Kaniskan HÜ, Yu X, Jin J. Discovery of a novel, highly potent EZH2 PROTAC degrader for targeting non-canonical oncogenic functions of EZH2. Eur J Med Chem. 2024, 267, 116154."
    ]
  },
  {
    year: 2023,
    items: [
      "Park K. -S., * Qin, L., * Kabir M., * Luo, K., Dale, B., Zhong, Y., Kim, A., Wang, G. G., Kaniskan, H. Ü. and Jin, J. Targeted degradation of PRC1 components BMI1 and RING1B via a novel protein complex degrader strategy. Advanced Science, 2023, 10(10), 2205573."
    ]
  },
  {
    year: 2022,
    items: [
      "Xiong, Y., Zhong, Y., Yim, H., Yang, X., Park, K. -S., Xie, L., Poulikakos, P. I., Han, X., Xiong, Y., Chen, X., Liu, J., Jin, J. Bridged Proteolysis Targeting Chimera (PROTAC) Enables Degradation of Undruggable Targets. J Am Chem Soc. 2022, 144(49), 22622-22632.",
      "Wang, J.,* Park K. -S.,* Yu, X., Gong, W., Earp, H. S., Wang, G. G., Jin, J., Cai. L. A cryptic transactivation domain of EZH2 binds AR and AR’s splice variant promoting oncogene activation and prostate tumorigenesis. Nucleic Acids Research, 2022, 50(19), 10929-10946.",
      "Meng, F., Xu, C., Park, K. S., Kaniskan, H. Ü., Wang, G. G., and Jin, J. Discovery of a First-in-Class Degrader for Nuclear Receptor Binding SET Domain Protein 2 (NSD2) and Ikaros/Aiolos. Journal of medicinal chemistry, 2022, 65(15), 10611–10625.",
      "Dale, B., Anderson, C., Park, K. -S., Kaniskan, H., Ma, A., Shen, Y., Zhang, C., Xie, L., Chen, X., Yu, X., Jin, J. Targeting Triple-negative Breast Cancer by a Novel Proteolysis Targeting Chimera (PROTAC) Degrader of Enhancer of Zeste Homolog 2 (EZH2). ACS Pharmacol. Transl. Sci. 2022, 5(7), 491–507.",
      "Park, K. -S.,* Xiong, Y.,* Velez, J., Babault, N., Kumar, P., Yim, H., Liu, J., Jin, J. Discovery of a first-in-class G9a/GLP covalent inhibitor. Journal of medicinal chemistry 2022, 65, 15, 10506–10522.",
      "Wang, J., Yu, X., Gong, W., Liu, X., Park, K. S., Ma, A., Tsai, Y. H., Shen, Y., Onikubo, T., Pi, W. C., Allison, D. F., Liu, J., Chen, W. Y., Cai, L., Roeder, R. G., Jin, J., & Wang, G. G. EZH2 noncanonically binds cMyc and p300 through a cryptic transactivation domain to mediate gene activation and promote oncogenesis. Nature cell biology. 2022, 24(3), p. 384-399.",
      "Yu, X., Xu, J., Shen, Y., Cahuzac, K. M., Park, K. -S., Dale, B., Liu, J., Parsons, R. E., & Jin, J. Discovery of Potent, Selective, and In Vivo Efficacious AKT Kinase Protein Degraders via Structure-Activity Relationship Studies. Journal of medicinal chemistry 2022, 65(4), p. 3644-3666.",
      "Xu, C.; Meng, F.; Park, K. -S.; Storey, A. J.; Gong, W.; Tsai, Y. H.; Gibson, E.; Byrum, S. D.; Li, D.; Edmondson, R. D.; Mackintosh, S. G.; Vedadi, M.; Cai, L.; Tackett, A. J.; Kaniskan, H. Ü.; Jin, J.; Wang, G. G. A NSD3-targeted PROTAC suppresses NSD3 and cMyc oncogenic nodes in cancer cells. Cell chem. Biol. 2022, 29(3), p. 386-397.e9.",
      "Cao, T.;* Martini, M. L.;* Park, K. -S.;* Kaniskan, H. Ü.; Jin, J. Pyrimidines and Their Benzo Derivatives. In: Black, David StC, Cossy, Janine and Stevens, Christian V. Eds., Comprehensive Heterocyclic Chemistry IV; Elsevier, 2022, pp. 86-228."
    ]
  },
  {
    year: 2021,
    items: [
      "Yu, X.; Li, D.; Kottur, J.; Shen, Y.; Kim, H. S.; Park, K. -S.; Tsai, Y. H.; Gong, W.; Wang, J.; Suzuki, K.; Parker, J.; Herring, L.; Kaniskan, H. Ü.; Cai, L.; Jain, R.; Liu, J.; Aggarwal, A. K.; Wang, G. G.; Jin, J. A selective WDR5 degrader inhibits acute myeloid leukemia in patient-derived mouse models. Sci. Transl. Med. 2021, 13(613), eabj1578.",
      "Wei, J.; Meng, F.; Park, K. S.; Yim, H.; Velez, J.; Kumar, P.; Wang, L.; Xie, L.; Chen, H.; Shen, Y.; Teichman, E.; Li, D.; Wang, G. G.; Chen, X.; Kaniskan, H. Ü.; Jin, J. Harnessing the E3 Ligase KEAP1 for Targeted Protein Degradation. J. Am. Chem. Soc. 2021, 143(37), 15073–15083.",
      "Dale, B.; Cheng, M.; Park, K. -S.; Kaniskan, H. Ü.; Xiong, Y.; Jin, J. Advancing Targeted Protein Degradation for Cancer Therapy. Nat. Rev. Cancer. 2021, 21, 638–654.",
      "Luise, C.; Robaa, D.; Regenass, P.; Maurer, D.; Ostrovskyi, D.; Seifert, L.; Bacher, J.; Burgahn, T.; Wagner, T.; Seitz, J.; Greschik, H.; Park, K-S.; Xiong, Y.; Jin, J.; Schüle, R.; Breit, B.; Jung, M.; Sippl, W. Structure-Based Design, Docking and Binding Free Energy Calculations of A366 Derivatives as Spindlin1 Inhibitors. Int. J. Mol. Sci. 2021, 22, 5910.",
      "Shen, Y.; Li, F.; Szewczyk, M. M.; Halabelian, L.; Chau, I.; Eram, M. S.; Seña, C. D.; Park, K. -S.; Meng, F.; Chen, H.; Zeng, H.; Dong, A.; Wu, H.; Trush, V. V.; McLeod, D.; Zepeda-Velázquez, C. A.; Campbell, R. M.; Mader, M. M.; Watson, B. M.; Schapira, M.; Arrowsmith, C. H.; Al-Awar, R.; Barsyte-Lovejoy, D.; H. Kaniskan, H. Ü.; Brown, P. J.; Vedadi, M.; and Jin, J. A First-in-Class, Highly Selective and Cell-Active Allosteric Inhibitor of Protein Arginine Methyltransferase 6. J. Med. Chem. 2021 64, 7, 3697–3706."
    ]
  },
  {
    year: 2020,
    items: [
      "Shen, Y.; Li, F.; Szewczyk, M. M.; Halabelian, L.; Park, K. -S.; Chau, I.; Dong, A.; Zeng, H.; Chen, H.; Meng, F.; Barsyte-Lovejoy, D.; Arrowsmith, C. H.; Brown, P. J.; Liu, J.; Vedadi, M.; Jin, J. Discovery of a first-in-class protein arginine methyltransferase 6 (PRMT6) covalent inhibitor. J. Med. Chem. 2020, 63(10), 5477-5487",
      "Ma, A.;* Stratikopoulos, E.;* Park, K. -S.;* Wei, J.; Martin, T. C.; Yang, X.; Schwarz, M.; Leshchenko, V.; Rialdi, A.; Dale, B.; Lagana, A.; Guccione, E.; Parekh, S.; Parsons, R.; Jin, J. Discovery of a first-in-class EZH2 selective degrader. Nat. Chem. Biol. 2020, 16(2), 241-222"
    ]
  },
  {
    year: 2019,
    items: [
      "Xiong, Y.; Greschik, H.; Johansson, C.; Seifert, L.; Bacher, J.; Park, K. -S.; Babault, N.; Martini, M.; Fagan, V.; Li, F.; Chau, I.; Christott, T.; Dilworth, D.; Barsyte-Lovejoy, D.; Vedadi, M.; Arrowsmith, C.; Brennan, P.; Fedorov, O.; Jung, M.; Farnie, G.; Liu, J.; Oppermann, U.; Schüle, R.; Jin, J. Discovery of a Potent and Selective Fragment-like Inhibitor of Methyllysine Reader Protein Spindlin 1 (SPIN1). J. Med. Chem. 2019, 62(20), 8996-9007",
      "Ngo, T. D.; Oh, C.; Mizar, P.; Baek M.; Park, K -S.; Nguyen, L.; Byeon, H.; Yoon, S.; Ryu, Y.; Kim, T. H.; Yang, J. W.; Seok, C.; Lee, S. S.; Kim, K. K. Structural Basis for the Enantioselectivity of Esterase Est-Y29 toward (S)-Ketoprofen, ACS Catalysis. 2019, 9(1), 755-767"
    ]
  },
  {
    year: 2018,
    items: [
      "Ha, T. W.; Kim, M. K.; Park, K -S.; Jung, W.; Choo, H.; Chong, Y. Structural Modification of (-)-Epigallocatechin Gallate (EGCG) Shows Significant Enhancement in Mitochondrial Biogenesis, J. Agric. Food Chem, 2018, 66, 3850-3859"
    ]
  },
  {
    year: 2017,
    items: [
      "Park,K -S.*; Yoo, K.*; Kim, M. K.; Jung, W.; Choi, Y. K.; Chong, Y. A Novel Probe with a Chlorinated α-Cyanoacetophenone Acceptor Moiety Shows Near-Infrared Fluorescence Specific for Tau Fibrils, Chem. Pharm. Bull, 2017, 65, 1113-1116",
      "Park, K. -S,; Kim, M. K.; Seo, Y.; Ha, T.; Yoo, K.; Hyeon, S. J.; Hwang, Y. J.; Lee, J.; Ryu, H.; Choo, H.; Chong, Y. A Difluoroboron β-Diketonate Probe Shows “Turn-on” Near-Infrared Fluorescence Specific for Tau Fibrils, ACS Chem Neurosci, 2017, 8, 2124-2131.",
      "Park, K. -S,; Kim, M.; Choi, Y. K.; Chong, Y. Epigallocatechin‐3‐gallate (EGCG) Serves as a Novel Scaffold for Designing an Inhibitor of Plasminogen Activator Inhibitor‐1 (PAI‐1), Bull. Korean. Chem. Soc. 2017, 38, 964-967."
    ]
  },
  {
    year: 2016,
    items: [
      "Kim, M. K.; Park, K. -S.; Jung, W.; Choo, H.; Chong, Y. Quercetin 7- O -glutamate sensitizes P. aeruginosa to β -lactams and vancomycin. Bull. Korean. Chem. Soc. 2016, 37, 2025-2028.",
      "San, B. H.; Ravichandran, S.; Park, K. -S.; Subramani, V. K.; Kim, K. K. Bioinorganic Nanohybrid Catalyst for Multistep Synthesis of Acetaminophen, an Analgesic, ACS Appl Mater Interfaces, 2016, 8, 30058-30065.",
      "Park, K. -S.; Jung, W.; Chong, Y.; Kim, M. K. Quercetin 7- O -glutamate sensitizes Escherichia coli to vancomycin. J. Korean. Soc. Appl. Biol. Chem. 2016, 59, 755-758.",
      "Park, K. -S.; Choo, H.; Kim, M. K.; Chong, Y. Quercetin 7- O -Glutamate potentiates Staphylococcus aureus to fluoroquinolone antibiotics. Bull. Korean. Chem. Soc. 2016, 37, 1515-1517.",
      "Seo, Y.*; Park, K. -S,* Ha, T.; Kim, M. K.; Hwang, Y. J.; Lee, J.; Ryu, H.; Choo, H.; Chong, Y. A Smart near-Infrared Fluorescence Probe for Selective Detection of Tau Fibrils in Alzheimer's Disease, ACS Chem Neurosci, 2016, 7, 1474-81.",
      "Park, K. -S.; Chong, Y.; Kim, M. K. Myricetin: biological activity related to human health. Appl Biol. Chem. 2016 59, 259–269",
      "Moh, S. H.; Kulkarini, A.; San, B. H.; Lee, J. H.; Kim, D.; Park, K. -S.; Lee, M. H.; Kim, T.; Kim, K. K. Photocurrent enhancement of SiNW-FETs by integrating protein-shelled CdSe quantum dots. Nanoscale 2016, 8, 1921-1925."
    ]
  },
  {
    year: 2015,
    items: [
      "Park, K. -S.; Seo, Y.; Kim, M. K.; Kim K.; Kim Y. K.; Choo, H.; Chong, Y. A curcumin-based molecular probe for near-infrared fluorescence imaging of tau fibrils in Alzheimer's disease. Org. Biomol. Chem. 2015, 13, 11194-11199.",
      "Kim, M. K.; Park, K. -S.; Choo, H.; Chong, Y. Quercetin-POM (pivaloxymethyl) conjugates: Modulatory activity for P-glycoprotein-based multidrug resistance, Phytomedicine, 2015, 22, 778-785.",
      "Kim, M. K.; Shin H.; Park, K. -S.; Kim H.; Park J.; Kim K.; Nam J.; Choo, H.; Chong, Y. Benzimidazole Derivatives as Potent JAK1-Selective Inhibitors. J. Med. Chem. 2015, 58, 7596-7602.",
      "Kim K*; Park, K. -S.*; Kim, M. K.; Choo, H.; Chong, Y. Dicyanovinyl-substituted J147 analogue inhibits oligomerization and fibrillation of β-amyloid peptides and protects neuronal cells from β-amyloid-induced cytotoxicity. Org. Biomol. Chem. 2015, 13, 9564-9569.",
      "Park, K. -S.; Kim H.; Kim, M. K.; Kim K.; Chong, Y. Synthesis and biological evaluation of flavonol-glucose conjugates for cosmeceutical development. J. Korean. Soc. Appl. Biol. Chem. 2015, 58, 317-323."
    ]
  },
  {
    year: 2014,
    items: [
      "Kim S. Y.; Lee H. L.; Park, K. -S.; Kim B -G.; Ahn J -H. Metabolic engineering of Escherichia coli for the biosynthesis of flavonoid- O -glucuronides and flavonoid- O -galactoside. Appl. Microbiol. Biotechnol. 2014, 99, 2233-2242.",
      "Duong T.; Park, K -S.; Kim T.; Kang S. W.; Hahn M. J.; Hwang H. Y.; Jang I.; Oh H. B.; Kim K. K. Structural and functional characterization of an Isd-type haem-degradation enzyme from Listeria monocytogenes. Corrigendum. Acta Crystallogr., Sect D: Biol. Crystallogr. 2014, D70, 615-626.",
      "Kim D.; Hur J.; Park, K -S.; Bae S.; Shin D.; Ha S. C.; Hwang H -Y.; Hohng S.; Lee J -H.; Lee S.; Kim Y -G.; Kim K. K. Distinct Z-DNA binding mode of a PKR-like protein kinase containing a Z-DNA binding domain (PKZ). Nucleic Acids Res. 2014, 42, 5937-5948."
    ]
  },
  {
    year: 2013,
    items: [
      "Ngo T. D.; Ryu B. H.; Ju H.; Jang E.; Park, K -S.; Kim K. K.; Kim T. D. Structural and functional analyses of a bacterial homologue of hormone-sensitive lipase from a metagenomic library. Acta Crystallogr., Sect D: Biol. Crystallogr. 2013, D69, 1726-1737.",
      "Cho, S. Y.; Kim, M. K.; Park, K. -S.; Choo, H.; Chong, Y. Quercetin–POC conjugates; differential stability and bioactivity profiles between breast cancer (MCF-7) and colorectal carcinoma (HCT116) cell lines. Bioorg. Med. Chem. 2013, 12, 1671-1679."
    ]
  },
  {
    year: 2012,
    items: [
      "Kim, M. K.; Park, K. -S.; Chong, Y. Remarkable Stability and Cytostatic Effect of a Quercetin Conjugate, 3,7-Bis- O -Pivaloxymethyl (POM) Quercetin. ChemMedChem. 2012, 7, 229-232."
    ]
  },
  {
    year: 2011,
    items: [
      "Park H. R.*; Park, K. -S.*; Chong, Y. 2-Arylmethylaminomethyl-5,6-dihydroxy-chromone derivatives with selective anti-HCV activity. Bioorg. Med. Chem. Lett. 2011, 21, 3202-3205."
    ]
  },
  {
    year: 2010,
    items: [
      "Kim, M. K.*; Park, K. -S.*; Lee, C.; Park, H. R.; Choo, H.; Chong, Y. Enhanced stability and intracellular accumulation of quercetin by protection of the chemically or metabolically susceptible hydroxyl groups with a pivaloxymethyl (POM) promoiety. J. Med. Chem. 2010, 53, 8597-8607.",
      "Lee C.*; Park, K. -S.*; Park H. R.; Park J. C.; Lee B.; Kim D -E.; Chong, Y. 5-Hydroxychromone, an Alternative Scaffold for anti-HCV 1,3-Diketo Acid (DKA). Bull. Korean. Chem. Soc. 2010, 31, 3471-3473.",
      "Lee H. S.*; Park, K. -S.*; Lee C.; Lee B.; Kim D -E.; Chong, Y. 7- O -Arylmethyl-galangin as a novel scaffold for anti-HCV agents. Bioorg. Med. Chem. Lett. 2010, 20, 5709-5712.",
      "Lee H. S.*; Park, K. -S.*; Lee B.; Kim D -E.; Chong, Y. 3- O -Arylmethylgalangin, a novel isostere for anti-HCV 1,3-diketoacids (DKAs). Bioorg. Med. Chem. 2010, 18, 7331-7337.",
      "Choi W. J.; Kim Y. M.; Kim H. O.; Lee H. W.; Kim D -E.; Park, K. -S.; Chong, Y.; Jeong L. S. Synthesis and anti-hepatitis C virus (HCV) activity of 3 '- C -substituted-methyl pyrimidine and purine nucleosides. Bioorg. Med. Chem. 2010, 18, 4812-4820.",
      "Kang J -H.*; Park, K. -S.*; Chong, Y.; Choe J -W. Design of Human FIH1 Inhibitors through Virtual Screening. Bull. Korean. Chem. Soc. 2010, 31, 1407-1410.",
      "Park S.Y.; Lee B.; Park, K. -S.; Chong, Y.; Yoon M -Y.; Jeon S -J.; Kim D -E. Facilitation of polymerase chain reaction with thermostable inorganic pyrophosphatase from hyperthermophilic archaeon Pyrococcus horikoshii. Appl. Microbiol. Biotechnol. 2010, 85, 807-812."
    ]
  },
  {
    year: 2009,
    items: [
      "Park H.R.*; Park, K. -S.*; Choo J.; Chong, Y. 3D-QSAR of SIRT1 activators targeting against diet-induced metabolic syndrome. Bull. Korean. Chem. Soc. 2009, 30, 2117-2020.",
      "Kim, M. K.; Oh, Y. M.; Park, K. -S.; Chong, Y. A Novel Prodrug of Quercetin, 3- N, N -Dimethyl Carbamoyl Quercetin (DCQ), with Improved Stability against Hydrolysis in Cell Culture Medium. Bull. Korean Chem. Soc. 2009, 30, 2114-2116.",
      "Kim, M. K.; Park, K. -S.; Yeo, W. -S.; Choo, H.; Chong, Y. In vitro solubility, stability and permeability of novel quercetin-amino acid conjugates. Bioorg. Med. Chem. 2009, 17, 1164-1171."
    ]
  },
  {
    year: 2008,
    items: [
      "Kim J.; Lee H. S.; Park, K. -S.; Chong, Y. Unexpected Desilylative-alkylation of 3-O-tert-Butyl-dimethylsilyl Galangin. Bull. Korean Chem. Soc. 2008, 29, 1667-1668.",
      "Kim J.; Kim K -S.; Lee H.S.; Park, K. -S.; Park S. Y.; Kang S -Y.; Lee S. J.; Park H. S.; Kim D -E.; Chong, Y. Effects of the aryl linker and the aromatic substituent on the anti-HCV activities of aryl diketoacid (ADK) analogues. Bioorg. Med. Chem. Lett. 2008, 18, 4661-4665.",
      "Kim J.; Park, K. -S.; Yeo W -S.; Chong, Y. Quantum Mechanical Investigation of the Horner-Wadsworth-Emmons Reaction of Benzyl Pyridyl Ketone. Bull. Korean Chem. Soc. 2008, 29, 1269-1272."
    ]
  },
  {
    year: 2007,
    items: [
      "Kim J.; Park, K. -S.; Lee C.; Chong, Y. Synthesis of a Complete Series of O-Methyl Analogues of Naringenin and Apigenin. Bull. Korean Chem. Soc. 2007, 28, 2527-2530.",
      "Park, K. -S.; Kim J.; Lee C.; Park J.; Park H. S.; Chong, Y. 7-(3-Benzyloxypropyl)-apigenin, A Novel Cytotoxic Flavone Derivative. Bull. Korean Chem. Soc. 2007, 28, 1827-1830.",
      "Park, K. -S.; Kim J.; Choo, H.; Chong, Y. Octanol-Accelerated Baylis-Hillman Reaction. Synlett. 2007, 3, 395-398.",
      "Park, K. -S.; Kim J.; Chong, Y.; Choo, H. A Simple and Efficient Docking Method to the Cyclin-Dependent Kinase 2. Bull. Korean Chem. Soc. 2007, 28, 211-219",
      "Kang S -Y.; Park, K. -S.; Kim J.; Chong, Y.; Choo, H. An Efficient Synthesis of an Apoptosis Inducer, F-3-2-5 by Using Octanol-Accelerated Baylis-Hillman Reaction. Bull. Korean Chem. Soc. 2007, 28, 179-180."
    ]
  },
  {
    year: 2006,
    items: [
      "Chong Y.; Young J.; Kim J.; Lee Y.; Park, K. -S.; Cho J -H.; Kwon H -J.; Suh J -W.; Lim Y. S -Adenosyl- L -Methionine Analogues to Enhance the Production of Actinorhodin. J. Microbiol. Biotechnol. 2006, 16, 1154-1157."
    ]
  },
  {
    year: 2005,
    items: [
      "Kim J.; Lee Y.; Kim H.; Kang S -Y.; Park, K. -S.; Cho J -H.; Lee Y -Y.; Kim B -S.; Lim Y.; Chong Y. Synthesis of Naringenin Amino Acid Esters as Potential CDK2 Inhibitors. Bull. Korean Chem. Soc. 2005, 26, 2065-2068."
    ]
  }
];
