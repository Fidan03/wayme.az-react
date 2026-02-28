import { useState, useRef, useEffect, useMemo } from "react";
import { Form } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useNavigate } from "react-router-dom";

import person from "../../assets/person.png";
import calendar from "../../assets/calendar.png";

dayjs.extend(customParseFormat);

const DATE_FORMAT = "DD.MM.YYYY";

const LoginForm = ({ form }) => {
  const navigate = useNavigate();

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

    const currentData = JSON.parse(localStorage.getItem("loginData") || "{}");

    localStorage.setItem(
      "loginData",
      JSON.stringify({
        ...currentData,
        [field]: formatted,
      })
    );
  };

  /* ---------------- Helpers ---------------- */

  const saveToStorage = (key, value) => {
    const current = JSON.parse(localStorage.getItem("loginData") || "{}");

    localStorage.setItem(
      "loginData",
      JSON.stringify({
        ...current,
        [key]: value,
      })
    );
  };

  const parseStrictDate = (value) => {
    // strict parsing: rejects 32.01.2024, 29.02.2023, 00.00.0000, etc.
    const d = dayjs(value, DATE_FORMAT, true);
    return d.isValid() ? d : null;
  };

  const isFutureDayInCurrentMonth = (day) => {
    return currentMonth.date(day).isAfter(dayjs(), "day");
  };

  /* ---------------- Date Picker State ---------------- */

  const [selectedDate, setSelectedDate] = useState(savedData.date || "");
  const [showCalendar, setShowCalendar] = useState(false);

  const initialMonth = useMemo(() => {
    const saved = parseStrictDate(savedData.date || "");
    return saved ? saved : dayjs();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [currentMonth, setCurrentMonth] = useState(initialMonth);

  const calendarRef = useRef(null);

  /* ---------------- Close Calendar ---------------- */

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!calendarRef.current?.contains(e.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- Calendar Logic ---------------- */

  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");

  const startDay = startOfMonth.day();
  const totalDays = endOfMonth.date();

  const prevMonth = () => setCurrentMonth((m) => m.subtract(1, "month"));
  const nextMonth = () => setCurrentMonth((m) => m.add(1, "month"));

  const handleDateSelect = (day) => {
    const date = currentMonth.date(day);
    if (date.isAfter(dayjs(), "day")) return;

    const formatted = date.format(DATE_FORMAT);

    setSelectedDate(formatted);
    form.setFieldsValue({ date: formatted });
    saveToStorage("date", formatted);

    setShowCalendar(false);
  };

  /* ---------------- Date Input Formatting + Validation ---------------- */

  const formatDateInput = (value) => {
    // keep only digits and add dots as user types
    const numbers = value.replace(/\D/g, "").slice(0, 8);

    let result = "";
    if (numbers.length >= 1) result = numbers.slice(0, 2);
    if (numbers.length >= 3) result += "." + numbers.slice(2, 4);
    if (numbers.length >= 5) result += "." + numbers.slice(4, 8);

    return result;
  };

  const handleInputChange = (e) => {
    const formatted = formatDateInput(e.target.value);

    // Always show what the user typed (masked)
    setSelectedDate(formatted);
    form.setFieldsValue({ date: formatted });
    saveToStorage("date", formatted);

    // Only when full length, validate strictly
    if (formatted.length === 10) {
      const d = parseStrictDate(formatted);

      if (d && !d.isAfter(dayjs(), "day")) {
        setCurrentMonth(d);
        // keep valid value
        form.setFields([
          {
            name: "date",
            errors: [],
          },
        ]);
      } else {
        // mark field invalid
        form.setFields([
          {
            name: "date",
            errors: ["Yalnız düzgün və gələcək olmayan tarix daxil edin"],
          },
        ]);
      }
    } else {
      // while typing, don't hard-error (optional); clear errors
      form.setFields([
        {
          name: "date",
          errors: [],
        },
      ]);
    }
  };

  /* ---------------- Calendar Days ---------------- */

  const renderDays = () => {
    const blanks = Array.from({ length: startDay }, (_, i) => (
      <div key={`b-${i}`} />
    ));

    const days = Array.from({ length: totalDays }, (_, i) => {
      const dayNum = i + 1;
      const dateObj = currentMonth.date(dayNum);

      const isDisabled = isFutureDayInCurrentMonth(dayNum);

      const isSelected =
        selectedDate === dateObj.format(DATE_FORMAT) &&
        !!parseStrictDate(selectedDate);

      return (
        <button
          key={dayNum}
          type="button"
          disabled={isDisabled}
          onClick={() => !isDisabled && handleDateSelect(dayNum)}
          className={`
            w-10 h-10 flex items-center justify-center rounded-lg
            transition-colors duration-200
            ${isSelected ? "bg-blue-500 text-white" : ""}
            ${
              !isSelected && !isDisabled
                ? "hover:bg-blue-600 hover:text-white"
                : ""
            }
            ${isDisabled ? "text-gray-500 cursor-not-allowed" : "text-white"}
          `}
        >
          {dayNum}
        </button>
      );
    });

    return [...blanks, ...days];
  };

  /* ---------------- Autofill ---------------- */

  useEffect(() => {
    // set initial values from storage (only if present)
    if (savedData.name || savedData.surname || savedData.date) {
      form.setFieldsValue({
        name: savedData.name || "",
        surname: savedData.surname || "",
        date: savedData.date || "",
      });
    }

    // ensure currentMonth matches saved valid date
    if (savedData.date) {
      const d = parseStrictDate(savedData.date);
      if (d) setCurrentMonth(d);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------------- Submit To API ---------------- */

  const submitPersonalInfo = async (values) => {
    try {
      const sessionId = localStorage.getItem("sessionId");

      if (!sessionId) {
        alert("Session tapılmadı. Yenidən başlayın.");
        navigate("/");
        return;
      }

      // Validate date strictly before submit
      const d = parseStrictDate(values.date || "");
      if (!d) {
        form.setFields([
          {
            name: "date",
            errors: ["Yalnız düzgün tarix daxil edin (gg.aa.iiii)"],
          },
        ]);
        return;
      }
      if (d.isAfter(dayjs(), "day")) {
        form.setFields([
          {
            name: "date",
            errors: ["Gələcək tarix seçmək olmaz"],
          },
        ]);
        return;
      }

      // Convert date to backend format
      const birthDate = d.format("YYYY-MM-DD");

      const body = {
        name: values.name,
        surname: values.surname,
        birthDate,
      };

      const response = await fetch(
        `/api/WayMe/sessions/${sessionId}/personal-info`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        console.error("Validation:", err);
        alert("Məlumatlar düzgün deyil");
        return;
      }

      navigate("/test");
    } catch (err) {
      console.error(err);
      alert("Server xətası");
    }
  };

  /* ---------------- Date Rule (AntD) ---------------- */

  const dateRules = [
    { required: true, message: "Tarix seçin" },
    {
      validator: async (_, value) => {
        if (!value) return Promise.resolve();

        // Allow partial typing without throwing
        if (String(value).length !== 10) return Promise.resolve();

        const d = parseStrictDate(value);
        if (!d) return Promise.reject(new Error("Düzgün tarix daxil edin"));
        if (d.isAfter(dayjs(), "day"))
          return Promise.reject(new Error("Gələcək tarix seçmək olmaz"));

        return Promise.resolve();
      },
    },
  ];

  /* ---------------- Render ---------------- */

  return (
    <div className="w-full">
      <Form form={form} autoComplete="off" onFinish={submitPersonalInfo}>
        {/* Name */}
        <div className="mb-4">
          <label className="text-white text-[15px] font-medium">Ad</label>

          <div className="flex items-center bg-[#2f4a73] rounded-lg h-12 px-2">
            <img src={person} className="w-5 h-5 mr-2" alt="person" />

            <Form.Item
              name="name"
              noStyle
              rules={[{ required: true, message: "Ad daxil edin" }]}
            >
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

            <Form.Item
              name="surname"
              noStyle
              rules={[{ required: true, message: "Soyad daxil edin" }]}
            >
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
          <label className="text-white text-[15px] font-medium">
            Doğum tarixi
          </label>

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
                  <button type="button" onClick={prevMonth}>
                    &lt;
                  </button>

                  <span>{currentMonth.format("MMMM YYYY")}</span>

                  <button type="button" onClick={nextMonth}>
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