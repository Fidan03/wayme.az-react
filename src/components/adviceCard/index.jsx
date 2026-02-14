const AdviceCard = () => {
  return (
    <div className="bg-[#2F4A73] rounded-2xl p-6 flex flex-col gap-6 w-full">
      <p className="text-white font-bold text-[22px]">Tövsiyyə olunan resurslar</p>

      <div className="flex flex-col gap-4">

        <div className="bg-background rounded-xl p-5 flex flex-col gap-3">
          <p className="text-white font-semibold text-xl">Online kurslar</p>
          <div className="flex flex-col gap-1">
            <p className="text-[#A2A8B2]">1. Kurs adı - <span className="text-[#2AA6FF] underline cursor-pointer">Link</span></p>
            <p className="text-[#A2A8B2]">2. Kurs adı - <span className="text-[#2AA6FF] underline cursor-pointer">Link</span></p>
          </div>
        </div>

        <div className="bg-background rounded-xl p-5 flex flex-col gap-3">
          <p className="text-white font-semibold text-xl">Youtube kanalları</p>
          <div className="flex flex-col gap-1">
            <p className="text-[#A2A8B2]">1. Kanal adı - <span className="text-[#2AA6FF] underline cursor-pointer">Link</span></p>
            <p className="text-[#A2A8B2]">2. Kanal adı - <span className="text-[#2AA6FF] underline cursor-pointer">Link</span></p>
          </div>
        </div>

        <div className="bg-background rounded-xl p-5 flex flex-col gap-3">
          <p className="text-white font-semibold text-xl">Kitab tövsiyyələri</p>
          <div className="flex flex-col gap-1">
            <p className="text-[#A2A8B2]">1. Kitab adı - <span className="text-[#2AA6FF] underline cursor-pointer">Link</span></p>
            <p className="text-[#A2A8B2]">2. Kitab adı - <span className="text-[#2AA6FF] underline cursor-pointer">Link</span></p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdviceCard;
