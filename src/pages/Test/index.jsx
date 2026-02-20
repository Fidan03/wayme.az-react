import { useState } from "react";
import Wave from "../../components/wave/index";
import NextButton from "../../components/NextButton/index";
import LoginCardHeader from "../../components/LoginCardHeader";
import PrevButton from "../../components/PrevButton";

const questions = [
  { id: 1, text: "Boş vaxtınızda ən çox nə etməyi sevirsiniz?", options: ["Komputerdə proqramlar yazmaq və ya öyrənmək", "Yaradıcı işlərlə məşğul olmaq (dizayn, çəkilişlər)", "İnsanlarla ünsiyyət qurmaq və şəbəkə yaratmaq", "Kitab oxumaq və yeni bilik əldə etmək"] },
  { id: 2, text: "Ən çox hansı növ işlər sizi motivasiya edir?", options: ["Texniki problemləri həll etmək", "Dizayn və kreativ layihələr", "İnsanlara kömək etmək", "Məlumatları analiz etmək"] },
  { id: 3, text: "Hansı fəaliyyət sizi daha çox həyəcanlandırır?", options: ["Yeni proqram öyrənmək", "Fotoqrafiya və sənət layihələri", "Tədbirlər təşkil etmək", "Kitab oxumaq və araşdırmaq"] },
  { id: 4, text: "Hansı mühitdə işləməyi üstün tutursunuz?", options: ["Sakit və fokuslanmış", "Kreativ və rəngarəng", "İctimai və əməkdaşlıqlı", "Analitik və planlı"] },
  { id: 5, text: "Hansı bacarıqlarınızı daha çox inkişaf etdirmək istəyirsiniz?", options: ["Texniki", "Yaradıcı", "Ünsiyyət və liderlik", "Analitik"] },
  { id: 6, text: "Problemləri həll edərkən hansı yanaşmanı istifadə edirsiniz?", options: ["Sistematik və detallı", "Yaradıcı və qeyri-ənənəvi", "Komanda ilə birlikdə", "Analiz və məlumat əsaslı"] },
  { id: 7, text: "Hansı fəaliyyət sizi daha çox xoşbəxt edir?", options: ["Kod yazmaq", "Dizayn etmək", "İnsanlarla işləmək", "Kitab oxumaq"] },
  { id: 8, text: "Hansı tərzdə iş planı yaratmaq sizə uyğundur?", options: ["Rasional və planlı", "Yaradıcı və sərbəst", "Əməkdaşlıq yönümlü", "Məlumat və analiz əsaslı"] },
  { id: 9, text: "Ən çox hansı növ layihələrdə iştirak etmək istəyirsiniz?", options: ["Texnoloji", "Kreativ", "Sosial", "Analitik"] },
  { id: 10, text: "Hansı iş şəraiti sizi daha çox motivasiya edir?", options: ["Sakit və fokuslanmış", "Rəngarəng və yaradıcı", "Komanda ilə əməkdaşlıq", "Təhlil və məlumat əsaslı"] },
  { id: 11, text: "Hansı mövzuda araşdırma aparmaq sizə maraqlıdır?", options: ["Proqramlaşdırma və texnologiya", "Sənət və dizayn", "İnsan davranışları", "Məlumat və statistik analiz"] },
  { id: 12, text: "Siz hansı tip problemləri həll etməkdən zövq alırsınız?", options: ["Texniki və proqramlaşdırma", "Yaradıcı və dizayn", "Komanda və ünsiyyət", "Analitik və məlumat əsaslı"] },
  { id: 13, text: "Hansı fəaliyyət sizə daha çox enerji verir?", options: ["Kod yazmaq və layihə qurmaq", "Sənət və dizayn işləri", "Sosial və komanda işləri", "Araşdırma və analiz"] },
  { id: 14, text: "İş zamanı hansı tərzdə qərar verməyi üstün tutursunuz?", options: ["Məntiqi və planlı", "Yaradıcı və qeyri-ənənəvi", "Komanda ilə müzakirə", "Məlumat və analiz əsaslı"] },
  { id: 15, text: "Ən çox hansı fəaliyyət sizi cəlb edir?", options: ["Texniki problemlər", "Yaradıcı layihələr", "Sosial və insan yönümlü", "Analitik tapşırıqlar"] },
  { id: 16, text: "Hansı bacarıqlarınızı daha çox önə çıxarmaq istəyirsiniz?", options: ["Proqramlaşdırma", "Dizayn və kreativ", "Ünsiyyət və liderlik", "Məlumat analizləri"] },
  { id: 17, text: "Hansı iş şəraiti sizin üçün rahatdır?", options: ["Sakit və fokuslanmış", "Rəngarəng və sərbəst", "Komanda ilə iş birliyi", "Analitik və planlı"] },
  { id: 18, text: "Hansı layihələr sizi daha çox həyəcanlandırır?", options: ["Texnoloji", "Kreativ", "Sosial", "Analitik"] },
  { id: 19, text: "Problemləri həll edərkən hansı tərz daha çox xoşunuza gəlir?", options: ["Məntiqi və sistematik", "Yaradıcı və qeyri-ənənəvi", "Komanda ilə birlikdə", "Analitik və məlumat əsaslı"] },
  { id: 20, text: "Boş vaxtınızda hansı fəaliyyət sizi xoşbəxt edir?", options: ["Kod yazmaq", "Dizayn işləri", "İnsanlarla ünsiyyət", "Araşdırma və oxumaq"] },
  { id: 21, text: "Hansı növ layihələrdə daha çox iştirak etmək istəyirsiniz?", options: ["Texnoloji", "Kreativ", "Sosial", "Analitik"] },
  { id: 22, text: "Hansı bacarıqlarınızı inkişaf etdirmək istəyirsiniz?", options: ["Texniki", "Yaradıcı", "Ünsiyyət", "Analitik"] },
  { id: 23, text: "Ən çox hansı mövzu sizi maraqlandırır?", options: ["Proqramlaşdırma", "Dizayn", "Sosial elmlər", "Məlumat analizi"] },
  { id: 24, text: "Hansı tərzdə iş planı yaratmaq daha rahatdır?", options: ["Planlı və məntiqi", "Yaradıcı və sərbəst", "Komanda ilə", "Məlumat əsaslı"] },
  { id: 25, text: "Problemləri həll edərkən hansı tərzi üstün tutursunuz?", options: ["Texniki", "Kreativ", "Sosial", "Analitik"] },
  { id: 26, text: "Ən çox hansı fəaliyyət sizi motivasiya edir?", options: ["Kodlaşdırma", "Dizayn", "İnsanlarla iş", "Analitik"] },
  { id: 27, text: "Boş vaxtınızda hansı işlə məşğul olmağı sevirsiniz?", options: ["Proqramlaşdırma", "Sənət və dizayn", "Sosial fəaliyyət", "Araşdırma"] },
  { id: 28, text: "Hansı bacarıqları inkişaf etdirmək sizə maraqlıdır?", options: ["Texniki", "Yaradıcı", "Ünsiyyət", "Analitik"] },
  { id: 29, text: "Hansı mühitdə işləməyi üstün tutursunuz?", options: ["Sakit və fokuslanmış", "Rəngarəng və kreativ", "Komanda ilə əməkdaşlıq", "Analitik"] },
  { id: 30, text: "Siz hansı fəaliyyətlərlə daha çox məşğul olmaq istəyirsiniz?", options: ["Texniki tapşırıqlar", "Yaradıcı layihələr", "Sosial işlər", "Analitik tapşırıqlar"] }
];

const QUESTIONS_PER_PAGE = 5;

const Test = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [showError, setShowError] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const endIndex = Math.min(startIndex + QUESTIONS_PER_PAGE, questions.length);
  const currentQuestions = questions.slice(startIndex, endIndex);

  const handleSelect = (questionId, optionIndex) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setShowError((prev) => prev.filter((id) => id !== questionId));
  };

  const handleNext = () => {
    const unanswered = currentQuestions
      .filter((q) => selectedAnswers[q.id] === undefined)
      .map((q) => q.id);
    if (unanswered.length > 0) {
      setShowError(unanswered);
      return;
    }
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handleFinish = () => {
    const unanswered = currentQuestions
      .filter((q) => selectedAnswers[q.id] === undefined)
      .map((q) => q.id);
    if (unanswered.length > 0) {
      setShowError(unanswered);
      return;
    }
    setLoadingResults(true);
    localStorage.setItem("testAnswers", JSON.stringify(selectedAnswers));
    setTimeout(() => {
      setLoadingResults(false);
      window.location.href = "/results";
    }, 2000);
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <div className="flex-1 relative flex justify-center items-center overflow-hidden px-3 sm:px-6">
        <div className="absolute bottom-0 left-0 w-full z-0">
          <Wave />
        </div>
        <div className="w-full max-w-[960px] flex flex-col relative z-10">
          <div className="w-full inline-block p-0.5 rounded-[10px] bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">
            <LoginCardHeader
              percent={Math.round(((currentPage + 1) / totalPages) * 100)}
              stage={4}
            />
            <div className="bg-background rounded-b-[10px] p-4 sm:p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <p className="text-white font-semibold text-[18px] sm:text-[25px]">
                    Karyera Testi (30 sual)
                  </p>
                  <p className="text-[#A2A8B2] text-[14px] sm:text-[18px]">
                    {currentPage + 1}/{totalPages}
                  </p>
                </div>
                <p className="text-[#A2A8B2] text-[14px] sm:text-[18px] mt-1">
                  Hər suala ən uyğun cavabı seçin
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:gap-6">
                {currentQuestions.map((q) => (
                  <div
                    key={q.id}
                    className={`bg-[#2F4A73] border rounded-2xl p-4 sm:p-5 ${
                      showError.includes(q.id) ? "border-red-500" : "border-[#2F4A73]"
                    }`}
                  >
                    <p className="text-white text-[16px] sm:text-[22px] font-semibold mb-4">
                      {q.text}
                    </p>
                    <ul className="flex flex-col gap-3">
                      {q.options.map((option, index) => {
                        const isSelected = selectedAnswers[q.id] === index;
                        return (
                          <li
                            key={index}
                            onClick={() => handleSelect(q.id, index)}
                            className={`flex gap-3 p-3 rounded-xl cursor-pointer transition text-sm sm:text-base
                              ${
                                isSelected
                                  ? "bg-[#3379FB] text-white"
                                  : "bg-[#132746] text-white hover:bg-[#1E3A60]"
                              }`}
                          >
                            <span
                              className={`w-5 h-5 border-2 rounded-full shrink-0 flex justify-center items-center
                                ${isSelected ? "bg-white border-[#3379FB]" : "border-white"}`}
                            >
                              {isSelected && (
                                <span className="w-2 h-2 bg-[#3379FB] rounded-full" />
                              )}
                            </span>
                            {option}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <PrevButton
                  to={currentPage === 0 ? "/choiceSelection" : "#"}
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 0))}
                />
                <div className="flex-1">
                  {currentPage < totalPages - 1 ? (
                    <NextButton
                      onClick={handleNext}
                      label={`Növbəti (${startIndex + 1}-${endIndex})`}
                    />
                  ) : (
                    <NextButton
                      onClick={handleFinish}
                      label={
                        loadingResults
                          ? "Yüklənir..."
                          : `Nəticəyə bax (${startIndex + 1}-${endIndex})`
                      }
                    />
                  )}
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