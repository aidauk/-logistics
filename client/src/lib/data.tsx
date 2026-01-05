import Image, { StaticImageData } from "next/image";
import { icon1, icon2, icon3, icon4 } from "../imports";

export interface About {
  icon: StaticImageData;
  name: string;
  desc: string;
}

export const comforts: any = [
  {
    label: "Телевизор",
    value: "Tv",
  },
  {
    label: "Бесплатный Wi-Fi",
    value: "Free Wifi",
  },
  {
    label: "Кондиционер",
    value: "Air condition",
  },
  {
    label: "Холодильник",
    value: "Fridge",
  },
  {
    label: "Бассейн",
    value: "Swimming pool",
  },
  {
    label: "Ванные комнаты",
    value: "Extra bathroom",
  },
  {
    label: "Мангал",
    value: "Barbecue",
  },
  {
    label: "Мангал",
    value: "Barbecue",
  },
];

export const aboutUs: About[] = [
  {
    icon: icon1,
    name: "Надёжно",
    desc: "Вся недвижимость проходит модерацию и проверяется нашими специалистами лично",
  },
  {
    icon: icon2,
    name: "Официально",
    desc: "Составлен договор с каждым арендодателем. Съёмщик и арендодатель имеют юридическую защиту.",
  },
  {
    icon: icon3,
    name: "Оперативно",
    desc: "Оставляйте заявку на съём жилья и мы подберём его в течении 24-х часов!",
  },
  {
    icon: icon4,
    name: "Поддержка",
    desc: "Наши специалисты ответят на все вопросы и окажут всю необходимую помощь в размещении.",
  },
];

export function importInfos(from: number, to: number): React.ReactNode {
  return (
    <div className="flex" id="info_box">
      {aboutUs.map((item: About, index: number): React.ReactNode => {
        if (index >= from && index <= to) {
          return (
            <div
              id="info_box_child"
              key={index}
              className={
                "lg:max-w-305 w-full bg-white rounded-20 flex flex-col items-center " +
                (index == from && "active_info")
              }
            >
              <div id="info_img_box" className="bg-backgr rounded-1/2">
                <Image src={item.icon} alt={"icon"} className="" />
              </div>
              <h3 className="font-semibold text-20 my-4 text-additional text-center">
                {item.name}
              </h3>
              <p className="text-text text-center">{item.desc}</p>
            </div>
          );
        } else {
          return null; // or any other default value you want to return
        }
      })}
    </div>
  );
}
