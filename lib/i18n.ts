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
  "home.why.fast.title": "Быстрая доставка",
  "home.why.fast.desc": "Оптимальные маршруты и сроки доставки",
  "home.why.price.title": "Прозрачные цены",
  "home.why.price.desc": "Без скрытых платежей, фиксированная стоимость",
  "home.why.insurance.title": "Страхование",
  "home.why.insurance.desc": "Полная защита груза на всех этапах перевозки",
  "home.routes.title": "Наши маршруты",
  "home.routes.subtitle": "Доставка из Китая в Узбекистан",
  "home.cta.title": "Готовы начать?",
  "home.cta.subtitle": "Рассчитайте стоимость доставки прямо сейчас",
  "home.services.auto.title": "Автоперевозки",
  "home.services.auto.description":
    "Наземная доставка грузов автомобильным транспортом. Оптимально для средних и крупных партий.",
  "home.services.container.title": "Контейнерные перевозки",
  "home.services.container.description":
    "Перевозка грузов в контейнерах. Подходит для крупных партий и оборудования.",
  "home.services.customs.title": "Таможенное сопровождение",
  "home.services.customs.description":
    "Полное сопровождение таможенного оформления. Помощь в подготовке документов.",

  // Контакты — адрес
  "contacts.info.address.value": "улица Аския 24, Ташкент",

  // Калькулятор
  "calculator.title": "Калькулятор стоимости доставки",
  "calculator.tariff": "Тариф: {price} USD за 1 кубометр (Без растаможки)",
  "calculator.rates.title": "Курсы валют",
  "calculator.rates.refresh": "Обновить",
  "calculator.rates.loading": "Загрузка...",
  "calculator.rates.manual.toggle": "Ввести вручную",
  "calculator.rates.manual.cancel": "Отмена",
  "calculator.rates.manual.usdToUzs": "USD → UZS",
  "calculator.rates.manual.usdToCny": "USD → CNY",
  "calculator.rates.manual.placeholder.usdToUzs": "Например: 12500",
  "calculator.rates.manual.placeholder.usdToCny": "Например: 7.2",
  "calculator.rates.manual.save": "Сохранить курсы",
  "calculator.volume.label": "Объем груза (куб.м) *",
  "calculator.volume.placeholder": "Введите объем в кубометрах",
  "calculator.calculate": "Рассчитать стоимость",
  "calculator.result.title": "Результат расчёта",
  "calculator.result.usd": "Стоимость в USD:",
  "calculator.result.uzs": "Стоимость в UZS:",
  "calculator.result.cny": "Стоимость в CNY:",
  "calculator.disclaimer":
    "* Указанная стоимость является ориентировочной. Финальная цена может отличаться в зависимости от дополнительных услуг и особенностей груза.",
  "calculator.consultation": "Нужна консультация?",
  "calculator.contactUs": "Свяжитесь с нами",
  "calculator.errors.enterVolume": "Введите объем груза",
  "calculator.errors.ratesNotLoaded": "Курсы валют не загружены",
  "calculator.errors.invalidVolume": "Введите корректный объем",
  "calculator.errors.invalidRates": "Введите корректные значения курсов",
  "calculator.updated": "Обновлено:",
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
  "home.why.fast.title": "Tez yetkazib berish",
  "home.why.fast.desc": "Optimal marshrutlar va yetkazib berish muddatlari",
  "home.why.price.title": "Shaffof narxlar",
  "home.why.price.desc": "Yashirin to'lovlarsiz, belgilangan narx",
  "home.why.insurance.title": "Sug'urta",
  "home.why.insurance.desc": "Tashishning barcha bosqichlarida yukning to'liq himoyasi",
  "home.routes.title": "Marshrutlarimiz",
  "home.routes.subtitle": "Xitoydan O'zbekistonga yetkazib berish",
  "home.cta.title": "Boshlashga tayyormisiz?",
  "home.cta.subtitle": "Hozir narxni hisoblang",
  "home.services.auto.title": "Avtotashish",
  "home.services.auto.description":
    "Yuklarni avtomobil transportida yetkazib berish. O'rtacha va katta partiyalar uchun optimal.",
  "home.services.container.title": "Konteyner tashish",
  "home.services.container.description":
    "Yuklarni konteynerlarda tashish. Katta partiyalar va uskunalar uchun mos.",
  "home.services.customs.title": "Bojxona ko'magi",
  "home.services.customs.description":
    "Bojxona rasmiylashtirishning to'liq hamrohligi. Hujjatlarni tayyorlashda yordam.",

  "contacts.info.address.value": "Askia ko'chasi 24, Toshkent",

  // Kalkulyator
  "calculator.title": "Yetkazib berish narxini hisoblash",
  "calculator.tariff": "Tarif: 1 kubometr uchun {price} USD (Bojxonasiz)",
  "calculator.rates.title": "Valyuta kurslari",
  "calculator.rates.refresh": "Yangilash",
  "calculator.rates.loading": "Yuklanmoqda...",
  "calculator.rates.manual.toggle": "Qo'lda kiritish",
  "calculator.rates.manual.cancel": "Bekor qilish",
  "calculator.rates.manual.usdToUzs": "USD → UZS",
  "calculator.rates.manual.usdToCny": "USD → CNY",
  "calculator.rates.manual.placeholder.usdToUzs": "Masalan: 12500",
  "calculator.rates.manual.placeholder.usdToCny": "Masalan: 7.2",
  "calculator.rates.manual.save": "Kurslarni saqlash",
  "calculator.volume.label": "Yuk hajmi (kub.m) *",
  "calculator.volume.placeholder": "Hajmni kubometrlarda kiriting",
  "calculator.calculate": "Narxni hisoblash",
  "calculator.result.title": "Hisoblash natijasi",
  "calculator.result.usd": "USD dagi qiymat:",
  "calculator.result.uzs": "UZS dagi qiymat:",
  "calculator.result.cny": "CNY dagi qiymat:",
  "calculator.disclaimer":
    "* Ko'rsatilgan narx taxminiy. Yakuniy narx qo'shimcha xizmatlar va yuk xususiyatlariga qarab farq qilishi mumkin.",
  "calculator.consultation": "Maslahat kerakmi?",
  "calculator.contactUs": "Biz bilan bog'laning",
  "calculator.errors.enterVolume": "Yuk hajmini kiriting",
  "calculator.errors.ratesNotLoaded": "Valyuta kurslari yuklanmadi",
  "calculator.errors.invalidVolume": "To'g'ri hajm kiriting",
  "calculator.errors.invalidRates": "Kurs qiymatlarini to'g'ri kiriting",
  "calculator.updated": "Yangilangan:",
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
  "home.why.fast.title": "Fast delivery",
  "home.why.fast.desc": "Optimal routes and delivery times",
  "home.why.price.title": "Transparent prices",
  "home.why.price.desc": "No hidden fees, fixed cost",
  "home.why.insurance.title": "Insurance",
  "home.why.insurance.desc": "Full cargo protection at all stages of transportation",
  "home.routes.title": "Our routes",
  "home.routes.subtitle": "Delivery from China to Uzbekistan",
  "home.cta.title": "Ready to start?",
  "home.cta.subtitle": "Calculate the delivery cost right now",
  "home.services.auto.title": "Road freight",
  "home.services.auto.description":
    "Ground delivery of cargo by road transport. Optimal for medium and large shipments.",
  "home.services.container.title": "Container shipping",
  "home.services.container.description":
    "Transportation of cargo in containers. Suitable for large shipments and equipment.",
  "home.services.customs.title": "Customs support",
  "home.services.customs.description":
    "Full customs clearance support. Assistance in document preparation.",

  "contacts.info.address.value": "Askia Street 24, Tashkent",

  // Calculator
  "calculator.title": "Delivery cost calculator",
  "calculator.tariff": "Rate: {price} USD per 1 m³ (No customs clearance)",
  "calculator.rates.title": "Exchange rates",
  "calculator.rates.refresh": "Refresh",
  "calculator.rates.loading": "Loading...",
  "calculator.rates.manual.toggle": "Enter manually",
  "calculator.rates.manual.cancel": "Cancel",
  "calculator.rates.manual.usdToUzs": "USD → UZS",
  "calculator.rates.manual.usdToCny": "USD → CNY",
  "calculator.rates.manual.placeholder.usdToUzs": "E.g.: 12500",
  "calculator.rates.manual.placeholder.usdToCny": "E.g.: 7.2",
  "calculator.rates.manual.save": "Save rates",
  "calculator.volume.label": "Cargo volume (m³) *",
  "calculator.volume.placeholder": "Enter volume in cubic meters",
  "calculator.calculate": "Calculate cost",
  "calculator.result.title": "Calculation result",
  "calculator.result.usd": "Cost in USD:",
  "calculator.result.uzs": "Cost in UZS:",
  "calculator.result.cny": "Cost in CNY:",
  "calculator.disclaimer":
    "* The shown cost is approximate. The final price may vary depending on additional services and cargo specifics.",
  "calculator.consultation": "Need a consultation?",
  "calculator.contactUs": "Contact us",
  "calculator.errors.enterVolume": "Enter cargo volume",
  "calculator.errors.ratesNotLoaded": "Exchange rates are not loaded",
  "calculator.errors.invalidVolume": "Enter a valid volume",
  "calculator.errors.invalidRates": "Enter valid exchange rate values",
  "calculator.updated": "Updated:",
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

