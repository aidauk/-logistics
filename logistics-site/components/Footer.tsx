import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Логистика</h3>
            <p className="text-gray-400 text-sm">
              Профессиональные грузоперевозки из Китая в Узбекистан
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-white transition-colors"
                >
                  Услуги
                </Link>
              </li>
              <li>
                <Link
                  href="/calculator"
                  className="hover:text-white transition-colors"
                >
                  Калькулятор
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="hover:text-white transition-colors"
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Услуги</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Автоперевозки</li>
              <li>Авиадоставка</li>
              <li>Контейнерные перевозки</li>
              <li>Карго / сборные грузы</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Телефон: +998 XX XXX XX XX</li>
              <li>Email: info@logistics.uz</li>
              <li>Telegram: @logistics_uz</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Логистика. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}


