import frame from '../../assets/Frame 74.png'
import blur from '../../assets/blur.png'
import EducationCard from '../../components/educationCard/index.jsx'
import DirectionCard from '../../components/DirectionCard/index.jsx'
import ProcessCard from '../../components/processCard/index.jsx'
import ResultsCard from '../../components/benefitsCard/index.jsx'
import CountableCard from '../../components/conutableCard/index.jsx'
import human from '../../assets/human.png'
import Wave from '../../components/wave/index.jsx'
import Button from '../../components/startButton/index.jsx'

const Home = () => {
  return (
    <div className='bg-background w-full pt-5 sm:pt-[20px]'>

      {/* Hero Section */}
      <section className='relative px-4 sm:px-[100px]'>
        <div className='bgDesign flex gap-10 sm:gap-40 absolute w-full'>
          <div><img src={blur} alt="blur" className='relative -bottom-12 sm:bottom-50'/></div>
          <div><img src={blur} alt="blur" className='relative top-12 sm:top-50'/></div>
        </div>

        <div className='flex flex-col justify-center items-center text-center mt-[80px] sm:mt-[100px]'>
          <div>
            <img src={frame} alt="frame" className='w-48 sm:w-77.5'/>
          </div>

          <p className='text-[32px] sm:text-[80px] font-bold w-full sm:w-[762px] mt-5 sm:mt-[20px] bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
            İdeal iş istiqamətinizi tapın
          </p>

          <p className='font-medium text-[14px] sm:text-[18px] w-full sm:w-[710px] mt-2 sm:mt-[10px] text-[#A2A8B2]'>
            Ən uyğun karyera istiqamətini müəyyən etmək üçün psixoloji keyfiyyətlərinizin və peşəkar bacarıqlarınızın kompleks qiymətləndirmə sistemi
          </p>

          <div className='mt-10 sm:mt-[70px] relative z-1'>
            <Button />
          </div>
        </div>

        <div className='mt-10 sm:mt-[35px] mb-10 drop-shadow-2xl drop-shadow-[#2b61ce]'>
          <Wave />
        </div>
      </section>

      {/* Education Section */}
      <section className='flex flex-col items-center px-4 sm:px-[100px] mt-12 sm:mt-[50px]'>
        <div className='w-full max-w-7xl'>
          <EducationCard />
        </div>
      </section>

      {/* Directions Section */}
      <section className='w-full max-w-7xl flex flex-col items-center bg-[#132746] p-5 sm:p-10 mt-10 sm:mt-10 rounded-3xl'>
        <p className='font-bold text-[24px] sm:text-[36px] bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
          Mövcud istiqamətlər
        </p>
        <p className='text-[#A2A8B2] text-[14px] sm:text-[20px] mb-5 sm:mb-10 text-center'>
          Ən çox tələb olunan və perspektivli ixtisaslar
        </p>

        <div className='flex flex-wrap gap-4 sm:gap-6 justify-center w-full'>
          <DirectionCard />
        </div>
      </section>

      {/* Process Section */}
      <section className='flex flex-col items-center mt-12 sm:mt-[100px] px-4 sm:px-0'>
        <p className='font-bold text-[24px] sm:text-[36px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center mb-5'>
          Necə işləyir
        </p>
        <ProcessCard />
      </section>

      {/* Benefits Section */}
      <section className='flex flex-col items-center mt-12 sm:mt-[100px] px-4 sm:px-0'>
        <p className='font-bold text-[24px] sm:text-[36px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center mb-5'>
          Nə əldə edəcəksiniz
        </p>
        <ResultsCard />
        <div className='mt-5'>
          <CountableCard />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className='pb-10 flex justify-center items-center mt-10 px-4 sm:px-0'>
        <div className='flex items-center justify-center flex-col bg-[#132746] w-full sm:w-[875px] p-6 sm:p-0 rounded-2xl text-center'>
          <img src={human} alt="human" className='w-16 sm:w-[73px] mb-5 sm:mb-10'/>
          <p className='font-bold text-[24px] sm:text-[36px] text-white mb-2 sm:mb-3'>Başlamağa hazırsınız?</p>
          <p className='text-[#A2A8B2] font-medium text-[14px] sm:text-[19px]'>
            İndi testdən keçin və hansı iş istiqamətinin sizə ən uyğun olduğunu öyrənin
          </p>
          <div className='mt-10 sm:mt-[70px]'>
            <Button />
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home
