// src/components/NextButton/index.jsx
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import "./main.css";

const NextButton = ({ to, form, label = "Növbəti", onClick, disabled }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    if (disabled) return;

    try {
      let values = null;

      if (form) {
        values = await form.validateFields();
      }

      if (onClick) {
        const ok = await onClick(values);
        if (ok === false) return;
      }

      if (to) navigate(to);
    } catch (error) {
      const firstFieldError = error?.errorFields?.[0]?.errors?.[0];
      message.error(firstFieldError || "Zəhmət olmasa bütün sahələri doldurun");
    }
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className={`w-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-[15px] h-[50px] text-[20px] cursor-pointer animated-gradient ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default NextButton;