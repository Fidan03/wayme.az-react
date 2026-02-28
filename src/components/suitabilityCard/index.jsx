import { Progress } from "antd";

const normalizePercent = (value) => {
  if (value === null || value === undefined) return 0;

  if (typeof value === "string") {
    const cleaned = value.replace("%", "").trim().replace(",", ".");
    const n = Number(cleaned);
    if (!Number.isFinite(n)) return 0;
    const p = n <= 1 ? n * 100 : n;
    return Math.max(0, Math.min(100, Math.round(p)));
  }

  const n = Number(value);
  if (!Number.isFinite(n)) return 0;

  const p = n <= 1 ? n * 100 : n;
  return Math.max(0, Math.min(100, Math.round(p)));
};

const SuitabilityCard = ({ data }) => {
  const results = Array.isArray(data?.results) ? data.results : [];
  const topJobName = results?.[0]?.name || "Seçilmiş peşə";

  const fitPercent = normalizePercent(data?.abilityMatch?.fitPercent);

  // ✅ Only missing abilities (required) will be shown
  const missing = Array.isArray(data?.abilityMatch?.missingAbilities)
    ? data.abilityMatch.missingAbilities
    : [];

  return (
    <div className="bg-[#2F4A73] rounded-2xl p-6 flex flex-col gap-6 w-full">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <p className="text-white font-bold text-[18px] sm:text-[22px]">
          {topJobName} üçün bacarıq uyğunluğu
        </p>
        <p className="text-white font-bold text-[18px] sm:text-[22px]">
          {fitPercent}%
        </p>
      </div>

      <Progress
        key={fitPercent}
        type="line"
        percent={Number(fitPercent)}
        showInfo={false}
        strokeColor="#ffffff"
        trailColor="#091e3e"
        strokeWidth={6}
        className="rounded-lg"
      />

      {/* ✅ Show only missing abilities */}
      <div className="bg-background rounded-lg p-4 flex flex-col gap-2">
        <p className="text-white font-semibold text-[20px] mb-2">
          Çatışmayan bacarıqlar
        </p>

        <div className="flex flex-wrap gap-2">
          {missing.length ? (
            missing.map((skill, idx) => (
              <span
                key={`${skill}-${idx}`}
                className="px-3 py-1 rounded-full text-sm bg-[#2F4A73] text-white"
              >
                {skill}
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