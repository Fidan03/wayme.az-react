import { useNavigate } from "react-router";
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
        },
        body: JSON.stringify({}), // important
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Backend error:", text);
        throw new Error("Server error");
      }

      let data = null;

      // Try parsing JSON safely
      const contentType = response.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        data = await response.json();
      }

      if (data?.userCount) {
        localStorage.setItem("userCount", data.userCount);
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