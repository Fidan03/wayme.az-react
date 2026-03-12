import { useState, useEffect, useRef, useMemo } from "react";
import Wave from "../../components/wave/index";
import LoginCardHeader from "../../components/LoginCardHeader";
import { message } from "antd";
import Button from "../../components/Button";
import ChoicesCard from "../../components/ChoicesCard";
import PrevButton from "../../components/PrevButton";
import { useNavigate } from "react-router-dom";

const SKILL_REGEX = /^[\p{L}]+([ -][\p{L}]+)*$/u;

const Skills = () => {
  const navigate = useNavigate();

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [customSkill, setCustomSkill] = useState("");
  const [apiSkills, setApiSkills] = useState([]);
  const [loadingSkills, setLoadingSkills] = useState(true);

  const requestIdRef = useRef(0);

  const sanitizeSkill = (value) => {
    let val = value.normalize("NFC");

    // allow letters, single spaces, and hyphen
    val = val.replace(/[^\p{L}\s-]/gu, "");

    // collapse multiple spaces
    val = val.replace(/\s+/g, " ");

    // collapse multiple hyphens
    val = val.replace(/-+/g, "-");

    // remove leading/trailing spaces and hyphens
    val = val.trim().replace(/^-+/, "").replace(/-+$/, "");

    // max length
    val = val.slice(0, 30);

    // capitalize first letter safely
    if (val.length > 0) {
      val = val.charAt(0).toLocaleUpperCase("az-Latn-AZ") + val.slice(1);
    }

    return val;
  };

  /* ---------------- Load From Storage ---------------- */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("skillsData") || "[]");
    setSelectedSkills(saved);
  }, []);

  /* ---------------- Fetch Skills From API ---------------- */
  useEffect(() => {
    const controller = new AbortController();
    const myRequestId = ++requestIdRef.current;

    const fetchSkills = async () => {
      setLoadingSkills(true);

      try {
        const res = await fetch("/api/WayMe/abilities?page=0&size=20", {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("API Error");

        const data = await res.json();

        if (myRequestId !== requestIdRef.current) return;

        setApiSkills(data?.content || []);
      } catch (err) {
        if (err?.name === "AbortError") return;

        console.error(err);
        message.error("Bacarıqlar yüklənə bilmədi");
        setApiSkills([]);
      } finally {
        if (myRequestId === requestIdRef.current) {
          setLoadingSkills(false);
        }
      }
    };

    fetchSkills();

    return () => controller.abort();
  }, []);

  /* ---------------- Save To Storage ---------------- */
  const saveSkills = (skills) => {
    setSelectedSkills(skills);
    localStorage.setItem("skillsData", JSON.stringify(skills));
  };

  /* ---------------- Add Skill ---------------- */
  const addSkill = (skill) => {
    const normalizedSkill = String(skill || "").normalize("NFC").trim();

    if (selectedSkills.length >= 10) {
      message.warning("Maksimum 10 bacarıq əlavə edə bilərsiniz");
      return;
    }

    if (!normalizedSkill) return;

    if (!selectedSkills.includes(normalizedSkill)) {
      saveSkills([...selectedSkills, normalizedSkill]);
    }
  };

  /* ---------------- Add Custom Skill ---------------- */
  const addCustomSkill = () => {
    if (selectedSkills.length >= 10) {
      message.warning("Maksimum 10 bacarıq əlavə edə bilərsiniz");
      return;
    }

    const skill = sanitizeSkill(customSkill);

    if (!skill) return;

    if (!SKILL_REGEX.test(skill)) {
      message.error("Yalnız hərflər, boşluq və tək defis istifadə edin");
      return;
    }

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

  const choices = useMemo(() => apiSkills, [apiSkills]);

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
                <div className="mb-6">
                  <p className="text-white font-semibold text-[25px]">
                    Bacarıqlarınız
                  </p>
                  <p className="text-[#A2A8B2] mt-1">
                    Hansı bacarıqlara sahibsiniz? (Minimum 3)
                  </p>
                </div>

                <p className="text-[#A2A8B2] text-[18px]">
                  Öz bacarığınızı əlavə edin
                </p>

                <div className="flex gap-2 mt-3">
                  <input
                    type="text"
                    placeholder="Məsələn: Figma"
                    value={customSkill}
                    onChange={(e) => setCustomSkill(sanitizeSkill(e.target.value))}
                    onKeyDown={(e) => e.key === "Enter" && addCustomSkill()}
                    maxLength={30}
                    className="flex-1 bg-[#2f4a73] h-12 rounded-lg px-3 text-white outline-none"
                  />

                  <Button onClick={addCustomSkill} />
                </div>

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

                <div className="mt-5">
                  <p className="text-[#A2A8B2] text-[18px]">
                    Asan seçimlər
                  </p>

                  {loadingSkills ? (
                    <div className="text-[#A2A8B2] mt-4 text-center">
                      Loading...
                    </div>
                  ) : (
                    <ChoicesCard
                      onSelect={addSkill}
                      selectedSkills={selectedSkills}
                      choices={choices}
                    />
                  )}
                </div>
              </div>

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