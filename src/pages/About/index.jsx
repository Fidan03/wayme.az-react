import Wave from "../../components/wave/index";
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

      <div className="flex-1 relative flex justify-center items-center overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full z-0">
          <Wave />
        </div>

        <div className="w-240 flex justify-center items-center relative z-10 px-4 flex-col space-y-12">

          <div className="flex flex-col text-center space-y-2">
            <p className="font-bold text-[36px] bg-gradient-to-r from-[#00B4FF] via-[#7C3AED] to-[#FF49A0] bg-clip-text text-transparent">
              Haqqımızda
            </p>

            <p className="text-[#A2A8B2] text-[20px] font-medium">
              Wayme.Az - karyera inkişafınızda etibarlı partnyorunuz
            </p>
          </div>

          <div className="flex gap-6">

            <div className="rounded-2xl p-8 space-y-4 bg-[#132746] w-full">
              <div className="flex items-center gap-4">
                <img src={mission} alt="mission" className="w-10 h-10" />
                <p className="font-semibold text-[20px] text-white">
                  Missiyamız
                </p>
              </div>

              <p className="text-[#A2A8B2] text-[18px] leading-relaxed">
                Hər kəsə ən uyğun karyera yolunu tapmaqda kömək etmək üçün
                innovativ və obyektiv qiymətləndirmə sistemi təqdim edirik.
                Biz inanırıq ki, doğru istiqamətin seçilməsi uğurlu və
                məmnun edici karyeranın əsasıdır.
              </p>
            </div>

            <div className="bg-[#132746] rounded-2xl p-8 space-y-4 w-full">
              <div className="flex items-center gap-4">
                <img src={vision} alt="vision" className="w-10 h-10" />
                <p className="font-semibold text-[20px] text-white">
                  Vizyonumuz
                </p>
              </div>

              <p className="text-[#A2A8B2] text-[18px] leading-relaxed">
                Azərbaycanda və regionda ən etibarlı karyera yönləndirmə
                platforması olmaq, hər bir insanın potensialını tam şəkildə
                reallaşdırmasına kömək etmək.
              </p>
            </div>
          </div>

          <div className="space-y-6">

            <p className="font-bold text-[36px] bg-gradient-to-r from-[#00B4FF] via-[#7C3AED] to-[#FF49A0] bg-clip-text text-transparent text-center">
              Nə təklif edirik
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

              {[{
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
                }].map((item, index) => (
                  <div key={index} className="bg-[#132746] rounded-2xl p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <img src={item.icon} alt="" className="w-8 h-8" />
                      <p className="font-medium text-[18px] text-white">
                        {item.title}
                      </p>
                    </div>

                    <p className="text-[#A2A8B2] text-[16px]">
                      {item.text}
                    </p>
                  </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">

            <p className="font-bold text-[36px] bg-gradient-to-r from-[#00B4FF] via-[#7C3AED] to-[#FF49A0] bg-clip-text text-transparent text-center">
              Dəyərlərimiz
            </p>

            <div className="grid md:grid-cols-3 gap-6">

              {[{
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
                }].map((item, index) => (
                  <div key={index} className="bg-[#132746] rounded-2xl p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <img src={item.icon} alt="" className="w-8 h-8" />
                      <p className="font-medium text-[18px] text-white">
                        {item.title}
                      </p>
                    </div>

                    <p className="text-[#A2A8B2] text-[16px]">
                      {item.text}
                    </p>
                  </div>
              ))}
            </div>
          </div>

          <div className="p-1 rounded-2xl bg-gradient-to-r from-[#00B4FF] via-[#7C3AED] to-[#FF49A0]">

            <div className="bg-[#132746] rounded-2xl p-6 space-y-4 flex flex-col items-center">

              <p className="font-bold text-[20px] text-white">
                Əlaqə
              </p>

              <p className="text-[#A2A8B2] text-[18px] text-center">
                Suallarınız varsa və ya əməkdaşlıq təklifiniz varsa,
                bizimlə əlaqə saxlayın:
              </p>

              <p className="font-medium text-[18px] text-[#2AA6FF]">
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
