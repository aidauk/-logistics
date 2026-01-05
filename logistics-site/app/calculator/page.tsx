"use client";

import { useState } from "react";
import Link from "next/link";
import {
  DeliveryType,
  cities,
  tariffs,
  calculateDelivery,
  City,
} from "@/lib/calculator";

export default function CalculatorPage() {
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("auto");
  const [weight, setWeight] = useState<string>("");
  const [fromCity, setFromCity] = useState<string>("");
  const [toCity, setToCity] = useState<string>("");
  const [result, setResult] = useState<{
    totalPrice: number;
    deliveryDays: number;
    currency: string;
  } | null>(null);
  const [error, setError] = useState<string>("");

  const handleCalculate = () => {
    setError("");
    setResult(null);

    if (!weight || !fromCity || !toCity) {
      setError("Заполните все поля");
      return;
    }

    const weightNum = parseFloat(weight);
    if (isNaN(weightNum) || weightNum <= 0) {
      setError("Введите корректный вес");
      return;
    }

    const tariff = tariffs[deliveryType];
    if (weightNum < tariff.minWeight) {
      setError(
        `Минимальный вес для выбранного типа доставки: ${tariff.minWeight} кг`
      );
      return;
    }

    const calculation = calculateDelivery(
      deliveryType,
      weightNum,
      fromCity,
      toCity
    );

    if (calculation) {
      setResult(calculation);
    } else {
      setError("Ошибка расчёта. Проверьте введённые данные.");
    }
  };

  const handleRequest = () => {
    const params = new URLSearchParams({
      type: deliveryType,
      weight: weight,
      from: fromCity,
      to: toCity,
      price: result?.totalPrice.toString() || "",
      days: result?.deliveryDays.toString() || "",
    });
    window.location.href = `/contacts?${params.toString()}`;
  };

  const chinaCities = cities.filter((c) => c.country === "Китай");
  const uzbekistanCities = cities.filter((c) => c.country === "Узбекистан");

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Калькулятор стоимости доставки
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Рассчитайте ориентировочную стоимость доставки вашего груза из Китая
          в Узбекистан
        </p>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {/* Тип доставки */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3">
              Тип доставки
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(
                [
                  { value: "auto", label: "Автоперевозки", icon: "🚛" },
                  { value: "air", label: "Авиадоставка", icon: "✈️" },
                  { value: "cargo", label: "Карго", icon: "📦" },
                ] as { value: DeliveryType; label: string; icon: string }[]
              ).map((type) => (
                <button
                  key={type.value}
                  onClick={() => setDeliveryType(type.value)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    deliveryType === type.value
                      ? "border-primary bg-primary/10"
                      : "border-gray-200 hover:border-primary/50"
                  }`}
                >
                  <div className="text-3xl mb-2">{type.icon}</div>
                  <div className="font-semibold">{type.label}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    От {tariffs[type.value].pricePerKg} USD/кг
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Вес груза */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Вес груза (кг) *
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Введите вес в килограммах"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              min={tariffs[deliveryType].minWeight}
            />
            <p className="text-sm text-gray-500 mt-1">
              Минимальный вес: {tariffs[deliveryType].minWeight} кг
            </p>
          </div>

          {/* Город отправления */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Город отправления (Китай) *
            </label>
            <select
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Выберите город</option>
              {chinaCities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          {/* Город получения */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Город получения (Узбекистан) *
            </label>
            <select
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Выберите город</option>
              {uzbekistanCities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          {/* Кнопка расчёта */}
          <button
            onClick={handleCalculate}
            className="w-full btn-primary mb-6"
          >
            Рассчитать стоимость
          </button>

          {/* Ошибка */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* Результат */}
          {result && (
            <div className="mb-6 p-6 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-green-800">
                Результат расчёта
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Стоимость доставки:</span>
                  <span className="font-bold text-lg text-primary">
                    {result.totalPrice} {result.currency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Срок доставки:</span>
                  <span className="font-semibold">
                    {result.deliveryDays} дней
                  </span>
                </div>
              </div>
              <button
                onClick={handleRequest}
                className="w-full btn-accent mt-4"
              >
                Оставить заявку с расчётом
              </button>
              <p className="text-sm text-gray-600 mt-4">
                * Указанная стоимость является ориентировочной. Финальная цена
                может отличаться в зависимости от дополнительных услуг и
                особенностей груза.
              </p>
            </div>
          )}
        </div>

        {/* Дополнительная информация */}
        <div className="mt-8 text-center text-gray-600">
          <p>
            Нужна консультация?{" "}
            <Link href="/contacts" className="text-primary hover:underline">
              Свяжитесь с нами
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}


