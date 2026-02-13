import { Form } from "antd";

import Header from "../../layout/header";
import Wave from "../../components/Wave/index";
import NextButton from "../../components/NextButton/index";
import LoginCardHeader from "../../components/LoginCardHeader";
import LoginCardBody from "../../components/LoginCardBody";

const Login = () => {
  const [form] = Form.useForm();

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
              <LoginCardHeader percent={25} stage={1} />
            </div>

            <div className="bg-background rounded-b-[10px] p-6">
              <div className="mb">
                <p className="text-white font-semibold text-[25px]">Şəxsi məlumatlar</p>
                <p className="text-[#A2A8B2] text-[18px] font-medium mt-1">Zəhmət olmasa məlumatlarınızı düzgün daxil edin</p>
              </div>
              <LoginCardBody form={form} />

              <div className="w-full mt-3">
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
