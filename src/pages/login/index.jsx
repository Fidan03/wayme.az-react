import Header from '../../layout/header';
import Wave from '../../componenets/wave/index';
import NextButton  from '../../componenets/nextButton/index';
import LoginCardHeader from '../../componenets/LoginCardHeader';
import LoginCardBody from '../../componenets/LoginCardBody';



const Login = () => {
  

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
              <LoginCardHeader/>
            </div>


            <div className="bg-background rounded-b-[10px] p-6">

              <div>
                <LoginCardBody
                title='Şəxsi məlumatlar'
                desc='Zəhmət olmasa məlumatlarınızı düzgün daxil edin'
                />
              </div>

              <div>
                <NextButton />
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;
