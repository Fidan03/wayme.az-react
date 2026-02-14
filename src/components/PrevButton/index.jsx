import prev from "../../assets/prev.png";
import { useNavigate } from "react-router-dom";

const PrevButton = ({ to, onClick }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }

    if (!e?.defaultPrevented && to) {
      navigate(to);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-[120px] bg-[#2F4A73] text-white font-bold py-2 px-4 rounded-[15px] h-[50px] text-[20px] cursor-pointer flex justify-center items-center"
    >
      <img src={prev} alt="prev" />
    </button>
  );
};

export default PrevButton;
