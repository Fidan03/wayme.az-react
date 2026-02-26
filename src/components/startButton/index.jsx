import { useNavigate } from "react-router-dom";
import arrow from "../../assets/maki_arrow.png";
import "./button.css";
import { WayMeAPI } from "../../api/waymeApi";

const Button = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const data = await WayMeAPI.startSession();

      if (!data?.sessionId) {
        throw new Error("Session ID tapılmadı");
      }

      // ✅ VERY IMPORTANT
      localStorage.setItem("sessionId", String(data.sessionId));

      navigate("/login");
    } catch (error) {
      console.error("Start session error:", error);
      alert("Server xətası. Zəhmət olmasa sonra yenidən cəhd edin.");
    }
  };

  return (
    <div>
      <button
        className="text-white font-semibold text-[25px] py-3.75 px-5 rounded-[10px] cursor-pointer flex items-center animated-gradient"
        onClick={handleClick}
      >
        Testə başla
        <span className="ml-2">
          <img src={arrow} alt="arrow" className="w-5" />
        </span>
      </button>
    </div>
  );
};

export default Button;