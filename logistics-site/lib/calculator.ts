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
  { id: "yiwu", name: "Иу", country: "Китай" },
  { id: "guangzhou", name: "Гуанчжоу", country: "Китай" },
  // Узбекистан
  { id: "tashkent", name: "Ташкент", country: "Узбекистан" },
];

export const tariffs: Record<DeliveryType, Tariff> = {
  auto: {
    pricePerKg: 15, // USD за килограмм (фиксированный тариф)
    deliveryDays: 15, // дней
    minWeight: 1, // минимальный вес в кг
  },
  air: {
    pricePerKg: 15, // USD за килограмм (фиксированный тариф)
    deliveryDays: 5,
    minWeight: 1,
  },
  cargo: {
    pricePerKg: 15, // USD за килограмм (фиксированный тариф)
    deliveryDays: 20,
    minWeight: 1,
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




