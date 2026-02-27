import { useEffect, useMemo, useState } from "react";
import data from "../../data/directionsData";
import downArrow from "../../assets/arrowDown.png";
import Modal from "../../modal/index";

const FALLBACK_STYLE = {
  color: "#357CFF33",
  arrowColor: "#3379FB",
  textColor: "#8EC5FF",
};

// ✅ API name -> mock title aliases (only when names differ)
const NAME_ALIASES = {
  "logistika və təchizat zənciri": "logistika",
};

const normalize = (s = "") =>
  String(s)
    .trim()
    .toLowerCase()
    // Azerbaijani chars safe normalize (optional but helps)
    .replaceAll("ı", "i")
    .replaceAll("İ", "i")
    .replaceAll("ə", "e")
    .replaceAll("Ə", "e")
    .replaceAll("ö", "o")
    .replaceAll("Ö", "o")
    .replaceAll("ü", "u")
    .replaceAll("Ü", "u")
    .replaceAll("ç", "c")
    .replaceAll("Ç", "c")
    .replaceAll("ğ", "g")
    .replaceAll("Ğ", "g")
    .replaceAll("ş", "s")
    .replaceAll("Ş", "s");

async function fetchJson(url) {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

const DirectionCard = () => {
  const [hovered, setHovered] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [directions, setDirections] = useState([]);

  // ✅ Mock lookups
  const mockByTitle = useMemo(() => {
    const map = new Map();
    (data || []).forEach((d) => {
      if (d?.title) map.set(normalize(d.title), d);
    });
    return map;
  }, []);

  const mockByIndex = useMemo(() => {
    // in case you want to fallback by order/index (optional)
    return Array.isArray(data) ? data : [];
  }, []);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        setLoading(true);
        setApiError("");

        const res = await fetchJson(`/api/WayMe/directions?page=0&size=0`);
        const apiDirections = Array.isArray(res?.content) ? res.content : [];

        const cleaned = apiDirections.filter(
          (d) =>
            d &&
            typeof d === "object" &&
            typeof d.id === "number" &&
            typeof d.name === "string" &&
            d.name.trim().length > 0 &&
            d.active === true
        );

        const merged = cleaned.map((apiDir) => {
          // ✅ try: direct match
          const apiNameNorm = normalize(apiDir.name);

          // ✅ try: alias match when API uses different wording
          const aliased = NAME_ALIASES[apiNameNorm] || apiNameNorm;

          // ✅ pick mock
          let mock = mockByTitle.get(aliased);

          // ✅ last fallback: by relative order (only if still not found)
          if (!mock) {
            const idx = Math.max(0, Math.min(cleaned.indexOf(apiDir), mockByIndex.length - 1));
            mock = mockByIndex[idx];
          }

          return {
            id: apiDir.id,
            title: apiDir.name,
            description: apiDir.description || "",

            // ✅ use mock style safely
            icon: mock?.icon,
            color: mock?.color ?? FALLBACK_STYLE.color,
            arrowColor: mock?.arrowColor ?? FALLBACK_STYLE.arrowColor,
            textColor: mock?.textColor ?? FALLBACK_STYLE.textColor,
          };
        });

        if (!cancelled) setDirections(merged);
      } catch (e) {
        console.error(e);
        if (!cancelled) setApiError("İstiqamətlər yüklənərkən xəta baş verdi");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [mockByTitle, mockByIndex]);

  return (
    <>
      {apiError && <div className="text-red-400 text-sm mb-4">{apiError}</div>}

      {loading ? (
        <div className="text-white">İstiqamətlər yüklənir...</div>
      ) : (
        <div className="flex flex-wrap -mx-2">
          {directions.map((item) => (
            <div
              key={item.id}
              className="w-full px-2 mb-4 lg:w-1/3"
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="
                  flex gap-5 px-8 py-6 rounded-xl justify-between items-center w-full cursor-pointer
                  transition-all duration-500 ease-in-out
                  transform-gpu will-change-transform
                  hover:scale-[1.04]
                  hover:shadow-2xl
                  hover:brightness-110
                  active:scale-[0.97]
                "
                style={{ backgroundColor: item.color }}
                onClick={() => setActiveModal(item)}
              >
                <div className="flex justify-start gap-4">
                  <div className="flex items-center gap-3 flex-wrap shrink-0">
                    {item.icon ? (
                      <img src={item.icon} alt={item.title} className="w-12 h-12" />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-white/10" />
                    )}
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-white font-semibold text-lg text-start truncate w-full sm:w-60">
                      {item.title}
                    </h3>

                    <p className="relative mt-2 h-6">
                      <span
                        className={`absolute transition-opacity duration-400 ease-in-out w-full sm:w-60 truncate ${
                          hovered === item.id ? "opacity-100" : "opacity-0"
                        }`}
                        style={{ color: item.textColor }}
                      >
                        Ətraflı bax
                      </span>

                      <span
                        className={`absolute transition-opacity duration-400 ease-in-out w-full sm:w-60 truncate ${
                          hovered === item.id ? "opacity-0" : "opacity-100"
                        }`}
                        style={{ color: item.textColor }}
                      >
                        {item.description}
                      </span>
                    </p>
                  </div>
                </div>

                <div
                  className="
                    rounded-[10px] size-6 flex justify-center items-center
                    transition-transform duration-500 ease-in-out
                    group-hover:rotate-180
                  "
                  style={{ backgroundColor: item.arrowColor }}
                >
                  <img src={downArrow} alt="downArrow" className="w-6 h-6 object-contain" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeModal && <Modal item={activeModal} onClose={() => setActiveModal(null)} />}
    </>
  );
};

export default DirectionCard;