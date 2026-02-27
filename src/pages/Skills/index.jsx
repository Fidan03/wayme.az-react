import { useState, useEffect } from "react";
import Wave from "../../components/wave/index";
import LoginCardHeader from "../../components/LoginCardHeader";
import { message } from "antd";
import Button from "../../components/Button";
import ChoicesCard from "../../components/ChoicesCard";
import PrevButton from "../../components/PrevButton";
import { useNavigate } from "react-router-dom";

const Skills = () => {
  const navigate = useNavigate();

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [customSkill, setCustomSkill] = useState("");
  const [apiSkills, setApiSkills] = useState([]); // ✅ API data

  /* ---------------- Load From Storage ---------------- */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("skillsData") || "[]");
    setSelectedSkills(saved);
  }, []);

  /* ---------------- Fetch Skills From API ---------------- */
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch("/api/WayMe/abilities?page=0&size=20");

        if (!res.ok) {
          throw new Error("API Error");
        }

        const data = await res.json();

        // API returns: { content: [...] }
        setApiSkills(data.content || []);

      } catch (err) {
        console.error(err);
        message.error("Bacarıqlar yüklənə bilmədi");
      }
    };

    fetchSkills();
  }, []);

  /* ---------------- Save To Storage ---------------- */
  const saveSkills = (skills) => {
    setSelectedSkills(skills);
    localStorage.setItem("skillsData", JSON.stringify(skills));
  };

  /* ---------------- Add Skill ---------------- */
  const addSkill = (skill) => {
    if (selectedSkills.length >= 10) {
      message.warning("Maksimum 10 bacarıq əlavə edə bilərsiniz");
      return;
    }

    if (!selectedSkills.includes(skill)) {
      saveSkills([...selectedSkills, skill]);
    }
  };

  /* ---------------- Add Custom Skill ---------------- */
  const addCustomSkill = () => {
    if (selectedSkills.length >= 10) {
      message.warning("Maksimum 10 bacarıq əlavə edə bilərsiniz");
      return;
    }

    const skill = customSkill.trim();

    if (!skill) return;

    addSkill(skill);
    setCustomSkill("");
  };

  /* ---------------- Remove Skill ---------------- */
  const removeSkill = (skill) => {
    saveSkills(selectedSkills.filter((s) => s !== skill));
  };

  /* ---------------- Next Validation ---------------- */
  const handleNext = () => {
    if (selectedSkills.length < 3) {
      message.error("Minimum 3 bacarıq seçməlisiniz");
      return;
    }

    navigate("/choiceSelection");
  };

  /* ---------------- Render ---------------- */
  return (
    <div className="bg-background min-h-screen flex flex-col">

      <div className="flex-1 relative flex justify-center items-center overflow-hidden px-3 sm:px-6">

        <div className="absolute bottom-0 left-0 w-full z-0">
          <Wave />
        </div>

        <div className="w-full max-w-[960px] flex flex-col relative z-10">

          <div className="w-full inline-block p-0.5 rounded-[10px] bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">

            <LoginCardHeader percent={50} stage={2} />

            <div className="bg-background rounded-b-[10px] p-4 sm:p-6">

              <div className="flex flex-col w-full">

                {/* Title */}
                <div className="mb-6">
                  <p className="text-white font-semibold text-[25px]">
                    Bacarıqlarınız
                  </p>
                  <p className="text-[#A2A8B2] mt-1">
                    Hansı bacarıqlara sahibsiniz? (Minimum 3)
                  </p>
                </div>

                {/* Custom Input */}
                <p className="text-[#A2A8B2] text-[18px]">
                  Öz bacarığınızı əlavə edin
                </p>

                <div className="flex gap-2 mt-3">

                  <input
                    type="text"
                    placeholder="Məsələn: Figma"
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addCustomSkill()}
                    className="flex-1 bg-[#2f4a73] h-12 rounded-lg px-3 text-white outline-none"
                  />

                  <Button onClick={addCustomSkill} />

                </div>

                {/* Selected Skills */}
                {selectedSkills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">

                    {selectedSkills.map((skill, index) => (

                      <div
                        key={index}
                        onClick={() => removeSkill(skill)}
                        className="border-2 border-[#2F4A73] px-4 py-2 rounded cursor-pointer text-[#A2A8B2] hover:bg-[#2F4A73]"
                      >
                        {skill} ×
                      </div>

                    ))}

                  </div>
                )}

                {/* API Skills */}
                <div className="mt-5">

                  <p className="text-[#A2A8B2] text-[18px]">
                    Asan seçimlər
                  </p>

                  <ChoicesCard
                    onSelect={addSkill}
                    selectedSkills={selectedSkills}
                    choices={apiSkills}   // ✅ API DATA
                  />

                </div>

              </div>

              {/* Navigation */}
              <div className="flex gap-3 mt-6">

                <PrevButton to="/login" />

                <button
                  onClick={handleNext}
                  className="w-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-[15px] h-[50px] text-[20px] cursor-pointer animated-gradient"
                >
                  Növbəti
                </button>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;