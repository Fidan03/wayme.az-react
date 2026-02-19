import Wave from "../../components/wave/index";
import NextButton from "../../components/NextButton/index";
import medal from '../../assets/medal.png';
import ResultCard from '../../components/resultCard';
import SuitabilityCard from '../../components/suitabilityCard';
import AdviceCard from "../../components/adviceCard";
import SuggestionCard from "../../components/suggestionCard";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    // Clear all saved data
    localStorage.removeItem("loginData");
    localStorage.removeItem("skillsData");
    localStorage.removeItem("choiceData");
    localStorage.removeItem("answersData");
    navigate("/");
  };

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
                  <img src={medal} alt="medal" className="w-6 h-6 sm:w-7.5 sm:h-7.5"/>
                  <p className="text-white font-semibold text-[20px] sm:text-[25px] mt-2 sm:mt-0">
                    Nəticələriniz
                  </p>
                </div>
                <p className="text-[#A2A8B2] text-[14px] sm:text-[18px] font-medium mt-1">
                  Sizin üçün ən uyğun karyera istiqamətləri
                </p>
              </div>

              {/* Result Cards */}
              <div className="flex flex-col gap-3 sm:gap-4 mt-3 sm:mt-4">
                <ResultCard />
                <SuggestionCard/>
                <SuitabilityCard />
                <AdviceCard />
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full mt-6">
                <div className="flex-1">
                  <NextButton to="/pdf" label="PDF hesabat almaq"/>
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
