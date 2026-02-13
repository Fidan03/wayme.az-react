import prev from '../../assets/prev.png';

const PrevButton = () => {
  return (
    <button className="w-[120px] bg-[#2F4A73] text-white font-bold py-2 px-4 rounded-[15px] h-[50px] text-[20px] cursor-pointer flex justify-center items-center">
      <img src={prev} alt="prev" />
    </button>
  );
};

export default PrevButton;
