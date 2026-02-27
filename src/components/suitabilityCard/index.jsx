import { Progress } from "antd";

const SuitabilityCard = ({ data }) => {
  const fitPercent = data?.abilityMatch?.fitPercent ?? 0;
  const missing = data?.abilityMatch?.missingAbilities ?? [];

  return (
    <div className="bg-[#2F4A73] rounded-2xl p-6 flex flex-col gap-6 w-full">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <p className="text-white font-bold text-[18px] sm:text-[22px]">
          UX/UI üçün bacarıq uyğunluğu
        </p>
        <p className="text-white font-bold text-[18px] sm:text-[22px]">
          {fitPercent}%
        </p>
      </div>

      <Progress
        percent={fitPercent}
        showInfo={false}
        strokeColor="#ffffff"
        railColor="#091e3e" // ✅ was trailColor
        size={6}            // ✅ was strokeWidth
        className="rounded-lg"
      />

      <div className="bg-background rounded-lg p-4 flex flex-col gap-2">
        <p className="text-white font-semibold text-[20px] mb-2">
          Çatışmayan bacarıqlar
        </p>
        <div className="flex flex-wrap gap-2">
          {missing.length ? (
            missing.map((m, idx) => (
              <span
                key={idx}
                className="bg-[#2F4A73] text-white px-3 py-1 rounded-full text-sm"
              >
                {m}
              </span>
            ))
          ) : (
            <span className="text-[#A2A8B2] text-sm">Çatışmayan bacarıq yoxdur</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuitabilityCard;