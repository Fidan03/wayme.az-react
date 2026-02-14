import Header from "../../layout/header";
import Wave from "../../components/Wave/index";
import NextButton from "../../components/NextButton/index";
import LoginCardHeader from "../../components/LoginCardHeader";
import PrevButton from "../../components/PrevButton";
import DirectionsData from "../../data/directionsData";

const ChoiceSelection = () => {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 relative flex justify-center items-center overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full z-0">
          <Wave />
        </div>

        <div className="w-240 flex flex-col justify-center items-center relative z-10">
          <div className="w-full inline-block p-0.5 rounded-[10px] bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">

            <div>
              <LoginCardHeader percent={75} stage={3} />
            </div>

            <div className="bg-background rounded-b-[10px] p-6">
              <div className="mb">
                <p className="text-white font-semibold text-[25px]">
                  İstiqaməti seçin (məcburi deyil)
                </p>
                <p className="text-[#A2A8B2] text-[18px] font-medium mt-1">
                  Sizi maraqlandıran iş istiqamətini seçə bilərsiniz vəya keçə bilərsiniz
                </p>
              </div>

              <div className="cards grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {DirectionsData.map((item) => (
                  <div
                    key={item.id}
                    className="border-[2px] border-[#2F4A73] rounded-[10px] p-4 flex items-center gap-4 cursor-pointer hover:bg-[#2F4A73] transition"
                  >
                    <img src={item.icon} alt={item.title} className="w-10 h-10" />
                    <span className="text-white font-medium">{item.title}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 w-full mt-6">
                <PrevButton to="/skills" />
                <div className="flex-1">
                  <NextButton to="" />
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
