import React from 'react'

const Booking = () => {
  return (
    <div className="bg-white w-full max-w-530 py-40 px-63 text-center rounded-20 absolute z-20">
      <h2 className="text-25 font-semibold text-additional mb-12 text-left">
        Забронировать
      </h2>
      <form action="submit" className="flex flex-col gap-20">
        <input
          className={
            "w-full px-20 py-17 text-xs text-additional font-normal border border-additional_border rounded-250 outline-none "
          }
          type="phone"
          placeholder="Ваш телефон"
          required
        />
        <div className="w-full flex gap-20 items-centere justify-between">
          <input
            className={
              "w-full px-20 py-17 text-xs text-additional font-normal border border-additional_border rounded-250 outline-none "
            }
            type="text"
            placeholder="Дата заезда"
            required
          />
          <input
            className={
              "w-full px-20 py-17 text-xs text-additional font-normal border border-additional_border rounded-250 outline-none "
            }
            type="text"
            placeholder="Дата отбытия"
            required
          />
        </div>
        <input
          className={
            "w-full px-20 py-17 text-xs text-additional font-normal border border-additional_border rounded-250 outline-none "
          }
          type="number"
          min={1}
          placeholder="Колличество гостей"
          required
        />
        <button
          className="px-73 cursor-pointer py-15 w-full bg-primary rounded-250 text-white text-base font-medium"
          type="submit"
        >
          Забронировать
        </button>
      </form>
    </div>
  );
}

export default Booking;