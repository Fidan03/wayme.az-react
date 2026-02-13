import ProgressBar from '../ProgressBar/index'

const LoginCardHeader = ({percent, stage}) => {
  return (
    <div className="w-full rounded-t-[10px] p-5 bg-[#2F4A73]">

      <div className="flex items-center justify-between mb-4">

        <p className="text-white font-semibold text-[25px] leading-tight">
          İş istiqamətinin müəyyən edilməsi
        </p>

        <p className="text-white font-medium text-[18px]">
          Addım {stage}/4
        </p>

        </div>

        <div>
            <ProgressBar percent={percent}/>
        </div>
    </div>
  );
};

export default LoginCardHeader;
