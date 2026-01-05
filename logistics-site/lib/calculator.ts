/**
 * Калькулятор стоимости доставки
 * 
 * ИНСТРУКЦИЯ ПО ИЗМЕНЕНИЮ ТАРИФОВ:
 * 1. Найдите нужный тип доставки в объекте tariffs
 * 2. Измените значение pricePerKg (цена за килограмм)
 * 3. Измените deliveryDays (срок доставки в днях)
 * 4. Сохраните файл
 * 
 * Для добавления новых городов - добавьте их в cities
 */

export type DeliveryType = "auto" | "air" | "cargo";

export interface City {
  id: string;
  name: string;
  country: string;
}

export interface Tariff {
  pricePerKg: number; // Цена за килограмм в USD
  deliveryDays: number; // Срок доставки в днях
  minWeight: number; // Минимальный вес в кг
}

export const cities: City[] = [
  // Китай
  { id: "beijing", name: "Пекин", country: "Китай" },
  { id: "shanghai", name: "Шанхай", country: "Китай" },
  { id: "guangzhou", name: "Гуанчжоу", country: "Китай" },
  { id: "shenzhen", name: "Шэньчжэнь", country: "Китай" },
  // Узбекистан
  { id: "tashkent", name: "Ташкент", country: "Узбекистан" },
  { id: "samarkand", name: "Самарканд", country: "Узбекистан" },
  { id: "bukhara", name: "Бухара", country: "Узбекистан" },
];

export const tariffs: Record<DeliveryType, Tariff> = {
  auto: {
    pricePerKg: 2.5, // USD за килограмм
    deliveryDays: 15, // дней
    minWeight: 100, // минимальный вес в кг
  },
  air: {
    pricePerKg: 8.0,
    deliveryDays: 5,
    minWeight: 1,
  },
  cargo: {
    pricePerKg: 1.8,
    deliveryDays: 20,
    minWeight: 500,
  },
};

export interface CalculationResult {
  totalPrice: number;
  deliveryDays: number;
  currency: string;
}

/**
 * Рассчитать стоимость доставки
 */
export function calculateDelivery(
  type: DeliveryType,
  weight: number,
  fromCity: string,
  toCity: string
): CalculationResult | null {
  const tariff = tariffs[type];

  if (weight < tariff.minWeight) {
    return null; // Вес меньше минимального
  }

  const totalPrice = weight * tariff.pricePerKg;

  return {
    totalPrice: Math.round(totalPrice * 100) / 100, // Округление до 2 знаков
    deliveryDays: tariff.deliveryDays,
    currency: "USD",
  };
}


