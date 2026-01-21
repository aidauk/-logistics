"use client";

import Link from "next/link";
import Map from "@/components/Map";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative text-white py-20 md:py-32 overflow-hidden">
        {/* Фоновое изображение с логотипом */}
        <div className="absolute inset-0">
          <img
            src="/patron-zu-logo.png"
            alt="Patron ZU Logistics"
            className="w-full h-full object-cover"
            style={{ objectFit: "cover" }}
          />
          {/* Легкий overlay для читаемости текста */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Грузоперевозки из Китая в Узбекистан
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 drop-shadow-md">
              Быстрая и надёжная доставка грузов. Автоперевозки,
              контейнерные перевозки. Рассчитайте стоимость онлайн за 2 минуты.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/calculator" className="btn-accent text-center shadow-lg">
                Рассчитать стоимость
              </Link>
              <Link href="/contacts" className="bg-white text-primary hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-center shadow-lg">
                Оставить заявку
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Наши услуги
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="card">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/services" className="btn-primary">
              Все услуги
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Почему выбирают нас
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-gray-600">
                Оптимальные маршруты и сроки доставки
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Прозрачные цены</h3>
              <p className="text-gray-600">
                Без скрытых платежей, фиксированная стоимость
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-2">Страхование</h3>
              <p className="text-gray-600">
                Полная защита груза на всех этапах перевозки
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Наши маршруты
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Доставка из Китая в Узбекистан
          </p>
          <div className="max-w-6xl mx-auto">
            <Map />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Готовы начать?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Рассчитайте стоимость доставки прямо сейчас
          </p>
          <Link href="/calculator" className="btn-accent">
            Рассчитать стоимость
          </Link>
        </div>
      </section>
    </>
  );
}

const services = [
  {
    id: "auto",
    icon: "🚛",
    title: "Автоперевозки",
    description:
      "Наземная доставка грузов автомобильным транспортом. Оптимально для средних и крупных партий.",
  },
  {
    id: "container",
    icon: "📦",
    title: "Контейнерные перевозки",
    description:
      "Перевозка грузов в контейнерах. Подходит для крупных партий и оборудования.",
  },
  {
    id: "customs",
    icon: "📄",
    title: "Таможенное сопровождение",
    description:
      "Полное сопровождение таможенного оформления. Помощь в подготовке документов.",
  },
];

