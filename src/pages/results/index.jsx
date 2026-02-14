import Header from "../../layout/header";
import Wave from "../../components/Wave/index";
import NextButton from "../../components/NextButton/index";
import PrevButton from "../../components/PrevButton";
import medal from '../../assets/medal.png'
import ResultCard from '../../components/resultCard'
import SuitabilityCard from '../../components/suitabilityCard'
import AdviceCard from "../../components/adviceCard";

const Results = () => {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 relative flex justify-center items-center overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full z-0">
          <Wave />
        </div>

        <div className="w-240 flex flex-col justify-center items-center relative z-10">
          <div className="w-full inline-block p-0.5 rounded-[10px] bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">
            <div className="bg-background rounded-b-[10px] p-6">
              <div className="mb">
                <div className="flex gap-2 items-center">
                    <img src={medal} alt="medal" className="w-[30px] h-[30px]"/>
                    <p className="text-white font-semibold text-[25px]">Nəticələriniz</p>
                </div>
                <p className="text-[#A2A8B2] text-[18px] font-medium mt-1">
                  Sizin üçün ən uyğun karyera istiqamətləri
                </p>
              </div>

              <div className="flex flex-col gap-4 mt-4">
                <div>
                    <ResultCard />
                </div>
                <div>
                    <SuitabilityCard />
                </div>
                <div>
                    <AdviceCard />
                </div>
              </div>

              <div className="flex gap-2 w-full mt-6">
                <PrevButton to="/skills" />
                <div className="flex-1">
                  <NextButton to="/test" />
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
