/**
 * SEO конфигурация для всех страниц
 * 
 * ИНСТРУКЦИЯ ПО ИЗМЕНЕНИЮ:
 * 1. Найдите нужную страницу в объекте seoConfig
 * 2. Измените title, description, keywords и другие поля
 * 3. Сохраните файл и пересоберите проект (npm run build)
 * 
 * Для добавления новых страниц - добавьте новый ключ в seoConfig
 */

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  robots?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
}

export const seoConfig: Record<string, SEOData> = {
  home: {
    title: "Грузоперевозки из Китая в Узбекистан | Международная доставка",
    description:
      "Профессиональные грузоперевозки из Китая в Узбекистан. Автоперевозки, авиадоставка, контейнерные перевозки. Быстрый расчёт стоимости онлайн.",
    keywords:
      "грузоперевозки Китай Узбекистан, доставка из Китая, международные перевозки, автоперевозки, авиадоставка, контейнерные перевозки",
    robots: "index, follow",
    canonical: "/",
    ogTitle: "Грузоперевозки из Китая в Узбекистан",
    ogDescription: "Профессиональные грузоперевозки из Китая в Узбекистан",
    ogType: "website",
  },
  services: {
    title: "Услуги грузоперевозок | Авто, авиа, контейнеры",
    description:
      "Полный спектр услуг грузоперевозок: автоперевозки, авиадоставка, контейнерные перевозки, карго, таможенное сопровождение.",
    keywords:
      "услуги грузоперевозок, автоперевозки, авиадоставка, контейнерные перевозки, карго, таможенное сопровождение",
    robots: "index, follow",
    canonical: "/services",
    ogTitle: "Услуги грузоперевозок",
    ogDescription: "Полный спектр услуг грузоперевозок из Китая в Узбекистан",
    ogType: "website",
  },
  calculator: {
    title: "Калькулятор стоимости доставки | Рассчитать онлайн",
    description:
      "Быстрый расчёт стоимости доставки груза из Китая в Узбекистан. Укажите тип доставки, вес и города - получите ориентировочную цену.",
    keywords:
      "калькулятор доставки, расчёт стоимости перевозки, стоимость доставки из Китая, онлайн калькулятор",
    robots: "index, follow",
    canonical: "/calculator",
    ogTitle: "Калькулятор стоимости доставки",
    ogDescription: "Рассчитайте стоимость доставки груза из Китая в Узбекистан",
    ogType: "website",
  },
  contacts: {
    title: "Контакты | Связаться с нами",
    description:
      "Свяжитесь с нами для консультации по грузоперевозкам из Китая в Узбекистан. Телефон, email, мессенджеры.",
    keywords: "контакты, связаться, грузоперевозки, консультация",
    robots: "index, follow",
    canonical: "/contacts",
    ogTitle: "Контакты",
    ogDescription: "Свяжитесь с нами для консультации по грузоперевозкам",
    ogType: "website",
  },
};

/**
 * Получить SEO данные для страницы
 */
export function getSEOData(page: string): SEOData {
  return seoConfig[page] || seoConfig.home;
}


