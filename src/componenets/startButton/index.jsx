import { useNavigate } from "react-router";
import arrow from '../../assets/maki_arrow.png';
import './Button.css'; // import the CSS file

const Button = () => {
    let navigate = useNavigate();
  return (
    <div>
      <button
        className='text-white font-semibold text-[25px] py-[15px] px-[20px] rounded-[10px] cursor-pointer flex items-center animated-gradient'
        onClick={() => navigate("/login")}
      >
        Testə Başla
        <span className="ml-2"><img src={arrow} alt="arrow"  className='w-[20px]'/></span>
      </button>
    </div>
  )
}

export default Button;
