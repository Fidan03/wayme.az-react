import { Progress } from 'antd';

const SuitabilityCard = () => {
  return (
    <div className="bg-[#2F4A73] rounded-2xl p-6 flex flex-col gap-6 w-full">
      
      <div className="flex justify-between items-center">
        <p className="text-white font-bold text-[22px]">UX/UI üçün bacarıq uyğunluğu</p>
        <p className="text-white font-bold text-[22px]">40%</p>
      </div>

      <Progress
        percent={40}
        showInfo={false}
        strokeColor="#ffffff"
        trailColor="#091e3e"
        strokeWidth={6}
        className="rounded-lg"
      />

      <div className="bg-background rounded-lg p-4 flex flex-col gap-2">
        <p className="text-white font-semibold text-[20px] mb-2">Çatışmayan bacarıqlar</p>
        <div className="flex flex-wrap gap-2">
          <span className="bg-[#2F4A73] text-white px-3 py-1 rounded-full text-sm">Wireframing</span>
          <span className="bg-[#2F4A73] text-white px-3 py-1 rounded-full text-sm">UX prinsipləri</span>
          <span className="bg-[#2F4A73] text-white px-3 py-1 rounded-full text-sm">Kreativlik</span>
        </div>
      </div>

    </div>
  );
}

export default SuitabilityCard;
