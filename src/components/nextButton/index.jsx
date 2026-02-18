import { useNavigate } from "react-router-dom";
import { message } from "antd";
import "./main.css";

const NextButton = ({ to, form, label = "Növbəti", onClick }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      if (form) {
        await form.validateFields();
      }

      if (onClick) {
        await onClick();
      }

      if (to) {
        navigate(to);
      }
    } catch (error) {
      message.error("Zəhmət olmasa bütün sahələri doldurun");
    }
  };

  return (
    <button
      type="button"
      className="w-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-[15px] h-[50px] text-[20px] cursor-pointer animated-gradient"
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default NextButton;
