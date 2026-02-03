import logo from '../../assets/logo.png'
import about from '../../assets/about.png'
import { useState } from 'react';

const Header = () => {
    const [isHomePage] = useState(window.location.pathname === '/');

  return (
    <>
        {isHomePage ? (
            <div className="max-w-7xl mx-auto h-100% flex justify-between items-center px-4">
                <div className='logo'>
                    <img src={logo} alt="logo" className='h-17 w-39.5'/>
                </div>
                <div className='bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 p-px rounded-[10px] cursor-pointer'>
                    <button className="bg-background text-white font-semibold text-[20px] px-5 py-2.5 rounded-lg cursor-pointer flex items-center gap-2 hover:bg-[#ffffff33]">
                        <img src={about} alt="about"/>
                        Haqqımızda
                    </button>
                </div>
            </div>
        ) : (
            <div className='bg-background w-full pt-5'>
                <div className="max-w-7xl mx-auto h-100% flex justify-between items-center px-4">
                    <div className='logo flex items-center justify-center'>
                        <img src={logo} alt="logo" className='h-17 w-39.5'/>
                    </div>
                    <div className="inline-block p-0.5 rounded-[10px] bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">
                        <button className="bg-background text-white font-semibold text-[20px] px-5 py-2.5 rounded-lg cursor-pointer hover:bg-[#ffffff33]">
                            Testi Dayandır
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
);
}

export default Header