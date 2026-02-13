import LoginForm from '../loginForm/index';

const LoginCardBody = ({title, desc, form}) => {
  return (
    <div className="flex flex-col w-full">

      <div className="mb-6">
        <p className="text-white font-semibold text-[25px]">
          {title}
        </p>
        <p className="text-[#A2A8B2] text-[18px] font-medium mt-1">
          {desc}
        </p>
      </div>

      <LoginForm form={form}/>

    </div>
  );
};

export default LoginCardBody;
