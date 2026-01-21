"use client";

import { useEffect, useRef, useState } from "react";

// Динамический импорт для избежания SSR проблем

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const accuracyCircleRef = useRef<any>(null);
  const leafletRef = useRef<any>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!mapRef.current || !isClient) return;

    let map: any = null;
    let isMounted = true;
    let resizeHandler: (() => void) | null = null;

    // Используем Leaflet для карты
    const loadMap = async () => {
      try {
        // Динамически загружаем Leaflet
        const L = await import("leaflet");
        leafletRef.current = L;
        
        if (!isMounted || !mapRef.current) return;

        // Исправляем иконки по умолчанию для Leaflet
        delete (L as any).Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
          iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        });

        // Координаты городов
        const tashkent: [number, number] = [41.2995, 69.2401]; // Ташкент
        const yiwu: [number, number] = [29.3067, 120.0753]; // Иу
        const guangzhou: [number, number] = [23.1291, 113.2644]; // Гуанчжоу

        // Проверяем, что элемент все еще существует
        if (!mapRef.current || !isMounted) return;

        // Создаем карту
        map = L.map(mapRef.current, {
          center: [35, 85],
          zoom: 4,
          zoomControl: true,
        });
        mapInstanceRef.current = map;

        // Добавляем тайлы OpenStreetMap
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
        }).addTo(map);
        
        // Принудительно обновляем размер карты после загрузки
        setTimeout(() => {
          if (map && isMounted) {
            map.invalidateSize();
          }
        }, 100);

        // Иконки для маркеров
        const createIcon = (color: string) => {
          return L.divIcon({
            className: "custom-marker",
            html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          });
        };

        // Добавляем маркеры
        const tashkentMarker = L.marker(tashkent, {
          icon: createIcon("#dc2626"),
        })
          .addTo(map)
          .bindPopup("Ташкент, Узбекистан");

        const yiwuMarker = L.marker(yiwu, { icon: createIcon("#3b82f6") })
          .addTo(map)
          .bindPopup("Иу, Китай");

        const guangzhouMarker = L.marker(guangzhou, {
          icon: createIcon("#3b82f6"),
        })
          .addTo(map)
          .bindPopup("Гуанчжоу, Китай");

        // Добавляем маршруты (полилинии)
        // Маршрут Иу → Ташкент
        const routeYiwuToTashkent: [number, number][] = [
          yiwu,
          [35, 75], // Промежуточная точка
          [38, 70], // Промежуточная точка
          tashkent,
        ];

        // Маршрут Гуанчжоу → Ташкент
        const routeGuangzhouToTashkent: [number, number][] = [
          guangzhou,
          [30, 100], // Промежуточная точка
          [35, 80], // Промежуточная точка
          tashkent,
        ];

        L.polyline(routeYiwuToTashkent, {
          color: "#3b82f6",
          weight: 3,
          opacity: 0.7,
        })
          .addTo(map)
          .bindPopup("Маршрут: Иу → Ташкент");

        L.polyline(routeGuangzhouToTashkent, {
          color: "#10b981",
          weight: 3,
          opacity: 0.7,
        })
          .addTo(map)
          .bindPopup("Маршрут: Гуанчжоу → Ташкент");

        // Фит карты чтобы показать все маркеры
        const group = L.featureGroup([
          tashkentMarker,
          yiwuMarker,
          guangzhouMarker,
        ]);
        map.fitBounds(group.getBounds().pad(0.2));
        
        // Обновляем размер карты при изменении размера окна (для мобильных устройств)
        resizeHandler = () => {
          if (map && isMounted) {
            setTimeout(() => {
              map.invalidateSize();
            }, 100);
          }
        };
        window.addEventListener('resize', resizeHandler);
      } catch (error) {
        console.error("Ошибка загрузки карты:", error);
        if (mapRef.current) {
          mapRef.current.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f3f4f6; color: #6b7280; padding: 20px; text-align: center;">
              <div>
                <p style="font-weight: 600; margin-bottom: 8px;">Ошибка загрузки карты</p>
                <p style="font-size: 14px;">Пожалуйста, обновите страницу</p>
              </div>
            </div>
          `;
        }
      }
    };

    loadMap();

    // Cleanup
    return () => {
      isMounted = false;
      if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler);
      }
      if (map) {
        try {
          map.remove();
        } catch (e) {
          // Игнорируем ошибки при очистке
        }
      }
    };
  }, [isClient]);

  // Функция для определения геолокации
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Геолокация не поддерживается вашим браузером");
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const location: [number, number] = [latitude, longitude];
        setUserLocation(location);
        setIsLocating(false);

        // Добавляем маркер на карту
        if (mapInstanceRef.current && leafletRef.current) {
          const L = leafletRef.current;

          // Удаляем предыдущий маркер, если есть
          if (userMarkerRef.current) {
            mapInstanceRef.current.removeLayer(userMarkerRef.current);
          }
          if (accuracyCircleRef.current) {
            mapInstanceRef.current.removeLayer(accuracyCircleRef.current);
          }

          // Создаем иконку для местоположения пользователя
          const userIcon = L.divIcon({
            className: "user-location-marker",
            html: `<div style="background-color: #10b981; width: 24px; height: 24px; border-radius: 50%; border: 4px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4);"></div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          });

          // Добавляем маркер местоположения пользователя
          userMarkerRef.current = L.marker(location, {
            icon: userIcon,
          })
            .addTo(mapInstanceRef.current)
            .bindPopup("Ваше местоположение");

          // Добавляем круг точности (если доступен accuracy)
          if (position.coords.accuracy) {
            accuracyCircleRef.current = L.circle(location, {
              radius: position.coords.accuracy,
              fillColor: "#10b981",
              fillOpacity: 0.1,
              color: "#10b981",
              weight: 1,
              opacity: 0.3,
            }).addTo(mapInstanceRef.current);
          }

          // Центрируем карту на местоположении пользователя
          mapInstanceRef.current.setView(location, 10);
        }
      },
      (error) => {
        setIsLocating(false);
        let errorMessage = "Не удалось определить ваше местоположение";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Доступ к геолокации запрещен. Разрешите доступ в настройках браузера.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Информация о местоположении недоступна.";
            break;
          case error.TIMEOUT:
            errorMessage = "Время ожидания определения местоположения истекло.";
            break;
        }
        setLocationError(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  if (!isClient) {
    return (
      <div className="w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Загрузка карты...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Кнопка определения геолокации */}
      <button
        onClick={getCurrentLocation}
        disabled={isLocating}
        className="absolute top-2 right-2 md:top-4 md:right-4 z-[1000] bg-white hover:bg-gray-100 text-gray-700 font-semibold py-1.5 px-3 md:py-2 md:px-4 rounded-lg shadow-lg transition-colors flex items-center gap-1 md:gap-2 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
        title="Определить мое местоположение"
      >
        {isLocating ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
              <span className="hidden sm:inline">Определение...</span>
              <span className="sm:hidden">...</span>
          </>
        ) : (
          <>
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="hidden sm:inline">Мое местоположение</span>
            <span className="sm:hidden">GPS</span>
          </>
        )}
      </button>

      {/* Сообщение об ошибке */}
      {locationError && (
        <div className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-4 z-[1000] bg-red-50 border border-red-200 text-red-700 px-3 py-2 md:px-4 md:py-3 rounded-lg shadow-lg text-sm md:text-base">
          <div className="flex items-start gap-2">
            <svg
              className="w-5 h-5 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-semibold">Ошибка геолокации</p>
              <p className="text-xs mt-1">{locationError}</p>
            </div>
            <button
              onClick={() => setLocationError(null)}
              className="text-red-500 hover:text-red-700"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
