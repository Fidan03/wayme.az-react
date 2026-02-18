import { useState, useEffect } from "react";
import Wave from "../../components/wave/index";
import LoginCardHeader from "../../components/LoginCardHeader";
import { Input, message } from "antd";
import Button from "../../components/Button";
import ChoicesCard from "../../components/ChoicesCard";
import PrevButton from "../../components/PrevButton";
import { useNavigate } from "react-router-dom";
import './main.css'

const Skills = () => {
  const navigate = useNavigate();

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [customSkill, setCustomSkill] = useState("");

  /* ---------------- Load From Storage ---------------- */

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("skillsData") || "[]"
    );

    setSelectedSkills(saved);
  }, []);

  /* ---------------- Save To Storage ---------------- */

  const saveSkills = (skills) => {
    setSelectedSkills(skills);

    localStorage.setItem(
      "skillsData",
      JSON.stringify(skills)
    );
  };

  /* ---------------- Add Skill ---------------- */

  const addSkill = (skill) => {
    if (selectedSkills.length >= 10) {
      message.warning(
        "Maksimum 10 bacarıq əlavə edə bilərsiniz"
      );
      return;
    }

    if (!selectedSkills.includes(skill)) {
      const newSkills = [...selectedSkills, skill];

      saveSkills(newSkills);
    }
  };

  /* ---------------- Add Custom Skill ---------------- */

  const addCustomSkill = () => {
    if (selectedSkills.length >= 10) {
      message.warning(
        "Maksimum 10 bacarıq əlavə edə bilərsiniz"
      );
      return;
    }

    const skill = customSkill.trim();

    if (!skill) return;

    if (!selectedSkills.includes(skill)) {
      const newSkills = [...selectedSkills, skill];

      saveSkills(newSkills);

      setCustomSkill("");
    }
  };

  /* ---------------- Remove Skill ---------------- */

  const removeSkill = (skill) => {
    const newSkills = selectedSkills.filter(
      (s) => s !== skill
    );

    saveSkills(newSkills);
  };

  /* ---------------- Next Validation ---------------- */

  const handleNext = () => {
    if (selectedSkills.length < 3) {
      message.error(
        "Minimum 3 bacarıq seçməlisiniz"
      );
      return;
    }

    navigate("/choiceSelection");
  };

  /* ---------------- Render ---------------- */

  return (
    <div className="bg-background min-h-screen flex flex-col">

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

                {/* Title */}

                <div className="mb-6">
                  <p className="text-white font-semibold text-[25px]">
                    Bacarıqlarınız
                  </p>

                  <p className="text-[#A2A8B2] text-[18px] font-medium mt-1">
                    Hansı bacarıqlara sahibsiniz? (Minimum 3)
                  </p>
                </div>

                {/* Custom Input */}

                <p className="text-[#A2A8B2] text-[20px] font-medium mt-1">
                  Öz bacarığınızı əlavə edin
                </p>

                <div className="flex gap-2 mt-3">

                  <div className="flex items-center bg-[#2f4a73] rounded-lg h-12 px-2 flex-1">

                    <input
                      type="text"
                      placeholder="Məsələn: Figma"
                      value={customSkill}
                      onChange={(e) => setCustomSkill(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addCustomSkill();
                        }
                      }}
                      className="
                        flex-1
                        h-full
                        bg-transparent
                        text-white
                        text-[18px]
                        border-none
                        outline-none
                        placeholder-white
                      "
                    />

                  </div>

                  <Button onClick={addCustomSkill} />

                </div>

                {/* Selected Skills */}

                {selectedSkills.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-4">

                    {selectedSkills.map((skill, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          removeSkill(skill)
                        }
                        className="
                          border-[#2F4A73] border-2
                          text-[#A2A8B2]
                          px-5 py-3
                          rounded-[7px]
                          text-[16px]
                          cursor-pointer
                          flex items-center gap-2
                          hover:bg-[#2F4A73]
                          hover:text-white
                          transition
                        "
                      >
                        {skill}
                        <span className="font-bold">
                          ×
                        </span>
                      </div>
                    ))}

                  </div>
                )}

                {/* Choices */}

                <div className="text-[#A2A8B2] text-[20px] font-medium mt-5">

                  <p>Asan seçimlər</p>

                  <ChoicesCard
                    onSelect={addSkill}
                    selectedSkills={selectedSkills}
                  />

                </div>

              </div>

              {/* Navigation */}

              <div className="flex gap-2 w-full mt-6">

                <PrevButton to="/login" />

                <div className="flex-1">

                  <button
                    onClick={handleNext}
                    className="
                      w-full bg-linear-to-r
                      from-blue-500 via-purple-500 to-pink-500
                      text-white font-bold
                      py-2 px-4
                      rounded-[15px]
                      h-[50px]
                      text-[20px]
                      animated-gradient
                    "
                  >
                    Növbəti
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

export default Skills;
