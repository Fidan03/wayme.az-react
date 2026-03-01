// src/components/suitabilityCard/index.jsx
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

const clampPercent = (n) => Math.max(0, Math.min(100, Math.round(n)));

const SuitabilityCard = ({ data }) => {
  const results = Array.isArray(data?.results) ? data.results : [];
  const topJobName = results?.[0]?.name || "Seçilmiş peşə";

  const abilityMatch = data?.abilityMatch || {};

  const missing = Array.isArray(abilityMatch?.missingAbilities)
    ? abilityMatch.missingAbilities
    : [];

  let suitabilityPercent = normalizePercent(abilityMatch?.fitPercent);

  if (!suitabilityPercent) {
    const requiredAbilities = Array.isArray(abilityMatch?.requiredAbilities)
      ? abilityMatch.requiredAbilities
      : null;

    const matchedAbilities = Array.isArray(abilityMatch?.matchedAbilities)
      ? abilityMatch.matchedAbilities
      : Array.isArray(abilityMatch?.presentAbilities)
      ? abilityMatch.presentAbilities
      : null;

    const totalFromNumber = Number.isFinite(Number(abilityMatch?.totalRequiredAbilities))
      ? Number(abilityMatch.totalRequiredAbilities)
      : Number.isFinite(Number(abilityMatch?.totalAbilities))
      ? Number(abilityMatch.totalAbilities)
      : null;

    const totalRequired =
      requiredAbilities?.length ??
      totalFromNumber ??
      (matchedAbilities ? matchedAbilities.length + missing.length : null);

    const haveCount =
      matchedAbilities?.length ??
      (typeof totalRequired === "number" ? totalRequired - missing.length : null);

    if (
      typeof totalRequired === "number" &&
      totalRequired > 0 &&
      typeof haveCount === "number"
    ) {
      suitabilityPercent = clampPercent((haveCount / totalRequired) * 100);
    } else {
      suitabilityPercent = 0;
    }
  }

  return (
    <div className="bg-[#2F4A73] rounded-2xl p-6 flex flex-col gap-6 w-full">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <p className="text-white font-bold text-[18px] sm:text-[22px]">
          {topJobName} üçün bacarıq uyğunluğu
        </p>
        <p className="text-white font-bold text-[18px] sm:text-[22px]">
          {suitabilityPercent}%
        </p>
      </div>

      <Progress
        key={suitabilityPercent}
        type="line"
        percent={Number(suitabilityPercent)}
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