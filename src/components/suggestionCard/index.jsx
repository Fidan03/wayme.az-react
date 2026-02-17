import designer from '../../assets/designer.png'
import front from '../../assets/programming.png'


const SuggestionCard = () => {
  return (
    <div className="bg-[#2F4A73] rounded-2xl p-6 flex flex-col gap-6 w-full">
      
      <div className="flex justify-between items-center">
        <p className="text-white font-bold text-[22px]">Tövsiyyə olunan</p>
        <p className="text-white font-bold text-[22px]">Sizin seçdiyiniz</p>
      </div>

      <div className="rounded-lg p-4 flex gap-8">
        <div className='flex justify-center items-center bg-background rounded-xl p-10 gap-5 w-[433px] h-[144px]'>
            <img src={designer} alt="designer" />
            <p className='text-white font-semibold text-xl'>UX/UI Dizayn</p>
        </div>
        <div className='bg-background flex justify-center items-center rounded-xl p-10 gap-5 w-[433px] h-[144px]'>
            <img src={front} alt="front" />
            <p className='text-white font-semibold text-xl'>Frontend Developer</p>
        </div>
      </div>

      <div className="bg-background rounded-lg p-4 flex flex-col gap-2">
        <p className='text-white font-semibold text-xl'>Oxşarlıq dərəcəsi: 17%</p>
      </div>

    </div>
  );
}

export default SuggestionCard;
