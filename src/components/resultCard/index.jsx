// ✅ FIXED: src/components/resultCard/index.jsx
import first from "../../assets/first.png";
import second from "../../assets/second.png";
import third from "../../assets/third.png";
import designer from "../../assets/designer.png";
import programming from "../../assets/programming.png";
import backend from "../../assets/backend.png";

const rankIcon = (rank) => {
  if (rank === 1) return first;
  if (rank === 2) return second;
  return third;
};

const fallbackRoleIcon = (name = "") => {
  const n = name.toLowerCase();
  if (
    n.includes("ux") ||
    n.includes("ui") ||
    n.includes("dizayn") ||
    n.includes("design")
  ) {
    return designer;
  }
  if (n.includes("front")) return programming;
  return backend;
};

// ✅ treat backend score as percent; supports 50, "50%", 0.5
const normalizeScorePercent = (value) => {
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

const ResultCard = ({ data }) => {
  const results = Array.isArray(data?.results) ? data.results : [];
  const top3 = results.slice(0, 3);

  return (
    <div className="bg-[#2F4A73] rounded-2xl p-6 flex flex-col gap-6 w-full">
      <p className="text-white font-bold text-[22px]">Testin nəticəsi</p>

      <div className="flex flex-col gap-4">
        {top3.map((r) => {
          const percent = normalizeScorePercent(r.score);

          return (
            <div
              key={r.rank}
              className="flex items-center justify-between bg-background rounded-xl p-6"
            >
              <div className="flex items-center gap-3">
                <img
                  src={rankIcon(r.rank)}
                  alt={`rank-${r.rank}`}
                  className="w-8 h-8"
                />
                <div className="flex items-center gap-2">
                  <img
                    src={r.iconUrl || fallbackRoleIcon(r.name)}
                    alt={r.name}
                    className="w-10 h-10"
                    onError={(e) => {
                      e.currentTarget.src = fallbackRoleIcon(r.name);
                    }}
                  />
                  <p className="text-white font-medium">{r.name}</p>
                </div>
              </div>

              {/* ✅ shows 50% / 32% / 18% exactly as backend */}
              <p className="text-white font-semibold text-xl">{percent}%</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultCard;