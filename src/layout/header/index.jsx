import logo from '../../assets/logo.png';
import about from '../../assets/about.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [currentPath] = useState(window.location.pathname);
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoAbout = () => {
    navigate('/about');
  };

  const renderButton = () => {
    if (currentPath === '/') {
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
    } else if (currentPath === '/about') {
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
    } else {
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
    }
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
