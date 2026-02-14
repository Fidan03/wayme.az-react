import { useState, useEffect } from "react";
import Header from "../../layout/header";
import Wave from "../../components/wave/index";
import NextButton from "../../components/nextButton/index";
import LoginCardHeader from "../../components/LoginCardHeader";
import { Input } from "antd";
import Button from "../../components/Button";
import ChoicesCard from "../../components/ChoicesCard";
import PrevButton from "../../components/PrevButton";

const Skills = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [customSkill, setCustomSkill] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("skillsData") || "[]");
    setSelectedSkills(saved);
  }, []);

  const addSkill = (skill) => {
    if (selectedSkills.length >= 10) {
      alert("Maksimum 10 bacarıq əlavə edə bilərsiniz");
      return;
    }
    if (!selectedSkills.includes(skill)) {
      const newSkills = [...selectedSkills, skill];
      setSelectedSkills(newSkills);
      localStorage.setItem("skillsData", JSON.stringify(newSkills));
    }
  };

  const addCustomSkill = () => {
    if (selectedSkills.length >= 10) {
      alert("Maksimum 10 bacarıq əlavə edə bilərsiniz");
      return;
    }
    const skill = customSkill.trim();
    if (skill && !selectedSkills.includes(skill)) {
      const newSkills = [...selectedSkills, skill];
      setSelectedSkills(newSkills);
      setCustomSkill("");
      localStorage.setItem("skillsData", JSON.stringify(newSkills));
    }
  };

  const removeSkill = (skill) => {
    const newSkills = selectedSkills.filter((s) => s !== skill);
    setSelectedSkills(newSkills);
    localStorage.setItem("skillsData", JSON.stringify(newSkills));
  };

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
              <LoginCardHeader percent={50} stage={2} />
            </div>

            <div className="bg-background rounded-b-[10px] p-6">
              <div className="flex flex-col w-full">
                <div className="mb-6">
                  <p className="text-white font-semibold text-[25px]">Bacarıqlarınız</p>
                  <p className="text-[#A2A8B2] text-[18px] font-medium mt-1">
                    Hansı bacarıqlara sahibsiniz? (Minimum 3 bacarıq)
                  </p>
                </div>

                <div>
                  <p className="text-[#A2A8B2] text-[20px] font-medium mt-1">Öz bacarıqlarınızı əlavə edin</p>

                  <div className="flex gap-2 mt-3">
                    <Input
                      placeholder="Məsələn: Figma"
                      value={customSkill}
                      onChange={(e) => setCustomSkill(e.target.value)}
                      onPressEnter={addCustomSkill}
                    />
                    <Button onClick={addCustomSkill} />
                  </div>

                  {selectedSkills.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-4 justify-start">
                      {selectedSkills.map((skill, index) => (
                        <div
                          key={index}
                          className="border-[#2F4A73] border-2 text-[#A2A8B2] px-5 py-3 rounded-[7px] text-[16px] cursor-pointer flex items-center gap-2 hover:bg-[#2F4A73] hover:text-white transition"
                          onClick={() => removeSkill(skill)}
                        >
                          {skill} <span className="text-white font-bold">×</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="text-[#A2A8B2] text-[20px] font-medium mt-5">
                    <p>Asan seçimlər</p>
                    <ChoicesCard onSelect={addSkill} selectedSkills={selectedSkills} />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 w-full mt-6">
                <PrevButton to="/login" />
                <div className="flex-1">
                  <NextButton to="/choiceSelection" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
