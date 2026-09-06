import { de } from "./fr";
﻿// ========================================
// PROGRAMMATIC SEO ENGINE " SERVICE × CITY
// ========================================

export interface City {
  slug: string;
  name: string;
  nameAr: string;
  region: string;
  description: string;
  descriptionAr: string;
  population: string;
  /** Unique economic descriptors for content variation */
  economy: string;
  economyAr: string;
  /** Key industries for semantic content */
  industries: string[];
  industriesAr: string[];
}

export interface ServiceDef {
  slug: string;
  name: string;
  nameAr: string;
  shortDesc: string;
  shortDescAr: string;
  features: string[];
  featuresAr: string[];
  icon: string;
  /** SEO-optimized verb phrases for content variation */
  actionVerbs: string[];
  actionVerbsAr: string[];
  /** Problems this service solves */
  painPoints: string[];
  painPointsAr: string[];
  /** Results / benefits */
  benefits: string[];
  benefitsAr: string[];
  // ── Centralized metadata (single source of truth for page generation) ──────
  /** "live" = rendered today via `services`. "planned" is reserved for future drafts not yet wired to a route — none currently. */
  status?: "live" | "planned";
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  metaTitle?: string;
  metaDescription?: string;
  /** Content pillar this service belongs to (see Phase 2 architecture). */
  pillarCluster?: string;
  /** Internal-linking relationships: related service slugs to cross-link. */
  relatedServiceSlugs?: string[];
  /**
   * Indicative pricing shown on /tarifs (and future pricing surfaces) —
   * single source of truth so the price never needs re-entering per page.
   * Draft figures for creation-site-web reuse the exact ranges already
   * published in the "developpeur-freelance-vs-agence-web-maroc" blog
   * article, so the site doesn't contradict itself across pages. Others are
   * reasonable starting estimates — confirm/adjust the real numbers before
   * this ships publicly.
   */
  pricing?: PricingTier[];
  /**
   * Optional qualifier injected into service x city <title> only.
   * Use ONLY where GSC shows the qualified phrase already earning
   * impressions - not as a blanket keyword add.
   */
  cityTitleQualifier?: string;
  /**
   * Optional per-city SEO overrides for pages with a proven local query variant.
   * Keep these narrowly scoped to GSC-backed opportunities; URLs remain unchanged.
   */
  citySeoOverrides?: Record<string, { title: string; h1: string; description: string }>;
}

export interface PricingTier {
  name: string;
  nameAr: string;
  fromMAD: number;
  unit: "one-time" | "monthly";
  description: string;
  descriptionAr: string;
}

export interface Technology {
  slug: string;
  /** Canonical display name — feeds Person.knowsAbout in SEOHead.tsx automatically (technologies.map). */
  name: string;
  category: "frontend" | "backend" | "database" | "cloud" | "infrastructure" | "cms" | "mobile" | "discipline";
}

export interface Industry {
  slug: string;
  name: string;
  nameAr: string;
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  /** Internal-linking relationships: which services this industry page should cross-link. */
  relatedServiceSlugs: string[];
}

export interface SecondaryMarketCountry {
  slug: string;
  name: string;
  primaryKeyword: string;
  /** The distinct commercial/compliance angle for this country (Phase 2.5 §08) — not a templated doorway page. */
  angle: string;
}

export const cities: City[] = [
  {
    slug: "casablanca",
    name: "Casablanca",
    nameAr: "الدار البيضاء",
    region: "Casablanca-Settat",
    description: "Capitale économique du Maroc avec plus de 4 millions d'habitants, Casablanca est le centre d'affaires le plus dynamique du pays. Les entreprises casablancaises font face à une concurrence féroce en ligne, rendant une présence digitale professionnelle indispensable pour se démarquer.",
    descriptionAr: "العاصمة الاقتصادية للمغرب بأكثر من 4 ملايين نسمة، الدار البيضاء هي أكثر مراكز الأعمال نشاطًا في البلاد. الشركات في الدار البيضاء تواجه منافسة شرسة عبر الإنترنت.",
    population: "4M+",
    economy: "La ville concentre 48% du PIB national et accueille la Bourse de Casablanca, le plus grand port d'Afrique et des milliers de PME en croissance rapide.",
    economyAr: "المدينة تركز 48% من الناتج المحلي الإجمالي وتستضيف بورصة الدار البيضاء وأكبر ميناء في أفريقيا.",
    industries: ["Finance & Banque", "Commerce international", "Industrie automobile", "Immobilier", "Technologies"],
    industriesAr: ["المالية والبنوك", "التجارة الدولية", "صناعة السيارات", "العقارات", "التكنولوجيا"],
  },
  {
    slug: "rabat",
    name: "Rabat",
    nameAr: "الرباط",
    region: "Rabat-Salé-Kénitra",
    description: "Capitale administrative du Maroc, Rabat abrite les institutions gouvernementales et un écosystème digital en pleine croissance. La ville attire de plus en plus de startups tech et d'entreprises innovantes.",
    descriptionAr: "العاصمة الإدارية للمغرب، الرباط تحتضن المؤسسات الحكومية ونظامًا بيئيًا رقميًا في نمو مستمر.",
    population: "1.9M+",
    economy: "Hub administratif et technologique, Rabat héberge Technopark et de nombreuses agences gouvernementales digitalisant leurs services.",
    economyAr: "مركز إداري وتكنولوجي، الرباط تحتضن Technopark والعديد من الوكالات الحكومية.",
    industries: ["Administration publique", "Technologies", "Éducation", "Santé", "ONG"],
    industriesAr: ["الإدارة العامة", "التكنولوجيا", "التعليم", "الصحة", "المنظمات غير الحكومية"],
  },
  {
    slug: "marrakech",
    name: "Marrakech",
    nameAr: "مراكش",
    region: "Marrakech-Safi",
    description: "Capitale touristique du Maroc, Marrakech attire des millions de visiteurs et dispose d'un marché digital en plein essor pour le tourisme et l'hôtellerie. Les riads, hôtels et restaurants ont besoin d'une visibilité en ligne exceptionnelle.",
    descriptionAr: "العاصمة السياحية للمغرب، مراكش تجذب ملايين الزوار ولديها سوق رقمي مزدهر في مجال السياحة والفندقة.",
    population: "1.3M+",
    economy: "Le tourisme génère plus de 30% de l'économie locale. Les entreprises de Marrakech misent sur le digital pour attirer les touristes internationaux.",
    economyAr: "السياحة تولد أكثر من 30% من الاقتصاد المحلي. الشركات في مراكش تعتمد على الرقمنة لجذب السياح الدوليين.",
    industries: ["Tourisme & Hôtellerie", "Artisanat", "Restauration", "Immobilier de luxe", "Événementiel"],
    industriesAr: ["السياحة والفندقة", "الحرف اليدوية", "المطاعم", "العقارات الفاخرة", "تنظيم الفعاليات"],
  },
  {
    slug: "fes",
    name: "Fès",
    nameAr: "فاس",
    region: "Fès-Meknès",
    description: "Ville impériale et capitale culturelle, Fès possède un tissu économique riche avec des artisans, commerçants et entreprises en pleine digitalisation. La médina de Fès, classée UNESCO, attire un tourisme culturel important.",
    descriptionAr: "مدينة إمبراطورية وعاصمة ثقافية، فاس تمتلك نسيجًا اقتصاديًا غنيًا مع حرفيين وتجار ومؤسسات في طور الرقمنة.",
    population: "1.2M+",
    economy: "Fès combine tradition et modernité avec un artisanat d'excellence, un pôle universitaire majeur et un secteur industriel en croissance.",
    economyAr: "فاس تجمع بين التقليد والحداثة مع حرف يدوية متميزة وقطب جامعي رئيسي وقطاع صناعي في نمو.",
    industries: ["Artisanat & Cuir", "Tourisme culturel", "Éducation", "Agroalimentaire", "Textile"],
    industriesAr: ["الحرف اليدوية والجلد", "السياحة الثقافية", "التعليم", "الصناعة الغذائية", "النسيج"],
  },
  {
    slug: "tanger",
    name: "Tanger",
    nameAr: "طنجة",
    region: "Tanger-Tétouan-Al Hoceïma",
    description: "Porte de l'Afrique vers l'Europe, Tanger est un hub industriel et commercial en pleine expansion avec le port Tanger Med. La ville connaît un boom économique attirant des investisseurs internationaux.",
    descriptionAr: "بوابة أفريقيا نحو أوروبا، طنجة هي مركز صناعي وتجاري في توسع مستمر مع ميناء طنجة المتوسط.",
    population: "1.1M+",
    economy: "Tanger Med est le premier port d'Afrique. La ville attire massivement les investissements industriels (Renault, Stellantis) et les zones franches.",
    economyAr: "ميناء طنجة المتوسط هو أول ميناء في أفريقيا. المدينة تجذب استثمارات صناعية ضخمة.",
    industries: ["Logistique & Transport", "Industrie automobile", "Zones franches", "Tourisme", "Commerce international"],
    industriesAr: ["اللوجستيك والنقل", "صناعة السيارات", "المناطق الحرة", "السياحة", "التجارة الدولية"],
  },
  {
    slug: "meknes",
    name: "Meknès",
    nameAr: "مكناس",
    region: "Fès-Meknès",
    description: "Ville impériale au cœur du Maroc, Meknès est un centre agricole et commercial stratégique avec un potentiel digital croissant. Les PME de Meknès investissent de plus en plus dans le digital pour moderniser leur activité.",
    descriptionAr: "مدينة إمبراطورية في قلب المغرب، مكناس مركز زراعي وتجاري استراتيجي بإمكانيات رقمية متنامية.",
    population: "650K+",
    economy: "Premier bassin oléicole du Maroc, Meknès est aussi un centre universitaire et commercial stratégique entre Fès et Rabat.",
    economyAr: "أول حوض زيتون في المغرب، مكناس أيضًا مركز جامعي وتجاري استراتيجي بين فاس والرباط.",
    industries: ["Agriculture & Oléiculture", "Commerce", "Éducation", "Tourisme patrimonial", "Artisanat"],
    industriesAr: ["الزراعة وزيت الزيتون", "التجارة", "التعليم", "السياحة التراثية", "الحرف اليدوية"],
  },
  {
    slug: "agadir",
    name: "Agadir",
    nameAr: "أكادير",
    region: "Souss-Massa",
    description: "Station balnéaire et centre économique du Sud, Agadir est réputée pour son tourisme, son agriculture et sa pêche. Les entreprises touristiques d'Agadir misent sur le digital pour attirer les visiteurs européens.",
    descriptionAr: "منتجع ساحلي ومركز اقتصادي للجنوب، أكادير مشهورة بالسياحة والزراعة والصيد البحري.",
    population: "600K+",
    economy: "Agadir est le premier port sardinier au monde et une destination balnéaire majeure avec des plages de renommée internationale.",
    economyAr: "أكادير أول ميناء للسردين في العالم ووجهة ساحلية رئيسية بشواطئ ذات شهرة عالمية.",
    industries: ["Tourisme balnéaire", "Pêche & Fruits de mer", "Agriculture d'export", "Hôtellerie", "Commerce"],
    industriesAr: ["السياحة الساحلية", "الصيد والمأكولات البحرية", "الزراعة التصديرية", "الفندقة", "التجارة"],
  },
  {
    slug: "oujda",
    name: "Oujda",
    nameAr: "وجدة",
    region: "Oriental",
    description: "Capitale de l'Oriental, Oujda est une ville frontalière dynamique avec un marché digital en émergence. Sa proximité avec l'Algérie en fait un carrefour commercial stratégique.",
    descriptionAr: "عاصمة الشرق، وجدة مدينة حدودية نشطة بسوق رقمي ناشئ.",
    population: "500K+",
    economy: "Oujda développe ses infrastructures avec le Technopole de l'Oriental et vise à devenir un hub numérique pour la région Est.",
    economyAr: "وجدة تطور بنيتها التحتية مع تكنوبول الشرق وتهدف لتصبح مركزًا رقميًا للمنطقة الشرقية.",
    industries: ["Commerce transfrontalier", "Énergie renouvelable", "Éducation", "Santé", "Agriculture"],
    industriesAr: ["التجارة العابرة للحدود", "الطاقة المتجددة", "التعليم", "الصحة", "الزراعة"],
  },
  {
    slug: "kenitra",
    name: "Kénitra",
    nameAr: "القنيطرة",
    region: "Rabat-Salé-Kénitra",
    description: "Ville industrielle en croissance rapide entre Rabat et Meknès, Kénitra attire de plus en plus d'entreprises grâce à sa zone franche Atlantic Free Zone.",
    descriptionAr: "مدينة صناعية سريعة النمو بين الرباط ومكناس، القنيطرة تجذب المزيد من الشركات.",
    population: "450K+",
    economy: "Atlantic Free Zone attire des multinationales (PSA, Sumitomo). Kénitra est en passe de devenir un pôle industriel majeur.",
    economyAr: "المنطقة الحرة Atlantic تجذب شركات متعددة الجنسيات. القنيطرة في طريقها لتصبح قطبًا صناعيًا رئيسيًا.",
    industries: ["Industrie automobile", "Zones franches", "Agroalimentaire", "Logistique", "Commerce"],
    industriesAr: ["صناعة السيارات", "المناطق الحرة", "الصناعة الغذائية", "اللوجستيك", "التجارة"],
  },
  {
    slug: "tetouan",
    name: "Tétouan",
    nameAr: "تطوان",
    region: "Tanger-Tétouan-Al Hoceïma",
    description: "Perle du Nord, Tétouan est une ville méditerranéenne avec un patrimoine culturel riche et un tissu économique diversifié.",
    descriptionAr: "لؤلؤة الشمال، تطوان مدينة متوسطية ذات تراث ثقافي غني ونسيج اقتصادي متنوع.",
    population: "400K+",
    economy: "Tétouan combine tourisme culturel, artisanat et une économie croissante liée au corridor Tanger-Tétouan.",
    economyAr: "تطوان تجمع بين السياحة الثقافية والحرف اليدوية واقتصاد متنامي مرتبط بممر طنجة-تطوان.",
    industries: ["Tourisme", "Artisanat", "Éducation", "Commerce", "Immobilier"],
    industriesAr: ["السياحة", "الحرف اليدوية", "التعليم", "التجارة", "العقارات"],
  },
  {
    slug: "safi",
    name: "Safi",
    nameAr: "آسفي",
    region: "Marrakech-Safi",
    description: "Ville côtière et centre industriel, Safi est reconnue pour sa céramique et son industrie chimique.",
    descriptionAr: "مدينة ساحلية ومركز صناعي، آسفي معروفة بالخزف والصناعة الكيميائية.",
    population: "350K+",
    economy: "Safi est le premier producteur de céramique au Maroc et abrite un important complexe chimique (OCP).",
    economyAr: "آسفي أول منتج للخزف في المغرب وتحتضن مجمعًا كيميائيًا مهمًا (OCP).",
    industries: ["Céramique", "Industrie chimique", "Pêche", "Agriculture", "Tourisme"],
    industriesAr: ["الخزف", "الصناعة الكيميائية", "الصيد", "الزراعة", "السياحة"],
  },
  {
    slug: "el-jadida",
    name: "El Jadida",
    nameAr: "الجديدة",
    region: "Casablanca-Settat",
    description: "Ville balnéaire et agricole, El Jadida combine tourisme et industrie avec un marché local en croissance.",
    descriptionAr: "مدينة ساحلية وزراعية، الجديدة تجمع بين السياحة والصناعة بسوق محلي متنامٍ.",
    population: "350K+",
    economy: "El Jadida bénéficie de sa proximité avec Casablanca et son patrimoine UNESCO (cité portugaise) pour développer le tourisme.",
    economyAr: "الجديدة تستفيد من قربها من الدار البيضاء وتراثها الأونيسكو لتطوير السياحة.",
    industries: ["Tourisme", "Agriculture", "Chimie (Jorf Lasfar)", "Pêche", "Commerce"],
    industriesAr: ["السياحة", "الزراعة", "الكيمياء (الجرف الأصفر)", "الصيد", "التجارة"],
  },
  {
    slug: "nador",
    name: "Nador",
    nameAr: "الناظور",
    region: "Oriental",
    description: "Ville du Rif oriental, Nador est un centre commercial important avec une communauté d'affaires active.",
    descriptionAr: "مدينة الريف الشرقي، الناظور مركز تجاري مهم بمجتمع أعمال نشط.",
    population: "300K+",
    economy: "Nador développe ses infrastructures avec le nouveau port Nador West Med et attire des investissements croissants.",
    economyAr: "الناظور تطور بنيتها التحتية مع ميناء الناظور غرب المتوسط الجديد وتجذب استثمارات متزايدة.",
    industries: ["Commerce", "Pêche", "BTP", "Services", "Agriculture"],
    industriesAr: ["التجارة", "الصيد", "البناء والأشغال العمومية", "الخدمات", "الزراعة"],
  },
  {
    slug: "beni-mellal",
    name: "Béni Mellal",
    nameAr: "بني ملال",
    region: "Béni Mellal-Khénifra",
    description: "Capitale de la région Béni Mellal-Khénifra, centre agricole majeur avec un besoin croissant de digitalisation.",
    descriptionAr: "عاصمة جهة بني ملال-خنيفرة، مركز زراعي كبير مع حاجة متزايدة للرقمنة.",
    population: "300K+",
    economy: "Béni Mellal est le grenier agricole du Maroc avec une production abondante d'olives, d'agrumes et de céréales.",
    economyAr: "بني ملال هي مخزن المغرب الزراعي بإنتاج وفير من الزيتون والحمضيات والحبوب.",
    industries: ["Agriculture", "Agroalimentaire", "Commerce", "Éducation", "Services"],
    industriesAr: ["الزراعة", "الصناعة الغذائية", "التجارة", "التعليم", "الخدمات"],
  },
  {
    slug: "mohammedia",
    name: "Mohammedia",
    nameAr: "المحمدية",
    region: "Casablanca-Settat",
    description: "Ville industrielle entre Casablanca et Rabat, Mohammedia abrite de nombreuses entreprises et industries.",
    descriptionAr: "مدينة صناعية بين الدار البيضاء والرباط، المحمدية تحتضن العديد من الشركات والصناعات.",
    population: "250K+",
    economy: "Mohammedia est un hub pétrochimique et industriel majeur situé stratégiquement sur l'axe Casablanca-Rabat.",
    economyAr: "المحمدية مركز بتروكيماوي وصناعي رئيسي يقع بشكل استراتيجي على محور الدار البيضاء-الرباط.",
    industries: ["Pétrochimie", "Industrie", "Logistique", "Commerce", "Tourisme balnéaire"],
    industriesAr: ["البتروكيماويات", "الصناعة", "اللوجستيك", "التجارة", "السياحة الساحلية"],
  },
];

export const services: ServiceDef[] = [
  {
    slug: "creation-site-web",
    name: "Création de Sites Web",
    nameAr: "تصميم المواقع الإلكترونية",
    shortDesc: "Sites vitrines, e-commerce et applications web sur mesure",
    shortDescAr: "مواقع تعريفية، متاجر إلكترونية وتطبيقات ويب مخصصة",
    features: [
      "Site vitrine professionnel",
      "Boutique e-commerce",
      "Application web sur mesure",
      "Landing pages optimisées",
      "Design responsive mobile-first",
      "Maintenance et support",
      "Hébergement performant",
      "Certificat SSL gratuit",
    ],
    featuresAr: [
      "موقع تعريفي احترافي",
      "متجر إلكتروني",
      "تطبيق ويب مخصص",
      "صفحات هبوط محسّنة",
      "تصميم متجاوب للجوال",
      "صيانة ودعم",
      "استضافة عالية الأداء",
      "شهادة SSL مجانية",
    ],
    icon: "Globe",
    actionVerbs: ["concevoir", "développer", "créer", "réaliser", "construire"],
    actionVerbsAr: ["تصميم", "تطوير", "إنشاء", "بناء", "تنفيذ"],
    painPoints: [
      "Vous n'avez pas de site web et perdez des clients au profit de concurrents visibles en ligne",
      "Votre site actuel est lent, non responsive et ne génère aucun lead",
      "Vous payez cher pour un site WordPress qui ne se charge pas correctement sur mobile",
    ],
    painPointsAr: [
      "ليس لديك موقع ويب وتفقد العملاء لصالح منافسين مرئيين عبر الإنترنت",
      "موقعك الحالي بطيء وغير متجاوب ولا يولد أي عملاء محتملين",
      "تدفع الكثير مقابل موقع WordPress لا يتحمل بشكل صحيح على الجوال",
    ],
    benefits: [
      "Un site qui se charge en moins de 2 secondes et convertit les visiteurs en clients",
      "Design professionnel qui inspire confiance et crédibilité",
      "Optimisé pour Google dès le premier jour avec un score PageSpeed de 90+",
    ],
    benefitsAr: [
      "موقع يتحمل في أقل من ثانيتين ويحول الزوار إلى عملاء",
      "تصميم احترافي يلهم الثقة والمصداقية",
      "محسّن لـ Google من اليوم الأول بنتيجة PageSpeed أكثر من 90",
    ],
    status: "live",
    primaryKeyword: "création site web Maroc",
    secondaryKeywords: ["site vitrine Maroc", "site e-commerce Maroc", "développeur web Maroc", "développeur Next.js Maroc", "développeur React Maroc", "développeur Node.js Maroc"],
    metaTitle: "Création Site Web Maroc | React, Next.js & E-commerce",
    metaDescription: "Création de sites web professionnels au Maroc avec React et Next.js : vitrine, e-commerce, applications sur mesure. Devis gratuit sous 24h.",
    pillarCluster: "Web Presence",
    relatedServiceSlugs: ["refonte-site-web", "referencement-seo", "e-commerce", "developpement-laravel"],
    
  },
  {
    slug: "referencement-seo",
    name: "Référencement SEO",
    nameAr: "تحسين محركات البحث",
    shortDesc: "Dominez Google avec une stratégie SEO complète",
    shortDescAr: "تصدّر نتائج Google باستراتيجية SEO شاملة",
    features: [
      "Audit SEO complet",
      "Optimisation on-page",
      "Stratégie de contenu SEO",
      "Netlinking qualifié",
      "SEO local & Google My Business",
      "Reporting mensuel",
      "Recherche de mots-clés",
      "Analyse concurrentielle",
    ],
    featuresAr: [
      "تدقيق SEO شامل",
      "تحسين الصفحات",
      "استراتيجية محتوى SEO",
      "بناء روابط مؤهلة",
      "SEO محلي و Google My Business",
      "تقارير شهرية",
      "بحث الكلمات المفتاحية",
      "تحليل المنافسين",
    ],
    icon: "Search",
    actionVerbs: ["référencer", "positionner", "optimiser", "booster", "propulser"],
    actionVerbsAr: ["تحسين ترتيب", "تصدّر", "تحسين", "تعزيز", "دفع"],
    painPoints: [
      "Votre site n'apparaît pas sur Google quand vos clients potentiels vous cherchent",
      "Vos concurrents sont en première page et captent tout le trafic",
      "Votre site manque d'optimisation technique et le trafic organique reste à zéro",
    ],
    painPointsAr: [
      "موقعك لا يظهر على Google عندما يبحث عنك العملاء المحتملون",
      "منافسوك في الصفحة الأولى ويستحوذون على كل الزيارات",
      "موقعك يفتقر إلى التحسين التقني والزيارات العضوية تبقى صفرًا",
    ],
    benefits: [
      "Apparaître en première page de Google pour les mots-clés de votre secteur",
      "Générer du trafic qualifié 24h/24 sans achat de trafic",
      "Augmenter vos leads de 300% en moyenne en 6 mois",
    ],
    benefitsAr: [
      "الظهور في الصفحة الأولى من Google للكلمات المفتاحية في مجالك",
      "توليد زيارات مؤهلة على مدار الساعة بدون دفع إعلانات",
      "زيادة العملاء المحتملين بنسبة 300% في المتوسط خلال 6 أشهر",
    ],
    status: "live",
    primaryKeyword: "référencement SEO Maroc",
    secondaryKeywords: ["SEO local Maroc", "expert SEO Maroc", "audit SEO Maroc"],
    metaTitle: "Référencement SEO Maroc | Expert SEO Freelance",
    metaDescription: "Stratégie SEO complète au Maroc : audit, optimisation on-page, netlinking et SEO local. Résultats mesurables.",
    pillarCluster: "Croissance",
    relatedServiceSlugs: ["creation-site-web", "refonte-site-web"],
    citySeoOverrides: {
      "beni-mellal": {
        title: "Agence SEO à Béni Mellal | Référencement Google",
        h1: "Agence SEO à Béni Mellal",
        description: "Agence SEO à Béni Mellal : référencement local, optimisation Google, contenu et suivi des positions. Devis personnalisé.",
      },
    },
    pricing: [
      {
        name: "Audit SEO Complet",
        nameAr: "تدقيق SEO شامل",
        fromMAD: 1000,
        unit: "one-time",
        description: "Analyse technique, on-page et concurrentielle avec recommandations priorisées.",
        descriptionAr: "تحليل تقني وتنافسي مع توصيات مرتبة حسب الأولوية.",
      },
      {
        name: "Accompagnement SEO Mensuel",
        nameAr: "مواكبة SEO شهرية",
        fromMAD: 1500,
        unit: "monthly",
        description: "Optimisation continue, contenu et suivi de positions sur la durée.",
        descriptionAr: "تحسين مستمر، محتوى ومتابعة الترتيب على المدى الطويل.",
      },
    ],
  },
  {
    slug: "refonte-site-web",
    name: "Refonte de Site Web",
    nameAr: "إعادة تصميم المواقع",
    shortDesc: "Modernisez votre site web existant pour plus de performance et de conversions",
    shortDescAr: "حدّث موقعك الحالي لمزيد من الأداء والتحويلات",
    features: [
      "Audit UX/UI complet",
      "Redesign moderne",
      "Migration de contenu",
      "Optimisation vitesse",
      "Responsive mobile-first",
      "SEO technique",
      "Tests A/B conversion",
      "Formation administration",
    ],
    featuresAr: [
      "تدقيق UX/UI شامل",
      "إعادة تصميم عصري",
      "نقل المحتوى",
      "تحسين السرعة",
      "متجاوب للجوال أولاً",
      "SEO تقني",
      "اختبارات A/B للتحويل",
      "تدريب على الإدارة",
    ],
    icon: "RefreshCw",
    actionVerbs: ["moderniser", "transformer", "refondre", "repenser", "améliorer"],
    actionVerbsAr: ["تحديث", "تحويل", "إعادة تصميم", "إعادة تفكير", "تحسين"],
    painPoints: [
      "Votre site date de plus de 3 ans et donne une image dépassée de votre entreprise",
      "Les visiteurs quittent votre site en moins de 10 secondes à cause d'un design obsolète",
      "Votre site n'est pas adapté au mobile et vous perdez 60% du trafic potentiel",
    ],
    painPointsAr: [
      "موقعك عمره أكثر من 3 سنوات ويعطي صورة قديمة عن شركتك",
      "الزوار يغادرون موقعك في أقل من 10 ثوانٍ بسبب تصميم قديم",
      "موقعك غير متكيف مع الجوال وتفقد 60% من الزيارات المحتملة",
    ],
    benefits: [
      "Un site modernisé qui double votre taux de conversion",
      "Score PageSpeed amélioré de 30 à 90+ en moyenne",
      "Expérience mobile parfaite pour capter les 70% de trafic mobile",
    ],
    benefitsAr: [
      "موقع محدث يضاعف معدل التحويل",
      "نتيجة PageSpeed محسّنة من 30 إلى أكثر من 90 في المتوسط",
      "تجربة جوال مثالية لجذب 70% من زيارات الجوال",
    ],
    status: "live",
    primaryKeyword: "refonte site web Maroc",
    secondaryKeywords: ["migration WordPress vers React", "refonte SEO sans perte de trafic"],
    metaTitle: "Refonte Site Web Maroc | Modernisation & Performance",
    metaDescription: "Refonte de site web au Maroc : migration WordPress vers une stack moderne, sans perte de trafic SEO.",
    pillarCluster: "Web Presence",
    relatedServiceSlugs: ["creation-site-web", "referencement-seo"],
    pricing: [
      {
        name: "Refonte Complète",
        nameAr: "إعادة تصميم كاملة",
        fromMAD: 3000,
        unit: "one-time",
        description: "Nouveau design, migration de contenu, optimisation vitesse et SEO technique.",
        descriptionAr: "تصميم جديد، نقل المحتوى، تحسين السرعة و SEO تقني.",
      },
    ],
  },
  {
    slug: "developpement-wordpress",
    name: "Développement WordPress",
    nameAr: "تطوير WordPress",
    shortDesc: "Sites WordPress et boutiques WooCommerce rapides, sécurisés et faciles à administrer",
    shortDescAr: "مواقع WordPress ومتاجر WooCommerce سريعة وآمنة وسهلة الإدارة",
    features: [
      "Installation et configuration WordPress",
      "Thème sur mesure ou premium personnalisé",
      "Boutique WooCommerce complète",
      "Optimisation vitesse et sécurité",
      "Migration vers WordPress",
      "Plugins et fonctionnalités sur mesure",
      "Formation à l'administration",
      "Maintenance et mises à jour",
    ],
    featuresAr: [
      "تثبيت وإعداد WordPress",
      "قالب مخصص أو premium معدّل",
      "متجر WooCommerce كامل",
      "تحسين السرعة والأمان",
      "الانتقال إلى WordPress",
      "إضافات ووظائف مخصصة",
      "تدريب على الإدارة",
      "صيانة وتحديثات",
    ],
    icon: "Globe",
    actionVerbs: ["développer", "configurer", "sécuriser", "migrer", "optimiser"],
    actionVerbsAr: ["تطوير", "إعداد", "تأمين", "نقل", "تحسين"],
    painPoints: [
      "Votre site WordPress est lent et vulnérable aux failles de sécurité",
      "Le thème premium que vous avez acheté ne correspond pas vraiment à votre marque",
      "Vous ne savez pas comment gérer ou mettre à jour votre WordPress en toute sécurité",
    ],
    painPointsAr: [
      "موقعك WordPress بطيء وعرضة للثغرات الأمنية",
      "القالب المميز الذي اشتريته لا يعكس علامتك التجارية بشكل حقيقي",
      "لا تعرف كيف تدير أو تحدّث WordPress الخاص بك بأمان",
    ],
    benefits: [
      "Un WordPress rapide, sécurisé et facile à administrer vous-même",
      "Un design qui correspond exactement à votre marque, pas un thème générique",
      "Des mises à jour et une maintenance qui évitent les mauvaises surprises",
    ],
    benefitsAr: [
      "WordPress سريع وآمن وسهل التسيير بنفسك",
      "تصميم يعكس علامتك التجارية بالضبط، وليس قالبًا عامًا",
      "تحديثات وصيانة تتجنب المفاجآت السيئة",
    ],
    status: "live",
    primaryKeyword: "développeur WordPress Maroc",
    secondaryKeywords: ["création site WordPress Maroc", "expert WordPress Maroc", "WooCommerce Maroc"],
    metaTitle: "Développeur WordPress Maroc | Sites & WooCommerce",
    metaDescription: "Développeur WordPress au Maroc : sites sur mesure, boutiques WooCommerce, migration et sécurisation. Devis gratuit sous 24h.",
    pillarCluster: "Web Presence",
    relatedServiceSlugs: ["creation-site-web", "refonte-site-web", "referencement-seo"],
    pricing: [
      {
        name: "Site WordPress Essentiel",
        nameAr: "موقع WordPress أساسي",
        fromMAD: 2000,
        unit: "one-time",
        description: "Installation, thème personnalisé et configuration de base.",
        descriptionAr: "تثبيت، قالب مخصص وإعداد أساسي.",
      },
      {
        name: "Boutique WooCommerce",
        nameAr: "متجر WooCommerce",
        fromMAD: 6000,
        unit: "one-time",
        description: "Boutique en ligne complète avec paiement et gestion des commandes.",
        descriptionAr: "متجر إلكتروني كامل مع دفع وإدارة الطلبات.",
      },
      {
        name: "Migration vers WordPress",
        nameAr: "الانتقال إلى WordPress",
        fromMAD: 2500,
        unit: "one-time",
        description: "Migration depuis un autre CMS ou un site codé en dur, sans perte de contenu.",
        descriptionAr: "الانتقال من نظام آخر أو موقع مبرمج يدويًا، بدون فقدان المحتوى.",
      },
    ],
  },
  {
    slug: "developpement-laravel",
    name: "Développement Laravel",
    nameAr: "تطوير Laravel",
    shortDesc: "Applications web sur mesure et API robustes avec Laravel",
    shortDescAr: "تطبيقات ويب مخصصة وواجهات برمجية قوية باستخدام Laravel",
    features: [
      "Applications web sur mesure",
      "API REST sécurisées",
      "Intégrations tierces",
      "Back-office administrable",
      "Architecture évolutive",
      "Tests automatisés",
      "Migration de données",
      "Maintenance et support",
    ],
    featuresAr: [
      "تطبيقات ويب مخصصة",
      "واجهات برمجية REST آمنة",
      "تكاملات مع أطراف ثالثة",
      "لوحة تحكم قابلة للإدارة",
      "بنية قابلة للتطور",
      "اختبارات آلية",
      "نقل البيانات",
      "صيانة ودعم",
    ],
    icon: "Server",
    actionVerbs: ["développer", "concevoir", "architecturer", "sécuriser", "intégrer"],
    actionVerbsAr: ["تطوير", "تصميم", "هندسة", "تأمين", "دمج"],
    painPoints: [
      "Vos besoins métier dépassent ce qu'un site vitrine ou un CMS peut couvrir",
      "Vous avez besoin d'une API propre pour connecter plusieurs systèmes ou une app mobile",
      "Votre backend actuel est fragile et casse à chaque mise à jour",
    ],
    painPointsAr: [
      "احتياجاتك المهنية تتجاوز ما يمكن أن يقدمه موقع تعريفي أو CMS",
      "تحتاج واجهة برمجية نظيفة لربط عدة أنظمة أو تطبيق جوال",
      "الواجهة الخلفية الحالية هشة وتتعطل مع كل تحديث",
    ],
    benefits: [
      "Une application robuste et évolutive construite sur un framework éprouvé",
      "Une API documentée, prête pour vos futures intégrations",
      "Un code maintenable avec des tests automatisés",
    ],
    benefitsAr: [
      "تطبيق قوي وقابل للتطور مبني على إطار عمل موثوق",
      "واجهة برمجية موثقة وجاهزة لتكاملاتك المستقبلية",
      "كود قابل للصيانة مع اختبارات آلية",
    ],
    status: "live",
    primaryKeyword: "développeur Laravel Maroc",
    secondaryKeywords: ["développement application Laravel Maroc", "expert Laravel Maroc", "API Laravel Maroc"],
    metaTitle: "Développeur Laravel Maroc | Applications Web Sur Mesure",
    metaDescription: "Développeur Laravel au Maroc pour applications web sur mesure, API sécurisées et back-office administrable.",
    pillarCluster: "Ingénierie",
    relatedServiceSlugs: ["application-mobile", "e-commerce"],
    
  },
  {
    slug: "application-mobile",
    name: "Application Mobile",
    nameAr: "تطبيق جوال",
    // GSC 2026-08-06..09-02: "application mobile sur mesure el jadida" =
    // 44 impressions, avg position 6.1, ZERO clicks. Ranking is fine; the
    // title/description simply never contained "sur mesure". This is the
    // only service with evidence for a qualifier - do not copy it around.
    cityTitleQualifier: "sur Mesure",
    citySeoOverrides: {
      "el-jadida": {
        title: "Application mobile sur mesure à El Jadida | Expert Digital Maroc",
        h1: "Application mobile sur mesure à El Jadida",
        description: "Développement d’application mobile sur mesure à El Jadida avec Flutter, iOS et Android. Devis personnalisé sous 24h.",
      },
    },
    shortDesc: "Applications mobiles sur mesure, multiplateformes avec Flutter",
    shortDescAr: "تطبيقات جوال متعددة المنصات باستخدام Flutter",
    features: [
      "Applications iOS et Android",
      "Design d'interface sur mesure",
      "Notifications push",
      "Intégration API et paiement",
      "Publication sur les stores",
      "Mode hors-ligne",
      "Analytics intégrés",
      "Maintenance et support",
    ],
    featuresAr: [
      "تطبيقات iOS و Android",
      "تصميم واجهة مخصص",
      "إشعارات فورية",
      "دمج واجهات برمجية ودفع إلكتروني",
      "نشر على المتاجر",
      "وضع بدون اتصال",
      "تحليلات مدمجة",
      "صيانة ودعم",
    ],
    icon: "Smartphone",
    actionVerbs: ["développer", "concevoir", "lancer", "publier", "optimiser"],
    actionVerbsAr: ["تطوير", "تصميم", "إطلاق", "نشر", "تحسين"],
    painPoints: [
      "Vos clients vous demandent une application et vous n'avez pas de solution",
      "Développer une app iOS et une app Android séparément coûte trop cher",
      "Vous ne savez pas comment publier ou maintenir une application mobile",
    ],
    painPointsAr: [
      "عملاؤك يطلبون تطبيقًا وليس لديك حل",
      "تطوير تطبيق iOS وتطبيق Android بشكل منفصل مكلف جدًا",
      "لا تعرف كيف تنشر أو تصون تطبيقًا جوالًا",
    ],
    benefits: [
      "Une seule base de code pour iOS et Android, moins de coûts de développement",
      "Une application publiée et prête pour vos utilisateurs",
      "Un accompagnement complet du design à la publication",
    ],
    benefitsAr: [
      "قاعدة كود واحدة لـ iOS و Android، تكلفة تطوير أقل",
      "تطبيق منشور وجاهز لمستخدميك",
      "مرافقة كاملة من التصميم إلى النشر",
    ],
    status: "live",
    primaryKeyword: "développement application mobile Maroc",
    secondaryKeywords: ["développeur Flutter Maroc", "app mobile entreprise Maroc", "application Android iOS Maroc"],
    metaTitle: "Développeur Application Mobile Maroc | Flutter, iOS, Android",
    metaDescription: "Développement d'applications mobiles au Maroc avec Flutter : iOS, Android, une seule base de code.",
    pillarCluster: "Ingénierie",
    relatedServiceSlugs: ["developpement-laravel"],
    
  },
  {
    slug: "e-commerce",
    name: "E-commerce",
    nameAr: "التجارة الإلكترونية",
    shortDesc: "Boutiques en ligne performantes avec Shopify et WooCommerce",
    shortDescAr: "متاجر إلكترونية عالية الأداء باستخدام Shopify و WooCommerce",
    features: [
      "Boutique Shopify ou WooCommerce",
      "Paiement en ligne sécurisé",
      "Gestion des livraisons",
      "Catalogue produits optimisé",
      "Tunnel de conversion optimisé",
      "Intégration comptabilité",
      "SEO e-commerce",
      "Maintenance et support",
    ],
    featuresAr: [
      "متجر Shopify أو WooCommerce",
      "دفع إلكتروني آمن",
      "إدارة التوصيل",
      "كتالوج منتجات محسّن",
      "مسار تحويل محسّن",
      "دمج المحاسبة",
      "SEO للتجارة الإلكترونية",
      "صيانة ودعم",
    ],
    icon: "ShoppingCart",
    actionVerbs: ["créer", "lancer", "optimiser", "configurer", "développer"],
    actionVerbsAr: ["إنشاء", "إطلاق", "تحسين", "إعداد", "تطوير"],
    painPoints: [
      "Vous voulez vendre en ligne mais ne savez pas par où commencer",
      "Votre boutique en ligne actuelle a un tunnel d'achat qui perd des clients",
      "Le paiement et la livraison ne sont pas adaptés au marché marocain",
    ],
    painPointsAr: [
      "تريد البيع عبر الإنترنت لكن لا تعرف من أين تبدأ",
      "متجرك الحالي لديه مسار شراء يفقد العملاء",
      "الدفع والتوصيل غير ملائمين للسوق المغربي",
    ],
    benefits: [
      "Une boutique en ligne prête à vendre avec paiement et livraison adaptés au Maroc",
      "Un tunnel de conversion optimisé pour maximiser vos ventes",
      "Un catalogue produits structuré pour le SEO e-commerce",
    ],
    benefitsAr: [
      "متجر إلكتروني جاهز للبيع بدفع وتوصيل ملائمين للمغرب",
      "مسار تحويل محسّن لتعظيم مبيعاتك",
      "كتالوج منتجات منظم لتحسين محركات البحث للتجارة الإلكترونية",
    ],
    status: "live",
    primaryKeyword: "création boutique en ligne Maroc",
    secondaryKeywords: ["site e-commerce Maroc", "développeur Shopify Maroc", "WooCommerce Maroc"],
    metaTitle: "Développeur E-commerce Maroc | Shopify & WooCommerce",
    metaDescription: "Développeur e-commerce au Maroc : boutiques Shopify et WooCommerce, paiement et livraison adaptés au marché local.",
    pillarCluster: "Web Presence",
    relatedServiceSlugs: ["creation-site-web", "referencement-seo"],
    // No `pricing` here on purpose: e-commerce projects vary too much
    // (catalogue size, integrations, tunnel de conversion work) for a flat
    // package price to be honest. ServiceDetail.tsx shows a devis CTA for
    // this service instead of a pricing table — see the `slug === "e-commerce"`
    // branch there.
  },
];

// ========================================
// TECHNOLOGIES — single source of truth, consumed directly by
// buildPersonSchema() in SEOHead.tsx (knowsAbout). Adding/removing an entry
// here updates the schema on every page automatically.
// ========================================
export const technologies: Technology[] = [
  // Frontend
  { slug: "react", name: "React.js", category: "frontend" },
  { slug: "nextjs", name: "Next.js", category: "frontend" },
  { slug: "typescript", name: "TypeScript", category: "frontend" },
  { slug: "javascript", name: "JavaScript", category: "frontend" },
  // Backend
  { slug: "laravel", name: "Laravel", category: "backend" },
  { slug: "php", name: "PHP", category: "backend" },
  { slug: "nodejs", name: "Node.js", category: "backend" },
  { slug: "python", name: "Python", category: "backend" },
  // Mobile
  { slug: "flutter", name: "Flutter", category: "mobile" },
  { slug: "kotlin", name: "Kotlin", category: "mobile" },
  { slug: "android", name: "Android", category: "mobile" },
  // Database
  { slug: "mysql", name: "MySQL", category: "database" },
  { slug: "prisma", name: "Prisma", category: "database" },
  // Cloud & infrastructure
  { slug: "amazonaws", name: "AWS", category: "cloud" },
  { slug: "microsoftazure", name: "Azure", category: "cloud" },
  { slug: "linux", name: "Linux", category: "infrastructure" },
  { slug: "docker", name: "Docker", category: "infrastructure" },
  // CMS / e-commerce
  { slug: "wordpress", name: "WordPress", category: "cms" },
  { slug: "woocommerce", name: "WooCommerce", category: "cms" },
  { slug: "shopify", name: "Shopify", category: "cms" },
  // Disciplines
  { slug: "seo", name: "SEO", category: "discipline" },
  { slug: "ia", name: "Intelligence Artificielle", category: "discipline" },
];

// ========================================
// INDUSTRIES — data-ready for the /secteurs cluster (Sprint 4)
// ========================================
export const industries: Industry[] = [
  {
    slug: "restaurants-hotels",
    name: "Restaurants & Hôtellerie",
    nameAr: "المطاعم والفندقة",
    primaryKeyword: "site web restaurant Maroc",
    metaTitle: "Site Web pour Restaurants & Hôtels au Maroc",
    metaDescription: "Création de site web pour restaurants, riads et hôtels au Maroc : réservation en ligne, menu digital, SEO local.",
    relatedServiceSlugs: ["creation-site-web", "referencement-seo"],
  },
  {
    slug: "cliniques-medecins",
    name: "Cliniques & Médecins",
    nameAr: "العيادات والأطباء",
    primaryKeyword: "site web clinique Maroc",
    metaTitle: "Site Web pour Cliniques & Cabinets Médicaux au Maroc",
    metaDescription: "Création de site web pour cliniques, dentistes et médecins au Maroc : prise de rendez-vous en ligne, SEO local.",
    relatedServiceSlugs: ["creation-site-web", "referencement-seo"],
  },
  {
    slug: "avocats-comptables",
    name: "Avocats & Comptables",
    nameAr: "المحامون والمحاسبون",
    primaryKeyword: "site web cabinet avocat Maroc",
    metaTitle: "Site Web pour Cabinets d'Avocats & Comptables au Maroc",
    metaDescription: "Création de site web professionnel pour avocats, comptables et consultants au Maroc.",
    relatedServiceSlugs: ["creation-site-web", "refonte-site-web"],
  },
  {
    slug: "immobilier",
    name: "Immobilier",
    nameAr: "العقارات",
    primaryKeyword: "site web agence immobilière Maroc",
    metaTitle: "Site Web pour Agences Immobilières au Maroc",
    metaDescription: "Création de site web pour agences immobilières au Maroc : catalogue de biens, recherche avancée, SEO local.",
    relatedServiceSlugs: ["creation-site-web", "referencement-seo"],
  },
  {
    slug: "commerce-retail",
    name: "Commerce & Retail",
    nameAr: "التجارة والبيع بالتجزئة",
    primaryKeyword: "site e-commerce commerce Maroc",
    metaTitle: "Site E-commerce pour Commerçants au Maroc",
    metaDescription: "Création de boutique en ligne pour commerçants et retailers au Maroc : catalogue, paiement, livraison.",
    relatedServiceSlugs: ["e-commerce", "referencement-seo"],
  },
];

// ========================================
// SECONDARY MARKET COUNTRIES — data-ready for /entreprises/marches (Sprint 4)
// ========================================
export const secondaryMarketCountries: SecondaryMarketCountry[] = [
  { slug: "france", name: "France", primaryKeyword: "agence développement nearshore France Maroc", angle: "Plus grand marché adressable ; parité de langue et de fuseau horaire." },
  { slug: "belgique", name: "Belgique", primaryKeyword: "partenaire nearshore Belgique Maroc", angle: "Marché bilingue FR/NL ; proximité des institutions européennes." },
  { slug: "suisse", name: "Suisse", primaryKeyword: "développement nearshore Suisse Maroc", angle: "Hors UE — cadre de protection des données LPD suisse, pas RGPD." },
  { slug: "luxembourg", name: "Luxembourg", primaryKeyword: "partenaire digital Luxembourg Maroc", angle: "Secteur financier ; exigences de conformité élevées, plus petit volume, plus grande valeur par contrat." },
  { slug: "canada", name: "Canada", primaryKeyword: "développement nearshore Canada Maroc", angle: "Décalage horaire à adresser en amont ; couche anglaise prioritaire pour ce marché." },
];

// Generate all programmatic page combinations
export interface ProgrammaticPage {
  slug: string;
  serviceSlug: string;
  citySlug: string;
  metaTitle: string;
  metaTitleAr: string;
  metaDescription: string;
  metaDescriptionAr: string;
  h1: string;
  h1Ar: string;
}

export function generateProgrammaticPages(): ProgrammaticPage[] {
  const pages: ProgrammaticPage[] = [];
  const [
    freelanceWebKeyword,
    creationSiteKeyword,
    wordpressKeyword,
    seoKeyword,
    freelanceFrKeyword,
    affordableKeyword,
  ] = SEO_KEYWORDS;

  for (const service of services) {
    for (const city of cities) {
      pages.push({
        slug: `${service.slug}-${city.slug}`,
        serviceSlug: service.slug,
        citySlug: city.slug,
        metaTitle: `${service.name} a ${city.name} | ${creationSiteKeyword}`,
        metaTitleAr: `${service.nameAr} في ${city.nameAr} " مطور ويب مستقل المغرب | أيوب التواتي`,
        metaDescription: `${service.name} a ${city.name}, Maroc. ${freelanceWebKeyword}, ${wordpressKeyword}, ${seoKeyword} et ${affordableKeyword}. Devis personnalise sur demande.`,
        metaDescriptionAr: `${service.nameAr} في ${city.nameAr} بالمغرب. مطور ويب مستقل متخصص، عرض سعر مخصص عند الطلب. +50 مشروع منجز.`,
        h1: `${service.name} a ${city.name} | ${freelanceFrKeyword}`,
        h1Ar: `${service.nameAr} في ${city.nameAr}`,
      });
    }
  }

  return pages;
}

// City-only pages
export function generateCityPages() {
  const [
    freelanceWebKeyword,
    creationSiteKeyword,
    wordpressKeyword,
    seoKeyword,
    freelanceFrKeyword,
    affordableKeyword,
  ] = SEO_KEYWORDS;

  return cities.map((city) => ({
    slug: `agence-digitale-${city.slug}`,
    citySlug: city.slug,
    metaTitle: `${freelanceWebKeyword} a ${city.name} | ${creationSiteKeyword}`,
    metaTitleAr: `وكالة رقمية ${city.nameAr} " تصميم مواقع و SEO بالمغرب | أيوب التواتي`,
    metaDescription: `${freelanceFrKeyword} a ${city.name}, Maroc. ${creationSiteKeyword}, ${wordpressKeyword}, ${seoKeyword} et ${affordableKeyword}. Devis rapide et accompagnement local.`,
    metaDescriptionAr: `مطور ويب مستقل وخبير SEO في ${city.nameAr}، المغرب. تصميم مواقع احترافية و SEO. عرض أسعار مجاني خلال 24 ساعة.`,
    h1: `${freelanceFrKeyword} a ${city.name}`,
    h1Ar: `وكالة رقمية في ${city.nameAr} " مطور ويب مستقل المغرب`,
  }));
}

// Industry pages — data-ready for /secteurs (Sprint 4). Mirrors the
// generateCityPages() pattern; not consumed by any route yet.
export interface IndustryPage {
  slug: string;
  industrySlug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
}

export function generateIndustryPages(): IndustryPage[] {
  return industries.map((industry) => ({
    slug: `secteurs/${industry.slug}`,
    industrySlug: industry.slug,
    metaTitle: industry.metaTitle,
    metaDescription: industry.metaDescription,
    h1: `Solutions digitales pour ${industry.name}`,
  }));
}

export const CONTACT = {
  name: "Ayoub Touati",
  phone: "+212 710755666",
  phoneClean: "212710755666",
  email: "touatiayoub2001@gmail.com",
  whatsapp: "https://wa.me/212710755666",
  whatsappMessage: "https://wa.me/212710755666?text=Bonjour%2C%20je%20souhaite%20discuter%20d%27un%20projet%20digital.",
  location: "Meknès, Maroc",
};

// ========================================
// HIGH-CONVERTING SEO KEYWORDS " MOROCCO (FR + AR + DARIJA)
// ========================================
export const SEO_KEYWORDS = [
  // French / English
  "freelance web developer Morocco",
  "création site web Maroc",
  "WordPress developer Morocco",
  "SEO freelancer Maroc",
  "développeur web freelance Maroc",
  "création site internet Maroc sur mesure",
  // Arabic Standard
  "خبير SEO المغرب",
  "أفضل خبير SEO في المغرب",
  "مبرمج Full-Stack مغربي",
  "تطوير مواقع الويب المغرب",
  // Darija (Moroccan dialect)
  "مطور ويب فالمغرب",
  "تصميم موقع إلكتروني فكازا",
  "خدمات تطوير مواقع فالمغرب",
] as const;

// ========================================
// CONTENT VARIATION ENGINE
// ========================================

/**
 * Generates unique content sections for each service × city combination.
 * Uses city economy data + service pain points/benefits for variation.
 */
export function generateServiceCityContent(service: ServiceDef, city: City, isAr: boolean) {
  const cityIdx = cities.indexOf(city);
  const serviceIdx = services.indexOf(service);
  // Rotate content patterns based on indices for variation
  const patternIdx = (cityIdx + serviceIdx) % 3;

  const problemSection = isAr
    ? {
        title: `لماذا تحتاج ${service.nameAr} في ${city.nameAr}؟`,
        content: `${service.painPointsAr[patternIdx]} في ${city.nameAr}، المنافسة الرقمية تشتد يومًا بعد يوم. ${city.economyAr} الشركات التي لا تستثمر في ${service.nameAr} تفقد فرصًا ثمينة أمام منافسين أكثر حضورًا على الإنترنت. مع ${city.population} نسمة و${city.industriesAr.slice(0, 3).join("، ")} كقطاعات رئيسية، يوجد سوق ضخم ينتظر من يستغله رقميًا.`,
      }
    : {
        title: `Pourquoi avez-vous besoin ${de(service.name.toLowerCase())} à ${city.name} ?`,
        content: `${service.painPoints[patternIdx]} À ${city.name}, la compétition digitale s'intensifie chaque jour. ${city.economy} Les entreprises qui n'investissent pas dans ${service.name.toLowerCase().startsWith("e") || service.name.toLowerCase().startsWith("a") ? "l'" : "la "}${service.name.toLowerCase()} perdent des opportunités précieuses face à des concurrents plus visibles en ligne. Avec ${city.population} habitants et des secteurs clés comme ${city.industries.slice(0, 3).join(", ")}, il existe un marché immense à conquérir digitalement.`,
      };

  const solutionSection = isAr
    ? {
        title: `حلولي في ${service.nameAr} لشركات ${city.nameAr}`,
        content: `أقدم خدمات ${service.nameAr} مصممة خصيصًا لتلبية احتياجات الشركات في ${city.nameAr}. ${service.benefitsAr[0]}. ${service.benefitsAr[1]}. أعتمد على منهجية عمل مثبتة تبدأ بتحليل معمق لوضعك الحالي، تليها استراتيجية مخصصة، ثم تنفيذ دقيق مع متابعة شفافة. كل مشروع يخضع لمعايير جودة صارمة لضمان أقصى عائد على استثمارك.`,
      }
    : {
        title: `Mes solutions ${de(service.name.toLowerCase())} pour les entreprises à ${city.name}`,
        content: `Je propose des services ${de(service.name.toLowerCase())} conçus spécifiquement pour répondre aux besoins des entreprises à ${city.name}. ${service.benefits[0]}. ${service.benefits[1]}. Ma méthodologie éprouvée commence par une analyse approfondie de votre situation actuelle, suivie d'une stratégie personnalisée, puis d'une exécution rigoureuse avec un suivi transparent. Chaque projet est soumis à des standards de qualité stricts pour garantir un retour maximal sur votre investissement.`,
      };

  const localExpertiseSection = isAr
    ? {
        title: `خبرة محلية في ${city.nameAr}`,
        content: `بصفتي خبيرًا رقميًا أعمل في جميع أنحاء المغرب، أمتلك فهمًا عميقًا لسوق ${city.nameAr}. أعرف التحديات الفريدة التي تواجهها الشركات في قطاعات ${city.industriesAr.join(" و")}. ${city.descriptionAr} مع أكثر من 50 مشروعًا ناجحًا في المغرب، أضمن لك خدمة تفهم خصوصيات السوق المحلي وتحقق نتائج ملموسة.`,
      }
    : {
        title: `Expertise locale à ${city.name}`,
        content: `En tant qu'expert digital opérant dans tout le Maroc, j'ai une compréhension profonde du marché de ${city.name}. Je connais les défis uniques auxquels font face les entreprises dans les secteurs de ${city.industries.join(", ")}. ${city.description} Avec plus de 50 projets réussis au Maroc, je vous garantis un service qui comprend les spécificités du marché local et produit des résultats concrets.`,
      };

  const processSection = isAr
    ? {
        title: `كيف أعمل معك في ${city.nameAr}`,
        content: `منهجيتي في 4 خطوات: 1) استشارة مجانية لفهم أهدافك وتحديات عملك في ${city.nameAr}. 2) استراتيجية مخصصة مع خطة عمل واضحة ونطاق تنفيذ شفاف. 3) تنفيذ احترافي مع تحديثات منتظمة ونقاط متابعة. 4) قياس النتائج والتحسين المستمر. أقدم عرض سعر مخصصًا بعد فهم احتياجاتك الرقمية.`,
      }
    : {
        title: `Comment je travaille avec vous à ${city.name}`,
        content: `Ma méthodologie en 4 étapes : 1) Consultation gratuite pour comprendre vos objectifs et les défis de votre activité à ${city.name}. 2) Stratégie personnalisée avec un plan d'action clair et un périmètre transparent. 3) Exécution professionnelle avec des mises à jour régulières et des points de suivi. 4) Mesure des résultats et optimisation continue. Le devis est personnalisé après analyse de votre présence digitale.`,
      };

  return [problemSection, solutionSection, localExpertiseSection, processSection];
}

/**
 * Generates unique FAQs for each service × city combination.
 */
export function generateServiceCityFAQs(service: ServiceDef, city: City, isAr: boolean) {
  if (isAr) {
    return [
      { q: `كيف أحصل على عرض سعر لخدمة ${service.nameAr} في ${city.nameAr}؟`, a: `الأسعار عند الطلب. كل مشروع يحصل على عرض سعر مخصص بناءً على الأهداف، نطاق العمل والاحتياجات المحددة.` },
      { q: `هل تعمل مع شركات في ${city.nameAr}؟`, a: `نعم! أخدم شركات في جميع أنحاء المغرب بما في ذلك ${city.nameAr}. مقري في مكناس وأعمل عن بُعد أو أتنقل للاجتماعات المهمة.` },
      { q: `ما المدة المطلوبة لرؤية نتائج ${service.nameAr}؟`, a: `النتائج تختلف حسب الخدمة. عادة ما أحقق نتائج أولية خلال 1-3 أشهر مع تحسن مستمر.` },
      { q: `لماذا أختارك بدلاً من وكالة في ${city.nameAr}؟`, a: `أقدم خدمة شخصية بجودة عالية وتواصل مباشر معي. مع أكثر من 50 مشروعًا ناجحًا، لدي سجل مثبت من النتائج في جميع أنحاء المغرب.` },
    ];
  }

  return [
    { q: `Comment obtenir un devis pour ${service.name.toLowerCase().startsWith("e") || service.name.toLowerCase().startsWith("a") ? "l'" : "la "}${service.name.toLowerCase()} à ${city.name} ?`, a: `Prix sur demande. Chaque projet reçoit un devis personnalisé selon vos objectifs, le périmètre et vos besoins spécifiques à ${city.name}.` },
    { q: `Travaillez-vous avec des entreprises à ${city.name} ?`, a: `Absolument ! Je sers des entreprises dans tout le Maroc, y compris à ${city.name}. Basé à Meknès, je travaille à distance ou je me déplace pour les réunions importantes.` },
    { q: `Combien de temps faut-il pour voir les résultats ${de(service.name.toLowerCase())} ?`, a: `Les résultats varient selon le service. En général, j'obtiens des premiers résultats en 1 à 3 mois avec une amélioration continue.` },
    { q: `Pourquoi vous choisir plutôt qu'une agence à ${city.name} ?`, a: `J'offre un service personnalisé de haute qualité avec une communication directe. Avec +50 projets réussis, j'ai un historique éprouvé de résultats dans tout le Maroc. Mon expertise technique (React, TypeScript) est supérieure à la plupart des agences locales.` },
  ];
}

// Total programmatic pages count
export const TOTAL_PAGES = services.length * cities.length + cities.length;
// services.length × cities.length service×city pages + cities.length city hub pages
// (recomputes automatically as services/cities are added — no hardcoded count to keep in sync)

