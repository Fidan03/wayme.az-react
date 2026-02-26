import { useEffect, useState } from "react";
import Wave from "../../components/wave/index";
import NextButton from "../../components/NextButton/index";
import medal from "../../assets/medal.png";
import ResultCard from "../../components/resultCard";
import SuitabilityCard from "../../components/suitabilityCard";
import AdviceCard from "../../components/adviceCard";
import SuggestionCard from "../../components/suggestionCard";
import { useNavigate } from "react-router-dom";
import { WayMeAPI } from "../../api/waymeApi";

const Results = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [apiResponse, setApiResponse] = useState(null);

  const handleGoHome = () => {
    localStorage.removeItem("loginData");
    localStorage.removeItem("skillsData");
    localStorage.removeItem("choiceData");
    localStorage.removeItem("answersData");
    localStorage.removeItem("testAnswers");
    localStorage.removeItem("sessionId");
    navigate("/");
  };

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setApiError("");

        // 1) Start session (or reuse if you already stored it)
        let sessionId = localStorage.getItem("sessionId");
        if (!sessionId) {
          const started = await WayMeAPI.startSession();
          sessionId = String(started.sessionId);
          localStorage.setItem("sessionId", sessionId);
        }

        // 2) Read data from localStorage
        // adjust these keys to match your app
        const personal = JSON.parse(localStorage.getItem("loginData") || "{}");
        const abilitiesArr = JSON.parse(localStorage.getItem("skillsData") || "[]");
        const choice = JSON.parse(localStorage.getItem("choiceData") || "{}");
        const answersStored = JSON.parse(
          localStorage.getItem("answersData") ||
            localStorage.getItem("testAnswers") ||
            "[]"
        );

        // Validate minimum required
        if (!personal?.name || !personal?.surname) {
          throw new Error("Personal məlumatlar tapılmadı (name/surname).");
        }
        if (!Array.isArray(abilitiesArr) || abilitiesArr.length === 0) {
          throw new Error("Bacarıqlar seçilməyib (skillsData boşdur).");
        }
        if (!choice?.subdirectionId) {
          throw new Error("İstiqamət seçilməyib (choiceData.subdirectionId yoxdur).");
        }

        // answers must be [{testId, optionId}, ...]
        let answers = answersStored;
        if (!Array.isArray(answersStored)) {
          // fallback if object: { [testId]: optionId }
          answers = Object.entries(answersStored).map(([testId, optionId]) => ({
            testId: Number(testId),
            optionId: Number(optionId),
          }));
        }
        if (!answers.length) {
          throw new Error("Cavablar tapılmadı.");
        }

        // 3) Call APIs in correct order to move step forward
        await WayMeAPI.personalInfo(sessionId, {
          name: personal.name,
          surname: personal.surname,
          phone: personal.phone || "",
          email: personal.email || "",
          birthDate: personal.birthDate || "2000-01-01",
        });

        await WayMeAPI.abilities(sessionId, abilitiesArr);

        await WayMeAPI.direction(sessionId, choice.subdirectionId);

        // 4) Submit answers
        const bulkRes = await WayMeAPI.answersBulk(sessionId, answers);

        // ✅ This is what we can display right now (API response)
        setApiResponse(bulkRes);
      } catch (e) {
        console.error(e);
        setApiError(e.message || "Xəta baş verdi");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white text-xl">
        Nəticələr yüklənir...
      </div>
    );
  }

  if (apiError) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 px-6">
        <p className="text-red-500 text-center">{apiError}</p>
        <button
          className="px-4 py-2 rounded-lg bg-white text-black"
          onClick={handleGoHome}
        >
          Əsas səhifəyə qayıt
        </button>
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
            <div className="bg-background rounded-b-[10px] p-4 sm:p-6">
              {/* Header */}
              <div className="mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <img
                    src={medal}
                    alt="medal"
                    className="w-6 h-6 sm:w-7.5 sm:h-7.5"
                  />
                  <p className="text-white font-semibold text-[20px] sm:text-[25px] mt-2 sm:mt-0">
                    Nəticələriniz
                  </p>
                </div>
                <p className="text-[#A2A8B2] text-[14px] sm:text-[18px] font-medium mt-1">
                  Sizin üçün ən uyğun karyera istiqamətləri
                </p>
              </div>

              {/* Your cards (pass results when you have actual results endpoint) */}
              <div className="flex flex-col gap-3 sm:gap-4 mt-3 sm:mt-4">
                <ResultCard data={apiResponse} />
                <SuggestionCard data={apiResponse} />
                <SuitabilityCard data={apiResponse} />
                <AdviceCard data={apiResponse} />

                {/* Debug: display API response */}
                <pre className="text-white text-xs bg-[#132746] p-3 rounded-xl overflow-auto">
                  {JSON.stringify(apiResponse, null, 2)}
                </pre>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full mt-6">
                <div className="flex-1">
                  <NextButton to="/pdf" label="PDF hesabat almaq" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;