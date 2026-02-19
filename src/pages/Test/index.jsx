import { useState } from "react";
import Wave from "../../components/wave/index";
import NextButton from "../../components/NextButton/index";
import LoginCardHeader from "../../components/LoginCardHeader";
import PrevButton from "../../components/PrevButton";



const questions = [
  {
    id: 1,
    text: "Boş vaxtınızda ən çox nə etməyi sevirsiniz?",
    options: [
      "Komputerdə proqramlar yazmaq və ya öyrənmək",
      "Yaradıcı işlərlə məşğul olmaq (dizayn, çəkilişlər)",
      "İnsanlarla ünsiyyət qurmaq və şəbəkə yaratmaq",
      "Kitab oxumaq və yeni bilik əldə etmək",
    ],
  },
  {
    id: 2,
    text: "Ən çox hansı növ işlər sizi motivasiya edir?",
    options: [
      "Texniki problemləri həll etmək",
      "Dizayn və kreativ layihələr",
      "İnsanlara kömək etmək",
      "Məlumatları analiz etmək",
    ],
  },
  // Add all 30 questions here
];

const QUESTIONS_PER_PAGE = 5;

const Test = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [showError, setShowError] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);

  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const endIndex = startIndex + QUESTIONS_PER_PAGE;
  const currentQuestions = questions.slice(startIndex, endIndex);

  const handleSelect = (questionId, optionIndex) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setShowError((prev) => prev.filter((id) => id !== questionId));
  };

  const handleNext = () => {
    const unanswered = currentQuestions
      .filter((q) => selectedAnswers[q.id] === undefined)
      .map((q) => q.id);

    if (unanswered.length > 0) {
      setShowError(unanswered);
      return;
    }

    if (currentPage < Math.ceil(questions.length / QUESTIONS_PER_PAGE) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFinish = () => {
    const unanswered = currentQuestions
      .filter((q) => selectedAnswers[q.id] === undefined)
      .map((q) => q.id);

    if (unanswered.length > 0) {
      setShowError(unanswered);
      return;
    }

    setLoadingResults(true);

    // Save answers and simulate AI processing
    localStorage.setItem("testAnswers", JSON.stringify(selectedAnswers));

    setTimeout(() => {
      setLoadingResults(false);
      window.location.href = "/results";
    }, 2000); // simulate AI results loading
  };

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <div className="flex-1 relative flex justify-center items-center overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full z-0">
          <Wave />
        </div>

        <div className="w-240 flex flex-col justify-center items-center relative z-10">
          <div className="w-full inline-block p-0.5 rounded-[10px] bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">
            <LoginCardHeader
              percent={Math.round(((currentPage + 1) / totalPages) * 100)}
              stage={4}
            />

            <div className="bg-background rounded-b-[10px] p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <p className="text-white font-semibold text-[25px]">
                    Karyera Testi (30 sual)
                  </p>
                  <p className="text-[#A2A8B2] text-[18px] font-medium mt-1">
                    Sual {startIndex + 1}-{Math.min(endIndex, questions.length)}
                  </p>
                </div>
                <p className="text-[#A2A8B2] text-[18px] font-medium mt-1">
                  Hər suala ən uyğun cavabı seçin
                </p>
              </div>

              <div className="w-full mt-4 flex flex-col gap-6">
                {currentQuestions.map((q) => (
                  <div
                    key={q.id}
                    className={`bg-[#2F4A73] border border-[#2F4A73] rounded-2xl p-5 ${
                      showError.includes(q.id) ? "border-red-500" : ""
                    }`}
                  >
                    <p className="text-white text-[22px] font-semibold mb-4">{q.text}</p>
                    <ul className="flex flex-col gap-3">
                      {q.options.map((option, index) => {
                        const isSelected = selectedAnswers[q.id] === index;
                        return (
                          <li
                            key={index}
                            onClick={() => handleSelect(q.id, index)}
                            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition
                              ${
                                isSelected
                                  ? "bg-[#3379FB] text-white"
                                  : "bg-[#132746] text-white hover:bg-[#1E3A60]"
                              }`}
                          >
                            <span
                              className={`w-5 h-5 border-2 rounded-full flex-shrink-0 flex justify-center items-center
                                ${
                                  isSelected ? "bg-white border-[#3379FB]" : "border-white"
                                }`}
                            >
                              {isSelected && <span className="w-2 h-2 bg-[#3379FB] rounded-full" />}
                            </span>
                            {option}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 w-full mt-6">
                <PrevButton
                  to={currentPage === 0 ? "/choiceSelection" : "#"}
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 0))}
                />
                <div className="flex-1">
                  {currentPage < totalPages - 1 ? (
                    <NextButton onClick={handleNext} label="Növbəti" />
                  ) : (
                    <NextButton
                      onClick={handleFinish}
                      label={loadingResults ? "Yüklənir..." : "Nəticəyə bax"}
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
