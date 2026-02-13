import "./main.css";
import { useNavigate } from "react-router-dom";

const NextButton = ({ to }) => {
  const navigate = useNavigate();

  return (
    <button
      className="w-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-[15px] h-[50px] text-[20px] cursor-pointer animated-gradient"
      onClick={() => navigate(to)}
    >
      Növbəti
    </button>
  );
};

export default NextButton;
