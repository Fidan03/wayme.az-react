// src/components/LoginCardBody/index.jsx
import LoginForm from "../LoginForm/index";

const LoginCardBody = ({ title, desc, form }) => {
  return (
    <div className="flex flex-col w-full">
      {(title || desc) && (
        <div className="mb-6">
          {title && <p className="text-white font-semibold text-[25px]">{title}</p>}
          {desc && (
            <p className="text-[#A2A8B2] text-[18px] font-medium mt-1">{desc}</p>
          )}
        </div>
      )}

      <LoginForm form={form} />
    </div>
  );
};

export default LoginCardBody;