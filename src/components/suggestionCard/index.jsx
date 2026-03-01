// src/components/suggestioncard/index.jsx
import designer from "../../assets/designer.png";
import front from "../../assets/programming.png";

const pickFallbackIcon = (name = "") => {
  const n = name.toLowerCase();
  if (
    n.includes("ux") ||
    n.includes("ui") ||
    n.includes("dizayn") ||
    n.includes("design")
  ) {
    return designer;
  }
  return front;
};

const SuggestionCard = ({ data }) => {
  const recommended = data?.comparison?.recommendedCareer;
  const selected = data?.comparison?.selectedCareer;
  const similarity = data?.comparison?.similarityPercent;

  const recName = recommended?.name || "—";
  const selName = selected?.name || "—";

  const recIcon = recommended?.iconUrl || pickFallbackIcon(recName);
  const selIcon = selected?.iconUrl || pickFallbackIcon(selName);

  return (
    <div className="bg-[#2F4A73] rounded-2xl p-6 flex flex-col gap-6 w-full">
      <div className="flex justify-between items-center">
        <p className="text-white font-bold text-[22px]">Tövsiyyə olunan</p>
        <p className="text-white font-bold text-[22px]">Sizin seçdiyiniz</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        <div className="flex justify-center items-center bg-background rounded-xl p-6 md:p-10 gap-5 w-full md:w-[433px] min-h-[144px]">
          <img
            src={recIcon}
            alt="recommended"
            className="w-12 h-12 object-contain"
            onError={(e) => {
              e.currentTarget.src = pickFallbackIcon(recName);
            }}
          />
          <p className="text-white font-semibold text-lg md:text-xl">
            {recName}
          </p>
        </div>

        <div className="bg-background flex justify-center items-center rounded-xl p-6 md:p-10 gap-5 w-full md:w-[433px] min-h-[144px]">
          <img
            src={selIcon}
            alt="selected"
            className="w-12 h-12 object-contain"
            onError={(e) => {
              e.currentTarget.src = pickFallbackIcon(selName);
            }}
          />
          <p className="text-white font-semibold text-lg md:text-xl">
            {selName}
          </p>
        </div>
      </div>

      <div className="bg-background rounded-lg p-4 flex flex-col gap-2">
        <p className="text-white font-semibold text-xl">
          Oxşarlıq dərəcəsi:{" "}
          {typeof similarity === "number" ? `${similarity}%` : "—"}
        </p>
      </div>
    </div>
  );
};

export default SuggestionCard;