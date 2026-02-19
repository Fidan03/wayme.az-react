import { useState, useRef, useEffect } from "react";
import { Form } from "antd";
import dayjs from "dayjs";

import person from "../../assets/person.png";
import calendar from "../../assets/calendar.png";

const LoginForm = ({ form }) => {
  const savedData = JSON.parse(localStorage.getItem("loginData") || "{}");

  /* ---------------- Name & Surname Format ---------------- */

  const formatInput = (value) => {
    let val = value.replace(/[^A-Za-zÇƏĞİÖŞÜçəğiöşü-]/g, "");

    const parts = val.split("-");
    if (parts.length > 2) val = parts[0] + "-" + parts[1];

    val = val.slice(0, 30);

    if (val.length > 0) {
      val = val.charAt(0).toUpperCase() + val.slice(1);
    }

    return val;
  };

  const handleChange = (e, field) => {
    const formatted = formatInput(e.target.value);

    form.setFieldsValue({ [field]: formatted });

    const currentData = JSON.parse(
      localStorage.getItem("loginData") || "{}"
    );

    localStorage.setItem(
      "loginData",
      JSON.stringify({
        ...currentData,
        [field]: formatted,
      })
    );
  };

  /* ---------------- Date Picker State ---------------- */

  const [selectedDate, setSelectedDate] = useState(
    savedData.date || ""
  );

  const [showCalendar, setShowCalendar] = useState(false);

  const [currentMonth, setCurrentMonth] = useState(
    savedData.date
      ? dayjs(savedData.date, "DD.MM.YYYY")
      : dayjs()
  );

  const calendarRef = useRef(null);

  /* ---------------- Close Calendar On Outside Click ---------------- */

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!calendarRef.current?.contains(e.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* ---------------- Calendar Logic ---------------- */

  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");

  const startDay = startOfMonth.day();
  const totalDays = endOfMonth.date();

  const prevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  const handleDateSelect = (day) => {
    const date = currentMonth.date(day);

    const formatted = date.format("DD.MM.YYYY");

    setSelectedDate(formatted);

    form.setFieldsValue({ date: formatted });

    const currentData = JSON.parse(
      localStorage.getItem("loginData") || "{}"
    );

    localStorage.setItem(
      "loginData",
      JSON.stringify({
        ...currentData,
        date: formatted,
      })
    );

    setShowCalendar(false);
  };

  /* ---------------- Auto Dot Format ---------------- */

  const formatDateInput = (value) => {
    let numbers = value.replace(/\D/g, "").slice(0, 8);

    let result = "";

    if (numbers.length >= 1) {
      result = numbers.slice(0, 2);
    }

    if (numbers.length >= 3) {
      result += "." + numbers.slice(2, 4);
    }

    if (numbers.length >= 5) {
      result += "." + numbers.slice(4, 8);
    }

    return result;
  };

  const handleInputChange = (e) => {
    const rawValue = e.target.value;

    const formatted = formatDateInput(rawValue);

    setSelectedDate(formatted);

    form.setFieldsValue({ date: formatted });

    if (
      formatted.length === 10 &&
      dayjs(formatted, "DD.MM.YYYY", true).isValid()
    ) {
      setCurrentMonth(
        dayjs(formatted, "DD.MM.YYYY")
      );
    }

    const currentData = JSON.parse(
      localStorage.getItem("loginData") || "{}"
    );

    localStorage.setItem(
      "loginData",
      JSON.stringify({
        ...currentData,
        date: formatted,
      })
    );
  };

  const isFutureDate = (day) => {
    return currentMonth
      .date(day)
      .isAfter(dayjs(), "day");
  };

  /* ---------------- Render Days ---------------- */

  const renderDays = () => {
    const blanks = Array.from(
      { length: startDay },
      (_, i) => <div key={`b-${i}`} />
    );

    const days = Array.from(
      { length: totalDays },
      (_, i) => {
        const dayNum = i + 1;

        const dateObj = currentMonth.date(dayNum);

        const isDisabled = isFutureDate(dayNum);

        const isSelected =
          selectedDate ===
          dateObj.format("DD.MM.YYYY");

        return (
          <button
            key={dayNum}
            type="button"
            disabled={isDisabled}
            onClick={() =>
              !isDisabled &&
              handleDateSelect(dayNum)
            }
            className={`
              w-10 h-10 flex items-center justify-center rounded-lg
              transition-colors duration-200

              ${isSelected ? "bg-blue-500 text-white" : ""}

              ${
                !isSelected && !isDisabled
                  ? "hover:bg-blue-600 hover:text-white"
                  : ""
              }

              ${
                isDisabled
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-white"
              }
            `}
          >
            {dayNum}
          </button>
        );
      }
    );

    return [...blanks, ...days];
  };

  /* ---------------- Autofill From Storage ---------------- */

  useEffect(() => {
    if (savedData.name) {
      form.setFieldsValue({
        name: savedData.name,
        surname: savedData.surname,
        date: savedData.date,
      });
    }
  }, []);

  /* ---------------- Render ---------------- */

  return (
    <div className="w-full">
      <Form form={form} autoComplete="off">

        {/* Name */}

        <div className="mb-4">
          <label className="text-white text-[15px] font-medium">
            Ad
          </label>

          <div className="flex items-center bg-[#2f4a73] rounded-lg h-12 px-2">
            <img
              src={person}
              className="w-5 h-5 mr-2"
            />

            <Form.Item
              name="name"
              noStyle
              rules={[
                {
                  required: true,
                  message: "Ad daxil edin",
                },
              ]}
            >
              <input
                maxLength={30}
                placeholder="Adınızı daxil edin"
                onChange={(e) =>
                  handleChange(e, "name")
                }
                className="flex-1 bg-transparent text-white text-[18px] outline-none"
              />
            </Form.Item>
          </div>
        </div>

        {/* Surname */}

        <div className="mb-4">
          <label className="text-white text-[15px] font-medium">
            Soyad
          </label>

          <div className="flex items-center bg-[#2f4a73] rounded-lg h-12 px-2">
            <img
              src={person}
              className="w-5 h-5 mr-2"
            />

            <Form.Item
              name="surname"
              noStyle
              rules={[
                {
                  required: true,
                  message: "Soyad daxil edin",
                },
              ]}
            >
              <input
                maxLength={30}
                placeholder="Soyadınızı daxil edin"
                onChange={(e) =>
                  handleChange(e, "surname")
                }
                className="flex-1 bg-transparent text-white text-[18px] outline-none"
              />
            </Form.Item>
          </div>
        </div>

        {/* Date */}

        <div className="mb-4">
          <label className="text-white text-[15px] font-medium">
            Doğum tarixi
          </label>

          <div
            className="relative mt-1"
            ref={calendarRef}
          >
            <div className="flex items-center bg-[#2f4a73] rounded-lg h-12 px-2">
              <img
                src={calendar}
                className="w-5 h-5 mr-2 cursor-pointer"
                onClick={() =>
                  setShowCalendar(!showCalendar)
                }
              />

              <Form.Item
                name="date"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Tarix seçin",
                  },
                ]}
              >
                <input
                  value={selectedDate}
                  placeholder="gg.aa.iiii"
                  onChange={handleInputChange}
                  maxLength={10}
                  className="flex-1 bg-transparent text-white text-[18px] outline-none"
                />
              </Form.Item>
            </div>

            {/* Calendar */}

            {showCalendar && (
              <div className="absolute bottom-full left-0 mb-2 bg-[#2f4a73] rounded-lg p-4 shadow-lg z-50 w-64">

                <div className="flex justify-between items-center mb-3 text-white font-semibold">

                  <button
                    type="button"
                    onClick={prevMonth}
                  >
                    &lt;
                  </button>

                  <span>
                    {currentMonth.format(
                      "MMMM YYYY"
                    )}
                  </span>

                  <button
                    type="button"
                    onClick={nextMonth}
                  >
                    &gt;
                  </button>

                </div>

                <div className="grid grid-cols-7 text-center text-gray-300 mb-2 text-sm">
                  {[
                    "Su",
                    "Mo",
                    "Tu",
                    "We",
                    "Th",
                    "Fr",
                    "Sa",
                  ].map((d) => (
                    <div key={d}>{d}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {renderDays()}
                </div>

              </div>
            )}

          </div>
        </div>

      </Form>
    </div>
  );
};

export default LoginForm;
