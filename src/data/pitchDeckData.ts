export interface PitchSlide {
  id: string;
  title: string;
  subtitle?: string;
}

export interface MarketData {
  tam: { value: string; label: string; growth?: string };
  sam: { value: string; label: string; growth?: string };
  som: { value: string; label: string; growth?: string };
}

export interface Competitor {
  name: string;
  price: number;
  quality: number;
  localFocus: number;
  isMarmelat?: boolean;
}

export interface Milestone {
  year: string;
  event: string;
}

export interface UseOfFunds {
  category: string;
  percentage: number;
  amount: string;
}

export interface FinancialProjection {
  year: string;
  revenue: number;
  revenueFormatted: string;
  ebitda: number;
  ebitdaMargin: string;
}

export interface UnitEconomicsData {
  metric: string;
  value: string;
  benchmark?: string;
  isGood: boolean;
}

// Данные для Pitch Deck
export const pitchDeckData = {
  // Cover Slide
  cover: {
    tagline: 'Культовые средства для идеальной укладки',
    subtitle: 'Инвестиционная презентация',
    year: '2025',
    fundingRound: 'Seed Round',
    askAmount: '$2M',
  },

  // Problem
  problem: {
    title: 'Проблема',
    mainStat: {
      value: '80%',
      label: 'казахстанских покупателей hair-ухода выбирают импортные бренды',
    },
    marketGap: {
      title: 'Рыночный разрыв',
      description:
        'Между масс-маркетом и премиумом отсутствует локальный адаптированный бренд',
    },
    points: [
      {
        title: 'Экстремальный климат',
        description:
          'Жёсткая вода, сухость воздуха, перепады температур — импортные формулы не адаптированы',
        metric: '-30°C...+40°C',
      },
      {
        title: 'Высокие цены на импорт',
        description:
          'Логистика и наценки дистрибьюторов увеличивают стоимость на 40-60%',
        metric: '+40-60%',
      },
      {
        title: 'Отсутствие локальных брендов',
        description:
          'Менее 10% рынка занято локальными производителями',
        metric: '<10%',
      },
      {
        title: 'Нет Halal-сертификации',
        description:
          'Большинство импортных брендов не имеют Halal-сертификата',
        metric: '70%+ без Halal',
      },
    ],
  },

  // Solution
  solution: {
    title: 'Решение',
    mainText:
      'MARMELAT — казахстанский бренд культовых средств для укладки волос',
    valueProposition: 'Укладка за 2 минуты без жирности и утяжеления',
    features: [
      {
        title: 'Узнаваемый стиль',
        description: 'Собственный узнаваемый стиль и упаковка',
      },
      {
        title: 'Эффективные формулы',
        description: 'Не утяжеляющие волосы составы',
      },
      {
        title: 'Универсальность',
        description: 'Подходит для профессионалов и домашнего ухода',
      },
      {
        title: 'Баланс сегментов',
        description: 'Между масс-маркетом и премиумом',
      },
    ],
    productCategories: [
      'Восковой стик (флагман)',
      'Щётки для волос',
      'Бигуди',
      'Шампуни и маски',
      'Пудра для окрашивания волос',
    ],
  },

  // Market Size
  market: {
    title: 'Рынок',
    data: {
      tam: {
        value: '$750B',
        label: 'Мировой рынок косметики',
        growth: '+10-15% в год',
      },
      sam: {
        value: '$600M',
        label: 'Рынок косметики Казахстана',
        growth: '+12% в год',
      },
      som: {
        value: '$30M',
        label: 'Целевой сегмент hair care',
        growth: 'Цель: 3-5% за 4 года',
      },
    } as MarketData,
    keyInsights: [
      { metric: '12-15%', label: 'Ежегодный рост hair care сегмента' },
      { metric: '<10%', label: 'Доля локальных брендов' },
      { metric: '3x', label: 'Рост онлайн-продаж за 2 года' },
      { metric: '5+', label: 'Экспортных рынков в фокусе' },
    ],
    exportMarkets: [
      { name: 'Узбекистан', population: '35M', status: 'priority' },
      { name: 'Кыргызстан', population: '7M', status: 'priority' },
      { name: 'Азербайджан', population: '10M', status: 'planned' },
      { name: 'ОАЭ', population: '10M', status: 'planned' },
      { name: 'Европа', population: '450M', status: 'planned' },
    ],
  },

  // Products
  products: {
    title: 'Продукты',
    skuCount: 8,
    avgMargin: 58,
    categories: [
      {
        name: 'Средства для укладки',
        items: ['Восковой стик (флагман)', 'Пудра для окрашивания волос'],
        revenue: 40,
        status: 'active',
      },
      {
        name: 'Уход за волосами',
        items: ['Шампуни', 'Маски'],
        revenue: 25,
        status: 'active',
      },
      {
        name: 'Инструменты',
        items: ['Щётки для волос', 'Бигуди'],
        revenue: 35,
        status: 'active',
      },
    ],
    pipeline: [
      { name: 'Натуральные масла', timeline: 'Q3 2025' },
      { name: 'Уходовые линии', timeline: 'Q4 2025' },
    ],
  },

  // Business Model
  businessModel: {
    title: 'Бизнес-модель',
    model: 'Гибрид B2B + D2C',
    channels: [
      {
        name: 'Онлайн',
        percentage: 40,
        description: 'Kaspi, Wildberries, Ozon',
        trend: 'up',
      },
      {
        name: 'Ритейл',
        percentage: 30,
        description: 'Magnum, Золотое Яблоко',
        trend: 'stable',
      },
      {
        name: 'Салоны B2B',
        percentage: 20,
        description: 'Барбершопы, салоны красоты',
        trend: 'up',
      },
      {
        name: 'Экспорт',
        percentage: 10,
        description: 'СНГ, Ближний Восток',
        trend: 'up',
      },
    ],
    unitEconomics: [
      { metric: 'Средняя цена', value: '$4-5', benchmark: 'Импорт: $7-10', isGood: true },
      { metric: 'CAC', value: '$6', benchmark: 'Benchmark: $8-12', isGood: true },
      { metric: 'LTV', value: '$40', benchmark: '10 покупок/клиент', isGood: true },
      { metric: 'LTV/CAC', value: '6.7x', benchmark: 'Benchmark: 3x+', isGood: true },
      { metric: 'Gross Margin', value: '55-60%', benchmark: 'Industry: 40-50%', isGood: true },
      { metric: 'Payback', value: '14-30 дней', benchmark: 'Benchmark: 60-90', isGood: true },
    ] as UnitEconomicsData[],
  },

  // Traction
  traction: {
    title: 'Traction',
    highlight: 'Органический рост без маркетингового бюджета',
    kpis: [
      { value: '$100K', label: 'Выручка за 12 месяцев', growth: null },
      { value: '8', label: 'SKU в продаже', growth: null },
      { value: '6+', label: 'Ритейл-партнёров', growth: null },
      { value: '50K+', label: 'Подписчиков в Instagram', growth: '+200%' },
    ],
    milestones: [
      { year: '2023', event: 'Запуск бренда, первые продажи' },
      { year: '2024', event: 'Выход в Magnum, Золотое Яблоко' },
      { year: '2025', event: 'Seed-раунд, масштабирование' },
    ] as Milestone[],
    retailers: [
      { name: 'Magnum', type: 'Крупнейшая сеть КЗ' },
      { name: 'Золотое Яблоко', type: 'Premium beauty' },
      { name: 'Mon Amie', type: 'Beauty retail' },
      { name: 'Французский дом', type: 'Beauty retail' },
      { name: 'Бьюти мания', type: 'Beauty retail' },
      { name: 'Kaspi', type: 'E-commerce #1' },
    ],
  },

  // Competition
  competition: {
    title: 'Конкуренты',
    matrix: [
      { name: "L'Oréal", price: 8, quality: 9, localFocus: 2 },
      { name: 'Schwarzkopf', price: 7, quality: 7, localFocus: 2 },
      { name: 'Pantene', price: 5, quality: 5, localFocus: 3 },
      { name: 'Natura Siberica', price: 7, quality: 8, localFocus: 4 },
      { name: 'MARMELAT', price: 4, quality: 8, localFocus: 10, isMarmelat: true },
    ] as Competitor[],
    advantages: [
      { title: 'Цена', marmelat: 'На 30-40% ниже', competitors: 'Импортная наценка' },
      { title: 'Адаптация', marmelat: 'Под климат КЗ', competitors: 'Универсальные формулы' },
      { title: 'Halal', marmelat: 'Сертифицировано', competitors: 'Редко' },
      { title: 'Позиционирование', marmelat: 'Тёплый локальный бренд', competitors: 'Холодные корпорации' },
    ],
  },

  // Team
  team: {
    title: 'Команда',
    totalExperience: '30+ лет',
    members: [
      {
        role: 'CEO / Основатель',
        focus: 'Стратегия, развитие бизнеса',
        experience: '10 лет в FMCG и дистрибуции',
        linkedin: null,
      },
      {
        role: 'Технолог',
        focus: 'Разработка формул, сертификация',
        experience: 'Косметическое производство',
        linkedin: null,
      },
      {
        role: 'CMO',
        focus: 'Digital-маркетинг, партнёрства',
        experience: 'E-commerce и маркетплейсы',
        linkedin: null,
      },
      {
        role: 'CFO',
        focus: 'Финансы, инвестиции',
        experience: 'Бюджетирование и расчёты',
        linkedin: null,
      },
    ],
  },

  // Financials
  financials: {
    title: 'Финансы',
    historicalRevenue: [
      { year: '2023', revenue: 30000 },
      { year: '2024', revenue: 100000 },
    ],
    projections: [
      { year: '2025', revenue: 600000, revenueFormatted: '$0.6M', ebitda: 60000, ebitdaMargin: '10%' },
      { year: '2026', revenue: 2800000, revenueFormatted: '$2.8M', ebitda: 504000, ebitdaMargin: '18%' },
      { year: '2027', revenue: 7500000, revenueFormatted: '$7.5M', ebitda: 1875000, ebitdaMargin: '25%' },
      { year: '2028', revenue: 14000000, revenueFormatted: '$14M', ebitda: 4200000, ebitdaMargin: '30%' },
    ] as FinancialProjection[],
    keyMetrics: {
      cagr: '135%',
      breakeven: 'Q4 2025',
      targetValuation: '$50-70M к 2029',
    },
  },

  // Investment Ask
  investment: {
    title: 'Инвестиции',
    amount: '$2,000,000',
    equity: '10-15%',
    preMoneyValuation: '$13-18M',
    useOfFunds: [
      { category: 'Маркетинг и digital', percentage: 35, amount: '$700K' },
      { category: 'Производство и сырьё', percentage: 25, amount: '$500K' },
      { category: 'Сертификация (Halal, EU)', percentage: 20, amount: '$400K' },
      { category: 'Команда и логистика', percentage: 10, amount: '$200K' },
      { category: 'Оборотный капитал', percentage: 10, amount: '$200K' },
    ] as UseOfFunds[],
    milestones: [
      { milestone: 'Q2 2025', target: 'Запуск шампуней и масок' },
      { milestone: 'Q4 2025', target: 'Выход в Узбекистан' },
      { milestone: 'Q2 2026', target: '$1M ARR' },
      { milestone: 'Q4 2026', target: 'Halal + EU сертификация' },
    ],
    exitStrategy: {
      timeline: '4-5 лет',
      options: [
        'Стратегическая продажа (L\'Oréal, Henkel, Faberlic)',
        'IPO на AIX или Dubai',
      ],
      targetROI: '5-8x',
    },
  },

  // Mission
  mission: {
    title: 'Миссия',
    statement:
      'Помогать каждой женщине чувствовать себя уверенно и красиво',
    vision:
      'Стать #1 локальным beauty-брендом в регионе СНГ к 2030 году',
    values: ['Уверенность', 'Красота', 'Трендовость'],
  },

  // Contact
  contact: {
    title: 'Контакты',
    cta: 'Готовы обсудить инвестиции',
    nextSteps: [
      'Due diligence материалы',
      'Финансовая модель',
      'Встреча с командой',
    ],
  },
};

// Навигация по слайдам
export const pitchSlides: PitchSlide[] = [
  { id: 'cover', title: 'MARMELAT' },
  { id: 'problem', title: 'Проблема' },
  { id: 'solution', title: 'Решение' },
  { id: 'market', title: 'Рынок' },
  { id: 'products', title: 'Продукты' },
  { id: 'business', title: 'Бизнес-модель' },
  { id: 'traction', title: 'Traction' },
  { id: 'competition', title: 'Конкуренты' },
  { id: 'team', title: 'Команда' },
  { id: 'financials', title: 'Финансы' },
  { id: 'investment', title: 'Инвестиции' },
  { id: 'contact', title: 'Контакты' },
];
