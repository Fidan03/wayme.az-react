import { useNavigate } from "react-router";
import arrow from '../../assets/maki_arrow.png';
import './Button.css';

const Button = () => {
    let navigate = useNavigate();
  return (
    <div>
      <button
        className='text-white font-semibold text-[25px] py-3.75 px-5 rounded-[10px] cursor-pointer flex items-center animated-gradient'
        onClick={() => navigate("/login")}
      >
        Testə Başla
        <span className="ml-2"><img src={arrow} alt="arrow"  className='w-5'/></span>
      </button>
    </div>
  )
}

export default Button;
