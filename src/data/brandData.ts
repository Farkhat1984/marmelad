import type { Product, Partner, ContactInfo, Benefit, Bundle } from '../types';

export const products: Product[] = [
  {
    id: 'wax-stick',
    name: 'Восковой стик',
    description: 'Для гладких блестящих причесок, 50ml',
    fullDescription: 'Восковой стик MARMELAT® создан для создания гладких и блестящих причесок. Благодаря формату стика, воск легко распределяется, не утяжеляя волосы, его удобно наносить и контролировать объем применяемого средства. Подходит для безупречных укладок в домашних условиях, а также парикмахерам и стилистам. На волосах оставляет глянцевый эффект без жирности.',
    features: [
      'Объём: 50ml',
      'Канделильский воск — увлажнение без склеивания, защитный барьер',
      'Пчелиный воск — натуральный увлажнитель, придаёт плотность и текстуру',
      'Касторовое масло — сияние и блеск, предотвращает ломкость',
      'Не тестируется на животных, веганская формула',
      'Подходит для всех типов волос',
    ],
    priceRetail: 8000,
    priceWholesale: 5200,
    images: [
      '/images/products/wax_stick/1.jpg',
      '/images/products/wax_stick/2.JPEG',
      '/images/products/wax_stick/3.JPEG',
    ],
  },
  {
    id: 'gel',
    name: 'Гель для пушковых волос',
    description: 'С удобной кисточкой для точного нанесения',
    fullDescription: 'Гель для укладки пушковых волос идеален для аккуратной укладки мелких волосков. Удобная кисточка позволяет легко пригладить пушистые пряди у лба и висков, создавая чистую и ухоженную прическу.',
    features: [
      'Удобная кисточка для точного нанесения',
      'Идеален для укладки мелких волосков',
      'Не склеивает волосы',
      'Не оставляет следов',
      'Создаёт чистую и ухоженную причёску',
    ],
    priceRetail: 6000,
    priceWholesale: 4000,
    images: ['/images/products/gel_for_vellus_hair/1.JPEG'],
  },
  {
    id: 'brush-comb-set',
    name: 'Щётка и расчёска-гребень',
    description: 'Щётка для разглаживания + расчёска-гребень разделитель для волос',
    fullDescription: 'Щётка для разглаживания волос MARMELAT® разглаживает волосы и придает блеск. Щетина средней жесткости хорошо моделирует и разглаживает волосы. Деревянный корпус придаёт щётке прочность и долговечность. Расчёска-гребень с тонким металлическим хвостиком удобна для разделения прядей и создания идеального пробора.',
    features: [
      'Щётка с щетиной средней жесткости',
      'Деревянный корпус — прочность и долговечность',
      'Гребень с металлическим хвостиком для разделения прядей',
      'Идеально для гладких причёсок и идеального хвоста',
      'Зубцы не царапают кожу головы',
    ],
    priceRetail: 3300,
    priceWholesale: 2100,
    images: [
      '/images/products/smoothing_brush/1.JPEG',
      '/images/products/smoothing_brush/2.PNG',
      '/images/products/smoothing_brush/3.PNG',
      '/images/products/smoothing_brush/4.PNG',
      '/images/products/smoothing_brush/5.PNG',
    ],
  },
  {
    id: 'pro-brush',
    name: 'Профессиональная щётка',
    description: 'Американский орех, натуральная щетина',
    fullDescription: 'Профессиональная щётка для гладкой укладки из натурального дерева американский орех с высококачественной натуральной щетиной. Щетина средней жесткости разглаживает волосы, придаёт им блеск и помогает моделировать укладку. Изогнутая форма идеально приглаживает волосы. Деревянный корпус обеспечивает прочность и приятные тактильные ощущения.',
    features: [
      'Натуральное дерево — американский орех',
      'Высококачественная натуральная щетина',
      'Щетина средней жесткости',
      'Изогнутая форма для идеального приглаживания',
      'Для профессионального и домашнего использования',
    ],
    priceRetail: 6000,
    priceWholesale: 3000,
    images: ['/images/products/professional_brush/1.png'],
  },
  {
    id: 'silk-curlers',
    name: 'Шёлковые бигуди',
    description: '100% натуральный шелк для завивки без нагрева',
    fullDescription: 'Мягкие бигуди из 100% натурального шелка тутового шелкопряда класса 6А (сертификат OEKO-TEX 100). Деликатно создают упругие и блестящие локоны без вреда для волос. Идеальны для использования во время сна.',
    features: [
      '100% натуральный шёлк тутового шелкопряда класса 6А',
      'Сертификат OEKO-TEX 100',
      'В наборе: плойка из шёлка, 2 шёлковые резинки',
      'Зажим для волос и расчёска в комплекте',
      'Идеальны для использования во время сна',
      'Создают локоны без вреда для волос',
    ],
    priceRetail: 18000,
    priceWholesale: 11000,
    images: ['/images/products/silk_curlers/1.png'],
  },
];

export const bundles: Bundle[] = [
  {
    id: 'basic-set',
    name: 'Базовый набор для гладкой укладки',
    description: 'Всё необходимое для идеальной укладки',
    fullDescription: 'Базовый набор для гладкой укладки. Восковой стик — без жирности, не утяжеляет, с ухаживающим натуральным составом. Щётка — придаёт волосам зеркальный блеск и гладкость. Гребень — для чёткого пробора и идеального разделения прядей. Идеален для ежедневной укладки за пару минут перед выходом.',
    items: [
      'Восковой стик для укладки волос',
      'Деревянная щётка с натуральной щетиной',
      'Гребень-разделитель для пробора',
    ],
    priceRetail: 11300,
    priceWholesale: 7540,
    images: ['/images/products/basic_set/1.JPEG'],
  },
  {
    id: 'full-set',
    name: 'Набор для гладкой укладки в косметичке',
    description: 'Полный набор для профессиональной укладки в стильной косметичке',
    fullDescription: 'Идеальный набор где собраны все продукты для гладкой укладки от MARMELAT, упакованы в брендированную стильную, вместительную косметичку. Косметичка объёмная, влагоотталкивающая — удобно брать с собой в спортзал, на отдых или в поездку. Отличный вариант для себя любимой или в подарок подруге.',
    items: [
      'Восковой стик для волос',
      'Гель для укладки пушковых волос',
      'Деревянная щётка с натуральной щетиной',
      'Гребень-разделитель для пробора',
      'Удобная косметичка MARMELAT',
      '2 стильные заколочки в подарок',
    ],
    priceRetail: 19600,
    priceWholesale: 11740,
    images: [
      '/images/products/smooth_styling_kit/1.JPEG',
      '/images/products/smooth_styling_kit/2.JPEG',
      '/images/products/smooth_styling_kit/3.JPEG',
    ],
  },
];

export const partners: Partner[] = [
  { id: 'yellow', name: 'Yellow Concept Store', logo: '/images/partners/yellow.png', logoPlaceholder: 'Логотип Yellow Concept Store' },
  { id: 'cosmetica', name: 'Cosmetica_KZ', logo: '/images/partners/cosmetica.kz.png', logoPlaceholder: 'Логотип Cosmetica_KZ' },
  { id: 'magnum', name: 'Magnum', logo: '/images/partners/magnum.png', logoPlaceholder: 'Логотип Magnum' },
  { id: 'golden-apple', name: 'Золотое Яблоко', logo: '/images/partners/gold_apple.png', logoPlaceholder: 'Логотип Золотое Яблоко' },
  { id: 'erdem', name: 'ERDEM Cosmetics', logo: '/images/partners/erdem.jpeg', logoPlaceholder: 'Логотип ERDEM Cosmetics' },
  { id: 'monamie', name: 'MonAmie', logo: '/images/partners/monami.png', logoPlaceholder: 'Логотип MonAmie' },
  { id: 'sayori', name: 'SAYORI', logo: '/images/partners/sayori.jpeg', logoPlaceholder: 'Логотип SAYORI' },
];

export const benefits: Benefit[] = [
  {
    id: 'natural',
    title: 'Натуральный состав',
    description: 'Только качественные натуральные ингредиенты',
    icon: '01',
  },
  {
    id: 'cruelty-free',
    title: 'Cruelty-free',
    description: 'Не тестируется на животных',
    icon: '02',
  },
  {
    id: 'vegan',
    title: 'Веганская формула',
    description: 'Без компонентов животного происхождения',
    icon: '03',
  },
  {
    id: 'universal',
    title: 'Для всех типов волос',
    description: 'Подходит для любого типа и структуры волос',
    icon: '04',
  },
  {
    id: 'made-in-kz',
    title: 'Казахстанский бренд',
    description: 'Создано с любовью для казахстанцев',
    icon: '05',
  },
  {
    id: 'professional',
    title: 'Профессиональное качество',
    description: 'Используется стилистами и парикмахерами',
    icon: '06',
  },
];

export const contactInfo: ContactInfo = {
  company: 'ИП «MARMELAT»',
  address: 'г. Алматы, Природа 15а',
  phones: ['+7 700 725 22 74', '+7 747 362 52 49'],
  email: 'marmelat.kz@gmail.com',
  instagram: '@marmelat.kz',
  whatsapp: '+77007252274',
};

export const missionText = 'Наша миссия — помогать каждой женщине чувствовать себя уверенно и красиво. MARMELAT® — первый бренд ухода за волосами, созданный для климата и людей Центральной Азии. Мы делаем красоту доступной, натуральной и локальной.';

export const slogan = 'Культовые средства для идеальной укладки';
