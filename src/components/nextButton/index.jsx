import "./main.css";
import { useNavigate } from "react-router-dom";

const NextButton = ({ to, form, label = "Növbəti" }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      if (form) {
        await form.validateFields();
      }

      navigate(to);
    } catch (error) {
      console.log("Validation failed");
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
