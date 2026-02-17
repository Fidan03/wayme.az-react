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
        {/* Wave */}
        <div className="absolute bottom-0 left-0 w-full z-0">
          <Wave />
        </div>

        {/* Main Container */}
        <div className="w-240 flex justify-center items-center relative z-10 px-4 flex-col">

              <div>
                <p className="font-semibold text-[26px] ">
                  Haqqımızda
                </p>

                <p className="text-[#A2A8B2] text-[18px] mt-1">
                  Wayme.Az - karyera inkişafınızda etibarlı partnyorunuz
                </p>
              </div>

              {/* Mission & Vision */}
              <div className="grid md:grid-cols-2 gap-6">

                {/* Mission */}
                <div className="bg-[#2F4A73] rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={mission} alt="mission" className="w-7 h-7" />
                    <p className="font-semibold text-lg ">Missiyamız</p>
                  </div>

                  <p className="text-[#D1D5DB] leading-relaxed">
                    Hər kəsə ən uyğun karyera yolunu tapmaqda kömək etmək üçün
                    innovativ və obyektiv qiymətləndirmə sistemi təqdim edirik.
                    Biz inanırıq ki, doğru istiqamətin seçilməsi uğurlu və
                    məmnun edici karyeranın əsasıdır.
                  </p>
                </div>

                {/* Vision */}
                <div className="bg-[#2F4A73] rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={vision} alt="vision" className="w-7 h-7" />
                    <p className="font-semibold text-lg">Vizyonumuz</p>
                  </div>

                  <p className="text-[#D1D5DB] leading-relaxed">
                    Azərbaycanda və regionda ən etibarlı karyera yönləndirmə
                    platforması olmaq, hər bir insanın potensialını tam şəkildə
                    reallaşdırmasına kömək etmək.
                  </p>
                </div>
              </div>

              {/* Services */}
              <div className="space-y-4">

                <p className="font-semibold text-xl">
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
                      className="bg-[#2F4A73] rounded-xl p-4 space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <img src={item.icon} alt="" className="w-6 h-6" />
                        <p className="font-medium">{item.title}</p>
                      </div>

                      <p className="text-[#D1D5DB] text-sm">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Values */}
              <div className="space-y-4">

                <p className="font-semibold text-xl">
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
                      className="bg-[#2F4A73] rounded-xl p-4 space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <img src={item.icon} alt="" className="w-6 h-6" />
                        <p className="font-medium">{item.title}</p>
                      </div>

                      <p className="text-[#D1D5DB] text-sm">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="p-0.5 rounded-xl bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">

                <div className="bg-background rounded-xl p-5 space-y-2">

                  <p className="font-semibold text-lg">
                    Əlaqə
                  </p>

                  <p className="text-[#A2A8B2]">
                    Suallarınız varsa və ya əməkdaşlıq təklifiniz varsa,
                    bizimlə əlaqə saxlayın:
                  </p>

                  <p className="font-medium">
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
