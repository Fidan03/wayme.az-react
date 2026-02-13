import prev from "../../assets/prev.png";
import { useNavigate } from "react-router-dom";

const PrevButton = ({ to }) => {
  const navigate = useNavigate();

  return (
    <button
      className="w-[120px] bg-[#2F4A73] text-white font-bold py-2 px-4 rounded-[15px] h-[50px] text-[20px] cursor-pointer flex justify-center items-center"
      onClick={() => navigate(to)}
    >
      <img src={prev} alt="prev" />
    </button>
  );
};

export default PrevButton;
