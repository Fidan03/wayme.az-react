import Header from "../../layout/header";
import Wave from "../../components/Wave/index";

import mission from "../../assets/mission.png";
import vision from "../../assets/vision.png";
import icon3 from "../../assets/icon3.png";
import icon2 from "../../assets/icon2.png";
import icon1 from "../../assets/icon1.png";
import ai from "../../assets/ai.png";
import growth from "../../assets/growth.png";
import heart from "../../assets/heart.png";
import medal from "../../assets/medal.png";

const About = () => {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 relative flex justify-center items-center overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full z-0">
          <Wave />
        </div>

        <div className="w-240 flex justify-center items-center relative z-10 px-4 flex-col">

              <div className="flex flex-col">
                <p className="font-semibold text-[26px] bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center">
                  Haqqımızda
                </p>

                <p className="text-[#A2A8B2] text-[18px] mt-1">
                  Wayme.Az - karyera inkişafınızda etibarlı partnyorunuz
                </p>
              </div>

              <div className="flex gap-6">

                <div className="rounded-xl p-5 space-y-3 bg-[#132746]">
                  <div className="flex items-center gap-3">
                    <img src={mission} alt="mission" className="w-7 h-7" />
                    <p className="font-semibold text-lg text-white">Missiyamız</p>
                  </div>

                  <p className="text-[#A2A8B2] leading-relaxed">
                    Hər kəsə ən uyğun karyera yolunu tapmaqda kömək etmək üçün
                    innovativ və obyektiv qiymətləndirmə sistemi təqdim edirik.
                    Biz inanırıq ki, doğru istiqamətin seçilməsi uğurlu və
                    məmnun edici karyeranın əsasıdır.
                  </p>
                </div>

                <div className="bg-[#132746] rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={vision} alt="vision" className="w-7 h-7" />
                    <p className="font-semibold text-lg text-white">Vizyonumuz</p>
                  </div>

                  <p className="text-[#A2A8B2] leading-relaxed">
                    Azərbaycanda və regionda ən etibarlı karyera yönləndirmə
                    platforması olmaq, hər bir insanın potensialını tam şəkildə
                    reallaşdırmasına kömək etmək.
                  </p>
                </div>
              </div>





              <div className="space-y-4 mt-10">

                <p className="font-semibold text-xl bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center">
                  Nə təklif edirik
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

                  {[
                    {
                      icon: icon3,
                      title: "Psixoloji təhlil",
                      text: "Şəxsi keyfiyyətlərinizin və iş stilinizin dərin qiymətləndirilməsi",
                    },
                    {
                      icon: icon2,
                      title: "Peşəkar qiymətləndirmə",
                      text: "Mövcud bilik və bacarıqlarınızın obyektiv qiymətləndirilməsi",
                    },
                    {
                      icon: icon1,
                      title: "Şəxsi tövsiyyələr",
                      text: "Hər istifadəçi üçün unikal tövsiyələr və inkişaf planı",
                    },
                    {
                      icon: ai,
                      title: "AI dəstəyi",
                      text: "Psixoloqlar və karyera məsləhətçilərinin təcrübəsinə əsaslanan metodologiya",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#132746] rounded-xl p-4 space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <img src={item.icon} alt="" className="w-6 h-6" />
                        <p className="font-medium text-white">{item.title}</p>
                      </div>

                      <p className="text-[#A2A8B2] text-sm">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>





              <div className="space-y-4 mt-10">

                <p className="font-semibold text-xl bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center">
                  Dəyərlərimiz
                </p>

                <div className="grid md:grid-cols-3 gap-5">

                  {[
                    {
                      icon: growth,
                      title: "Obyektivlik",
                      text: "Elmi əsaslı yanaşma və qərəzsiz qiymətləndirmə",
                    },
                    {
                      icon: heart,
                      title: "Əlçatanlıq",
                      text: "Hər kəs üçün pulsuz və asan istifadə",
                    },
                    {
                      icon: medal,
                      title: "Keyfiyyət",
                      text: "Yüksək standartlar və davamlı təkmilləşdirmə",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#132746] rounded-xl p-4 space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <img src={item.icon} alt="" className="w-6 h-6" />
                        <p className="font-medium text-white">{item.title}</p>
                      </div>

                      <p className="text-[#A2A8B2] text-sm">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>





              <div className="p-0.5 rounded-xl bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 mt-10">

                <div className="bg-[#132746] rounded-xl p-5 space-y-2 flex flex-col items-center">

                  <p className="font-semibold text-lg text-white">
                    Əlaqə
                  </p>

                  <p className="text-[#A2A8B2]">
                    Suallarınız varsa və ya əməkdaşlıq təklifiniz varsa,
                    bizimlə əlaqə saxlayın:
                  </p>

                  <p className="font-medium text-[#2AA6FF]">
                    Email: email@gmail.com
                  </p>

                </div>
              </div>
        </div>
      </div>
    </div>
  );
};

export default About;
