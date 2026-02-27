import logo from "../../assets/logo.png";
import about from "../../assets/about.png";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const clearAllTestStorage = () => {
    localStorage.removeItem("loginData");
    localStorage.removeItem("skillsData");
    localStorage.removeItem("choiceData");
    localStorage.removeItem("answersData");
    localStorage.removeItem("testAnswers");
    localStorage.removeItem("sessionId");

    // ✅ results page stored data
    localStorage.removeItem("results_bulkState");
    localStorage.removeItem("results_resultData");
    localStorage.removeItem("results_savedAt");
  };

  const handleGoHome = () => {
    clearAllTestStorage();
    navigate("/");
  };

  const handleGoAbout = () => {
    navigate("/about");
  };

  const renderButton = () => {
    if (currentPath === "/") {
      return (
        <div className="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 p-0.5 rounded-[10px] cursor-pointer">
          <button
            className="bg-background text-white font-semibold text-[16px] sm:text-[20px] px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#596E8F]"
            onClick={handleGoAbout}
          >
            <img src={about} alt="about" className="w-5 h-5 sm:w-6 sm:h-6" />
            Haqqımızda
          </button>
        </div>
      );
    }

    if (currentPath === "/about") {
      return (
        <div className="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 p-0.5 rounded-[10px] cursor-pointer">
          <button
            className="bg-background text-white font-semibold text-[20px] px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#596E8F]"
            onClick={handleGoHome}
          >
            Geri
          </button>
        </div>
      );
    }

    if (currentPath === "/results" || currentPath === "/pdf") {
      return (
        <div className="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 p-0.5 rounded-[10px] cursor-pointer">
          <button
            className="bg-background text-white font-semibold text-[20px] px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#596E8F]"
            onClick={handleGoHome}
          >
            Ana səhifə
          </button>
        </div>
      );
    }

    return (
      <div className="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 p-0.5 rounded-[10px] cursor-pointer">
        <button
          className="bg-background text-white font-semibold text-[20px] px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#596E8F]"
          onClick={handleGoHome}
        >
          Testi dayandır
        </button>
      </div>
    );
  };

  return (
    <div className="bg-background w-full pt-5">
      <div className="max-w-7xl mx-auto h-100% flex justify-between items-center px-4">
        <div className="logo flex items-center justify-center">
          <img src={logo} alt="logo" className="h-12 sm:h-17 w-28 sm:w-39.5" />
        </div>
        {renderButton()}
      </div>
    </div>
  );
};

export default Header;