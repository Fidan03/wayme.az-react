import { useState } from "react";
import Wave from "../../components/wave/index";
import NextButton from "../../components/NextButton/index";
import LoginCardHeader from "../../components/LoginCardHeader";
import PrevButton from "../../components/PrevButton";
import DirectionsData from "../../data/directionsData";

const ChoiceSelection = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const cardsToShow = selectedCard ? selectedCard.directions : DirectionsData;

  const handleSelect = (item) => {
    if (selectedCard) return;

    setIsTransitioning(true);

    setTimeout(() => {
      setSelectedCard(item);
      setIsTransitioning(false);
    }, 200);
  };

  const handleBack = (e) => {
    if (!selectedCard) return;

    e.preventDefault();
    setIsTransitioning(true);

    setTimeout(() => {
      setSelectedCard(null);
      setIsTransitioning(false);
    }, 200);
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">

      <div className="flex-1 relative flex justify-center items-center overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full z-0">
          <Wave />
        </div>

        <div className="w-240 flex flex-col justify-center items-center relative z-10">
          <div className="w-full inline-block p-0.5 rounded-[10px] bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">
            <LoginCardHeader percent={75} stage={3} />

            <div className="bg-background rounded-b-[10px] p-6">
              <div className="mb">
                <p className="text-white font-semibold text-[25px]">
                  İstiqaməti seçin (məcburi deyil)
                </p>

                <p className="text-[#A2A8B2] text-[18px] font-medium mt-1">
                  Seçdiyiniz istiqamətə uyğun alt istiqamətlər
                </p>
              </div>

              <div
                className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 transition-all duration-200 ${
                  isTransitioning
                    ? "opacity-0 translate-y-2"
                    : "opacity-100 translate-y-0"
                }`}
              >
                {cardsToShow.map((item) => {
                  const icon = selectedCard
                    ? selectedCard.icon
                    : item.icon;

                  return (
                    <div
                      key={item.id}
                      className="rounded-[10px] p-4 flex items-center gap-4 cursor-pointer bg-background border-[#2F4A73] border-2 hover:bg-[#2F4A73] transition"
                      onClick={() => handleSelect(item)}
                    >
                      {icon && (
                        <img
                          src={icon}
                          alt={item.title}
                          className="w-10 h-10"
                        />
                      )}

                      <span className="text-white font-medium">
                        {item.title}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-2 w-full mt-6">
                <PrevButton
                  to={selectedCard ? "#" : "/skills"}
                  onClick={handleBack}
                />

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

export default ChoiceSelection;