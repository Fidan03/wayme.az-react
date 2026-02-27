import { Progress } from "antd";

const normalizePercent = (value) => {
  if (value === null || value === undefined) return 0;

  // handle strings like "85%" or "85"
  if (typeof value === "string") {
    const cleaned = value.replace("%", "").trim().replace(",", ".");
    const n = Number(cleaned);
    if (!Number.isFinite(n)) return 0;
    const p = n <= 1 ? n * 100 : n;
    return Math.max(0, Math.min(100, Math.round(p)));
  }

  // handle numbers like 85 or 0.85
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;

  const p = n <= 1 ? n * 100 : n;
  return Math.max(0, Math.min(100, Math.round(p)));
};

const SuitabilityCard = ({ data }) => {
  const fitPercent = normalizePercent(data?.abilityMatch?.fitPercent);
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

      {/* ✅ FIX: force AntD to redraw + ensure line progress renders correctly */}
      <Progress
        key={fitPercent}          // forces redraw when value changes
        type="line"               // ensure it's line progress
        percent={Number(fitPercent)}
        showInfo={false}
        strokeColor="#ffffff"
        trailColor="#091e3e"
        strokeWidth={6}
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
            <span className="text-[#A2A8B2] text-sm">
              Çatışmayan bacarıq yoxdur
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuitabilityCard;