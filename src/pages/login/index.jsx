import { Form } from "antd";
import Wave from "../../components/wave/index";
import NextButton from "../../components/NextButton/index";
import LoginCardHeader from "../../components/LoginCardHeader";
import LoginCardBody from "../../components/LoginCardBody";

const Login = () => {
  const [form] = Form.useForm();

  return (
    <div className="bg-background min-h-screen flex flex-col">

      <div className="flex-1 relative flex justify-center items-center overflow-hidden px-3 sm:px-6">

        {/* Wave Background */}
        <div className="absolute bottom-0 left-0 w-full z-0">
          <Wave />
        </div>

        {/* Card Container */}
        <div className="w-full max-w-[960px] flex flex-col justify-center items-center relative z-10">

          <div className="w-full inline-block p-0.5 rounded-[10px] bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">

            <div className="bg-background rounded-b-[10px] p-4 sm:p-6">

              {/* Header */}
              <LoginCardHeader percent={25} stage={1} />

              <div className="mb-4 sm:mb-6">
                <p className="text-white font-semibold text-[22px] sm:text-[25px]">Şəxsi məlumatlar</p>
                <p className="text-[#A2A8B2] text-[14px] sm:text-[18px] font-medium mt-1">
                  Zəhmət olmasa məlumatlarınızı düzgün daxil edin
                </p>
              </div>

              {/* Form Body */}
              <LoginCardBody form={form} />

              {/* Next Button */}
              <div className="w-full mt-3 sm:mt-4">
                <NextButton to="/skills" form={form} />
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
