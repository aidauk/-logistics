"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  fetchExchangeRates,
  saveExchangeRates,
  convertCurrency,
  type ExchangeRates,
} from "@/lib/exchangeRates";

const TARIFF_PER_KG = 15; // USD за килограмм

export default function CalculatorPage() {
  const [weight, setWeight] = useState<string>("");
  const [result, setResult] = useState<{
    usd: number;
    uzs: number;
    cny: number;
  } | null>(null);
  const [error, setError] = useState<string>("");
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualRates, setManualRates] = useState({
    usdToUzs: "",
    usdToCny: "",
  });

  // Загружаем курсы валют при монтировании
  useEffect(() => {
    loadRates();
  }, []);

  const loadRates = async () => {
    setLoading(true);
    try {
      const fetchedRates = await fetchExchangeRates();
      setRates(fetchedRates);
      setManualRates({
        usdToUzs: fetchedRates.usdToUzs.toString(),
        usdToCny: fetchedRates.usdToCny.toString(),
      });
    } catch (error) {
      console.error("Ошибка загрузки курсов:", error);
      // Используем значения по умолчанию
      const defaultRates: ExchangeRates = {
        usdToUzs: 12500,
        usdToCny: 7.2,
        lastUpdated: new Date().toISOString(),
      };
      setRates(defaultRates);
      setManualRates({
        usdToUzs: defaultRates.usdToUzs.toString(),
        usdToCny: defaultRates.usdToCny.toString(),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveManualRates = () => {
    const usdToUzs = parseFloat(manualRates.usdToUzs);
    const usdToCny = parseFloat(manualRates.usdToCny);

    if (isNaN(usdToUzs) || isNaN(usdToCny) || usdToUzs <= 0 || usdToCny <= 0) {
      setError("Введите корректные значения курсов");
      return;
    }

    const newRates: ExchangeRates = {
      usdToUzs,
      usdToCny,
      lastUpdated: new Date().toISOString(),
    };

    saveExchangeRates(newRates);
    setRates(newRates);
    setShowManualInput(false);
    setError("");

    // Пересчитываем результат, если он есть
    if (weight && result) {
      handleCalculate();
    }
  };

  const handleCalculate = () => {
    setError("");
    setResult(null);

    if (!weight) {
      setError("Введите вес груза");
      return;
    }

    if (!rates) {
      setError("Курсы валют не загружены");
      return;
    }

    const weightNum = parseFloat(weight);
    if (isNaN(weightNum) || weightNum <= 0) {
      setError("Введите корректный вес");
      return;
    }

    const totalUsd = weightNum * TARIFF_PER_KG;
    const totalUzs = convertCurrency(totalUsd, "UZS", rates);
    const totalCny = convertCurrency(totalUsd, "CNY", rates);

    setResult({
      usd: Math.round(totalUsd * 100) / 100,
      uzs: Math.round(totalUzs),
      cny: Math.round(totalCny * 100) / 100,
    });
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Калькулятор стоимости доставки
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Тариф: {TARIFF_PER_KG} USD за килограмм
        </p>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {/* Курсы валют */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">Курсы валют</h3>
              <div className="flex gap-2">
                <button
                  onClick={loadRates}
                  className="text-sm btn-primary"
                  disabled={loading}
                >
                  {loading ? "Загрузка..." : "Обновить"}
                </button>
                <button
                  onClick={() => setShowManualInput(!showManualInput)}
                  className="text-sm bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  {showManualInput ? "Отмена" : "Ввести вручную"}
                </button>
              </div>
            </div>

            {showManualInput ? (
              <div className="space-y-3 mt-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    USD → UZS
                  </label>
                  <input
                    type="number"
                    value={manualRates.usdToUzs}
                    onChange={(e) =>
                      setManualRates({
                        ...manualRates,
                        usdToUzs: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Например: 12500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    USD → CNY
                  </label>
                  <input
                    type="number"
                    value={manualRates.usdToCny}
                    onChange={(e) =>
                      setManualRates({
                        ...manualRates,
                        usdToCny: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Например: 7.2"
                  />
                </div>
                <button
                  onClick={handleSaveManualRates}
                  className="w-full btn-primary"
                >
                  Сохранить курсы
                </button>
              </div>
            ) : (
              rates && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <span className="text-sm text-gray-600">USD → UZS:</span>
                    <span className="ml-2 font-semibold">
                      {rates.usdToUzs.toLocaleString("ru-RU")}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">USD → CNY:</span>
                    <span className="ml-2 font-semibold">
                      {rates.usdToCny.toFixed(2)}
                    </span>
                  </div>
                  <div className="col-span-2 text-xs text-gray-500">
                    Обновлено:{" "}
                    {new Date(rates.lastUpdated).toLocaleString("ru-RU")}
                  </div>
                </div>
              )
            )}
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
              min="0.01"
              step="0.01"
            />
          </div>

          {/* Кнопка расчёта */}
          <button
            onClick={handleCalculate}
            className="w-full btn-primary mb-6"
            disabled={!rates}
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
          {result && rates && (
            <div className="mb-6 p-6 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-green-800">
                Результат расчёта
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Стоимость в USD:</span>
                  <span className="font-bold text-lg text-primary">
                    {result.usd.toFixed(2)} USD
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Стоимость в UZS:</span>
                  <span className="font-bold text-lg text-primary">
                    {result.uzs.toLocaleString("ru-RU")} UZS
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Стоимость в CNY:</span>
                  <span className="font-bold text-lg text-primary">
                    {result.cny.toFixed(2)} CNY
                  </span>
                </div>
              </div>
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
