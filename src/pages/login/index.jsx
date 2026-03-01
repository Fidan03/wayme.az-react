// src/pages/Login/index.jsx
import { Form, message } from "antd";
import Wave from "../../components/wave/index";
import NextButton from "../../components/NextButton/index";
import LoginCardHeader from "../../components/LoginCardHeader";
import LoginCardBody from "../../components/LoginCardBody";
import dayjs from "dayjs";

const Login = () => {
  const [form] = Form.useForm();

  const ensureSessionId = async () => {
    let sessionId = localStorage.getItem("sessionId");
    if (sessionId) return sessionId;

    // ✅ If your backend has a start session endpoint, use it here.
    // If you already create session elsewhere, remove this.
    const res = await fetch("/api/WayMe/sessions/start", { method: "POST" });
    if (!res.ok) throw new Error("Session başlatmaq olmadı");
    const data = await res.json();
    sessionId = String(data.sessionId);
    localStorage.setItem("sessionId", sessionId);
    return sessionId;
  };

  const submitPersonalInfo = async (values) => {
    try {
      const sessionId = await ensureSessionId();

      const birthDate = dayjs(values.date, "DD.MM.YYYY", true).format("YYYY-MM-DD");

      const body = {
        name: values.name,
        surname: values.surname,
        birthDate,
      };

      console.log("✅ sending:", body);

      const response = await fetch(`/api/WayMe/sessions/${sessionId}/personal-info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => null);

        // ✅ Map backend field errors into AntD fields
        if (err?.errors?.length) {
          const fieldMap = { birthDate: "date" };
          form.setFields(
            err.errors.map((e) => ({
              name: fieldMap[e.field] || e.field,
              errors: [e.message || "Xəta"],
            }))
          );
          message.error("Məlumatlar düzgün deyil");
          return false; // ✅ block navigation
        }

        message.error("Məlumatlar düzgün deyil");
        return false; // ✅ block navigation
      }

      // ✅ Save what user typed too (optional, but handy)
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          name: values.name,
          surname: values.surname,
          date: values.date,
        })
      );

      return true; // ✅ allow navigation
    } catch (e) {
      console.error(e);
      message.error("Server xətası");
      return false; // ✅ block navigation
    }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <div className="flex-1 relative flex justify-center items-center overflow-hidden px-3 sm:px-6">
        <div className="absolute bottom-0 left-0 w-full z-0">
          <Wave />
        </div>

        <div className="w-full max-w-[960px] flex flex-col justify-center items-center relative z-10">
          <div className="w-full inline-block p-0.5 rounded-[10px] bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">
            <div className="bg-background rounded-b-[10px] p-4 sm:p-6">
              <LoginCardHeader percent={25} stage={1} />

              <div className="mb-4 sm:mb-6">
                <p className="text-white font-semibold text-[22px] sm:text-[25px]">
                  Şəxsi məlumatlar
                </p>
                <p className="text-[#A2A8B2] text-[14px] sm:text-[18px] font-medium mt-1">
                  Zəhmət olmasa məlumatlarınızı düzgün daxil edin
                </p>
              </div>

              <LoginCardBody form={form} />

              <div className="w-full mt-3 sm:mt-4">
                <NextButton
                  to="/skills"
                  form={form}
                  onClick={submitPersonalInfo} // ✅ API call happens here
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;