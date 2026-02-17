import Header from "../../layout/header";
import Wave from "../../components/Wave/index";
import NextButton from "../../components/NextButton/index";
import PrevButton from "../../components/PrevButton";
import about from "../../assets/about.png";
import { Input } from "antd";
import person from "../../assets/person.png";

const PDF = () => {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 relative flex justify-center items-center overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full z-0">
          <Wave />
        </div>

        <div className="w-240 flex flex-col justify-center items-center relative z-10">
          <div className="w-full inline-block p-0.5 rounded-[10px] bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">

            <div className="bg-background rounded-b-[10px] p-6 space-y-6">

              <div>
                <p className="text-white font-semibold text-[26px]">
                  PDF hesabat alımı
                </p>

                <p className="text-[#A2A8B2] text-[18px] font-medium mt-1">
                  PDF formatında ətraflı hesabat almaq üçün email ünvanınızı daxil edin
                </p>
              </div>

              <div className="bg-[#008CFF63] border border-[#008CFF63] rounded-xl p-4 flex items-center justify-between gap-4">

                <p className="text-white text-[15px] leading-relaxed">
                  Sizə nəticələrinizin ətraflı təhlili, inkişaf tövsiyyələri və
                  fərdi öyrənmə planı olan PDF fayl göndərəcəyik.
                </p>

                <img
                  src={about}
                  alt="about"
                  className="w-5 h-5"
                />

              </div>

              <div className="space-y-2">

                <p className="text-white font-medium">
                  Email ünvanı
                </p>

                <Input
                  size="large"
                  placeholder="user@email.com"
                  className="bg-[#1E2F4D] border-none text-white rounded-lg"
                  prefix={
                    <img
                      src={person}
                      alt="person"
                      className="w-5 h-5 mr-2"
                    />
                  }
                />

                <p className="text-[#2AA6FF] text-sm cursor-pointer underline text-center">
                  PDF yüklə
                </p>

              </div>

              <div className="flex gap-3 w-full pt-2">

                <PrevButton to="/results" />

                <div className="flex-1">
                  <NextButton label="Mailə göndər" />
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDF;
