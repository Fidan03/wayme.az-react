import { useState } from "react";
import Wave from "../../components/wave/index";
import LoginCardHeader from "../../components/LoginCardHeader";
import PrevButton from "../../components/PrevButton";
import DirectionsData from "../../data/directionsData";
import { useNavigate } from "react-router-dom";



const ChoiceSelection = () => {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const cardsToShow = selectedCard ? selectedCard.directions : DirectionsData;

  const handleSelect = (item, isSub = false) => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    setTimeout(() => {
      if (isSub) {
        setSelectedSub(item); // subdirection selected only when clicked
      } else {
        setSelectedCard(item);
        setSelectedSub(null); // reset subdirection selection when choosing a new direction
      }
      setIsTransitioning(false);
    }, 200);
  };

  const handleBack = (e) => {
    if (!selectedCard) return;

    e.preventDefault();
    setIsTransitioning(true);

    setTimeout(() => {
      setSelectedCard(null);
      setSelectedSub(null); // clear subselection when going back
      setIsTransitioning(false);
    }, 200);
  };

  const handleStartTest = () => {
    // Save choice only if user selected something
    if (selectedSub) {
      localStorage.setItem("choiceData", JSON.stringify(selectedSub));
    } else if (selectedCard) {
      localStorage.setItem("choiceData", JSON.stringify(selectedCard));
    }
    navigate("/test");
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
                  // Only highlight if user clicked it
                  const isSelected = selectedSub && selectedSub.id === item.id;

                  return (
                    <div
                      key={item.id}
                      className={`rounded-[10px] p-4 flex items-center gap-4 cursor-pointer border-2 transition
                        ${isSelected ? "bg-[#2F4A73] border-[#2F4A73]" : "bg-background border-[#2F4A73]"}
                        hover:bg-[#2F4A73]`}
                      onClick={() =>
                        selectedCard
                          ? handleSelect(item, true)
                          : handleSelect(item)
                      }
                    >
                      {item.icon && (
                        <img src={item.icon} alt={item.title} className="w-10 h-10" />
                      )}
                      <span className="text-white font-medium">{item.title}</span>
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
                  <button
                    onClick={handleStartTest}
                    className="w-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-[15px] h-[50px] text-[20px] cursor-pointer animated-gradient"
                  >
                    {selectedCard ? "Testə başla" : "Seçmədən testə başla"}
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
