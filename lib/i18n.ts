export type Language = "ru" | "uz" | "en";

type Dict = Record<string, string>;

// RU
const RU: Dict = {
  // Навигация
  "nav.home": "Главная",
  "nav.services": "Услуги",
  "nav.calculator": "Калькулятор",
  "nav.contacts": "Контакты",
  "nav.calculate": "Рассчитать",

  // Футер
  "footer.navigation": "Навигация",
  "footer.services": "Услуги",
  "footer.contacts": "Контакты",
  "footer.service.auto": "Автоперевозки",
  "footer.service.container": "Контейнерные перевозки",
  "footer.service.customs": "Таможенное сопровождение",
  "footer.rights": "Все права защищены.",
  "footer.company": "Patron.zu",
  "footer.description": "Профессиональные грузоперевозки из Китая в Узбекистан",
  "footer.in.china": "В Китае:",
  "footer.in.uzbekistan": "В Узбекистане:",
  "footer.email": "Почта:",
  "footer.address": "Адрес:",

  // Главная — баннер
  "home.hero.title": "Грузоперевозки из Китая в Узбекистан",
  "home.hero.subtitle":
    "Быстрая и надёжная доставка грузов. Автоперевозки, контейнерные перевозки. Рассчитайте стоимость онлайн за 2 минуты.",
  "home.hero.cta.primary": "Рассчитать стоимость",
  "home.hero.cta.secondary": "Оставить заявку",

  // Главная — секции
  "home.services.title": "Наши услуги",
  "home.services.all": "Все услуги",
  "home.why.title": "Почему выбирают нас",
  "home.routes.title": "Наши маршруты",
  "home.routes.subtitle": "Доставка из Китая в Узбекистан",
  "home.cta.title": "Готовы начать?",
  "home.cta.subtitle": "Рассчитайте стоимость доставки прямо сейчас",

  // Контакты — адрес
  "contacts.info.address.value": "улица Аския 24, Ташкент",
};

// UZ
const UZ: Dict = {
  "nav.home": "Bosh sahifa",
  "nav.services": "Xizmatlar",
  "nav.calculator": "Kalkulyator",
  "nav.contacts": "Kontaktlar",
  "nav.calculate": "Hisoblash",

  "footer.navigation": "Navigatsiya",
  "footer.services": "Xizmatlar",
  "footer.contacts": "Kontaktlar",
  "footer.service.auto": "Avtotashish",
  "footer.service.container": "Konteyner tashish",
  "footer.service.customs": "Bojxona ko'magi",
  "footer.rights": "Barcha huquqlar himoyalangan.",
  "footer.company": "Patron.zu",
  "footer.description": "Xitoydan O'zbekistonga professional yuk tashish",
  "footer.in.china": "Xitoyda:",
  "footer.in.uzbekistan": "O'zbekistonda:",
  "footer.email": "Email:",
  "footer.address": "Manzil:",

  "home.hero.title": "Xitoydan O'zbekistonga yuk tashish",
  "home.hero.subtitle":
    "Tez va ishonchli yuk tashish. Avtotashish, konteyner tashish. Narxni 2 daqiqada onlayn hisoblang.",
  "home.hero.cta.primary": "Narxni hisoblash",
  "home.hero.cta.secondary": "Ariza qoldirish",

  "home.services.title": "Xizmatlarimiz",
  "home.services.all": "Barcha xizmatlar",
  "home.why.title": "Nega aynan biz?",
  "home.routes.title": "Marshrutlarimiz",
  "home.routes.subtitle": "Xitoydan O'zbekistonga yetkazib berish",
  "home.cta.title": "Boshlashga tayyormisiz?",
  "home.cta.subtitle": "Hozir narxni hisoblang",

  "contacts.info.address.value": "Askia ko'chasi 24, Toshkent",
};

// EN
const EN: Dict = {
  "nav.home": "Home",
  "nav.services": "Services",
  "nav.calculator": "Calculator",
  "nav.contacts": "Contacts",
  "nav.calculate": "Calculate",

  "footer.navigation": "Navigation",
  "footer.services": "Services",
  "footer.contacts": "Contacts",
  "footer.service.auto": "Road freight",
  "footer.service.container": "Container shipping",
  "footer.service.customs": "Customs support",
  "footer.rights": "All rights reserved.",
  "footer.company": "Patron.zu",
  "footer.description": "Professional freight from China to Uzbekistan",
  "footer.in.china": "In China:",
  "footer.in.uzbekistan": "In Uzbekistan:",
  "footer.email": "Email:",
  "footer.address": "Address:",

  "home.hero.title": "Freight from China to Uzbekistan",
  "home.hero.subtitle":
    "Fast and reliable cargo delivery. Road freight, container shipping. Calculate the cost online in 2 minutes.",
  "home.hero.cta.primary": "Calculate cost",
  "home.hero.cta.secondary": "Leave a request",

  "home.services.title": "Our services",
  "home.services.all": "All services",
  "home.why.title": "Why choose us",
  "home.routes.title": "Our routes",
  "home.routes.subtitle": "Delivery from China to Uzbekistan",
  "home.cta.title": "Ready to start?",
  "home.cta.subtitle": "Calculate the delivery cost right now",

  "contacts.info.address.value": "Askia Street 24, Tashkent",
};

const DICTS: Record<Language, Dict> = { ru: RU, uz: UZ, en: EN };

export function t(
  lang: Language,
  key: keyof typeof RU | string,
  params?: Record<string, string | number>,
): string {
  let text = DICTS[lang]?.[key] ?? key;

  if (params) {
    Object.keys(params).forEach((paramKey) => {
      text = text.replace(new RegExp(`\\{${paramKey}\\}`, "g"), String(params[paramKey]));
    });
  }

  return text;
}

