const Sidebar = ({ active }: { active: boolean }) => {
  return (
    <div
      className={
        "fixed w-full bg-white z-50 flex flex-col justify-between sidebar " +
        (active && "sidebarActive")
      }
    >
      <div className="">
        <div className="w-full list-none pb-30 border-b border-primary p-30">
          <li className="cursor-pointer py-15 px-43 text-center border border-primary rounded-250 mb-2">
            <a href="/login" className="text-primary">
              Вход
            </a>
          </li>
          <li className="cursor-pointer py-15 px-43 text-center border border-primary rounded-250">
            <a href="/login" className="text-primary">
              Регистрация
            </a>
          </li>
        </div>
        <ul className="flex flex-col gap-9 text-base text-additional font-medium mr-20 p-30">
          <li>
            <a href="/">Главная</a>
          </li>
          <li>
            <a href="/rent">Аренда</a>
          </li>
          <li>
            <a href="/contacts">Контакты</a>
          </li>
          <li>
            <a href="/about">О нас</a>
          </li>
        </ul>
      </div>
      <div className="py-30 px-12 border-t border-primary ">
        <li className="list-none py-2 px-30 font-medium text-base text-center border border-primary bg-primary text-white rounded-250">
          <a href="/add-object">Добавить объявление</a>
        </li>
      </div>
    </div>
  );
};

export default Sidebar;
