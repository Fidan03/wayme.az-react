import { useNavigate } from "react-router-dom";
import arrow from "../../assets/maki_arrow.png";
import "./button.css";

const Button = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const response = await fetch("/api/WayMe/sessions/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Backend error:", text);
        throw new Error(`Server error: ${response.status}`);
      }

      let data = null;
      if (response.headers.get("content-type")?.includes("application/json")) {
        data = await response.json();
      }

      if (data?.userCount !== undefined) {
        localStorage.setItem("userCount", String(data.userCount));
      }

      navigate("/login");
    } catch (error) {
      console.error("Increment error:", error);
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