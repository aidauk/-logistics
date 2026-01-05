import { close_menu } from "@/imports";
import Image from "next/image";

const Filter = () => {
  return (
    <div className="w-full fixed h-screen z-50 bg-white p-30 filter">
      <div className="flex justify-between items-center w-full mb-12">
        <h2 className="text-22 font-semibold text-additional mt-6 mb-3">
          Фильтры
        </h2>
        <div id="burger_menu" className="w-40 h-40 p-2 bg-primary rounded-1/2">
          <Image
            id="close_menu_image"
            src={close_menu}
            alt={"close_menu image"}
            className="w-full"
          />
        </div>
      </div>
      <div id="shadow_box" className="px-5 py-7 rounded-10">
        <h3 className="text-sm text-additional font-semibold mb-3">
          Специальные удобства
        </h3>
        <form action="" className="w-full flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="flex items-center">
              <input type="checkbox" name="comforts1" value="" />
              <label
                htmlFor="comforts1"
                className="ml-2 text-xs font-medium text-additional"
              >
                Прокат велосипедов
              </label>
            </div>
            <p className="inline text-xs text-grey font-medium">177</p>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <input type="checkbox" name="comforts2" value="" />
              <label
                htmlFor="comforts2"
                className="ml-2 text-xs font-medium text-additional"
              >
                Wi-Fi
              </label>
            </div>
            <p className="inline text-xs text-grey font-medium">177</p>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <input type="checkbox" name="comforts3" value="" />
              <label
                htmlFor="comforts3"
                className="ml-2 text-xs font-medium text-additional"
              >
                Бассейн
              </label>
            </div>
            <p className="inline text-xs text-grey font-medium">177</p>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <input type="checkbox" name="comforts3" value="" />
              <label
                htmlFor="comforts3"
                className="ml-2 text-xs font-medium text-additional"
              >
                Площадка
              </label>
            </div>
            <p className="inline text-xs text-grey font-medium">177</p>
          </div>
        </form>
      </div>
      <div id="shadow_box" className="px-5 py-7 rounded-10">
        <h3 className="text-sm text-additional font-semibold mb-3">
          Стоимость
        </h3>
        <form action="" className="w-full flex flex-col gap-2">
          <div className="flex justify-between w-full items-center">
            <input
              type="number"
              name=""
              id=""
              className="outline-none border border-border rounded-250 max-w-420 w-full flex-1 py-11 text-center text-additional text-xs"
            />
            <p className="mx-2">-</p>
            <input
              type="number"
              name=""
              id=""
              className="outline-none border border-border rounded-250 max-w-420 w-full flex-1 py-11 text-center text-additional text-xs"
            />
          </div>
          <button className="text-sm text-white bg-additional px-43 py-3 rounded-250">
            Применить
          </button>
        </form>
      </div>
      <div id="shadow_box" className="px-5 py-7 rounded-10">
        <h3 className="text-sm text-additional font-semibold mb-3">
          Спальные места
        </h3>
        <form action="" className="w-full flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="flex items-center">
              <input type="checkbox" name="comforts2" value="" />
              <label
                htmlFor="comforts2"
                className="ml-2 text-xs font-medium text-additional"
              >
                1 местные
              </label>
            </div>
            <p className="inline text-xs text-grey font-medium">177</p>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <input type="checkbox" name="comforts3" value="" />
              <label
                htmlFor="comforts3"
                className="ml-2 text-xs font-medium text-additional"
              >
                2 местные
              </label>
            </div>
            <p className="inline text-xs text-grey font-medium">177</p>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <input type="checkbox" name="comforts3" value="" />
              <label
                htmlFor="comforts3"
                className="ml-2 text-xs font-medium text-additional"
              >
                Несколько спален
              </label>
            </div>
            <p className="inline text-xs text-grey font-medium">177</p>
          </div>
        </form>
      </div>
      <div id="shadow_box" className="px-5 py-7 rounded-10">
        <h3 className="text-sm text-additional font-semibold mb-3">Атрибуты</h3>
        <form action="" className="w-full flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="flex items-center">
              <input type="checkbox" name="comforts2" value="" />
              <label
                htmlFor="comforts2"
                className="ml-2 text-xs font-medium text-additional"
              >
                1 местные
              </label>
            </div>
            <p className="inline text-xs text-grey font-medium">177</p>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <input type="checkbox" name="comforts3" value="" />
              <label
                htmlFor="comforts3"
                className="ml-2 text-xs font-medium text-additional"
              >
                2 местные
              </label>
            </div>
            <p className="inline text-xs text-grey font-medium">177</p>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <input type="checkbox" name="comforts3" value="" />
              <label
                htmlFor="comforts3"
                className="ml-2 text-xs font-medium text-additional"
              >
                Несколько спален
              </label>
            </div>
            <p className="inline text-xs text-grey font-medium">177</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Filter;
