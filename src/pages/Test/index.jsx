import { useEffect, useState } from "react";
import Wave from "../../components/wave/index";
import NextButton from "../../components/NextButton/index";
import LoginCardHeader from "../../components/LoginCardHeader";
import PrevButton from "../../components/PrevButton";

const QUESTIONS_PER_PAGE = 5;

const Test = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [showError, setShowError] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "/api/WayMe/tests?page=0&size=30"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch questions");
        }

        const data = await res.json();

        // Transform API data to UI format
        const formatted = data.content.map((item) => ({
          id: item.id,
          text: item.question,
          options: item.options.map((opt) => opt.optionAnswer),
        }));

        setQuestions(formatted);
      } catch (err) {
        console.error(err);
        setError("Suallar yüklənərkən xəta baş verdi");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);


  const totalPages = Math.ceil(
    questions.length / QUESTIONS_PER_PAGE
  );

  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const endIndex = Math.min(
    startIndex + QUESTIONS_PER_PAGE,
    questions.length
  );

  const currentQuestions = questions.slice(
    startIndex,
    endIndex
  );


  const handleSelect = (questionId, optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));

    setShowError((prev) =>
      prev.filter((id) => id !== questionId)
    );
  };

  const handleNext = () => {
    const unanswered = currentQuestions
      .filter(
        (q) => selectedAnswers[q.id] === undefined
      )
      .map((q) => q.id);

    if (unanswered.length > 0) {
      setShowError(unanswered);
      return;
    }

    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleFinish = () => {
    const unanswered = currentQuestions
      .filter(
        (q) => selectedAnswers[q.id] === undefined
      )
      .map((q) => q.id);

    if (unanswered.length > 0) {
      setShowError(unanswered);
      return;
    }

    setLoadingResults(true);

    localStorage.setItem(
      "testAnswers",
      JSON.stringify(selectedAnswers)
    );

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
      <div className="flex-1 relative flex justify-center items-center overflow-hidden px-3 sm:px-6">

        <div className="absolute bottom-0 left-0 w-full z-0">
          <Wave />
        </div>

        <div className="w-full max-w-[960px] flex flex-col relative z-10">

          <div className="w-full inline-block p-0.5 rounded-[10px] bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">

            <LoginCardHeader
              percent={Math.round(
                ((currentPage + 1) / totalPages) * 100
              )}
              stage={4}
            />

            <div className="bg-background rounded-b-[10px] p-4 sm:p-6">

              {/* Header */}
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

              {/* Questions */}
              <div className="flex flex-col gap-4 sm:gap-6">

                {currentQuestions.map((q) => (
                  <div
                    key={q.id}
                    className={`bg-[#2F4A73] border rounded-2xl p-4 sm:p-5
                    ${
                      showError.includes(q.id)
                        ? "border-red-500"
                        : "border-[#2F4A73]"
                    }`}
                  >

                    <p className="text-white text-[16px] sm:text-[22px] font-semibold mb-4">
                      {q.text}
                    </p>

                    <ul className="flex flex-col gap-3">

                      {q.options.map((option, index) => {
                        const isSelected =
                          selectedAnswers[q.id] === index;

                        return (
                          <li
                            key={index}
                            onClick={() =>
                              handleSelect(q.id, index)
                            }
                            className={`flex gap-3 p-3 rounded-xl cursor-pointer transition text-sm sm:text-base
                            ${
                              isSelected
                                ? "bg-[#3379FB] text-white"
                                : "bg-[#132746] text-white hover:bg-[#1E3A60]"
                            }`}
                          >

                            <span
                              className={`w-5 h-5 border-2 rounded-full shrink-0 flex justify-center items-center
                              ${
                                isSelected
                                  ? "bg-white border-[#3379FB]"
                                  : "border-white"
                              }`}
                            >
                              {isSelected && (
                                <span className="w-2 h-2 bg-[#3379FB] rounded-full" />
                              )}
                            </span>

                            {option}

                          </li>
                        );
                      })}

                    </ul>

                  </div>
                ))}

              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">

                <PrevButton
                  to={
                    currentPage === 0
                      ? "/choiceSelection"
                      : "#"
                  }
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.max(prev - 1, 0)
                    )
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