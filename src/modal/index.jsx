import { useEffect, useRef, useState } from "react";
import close from "../assets/close.png";
import downArrow from "../assets/arrowDown.png";
import programming from "../assets/programming.png";

async function fetchJson(url) {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

const Modal = ({ item, onClose }) => {
  const [openId, setOpenId] = useState(null);
  const contentRefs = useRef({});

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [subdirections, setSubdirections] = useState([]);

  const handleToggle = (id) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        setLoading(true);
        setApiError("");

        const res = await fetchJson(
          `/api/WayMe/directions/${item.id}/subdirections?page=0&size=0`
        );

        const apiSubs = Array.isArray(res?.content) ? res.content : [];

        const cleaned = apiSubs.filter(
          (s) =>
            s &&
            typeof s === "object" &&
            typeof s.id === "number" &&
            typeof s.name === "string" &&
            s.name.trim().length > 0 &&
            s.active === true
        );

        const mapped = cleaned.map((s) => ({
          id: s.id,
          title: s.name,
          description: s.description || "",
        }));

        if (!cancelled) setSubdirections(mapped);
      } catch (e) {
        console.error(e);
        if (!cancelled)
          setApiError("Alt istiqamətlər yüklənərkən xəta baş verdi");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [item.id]);

  return (
    <div
      className="fixed inset-0 bg-black/40 grid place-items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-[20px] p-px 
        w-full md:w-[1300px] max-w-[95vw] max-h-[90vh] sm:max-h-[85vh] mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-background rounded-[20px] p-6 w-full h-full overflow-hidden">

          {/* Header */}
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-[20px] sm:text-[24px] md:text-[30px] font-semibold text-white">
              {item.title}
            </h1>

            <button
              onClick={onClose}
              className="bg-[#26356B] rounded-full size-[32px] sm:size-[40px] flex items-center justify-center shrink-0"
            >
              <img
                src={close}
                alt="close"
                className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer"
              />
            </button>
          </div>

          <p className="font-medium mb-4 text-[#A2A8B2] text-[16px] sm:text-[20px]">
            Sahələr:
          </p>

          {apiError && (
            <div className="text-red-400 text-sm mb-3">{apiError}</div>
          )}
          {loading && <div className="text-white mb-3">Yüklənir...</div>}

          {/* Cards */}
          <div className="flex flex-wrap justify-center gap-5 max-h-[60vh] pr-2 overflow-y-auto">
            {subdirections.map((direction) => {
              const isOpen = openId === direction.id;

              return (
                <div
                  key={direction.id}
                  onClick={() => handleToggle(direction.id)}
                  className="
                    flex flex-col items-start self-start
                    border border-white/10
                    bg-[#357CFF33]
                    rounded-[20px]
                    px-4 py-3
                    w-full sm:w-[275px]
                    cursor-pointer
                    transition-all duration-300 ease-in-out
                    hover:scale-[1.03]
                    hover:bg-[#357CFF55]
                    active:scale-[0.97]
                  "
                >
                  {/* Top */}
                  <div className="flex items-center justify-start mb-2.5 w-full gap-6">
                    <img
                      src={programming}
                      alt="programming"
                      className="w-[44px] h-[44px]"
                    />

                    <h3 className="font-semibold text-[14px] sm:text-[15px] md:text-[16px] text-white leading-tight">
                      {direction.title}
                    </h3>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center w-full pointer-events-none">
                    <img
                      src={downArrow}
                      alt="downArrow"
                      className={`w-[18px] my-1.5 transition-transform duration-300 ease-in-out ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div
                    ref={(el) => (contentRefs.current[direction.id] = el)}
                    className="overflow-hidden transition-all duration-500 ease-in-out w-full"
                    style={{
                      maxHeight: isOpen
                        ? `${contentRefs.current[direction.id]?.scrollHeight}px`
                        : "0px",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p className="text-sm text-[#A2A8B2] text-center">
                      {direction.description}
                    </p>
                  </div>
                </div>
              );
            })}

            {!loading && !apiError && subdirections.length === 0 && (
              <div className="text-[#A2A8B2] text-sm">
                Alt istiqamət yoxdur
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;