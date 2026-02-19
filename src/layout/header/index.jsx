import logo from '../../assets/logo.png';
import about from '../../assets/about.png';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleGoHome = () => {
    localStorage.removeItem("loginData");
    localStorage.removeItem("skillsData");
    localStorage.removeItem("choiceData");
    localStorage.removeItem("answersData");
    navigate("/");
  };

  const handleGoAbout = () => {
    navigate('/about');
  };

  const renderButton = () => {
    if (currentPath === '/') {
      // Home page → Haqqımızda
      return (
        <div className='bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 p-0.5 rounded-[10px] cursor-pointer'>
          <button
            className="bg-background text-white font-semibold text-[20px] px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#596E8F]"
            onClick={handleGoAbout}
          >
            <img src={about} alt="about" />
            Haqqımızda
          </button>
        </div>
      );
    }

    if (currentPath === '/about') {
      // About page → Geri
      return (
        <div className='bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 p-0.5 rounded-[10px] cursor-pointer'>
          <button
            className="bg-background text-white font-semibold text-[20px] px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#596E8F]"
            onClick={handleGoHome}
          >
            Geri
          </button>
        </div>
      );
    }

    if (currentPath === '/results' || currentPath === '/pdf') {
      // Results & PDF → Ana səhifə
      return (
        <div className='bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 p-0.5 rounded-[10px] cursor-pointer'>
          <button
            className="bg-background text-white font-semibold text-[20px] px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#596E8F]"
            onClick={handleGoHome}
          >
            Ana səhifə
          </button>
        </div>
      );
    }

    // All other pages → Testi dayandır
    return (
      <div className='bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 p-0.5 rounded-[10px] cursor-pointer'>
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
    <div className='bg-background w-full pt-5'>
      <div className="max-w-7xl mx-auto h-100% flex justify-between items-center px-4">
        <div className='logo flex items-center justify-center'>
          <img src={logo} alt="logo" className='h-17 w-39.5'/>
        </div>
        {renderButton()}
      </div>
    </div>
  );
};

export default Header;
