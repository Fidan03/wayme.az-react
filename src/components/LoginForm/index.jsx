// src/components/LoginForm/index.jsx
import { useState, useRef, useEffect, useMemo } from "react";
import { Form } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import person from "../../assets/person.png";
import calendar from "../../assets/calendar.png";

dayjs.extend(customParseFormat);

const DATE_FORMAT = "DD.MM.YYYY";

// ✅ backend rule: only letters, optionally ONE hyphen between 2 words
// examples valid: "Ali", "Ali-Hasan"
// invalid: "-Ali", "Ali-", "Ali--Hasan", "Ali Hasan", "Ali1"
const NAME_BACKEND_REGEX = /^[A-Za-zÇƏĞİÖŞÜçəğiöşü]+(-[A-Za-zÇƏĞİÖŞÜçəğiöşü]+)?$/;

const LoginForm = ({ form }) => {
  const savedData = JSON.parse(localStorage.getItem("loginData") || "{}");

  const saveToStorage = (key, value) => {
    const current = JSON.parse(localStorage.getItem("loginData") || "{}");
    localStorage.setItem("loginData", JSON.stringify({ ...current, [key]: value }));
  };

  const parseStrictDate = (value) => {
    const d = dayjs(value, DATE_FORMAT, true);
    return d.isValid() ? d : null;
  };

  const calcAge = (birth) => {
    // age in years considering month/day (dayjs diff already does that)
    return dayjs().diff(birth, "year");
  };

  /* ---------------- Name & Surname Input ---------------- */

  const sanitizeName = (value) => {
    // allow letters + hyphen only
    let val = value.replace(/[^A-Za-zÇƏĞİÖŞÜçəğiöşü-]/g, "");

    // remove multiple hyphens
    val = val.replace(/-+/g, "-");

    // no leading/trailing hyphen
    val = val.replace(/^-+/, "").replace(/-+$/, "");

    // allow at most one hyphen
    const parts = val.split("-");
    if (parts.length > 2) val = `${parts[0]}-${parts[1]}`;

    // max length
    val = val.slice(0, 30);

    // capitalize first letter (optional)
    if (val.length > 0) val = val.charAt(0).toUpperCase() + val.slice(1);

    return val;
  };

  const handleChange = (e, field) => {
    const formatted = sanitizeName(e.target.value);
    form.setFieldsValue({ [field]: formatted });
    saveToStorage(field, formatted);

    // ✅ clear error if it becomes valid
    if (formatted && NAME_BACKEND_REGEX.test(formatted)) {
      form.setFields([{ name: field, errors: [] }]);
    }
  };

  /* ---------------- Date Picker State ---------------- */

  const [selectedDate, setSelectedDate] = useState(savedData.date || "");
  const [showCalendar, setShowCalendar] = useState(false);

  const initialMonth = useMemo(() => {
    const saved = parseStrictDate(savedData.date || "");
    return saved ? saved : dayjs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!calendarRef.current?.contains(e.target)) setShowCalendar(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isFutureDayInCurrentMonth = (day) => currentMonth.date(day).isAfter(dayjs(), "day");

  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");

  const startDay = startOfMonth.day();
  const totalDays = endOfMonth.date();

  const handleDateSelect = (day) => {
    const date = currentMonth.date(day);
    if (date.isAfter(dayjs(), "day")) return;

    const formatted = date.format(DATE_FORMAT);
    setSelectedDate(formatted);
    form.setFieldsValue({ date: formatted });
    saveToStorage("date", formatted);
    form.setFields([{ name: "date", errors: [] }]);
    setShowCalendar(false);
  };

  const formatDateInput = (value) => {
    const numbers = value.replace(/\D/g, "").slice(0, 8);
    let result = "";
    if (numbers.length >= 1) result = numbers.slice(0, 2);
    if (numbers.length >= 3) result += "." + numbers.slice(2, 4);
    if (numbers.length >= 5) result += "." + numbers.slice(4, 8);
    return result;
  };

  const handleInputChange = (e) => {
    const formatted = formatDateInput(e.target.value);

    setSelectedDate(formatted);
    form.setFieldsValue({ date: formatted });
    saveToStorage("date", formatted);

    if (formatted.length !== 10) {
      form.setFields([{ name: "date", errors: ["Tarixi tam daxil edin (gg.aa.iiii)"] }]);
      return;
    }

    const d = parseStrictDate(formatted);

    if (!d) {
      form.setFields([{ name: "date", errors: ["Düzgün tarix daxil edin"] }]);
      return;
    }

    if (d.isAfter(dayjs(), "day")) {
      form.setFields([{ name: "date", errors: ["Gələcək tarix seçmək olmaz"] }]);
      return;
    }

    const age = calcAge(d);
    if (age < 15 || age > 65) {
      form.setFields([{ name: "date", errors: ["Yaş 15 ilə 65 arasında olmalıdır"] }]);
      return;
    }

    setCurrentMonth(d);
    form.setFields([{ name: "date", errors: [] }]);
  };

  const renderDays = () => {
    const blanks = Array.from({ length: startDay }, (_, i) => <div key={`b-${i}`} />);

    const days = Array.from({ length: totalDays }, (_, i) => {
      const dayNum = i + 1;
      const dateObj = currentMonth.date(dayNum);

      const isDisabled = isFutureDayInCurrentMonth(dayNum);
      const isSelected =
        selectedDate === dateObj.format(DATE_FORMAT) && !!parseStrictDate(selectedDate);

      return (
        <button
          key={dayNum}
          type="button"
          disabled={isDisabled}
          onClick={() => !isDisabled && handleDateSelect(dayNum)}
          className={`
            w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-200
            ${isSelected ? "bg-blue-500 text-white" : ""}
            ${!isSelected && !isDisabled ? "hover:bg-blue-600 hover:text-white" : ""}
            ${isDisabled ? "text-gray-500 cursor-not-allowed" : "text-white"}
          `}
        >
          {dayNum}
        </button>
      );
    });

    return [...blanks, ...days];
  };

  useEffect(() => {
    if (savedData.name || savedData.surname || savedData.date) {
      form.setFieldsValue({
        name: savedData.name || "",
        surname: savedData.surname || "",
        date: savedData.date || "",
      });
      setSelectedDate(savedData.date || "");
    }

    if (savedData.date) {
      const d = parseStrictDate(savedData.date);
      if (d) setCurrentMonth(d);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------------- AntD Rules ---------------- */

  const nameRules = [
    { required: true, message: "Ad daxil edin" },
    {
      validator: async (_, value) => {
        const v = String(value || "");
        if (!NAME_BACKEND_REGEX.test(v)) {
          return Promise.reject(new Error("Yalnız hərflər və ən çox 1 defis (-) istifadə edin"));
        }
        return Promise.resolve();
      },
    },
  ];

  const surnameRules = [
    { required: true, message: "Soyad daxil edin" },
    {
      validator: async (_, value) => {
        const v = String(value || "");
        if (!NAME_BACKEND_REGEX.test(v)) {
          return Promise.reject(new Error("Yalnız hərflər və ən çox 1 defis (-) istifadə edin"));
        }
        return Promise.resolve();
      },
    },
  ];

  const dateRules = [
    { required: true, message: "Tarix seçin" },
    {
      validator: async (_, value) => {
        const v = String(value || "");
        if (v.length !== 10) {
          return Promise.reject(new Error("Tarixi tam daxil edin (gg.aa.iiii)"));
        }
        const d = parseStrictDate(v);
        if (!d) return Promise.reject(new Error("Düzgün tarix daxil edin"));
        if (d.isAfter(dayjs(), "day")) {
          return Promise.reject(new Error("Gələcək tarix seçmək olmaz"));
        }
        const age = calcAge(d);
        if (age < 15 || age > 65) {
          return Promise.reject(new Error("Yaş 15 ilə 65 arasında olmalıdır"));
        }
        return Promise.resolve();
      },
    },
  ];

  return (
    <div className="w-full">
      <Form form={form} autoComplete="off">
        {/* Name */}
        <div className="mb-4">
          <label className="text-white text-[15px] font-medium">Ad</label>

          <div className="flex items-center bg-[#2f4a73] rounded-lg h-12 px-2">
            <img src={person} className="w-5 h-5 mr-2" alt="person" />
            <Form.Item name="name" noStyle rules={nameRules}>
              <input
                maxLength={30}
                placeholder="Adınızı daxil edin"
                onChange={(e) => handleChange(e, "name")}
                className="flex-1 bg-transparent text-white text-[18px] outline-none"
              />
            </Form.Item>
          </div>
        </div>

        {/* Surname */}
        <div className="mb-4">
          <label className="text-white text-[15px] font-medium">Soyad</label>

          <div className="flex items-center bg-[#2f4a73] rounded-lg h-12 px-2">
            <img src={person} className="w-5 h-5 mr-2" alt="person" />
            <Form.Item name="surname" noStyle rules={surnameRules}>
              <input
                maxLength={30}
                placeholder="Soyadınızı daxil edin"
                onChange={(e) => handleChange(e, "surname")}
                className="flex-1 bg-transparent text-white text-[18px] outline-none"
              />
            </Form.Item>
          </div>
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="text-white text-[15px] font-medium">Doğum tarixi</label>

          <div className="relative mt-1" ref={calendarRef}>
            <div className="flex items-center bg-[#2f4a73] rounded-lg h-12 px-2">
              <img
                src={calendar}
                className="w-5 h-5 mr-2 cursor-pointer"
                alt="calendar"
                onClick={() => setShowCalendar((s) => !s)}
              />

              <Form.Item name="date" noStyle rules={dateRules}>
                <input
                  value={selectedDate}
                  placeholder="gg.aa.iiii"
                  onChange={handleInputChange}
                  maxLength={10}
                  inputMode="numeric"
                  className="flex-1 bg-transparent text-white text-[18px] outline-none"
                />
              </Form.Item>
            </div>

            {showCalendar && (
              <div className="absolute bottom-full left-0 mb-2 bg-[#2f4a73] rounded-lg p-4 shadow-lg z-50 w-64">
                <div className="flex justify-between items-center mb-3 text-white font-semibold">
                  <button type="button" onClick={() => setCurrentMonth((m) => m.subtract(1, "month"))}>
                    &lt;
                  </button>

                  <span>{currentMonth.format("MMMM YYYY")}</span>

                  <button type="button" onClick={() => setCurrentMonth((m) => m.add(1, "month"))}>
                    &gt;
                  </button>
                </div>

                <div className="grid grid-cols-7 text-center text-gray-300 mb-2 text-sm">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                    <div key={d}>{d}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">{renderDays()}</div>
              </div>
            )}
          </div>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;