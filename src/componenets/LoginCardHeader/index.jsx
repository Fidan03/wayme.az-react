import ProgressBar from '../ProgressBar/index'

const LoginCardHeader = () => {
  return (
    <div className="w-full rounded-t-[10px] p-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">

      <div className="flex items-center justify-between mb-4">

        <p className="text-white font-semibold text-[22px] md:text-[27px] leading-tight">
          İş istiqamətinin müəyyən edilməsi
        </p>

        <p className="text-white font-medium text-[18px] md:text-[22px]">
          Addım 1/5
        </p>

        </div>

        <div>
            <ProgressBar/>
        </div>
    </div>
  );
};

export default LoginCardHeader;
