import { useEffect, useMemo, useState } from "react";
import Wave from "../../components/wave/index";
import LoginCardHeader from "../../components/LoginCardHeader";
import PrevButton from "../../components/PrevButton";
import { useNavigate } from "react-router-dom";

const ChoiceSelection = () => {
  const navigate = useNavigate();

  const [directions, setDirections] = useState([]);
  const [subdirections, setSubdirections] = useState([]);

  const [selectedDirection, setSelectedDirection] = useState(null);
  const [selectedSubdirection, setSelectedSubdirection] = useState(null);

  const [loadingDirections, setLoadingDirections] = useState(true);
  const [loadingSub, setLoadingSub] = useState(false);
  const [error, setError] = useState("");

  const [isTransitioning, setIsTransitioning] = useState(false);

  async function fetchJson(url) {
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(text || `HTTP ${res.status}`);
    }
    return res.json();
  }

  const isPlaceholderString = (obj) => {
    const name = String(obj?.name ?? "").trim().toLowerCase();
    const key = String(obj?.key ?? "").trim().toLowerCase();
    return name === "string" || key === "string";
  };

  const isValidDirection = (d) =>
    d &&
    typeof d === "object" &&
    typeof d.id === "number" &&
    typeof d.name === "string" &&
    d.name.trim().length > 0 &&
    d.active === true &&
    !isPlaceholderString(d);

  const isValidSubdirection = (s) =>
    s &&
    typeof s === "object" &&
    typeof s.id === "number" &&
    typeof s.name === "string" &&
    s.name.trim().length > 0 &&
    s.active === true &&
    !isPlaceholderString(s);

  async function fetchAllDirections() {
    const first = await fetchJson(`/api/WayMe/directions?page=0&size=50`);
    const totalPages = Number(first.totalPages ?? 1);

    const all = [...(first.content ?? [])];
    for (let p = 1; p < totalPages; p++) {
      const page = await fetchJson(`/api/WayMe/directions?page=${p}&size=50`);
      all.push(...(page.content ?? []));
    }

    return all.filter(isValidDirection);
  }

  async function fetchAllSubdirections(directionId) {
    const first = await fetchJson(
      `/api/WayMe/directions/${directionId}/subdirections?page=0&size=50`
    );
    const totalPages = Number(first.totalPages ?? 1);

    const all = [...(first.content ?? [])];
    for (let p = 1; p < totalPages; p++) {
      const page = await fetchJson(
        `/api/WayMe/directions/${directionId}/subdirections?page=${p}&size=50`
      );
      all.push(...(page.content ?? []));
    }

    return all.filter(isValidSubdirection);
  }

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        setLoadingDirections(true);
        setError("");
        const all = await fetchAllDirections();
        if (!cancelled) setDirections(all);
      } catch (e) {
        console.error(e);
        if (!cancelled) setError("İstiqamətlər yüklənərkən xəta baş verdi");
      } finally {
        if (!cancelled) setLoadingDirections(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const cardsToShow = useMemo(() => {
    return selectedDirection ? subdirections : directions;
  }, [selectedDirection, subdirections, directions]);

  const handleSelectDirection = async (dir) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setSelectedSubdirection(null);

    setTimeout(async () => {
      setSelectedDirection(dir);
      setIsTransitioning(false);

      try {
        setLoadingSub(true);
        setError("");
        const subs = await fetchAllSubdirections(dir.id);
        setSubdirections(subs);
      } catch (e) {
        console.error(e);
        setError("Alt istiqamətlər yüklənərkən xəta baş verdi");
        setSubdirections([]);
      } finally {
        setLoadingSub(false);
      }
    }, 200);
  };

  const handleSelectSubdirection = (sub) => {
    setSelectedSubdirection(sub);
  };

  const handleBack = (e) => {
    if (!selectedDirection) return;
    e.preventDefault();

    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedDirection(null);
      setSelectedSubdirection(null);
      setSubdirections([]);
      setIsTransitioning(false);
    }, 200);
  };

  const handleStartTest = () => {
    if (selectedDirection && selectedSubdirection) {
      localStorage.setItem(
        "choiceData",
        JSON.stringify({
          directionId: selectedDirection.id,
          directionName: selectedDirection.name,
          subdirectionId: selectedSubdirection.id,
          subdirectionName: selectedSubdirection.name,
        })
      );
    } else {
      localStorage.removeItem("choiceData");
    }

    navigate("/test");
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <div className="flex-1 relative flex justify-center items-center overflow-hidden px-4 sm:px-0">
        <div className="absolute bottom-0 left-0 w-full z-0">
          <Wave />
        </div>

        <div className="w-full sm:w-240 flex flex-col justify-center items-center relative z-10">
          <div className="w-full inline-block p-0.5 rounded-[10px] bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">
            <LoginCardHeader percent={75} stage={3} />

            <div className="bg-background rounded-b-[10px] p-4 sm:p-6">
              <div className="mb-4 sm:mb-6 text-center sm:text-left">
                <p className="text-white font-semibold text-[22px] sm:text-[25px]">
                  {selectedDirection
                    ? "Alt istiqaməti seçin (məcburi deyil)"
                    : "İstiqaməti seçin (məcburi deyil)"}
                </p>
                <p className="text-[#A2A8B2] text-[16px] sm:text-[18px] font-medium mt-1">
                  {selectedDirection
                    ? `${selectedDirection.name} üzrə alt istiqamətlər`
                    : "Seçdiyiniz istiqamətə uyğun alt istiqamətlər"}
                </p>
              </div>

              {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}

              {loadingDirections && !selectedDirection && (
                <div className="text-white">İstiqamətlər yüklənir...</div>
              )}

              {loadingSub && selectedDirection && (
                <div className="text-white">Alt istiqamətlər yüklənir...</div>
              )}

              <div
                className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 transition-all duration-200 ${
                  isTransitioning
                    ? "opacity-0 translate-y-2"
                    : "opacity-100 translate-y-0"
                }`}
              >
                {cardsToShow
                  .filter((item) => !isPlaceholderString(item))
                  .map((item) => {
                    const isSelected =
                      selectedDirection && !selectedSubdirection
                        ? selectedDirection.id === item.id
                        : selectedSubdirection?.id === item.id;

                    return (
                      <div
                        key={item.id}
                        className={`rounded-[10px] p-3 sm:p-4 flex items-center gap-3 cursor-pointer border-2 transition-colors
                        ${
                          isSelected
                            ? "bg-[#2F4A73] border-[#2F4A73]"
                            : "bg-background border-[#2F4A73]"
                        }
                        hover:bg-[#2F4A73]`}
                        onClick={() =>
                          selectedDirection
                            ? handleSelectSubdirection(item)
                            : handleSelectDirection(item)
                        }
                      >
                        <span className="text-white font-medium text-[16px] sm:text-[18px]">
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
              </div>

              {selectedSubdirection?.description && (
                <div className="mt-4 p-3 rounded-xl bg-[#132746] text-[#A2A8B2] text-sm">
                  {selectedSubdirection.description}
                </div>
              )}

              <div className="flex flex-row gap-2 w-full mt-6">
                <PrevButton
                  to={selectedDirection ? "#" : "/skills"}
                  onClick={handleBack}
                />

                <div className="flex-1">
                  <button
                    onClick={handleStartTest}
                    className="w-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-[15px] h-12.5 text-[20px] cursor-pointer animated-gradient"
                  >
                    {selectedSubdirection ? "Testə başla" : "Seçmədən testə başla"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChoiceSelection;