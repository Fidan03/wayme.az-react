import { useEffect, useMemo, useRef, useState } from "react";
import Wave from "../../components/wave/index";
import NextButton from "../../components/NextButton/index";
import LoginCardHeader from "../../components/LoginCardHeader";
import PrevButton from "../../components/PrevButton";

const QUESTIONS_PER_PAGE = 5;

async function fetchTestsPage(page, size = 50) {
  const res = await fetch(`/api/WayMe/tests?page=${page}&size=${size}`);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed ${res.status}: ${text}`);
  }
  return res.json();
}

async function fetchAllTests(size = 50) {
  const first = await fetchTestsPage(0, size);

  const totalPages = Number(first.totalPages ?? 1);
  const all = [...(first.content ?? [])];

  for (let p = 1; p < totalPages; p++) {
    const data = await fetchTestsPage(p, size);
    all.push(...(data.content ?? []));
  }

  all.sort((a, b) => (a.orderNo ?? 0) - (b.orderNo ?? 0));
  return all;
}

const Test = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [showError, setShowError] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Optional: scroll to this element (more reliable than window.scrollTo in some layouts)
  const topRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        setLoading(true);
        setError(null);

        const items = await fetchAllTests(50);

        const formatted = items.map((item) => ({
          id: item.id,
          text: item.question,
          options: (item.options ?? [])
            .slice()
            .sort((a, b) => (a.orderNo ?? 0) - (b.orderNo ?? 0))
            .map((opt) => ({
              id: opt.id, // ✅ REAL optionId from API
              text: opt.optionAnswer,
            })),
        }));

        if (!cancelled) {
          setQuestions(formatted);
          setCurrentPage(0);

          // ✅ when tests first load, also jump to top
          requestAnimationFrame(() => {
            topRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
          });
        }
      } catch (e) {
        console.error("Failed to fetch tests:", e);
        if (!cancelled) setError("Suallar yüklənərkən xəta baş verdi");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(questions.length / QUESTIONS_PER_PAGE));
  }, [questions.length]);

  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const endIndex = Math.min(startIndex + QUESTIONS_PER_PAGE, questions.length);
  const currentQuestions = questions.slice(startIndex, endIndex);

  // ✅ KEY FIX: whenever page changes, scroll back to the beginning
  useEffect(() => {
    // run after DOM paints the new page
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [currentPage]);

  const handleSelect = (questionId, optionId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));

    setShowError((prev) => prev.filter((id) => id !== questionId));
  };

  const validateCurrentPage = () => {
    const unanswered = currentQuestions
      .filter((q) => selectedAnswers[q.id] === undefined)
      .map((q) => q.id);

    if (unanswered.length > 0) {
      setShowError(unanswered);

      // ✅ also scroll to top so user immediately sees errors (optional but nice)
      requestAnimationFrame(() => {
        topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });

      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentPage()) return;
    if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
  };

  const handleFinish = () => {
    if (!validateCurrentPage()) return;

    setLoadingResults(true);
    localStorage.setItem("testAnswers", JSON.stringify(selectedAnswers));

    setTimeout(() => {
      setLoadingResults(false);
      window.location.href = "/results";
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white text-xl">
        Suallar yüklənir...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen flex flex-col">
      {/* ✅ scroll anchor */}
      <div ref={topRef} />

      <div className="flex-1 relative flex justify-center items-center overflow-hidden px-3 sm:px-6">
        <div className="absolute bottom-0 left-0 w-full z-0">
          <Wave />
        </div>

        <div className="w-full max-w-[960px] flex flex-col relative z-10">
          <div className="w-full inline-block p-0.5 rounded-[10px] bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">
            <LoginCardHeader
              percent={Math.round(((currentPage + 1) / totalPages) * 100)}
              stage={4}
            />

            <div className="bg-background rounded-b-[10px] p-4 sm:p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <p className="text-white font-semibold text-[18px] sm:text-[25px]">
                    Karyera Testi ({questions.length} sual)
                  </p>

                  <p className="text-[#A2A8B2] text-[14px] sm:text-[18px]">
                    {currentPage + 1}/{totalPages}
                  </p>
                </div>

                <p className="text-[#A2A8B2] text-[14px] sm:text-[18px] mt-1">
                  Hər suala ən uyğun cavabı seçin
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:gap-6">
                {currentQuestions.map((q) => (
                  <div
                    key={q.id}
                    className={`bg-[#2F4A73] border rounded-2xl p-4 sm:p-5 ${
                      showError.includes(q.id)
                        ? "border-red-500"
                        : "border-[#2F4A73]"
                    }`}
                  >
                    <p className="text-white text-[16px] sm:text-[22px] font-semibold mb-4">
                      {q.text}
                    </p>

                    <ul className="flex flex-col gap-3">
                      {q.options.map((option) => {
                        const isSelected = selectedAnswers[q.id] === option.id;

                        return (
                          <li
                            key={option.id}
                            onClick={() => handleSelect(q.id, option.id)}
                            className={`flex gap-3 p-3 rounded-xl cursor-pointer transition text-sm sm:text-base ${
                              isSelected
                                ? "bg-[#3379FB] text-white"
                                : "bg-[#132746] text-white hover:bg-[#1E3A60]"
                            }`}
                          >
                            <span
                              className={`w-5 h-5 border-2 rounded-full shrink-0 flex justify-center items-center ${
                                isSelected
                                  ? "bg-white border-[#3379FB]"
                                  : "border-white"
                              }`}
                            >
                              {isSelected && (
                                <span className="w-2 h-2 bg-[#3379FB] rounded-full" />
                              )}
                            </span>

                            {option.text}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <PrevButton
                  to={currentPage === 0 ? "/choiceSelection" : "#"}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 0))
                  }
                />

                <div className="flex-1">
                  {currentPage < totalPages - 1 ? (
                    <NextButton
                      onClick={handleNext}
                      label={`Növbəti (${startIndex + 1}-${endIndex})`}
                    />
                  ) : (
                    <NextButton
                      onClick={handleFinish}
                      label={
                        loadingResults
                          ? "Yüklənir..."
                          : `Nəticəyə bax (${startIndex + 1}-${endIndex})`
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;