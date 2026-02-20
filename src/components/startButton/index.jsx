import { useNavigate } from "react-router";
import arrow from '../../assets/maki_arrow.png';
import './button.css';

const Button = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const response = await fetch('/api/WayMe/stats/users/increment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to increment user count');
      }

      const data = await response.json();

      localStorage.setItem('userCount', data.userCount);

      navigate('/login');

    } catch (error) {
      console.error('Increment error:', error);
      alert('Xəta baş verdi. Yenidən cəhd edin.');
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