import LoginForm from '../../componenets/LoginForm/index';

const LoginCardBody = () => {
  return (
    <div className="flex flex-col w-full">

      <div className="mb-6">
        <p className="text-white font-semibold text-[25px]">
          Şəxsi məlumatlar
        </p>
        <p className="text-[#A2A8B2] text-[20px] font-medium mt-1">
          Zəhmət olmasa məlumatlarınızı düzgün daxil edin
        </p>
      </div>

      <LoginForm />

    </div>
  );
};

export default LoginCardBody;
