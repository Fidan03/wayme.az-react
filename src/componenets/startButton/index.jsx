import { useNavigate } from "react-router";
import arrow from '../../assets/maki_arrow.png'

const Button = () => {
    let navigate = useNavigate();
  return (
    <div>
      <button className='text-white font-semibold text-[25px] p-[15px] rounded-[10px] cursor-pointer flex items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500' onClick={() => navigate("/login")}>Testə Başla <span><img src={arrow} alt="arrow"  className='w-[20px]'/></span></button>
    </div>
  )
}

export default Button