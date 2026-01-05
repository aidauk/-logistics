import React, { Dispatch, SetStateAction, useState } from "react";

interface Booking {
  entry_date: Date;
  leaving_date: Date;
  guests: number;
}

interface CustomCalendarProps {
  customStyle: string;
  bookings: Booking[];
  onSelectDateRange: (entryDate: Date, leavingDate: Date) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  initialEntry_date?: Date | null;
  initialLeaving_date?: Date | null;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  customStyle,
  bookings,
  onSelectDateRange,
  open,
  setOpen,
  initialEntry_date,
  initialLeaving_date,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [entryDate, setEntryDate] = useState<Date | null>(initialEntry_date ?? null);
  const [leavingDate, setLeavingDate] = useState<Date | null>(initialLeaving_date ?? null);

  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Get days in the current month and days from the previous and next months
  const getDaysInMonth = (date: Date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const days = [];

    // Get the previous month's days
    const prevMonthEnd = new Date(date.getFullYear(), date.getMonth(), 0);
    const prevMonthDays = prevMonthEnd.getDate();
    const firstDayOfMonth = start.getDay();

    for (let i = firstDayOfMonth; i > 0; i--) {
      days.push(new Date(prevMonthEnd.setDate(prevMonthDays - i + 1)));
    }

    // Get the current month's days
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }

    // Get the next month's days
    const nextMonthStart = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    const nextMonthDays = nextMonthStart.getDate();

    for (let i = 0; days.length % 7 !== 0; i++) {
      days.push(new Date(nextMonthStart.setDate(nextMonthDays + i)));
    }

    return days;
  };

  const isDateBooked = (date: Date) => {
    return bookings.some(
      (booking) =>
        date >= new Date(booking.entry_date) &&
        date <= new Date(booking.leaving_date)
    );
  };

  const isDateSelected = (date: Date) => {
    return (
      (entryDate && leavingDate && date >= entryDate && date <= leavingDate) ||
      (entryDate && date.getTime() === entryDate.getTime()) ||
      (leavingDate && date.getTime() === leavingDate.getTime())
    );
  };

  const handleDateClick = (date: Date) => {
    if (isDateBooked(date)) return;

    if (!entryDate) {
      setEntryDate(date);
      setLeavingDate(null);
    } else if (
      !leavingDate &&
      date > entryDate &&
      !containsBookedDate(entryDate, date)
    ) {
      setLeavingDate(date);
      onSelectDateRange(entryDate, date);
      setOpen(false);
    } else {
      setEntryDate(date);
      setLeavingDate(null);
    }
  };

  const containsBookedDate = (start: Date, end: Date) => {
    let date = new Date(start);
    while (date <= end) {
      if (isDateBooked(date)) return true;
      date.setDate(date.getDate() + 1);
    }
    return false;
  };

  const handleMonthChange = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth);
    if (direction === "prev") {
      newMonth.setMonth(currentMonth.getMonth() - 1);
    } else if (direction === "next") {
      newMonth.setMonth(currentMonth.getMonth() + 1);
    }

    setCurrentMonth(newMonth);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = new Date(currentMonth);
    newYear.setFullYear(Number(event.target.value));
    setCurrentMonth(newYear);
  };

  const daysInMonth = getDaysInMonth(currentMonth);

  return (
    <div className={`relative`}>
      <div
        onClick={() => setOpen(!open)}
        id="searchInputs"
        className={`w-full flex items-center justify-between cursor-pointer px-20 py-17 ${customStyle} text-xs text-additional font-normal border border-additional_border rounded-250 outline-none`}
      >
        <p className="">
          {entryDate ? new Date(entryDate).toLocaleDateString() : "Дата заезда"}{" "}
        </p>
        <span className="mx-[20px]">--</span>
        <p>
          {leavingDate
            ? new Date(leavingDate).toLocaleDateString()
            : "Дата отбытия"}
        </p>
      </div>
      <div
        className={`z-[10] ${
          !open ? "hidden" : ""
        } absolute w-[595px] top-[70px] left-[0%] px-[40px] py-[30px] flex flex-col items-start bg-white rounded-[20px]`}
        id="shadow_box"
      >
        <div className="flex justify-between w-full">
          <div className="flex gap-[20px]">
            <select
              className="font-bold outline-none rounded-10 border border-[#C1C1C1] cursor-pointer px-[8px] py-[6px] text-xl"
              value={currentMonth.getFullYear()}
              onChange={handleYearChange}
            >
              {Array.from({ length: 10 }).map((_, index) => (
                <option key={index} value={2020 + index}>
                  {2020 + index}
                </option>
              ))}
            </select>
            <select
              className="font-bold outline-none rounded-10 cursor-pointer px-[8px] py-[6px] text-xl"
              value={currentMonth.getMonth()}
              onChange={(e) =>
                setCurrentMonth(
                  new Date(currentMonth.setMonth(Number(e.target.value)))
                )
              }
            >
              {Array.from({ length: 12 }).map((_, index) => (
                <option key={index} value={index}>
                  {new Date(0, index).toLocaleString("default", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              className="bg-[#F3F3F3] rounded-full p-[8px]"
              onClick={() => handleMonthChange("prev")}
            >
              <svg
                className="w-[16px] h-[16px] text-gray-800 text-additional"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m15 19-7-7 7-7"
                />
              </svg>
            </button>

            <button
              className="bg-[#F3F3F3] rounded-full p-[8px]"
              onClick={() => handleMonthChange("next")}
            >
              <svg
                className="w-[16px] h-[16px] text-gray-800 text-additional"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m9 5 7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
        <div style={styles.weekdays} className="w-full mt-[40px] mb-[15px]">
          {weekdays.map((day) => (
            <div key={day} className="text-[#C1C1C1]  text-xs capitalize">
              {day}
            </div>
          ))}
        </div>
        <div className="w-full" style={styles.calendarGrid}>
          {daysInMonth.map((day) => (
            <div
              key={day.toISOString()}
              style={{
                ...styles.day,
                backgroundColor: isDateBooked(day)
                  ? "#ffcccc" // for booked days
                  : isDateSelected(day)
                  ? "#ccfff3" // for selected days
                  : "#ffffff", // for available days
                color: isDateBooked(day)
                  ? "#FF6363"
                  : isDateSelected(day)
                  ? "#009472"
                  : "#000",
                cursor: isDateBooked(day) ? "not-allowed" : "pointer", // No pointer on booked days
                opacity: day.getMonth() !== currentMonth.getMonth() ? 0.4 : 1, // Faded effect for previous/next month days
              }}
              onClick={() => handleDateClick(day)}
            >
              {String(day.getDate()).padStart(2, "0")}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "1rem",
    alignItems: "center",
  },
  button: {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#f5f5f5",
    cursor: "pointer",
  },
  select: {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  weekdays: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "5px",
  },
  weekday: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
  },
  calendarGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "5px",
  },
  day: {
    width: "2.5rem",
    height: "2.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    transition: "background-color 0.3s",
  },
} as const;

export default CustomCalendar;
