/**
 * Утилита для работы с курсами валют
 * Получает курсы от Центрального банка Узбекистана
 */

export interface ExchangeRates {
  usdToUzs: number; // Курс USD → UZS
  usdToCny: number; // Курс USD → CNY
  lastUpdated: string; // Дата последнего обновления
}

// Кэш для хранения курсов
let cachedRates: ExchangeRates | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 часа

/**
 * Получить курсы валют от ЦБ РУз
 * Использует публичный API или парсинг данных
 */
export async function fetchExchangeRates(): Promise<ExchangeRates> {
  // Проверяем кэш
  const now = Date.now();
  if (cachedRates && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedRates;
  }

  try {
    // Попытка получить курсы от ЦБ РУз
    // API endpoint может быть: https://cbu.uz/ru/exchange-rates/json/
    const response = await fetch(
      "https://cbu.uz/ru/exchange-rates/json/",
      { cache: "no-store" } // Не кэшировать на клиенте
    );

    if (response.ok) {
      const data = await response.json();
      
      // Находим USD и CNY в данных
      const usdRate = data.find((item: any) => item.Ccy === "USD");
      const cnyRate = data.find((item: any) => item.Ccy === "CNY");

      if (usdRate && cnyRate) {
        const usdToUzs = parseFloat(usdRate.Rate);
        const cnyToUzs = parseFloat(cnyRate.Rate);
        // Конвертируем CNY через UZS: USD → UZS → CNY
        const usdToCny = usdToUzs / cnyToUzs;

        cachedRates = {
          usdToUzs,
          usdToCny,
          lastUpdated: new Date().toISOString(),
        };
        cacheTimestamp = now;
        return cachedRates;
      }
    }
  } catch (error) {
    console.error("Ошибка при получении курсов валют:", error);
  }

  // Если не удалось получить, возвращаем значения по умолчанию
  // или из localStorage (если пользователь вводил вручную)
  const storedRates = typeof window !== "undefined" 
    ? localStorage.getItem("exchangeRates")
    : null;

  if (storedRates) {
    try {
      const parsed = JSON.parse(storedRates);
      return {
        usdToUzs: parsed.usdToUzs || 12500,
        usdToCny: parsed.usdToCny || 7.2,
        lastUpdated: parsed.lastUpdated || new Date().toISOString(),
      };
    } catch (e) {
      // Игнорируем ошибки парсинга
    }
  }

  // Значения по умолчанию (примерные)
  return {
    usdToUzs: 12500,
    usdToCny: 7.2,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Сохранить курсы валют в localStorage (для ручного ввода)
 */
export function saveExchangeRates(rates: ExchangeRates): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("exchangeRates", JSON.stringify(rates));
    cachedRates = rates;
    cacheTimestamp = Date.now();
  }
}

/**
 * Конвертировать USD в другую валюту
 */
export function convertCurrency(
  amountUsd: number,
  targetCurrency: "UZS" | "CNY",
  rates: ExchangeRates
): number {
  if (targetCurrency === "UZS") {
    return amountUsd * rates.usdToUzs;
  } else if (targetCurrency === "CNY") {
    return amountUsd * rates.usdToCny;
  }
  return amountUsd;
}

