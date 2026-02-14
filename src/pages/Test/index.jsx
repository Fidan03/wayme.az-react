import { useState } from "react";
import Header from "../../layout/header";
import Wave from "../../components/Wave/index";
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
  }
];

const Test = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleSelect = (questionId, optionIndex) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const isAllAnswered = Object.keys(selectedAnswers).length === questions.length;

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 relative flex justify-center items-center overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full z-0">
          <Wave />
        </div>

        <div className="w-240 flex flex-col justify-center items-center relative z-10">
          <div className="w-full inline-block p-0.5 rounded-[10px] bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">

            <LoginCardHeader percent={100} stage={4} />

            <div className="bg-background rounded-b-[10px] p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <p className="text-white font-semibold text-[25px]">Karyera Testi (30 sual)</p>
                  <p className="text-[#A2A8B2] text-[18px] font-medium mt-1">Sual 1-5</p>
                </div>
                <p className="text-[#A2A8B2] text-[18px] font-medium mt-1">
                  Hər suala ən uyğun cavabı seçin
                </p>
              </div>

              <div className="w-full mt-4 flex flex-col gap-6">
                {questions.map((q) => (
                  <div key={q.id} className="bg-[#2F4A73] border border-[#2F4A73] rounded-2xl p-5">
                    <p className="text-white text-[22px] font-semibold mb-4">{q.text}</p>
                    <ul className="flex flex-col gap-3">
                      {q.options.map((option, index) => {
                        const isSelected = selectedAnswers[q.id] === index;
                        return (
                          <li
                            key={index}
                            onClick={() => handleSelect(q.id, index)}
                            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition
                              ${isSelected ? "bg-[#3379FB] text-white" : "bg-[#132746] text-white hover:bg-[#1E3A60]"}`}
                          >
                            <span
                              className={`w-5 h-5 border-2 rounded-full flex-shrink-0 flex justify-center items-center
                                ${isSelected ? "bg-white border-[#3379FB]" : "border-white"}`}
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
                <PrevButton to="/choiceSelection" />
                <div className="flex-1">
                  <NextButton
                    to={isAllAnswered ? "/next-page" : ""}
                    onClick={() => {
                      if (!isAllAnswered) alert("Hər suala cavab verin!");
                    }}
                  />
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
