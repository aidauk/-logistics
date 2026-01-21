"use client";

import Link from "next/link";
import { getSEOData } from "@/lib/seo";

const seo = getSEOData("services");

export default function ServicesPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Наши услуги
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Полный спектр услуг грузоперевозок из Китая в Узбекистан. Выберите
          оптимальный вариант для вашего груза.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {detailedServices.map((service) => (
            <div key={service.id} className="card">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h2 className="text-2xl font-semibold mb-4">{service.title}</h2>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-accent mt-1">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="text-lg font-semibold text-primary mb-2">
                От {service.priceFrom} USD/кг
              </div>
              <div className="text-sm text-gray-500">
                Срок доставки: {service.deliveryTime}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/calculator" className="btn-primary">
            Рассчитать стоимость
          </Link>
        </div>
      </div>
    </div>
  );
}

const detailedServices = [
  {
    id: "auto",
    icon: "🚛",
    title: "Автоперевозки",
    description:
      "Наземная доставка грузов автомобильным транспортом по оптимальным маршрутам.",
    features: [
      "Перевозка грузов от 100 кг",
      "Срок доставки: 12-18 дней",
      "Отслеживание груза в реальном времени",
      "Страхование груза",
    ],
    priceFrom: "2.5",
    deliveryTime: "12-18 дней",
  },
  {
    id: "air",
    icon: "✈️",
    title: "Авиадоставка",
    description:
      "Быстрая доставка авиатранспортом для срочных и ценных грузов.",
    features: [
      "Перевозка от 1 кг",
      "Срок доставки: 3-7 дней",
      "Максимальная безопасность",
      "Приоритетная обработка",
    ],
    priceFrom: "8.0",
    deliveryTime: "3-7 дней",
  },
  {
    id: "container",
    icon: "📦",
    title: "Контейнерные перевозки",
    description:
      "Перевозка крупных партий и оборудования в контейнерах различного типа.",
    features: [
      "20ft и 40ft контейнеры",
      "Срок доставки: 18-25 дней",
      "Подходит для крупногабаритных грузов",
      "Полное таможенное сопровождение",
    ],
    priceFrom: "1.8",
    deliveryTime: "18-25 дней",
  },
  {
    id: "cargo",
    icon: "📋",
    title: "Карго / Сборные грузы",
    description:
      "Экономичная доставка сборных грузов. Объединение нескольких отправлений.",
    features: [
      "Минимальный вес от 500 кг",
      "Срок доставки: 20-30 дней",
      "Оптимальная стоимость",
      "Гибкие условия оплаты",
    ],
    priceFrom: "1.8",
    deliveryTime: "20-30 дней",
  },
  {
    id: "customs",
    icon: "📄",
    title: "Таможенное сопровождение",
    description:
      "Полное сопровождение таможенного оформления и подготовка всех документов.",
    features: [
      "Подготовка документов",
      "Таможенное декларирование",
      "Консультации по таможенным процедурам",
      "Ускоренное оформление",
    ],
    priceFrom: "по запросу",
    deliveryTime: "1-3 дня",
  },
];




