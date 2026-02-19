import { useState } from "react";
import Wave from "../../components/wave/index";
import NextButton from "../../components/NextButton/index";
import PrevButton from "../../components/PrevButton/index";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import person from "../../assets/person.png";
import { useNavigate } from "react-router-dom";

const PDF = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return setError("");
    setError(regex.test(value) ? "" : "Email formatı düzgün deyil");
  };

  const handleChange = (e) => {
    const value = e.target.value.slice(0, 30);
    setEmail(value);
    validateEmail(value);
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById("results-pdf");
    if (!element) return;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("hesabat.pdf");
    setModalMessage("PDF uğurla yaradıldı!");
    setModalVisible(true);
  };

  const handleSendEmail = () => {
    if (!email || error) return;
    setModalMessage(`PDF mailə göndərildi: ${email}`);
    setModalVisible(true);
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <div className="flex-1 relative flex justify-center items-center overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full z-0">
          <Wave />
        </div>

        <div className="w-240 flex flex-col justify-center items-center relative z-10">
          <div className="w-full inline-block p-0.5 rounded-[10px] bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">
            <div className="bg-background rounded-b-[10px] p-6 space-y-6">

              {/* Header */}
              <div>
                <p className="text-white font-semibold text-[26px]">PDF hesabat alımı</p>
                <p className="text-[#A2A8B2] text-[18px] font-medium mt-1">
                  PDF formatında ətraflı hesabat almaq üçün email ünvanınızı daxil edin
                </p>
              </div>

              {/* Info Box */}
              <div className="bg-[#008CFF63] border border-[#008CFF63] rounded-xl p-4 flex items-center justify-between gap-4">
                <p className="text-white text-[15px] leading-relaxed">
                  Sizə nəticələrinizin ətraflı təhlili, inkişaf tövsiyyələri və fərdi öyrənmə planı olan PDF fayl göndərəcəyik.
                </p>
              </div>

              {/* Custom Email Input */}
              <div className="space-y-2">
                <p className="text-white font-medium">Email ünvanı</p>
                <div className="flex items-center bg-[#2f4a73] rounded-lg h-12 px-3 gap-2">
                  <img src={person} alt="person" className="w-5 h-5" />
                  <input
                    type="email"
                    placeholder="user@email.com"
                    value={email}
                    onChange={handleChange}
                    className="flex-1 h-full bg-transparent text-white text-[18px] border-none outline-none placeholder-white"
                    onKeyDown={(e) => e.key === "Enter" && handleSendEmail()}
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <p
                  className="text-[#2AA6FF] text-sm cursor-pointer underline text-center"
                  onClick={handleDownloadPDF}
                >
                  PDF yüklə
                </p>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-2 w-full pt-2">
                {/* PrevButton goes to /results */}
                <PrevButton to="/results" />

                <div className="flex-1">
                  <NextButton label="Mailə göndər" disabled={!!error || !email} onClick={handleSendEmail} />
                </div>
              </div>

              {/* Hidden PDF content */}
              <div id="results-pdf" className="hidden">
                <h1 className="text-black">Sizin nəticələriniz</h1>
                <p className="text-black">Burada hesabatın məzmunu olacaq.</p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-[#1E2F4D] p-6 rounded-lg shadow-lg w-80 text-center">
            <p className="text-white font-medium">{modalMessage}</p>
            <button className="mt-4 px-4 py-2 bg-[#2AA6FF] text-white rounded-lg" onClick={() => setModalVisible(false)}>
              Bağla
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDF;
