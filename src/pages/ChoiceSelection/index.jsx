import { useState } from "react";
import Header from "../../layout/header";
import Wave from "../../components/Wave/index";
import NextButton from "../../components/NextButton/index";
import LoginCardHeader from "../../components/LoginCardHeader";
import PrevButton from "../../components/PrevButton";
import DirectionsData from "../../data/directionsData";

const ChoiceSelection = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const cardsToShow = selectedCard ? selectedCard.directions : DirectionsData;

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
                  {selectedCard ? "Alt İstiqamətlər" : "İstiqaməti seçin (məcburi deyil)"}
                </p>
                <p className="text-[#A2A8B2] text-[18px] font-medium mt-1">
                  {selectedCard
                    ? "Seçdiyiniz istiqamətə uyğun alt istiqamətlər"
                    : "Sizi maraqlandıran iş istiqamətini seçə bilərsiniz vəya keçə bilərsiniz"}
                </p>
              </div>

              {selectedCard && (
                <button
                  onClick={() => setSelectedCard(null)}
                  className="mb-4 px-4 py-2 bg-[#2F4A73] text-white rounded-lg hover:bg-[#3E5B8F] transition"
                >
                  Geri
                </button>
              )}

              <div className="cards grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {cardsToShow.map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-[10px] p-4 flex items-center gap-4 cursor-pointer hover:bg-[#2F4A73] transition  border-[#2F4A73] border-2
                      ${selectedCard && !item.icon ? "bg-[#2F4A73] justify-center" : "bg-background"}`}
                    onClick={() => {
                      if (!selectedCard) setSelectedCard(item);
                    }}
                  >
                    {item.icon && <img src={item.icon} alt={item.title} className="w-10 h-10" />}
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
