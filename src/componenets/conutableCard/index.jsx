import { useState, useEffect } from 'react';
import data from '../../data/countableData';

const CountableCard = () => {
  const [userCount] = useState(() => {
    const stored = localStorage.getItem('userCount');
    return stored ? Number(stored) : 10;
  });

  useEffect(() => {
    localStorage.setItem('userCount', userCount);
  }, [userCount]);


  return (
    <div className='flex justify-between'>
      <div className='mx-5 my-10 p-[2px] rounded-[15px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'>
        <div className='flex flex-col justify-center items-center text-center bg-[#132746] w-[285px] h-[163px] rounded-[13px]'>
          <p className='font-bold text-[36px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
            {userCount}
          </p>
          <p className='text-[19px] font-medium text-[#A2A8B2]'>
            İstifadəçi
          </p>
        </div>
      </div>

      <div className='flex justify-between'>
        {data.map((item, index) => (
          <div
            key={index}
            className='mx-5 my-10 p-[2px] rounded-[15px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'
          >
            <div className='flex flex-col justify-center items-center text-center bg-[#132746] w-[285px] h-[163px] rounded-[13px]'>
              <p className='font-bold text-[36px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
                {item.title}
              </p>
              <p className='text-[19px] font-medium text-[#A2A8B2]'>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountableCard;
