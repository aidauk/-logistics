"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ContactsForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    comment: "",
  });

  useEffect(() => {
    // Заполняем форму данными из калькулятора, если они есть
    const type = searchParams.get("type");
    const weight = searchParams.get("weight");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const price = searchParams.get("price");
    const days = searchParams.get("days");

    if (type && weight && from && to && price && days) {
      const typeLabels: Record<string, string> = {
        auto: "Автоперевозки",
        air: "Авиадоставка",
        cargo: "Карго",
      };

      const cities: Record<string, string> = {
        beijing: "Пекин",
        shanghai: "Шанхай",
        guangzhou: "Гуанчжоу",
        shenzhen: "Шэньчжэнь",
        tashkent: "Ташкент",
        samarkand: "Самарканд",
        bukhara: "Бухара",
      };

      setFormData({
        name: "",
        phone: "",
        comment: `Тип доставки: ${typeLabels[type] || type}
Вес: ${weight} кг
Откуда: ${cities[from] || from}
Куда: ${cities[to] || to}
Ориентировочная стоимость: ${price} USD
Срок доставки: ${days} дней`,
      });
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Формируем сообщение для мессенджеров
    const message = `Заявка на грузоперевозку

Имя: ${formData.name}
Телефон: ${formData.phone}

${formData.comment}`;

    // Кодируем сообщение для URL
    const encodedMessage = encodeURIComponent(message);

    // Открываем Telegram (можно заменить на WhatsApp или другой мессенджер)
    const telegramUrl = `https://t.me/logistics_uz?text=${encodedMessage}`;
    window.open(telegramUrl, "_blank");

    // Альтернатива: можно использовать mailto
    // const mailtoUrl = `mailto:info@logistics.uz?subject=Заявка на грузоперевозку&body=${encodedMessage}`;
    // window.location.href = mailtoUrl;
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Контакты
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Свяжитесь с нами для консультации или оставьте заявку
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Форма заявки */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Оставить заявку</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Имя *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Ваше имя"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Телефон *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="+998 XX XXX XX XX"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Комментарий
                </label>
                <textarea
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Опишите ваш груз, требования к доставке и другие детали"
                />
              </div>

              <button type="submit" className="w-full btn-primary">
                Отправить заявку
              </button>
            </form>

            <p className="text-sm text-gray-500 mt-4">
              * Нажав кнопку, вы будете перенаправлены в Telegram для отправки
              заявки
            </p>
          </div>

          {/* Контактная информация */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">
                Контактная информация
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">В Китае</h3>
                  <div className="space-y-1">
                    <a
                      href="tel:+8619846639095"
                      className="text-primary hover:underline block"
                    >
                      +86 198 466 390 95
                    </a>
                    <a
                      href="tel:+8619550521030"
                      className="text-primary hover:underline block"
                    >
                      +86 195 505 210 30
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">В Узбекистане</h3>
                  <div className="space-y-1">
                    <a
                      href="tel:+998772620808"
                      className="text-primary hover:underline block"
                    >
                      +99877 262 08 08
                    </a>
                    <a
                      href="tel:+998772640808"
                      className="text-primary hover:underline block"
                    >
                      +99877 264 08 08
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Почта</h3>
                  <a
                    href="mailto:jiangqistar@gmail.com"
                    className="text-primary hover:underline"
                  >
                    jiangqistar@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Нужна срочная консультация?</h3>
              <p className="text-gray-700 mb-4">
                Свяжитесь с нами через Telegram для быстрого ответа
              </p>
              <a
                href="https://t.me/logistics_uz"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block"
              >
                Написать в Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactsPage() {
  return (
    <Suspense fallback={<div className="py-16 text-center">Загрузка...</div>}>
      <ContactsForm />
    </Suspense>
  );
}

