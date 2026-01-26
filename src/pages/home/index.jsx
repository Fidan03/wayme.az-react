import logo from '../../assets/logo.png'
import about from '../../assets/about.png'
import frame from '../../assets/Frame 74.png'
import arrow from '../../assets/maki_arrow.png'
// import blur from '../../assets/blur.png'
import EducationCard from '../../componenets/EducationCard/index.jsx'
import DirectionCard from '../../componenets/DirectionCard/index.jsx'
import ProcessCard from '../../componenets/processCard/index.jsx'
import ResultsCard from '../../componenets/resultsCard/index.jsx'
import CountableCard from '../../componenets/conutableCard/index.jsx'
import human from '../../assets/human.png'
import Wave from '../../componenets/wave/index.jsx'

const Home = () => {
  return (
    <div className='bg-background w-full pt-[20px]'>
        <section>
            {/* <div className='bgDesign flex justify-between absolute'>
                <div><img src={blur} alt="blur" className='relative'/></div>
                <div><img src={blur} alt="blur" className='relative'/></div>
            </div> */}
            <div>
                <div className="max-w-7xl mx-auto h-100% flex justify-between items-center px-4">
                    <div className='logo'>
                        <img src={logo} alt="logo" className='h-17 w-39.5'/>
                    </div>
                    <div className='about'>
                        <img src={about} alt="about" />
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center text-center mt-[100px]'>
                    <div>
                        <img src={frame} alt="frame" className='w-77.5'/>
                    </div>
                    <p className='text-[80px] font-bold w-[762px] mt-[20px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent' >İdeal iş istiqamətinizi tapın</p>
                    <p className='font-medium w-[710px] text-[#A2A8B2] mt-[10px]'>Ən uyğun karyera istiqamətini müəyyən etmək üçün psixoloji keyfiyyətlərinizin və peşəkar bacarıqlarınızın kompleks qiymətləndirmə sistemi</p>
                    <div className='flex mt-[70px]'>
                        <button className='text-white font-semibold text-[20px] px-[10px] py-[5px] rounded-[10px] cursor-pointer flex items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'>Testə Başla <span><img src={arrow} alt="arrow"  className='w-[20px]'/></span></button>
                    </div>
                </div>
                <div>
                    <Wave/>
                </div>
            </div>
        </section>
        <section className='flex flex-col items-center px-[100px]'>
        <div className='mt-[50px] w-full max-w-7xl'>
            <EducationCard />
        </div>

        <div className='w-full max-w-7xl flex items-center flex-col bg-[#132746] p-[40px] mt-10 rounded-3xl'>
            <p className='font-bold text-[36px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
            Mövcud İstiqamətlər
            </p>
            <p className='text-[#A2A8B2] text-[20px] mb-10'>
            Ən çox tələb olunan və perspektivli ixtisaslar
            </p>

            <div className='grid grid-cols-3 gap-[32px] w-full'>
                <DirectionCard />
            </div>
        </div>
        </section>
        <section className='mt-5 flex flex-col items-center mt-[100px]'>
            <p className='inline-block font-bold text-[36px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'>Necə işləyir</p>
            <div>
                <ProcessCard />
            </div>
        </section>
        <section className='mt-5 flex flex-col items-center mt-[100px]'>
            <p className='font-bold text-[36px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'>Nə əldə edəcəksiniz</p>
            <div>
                <ResultsCard />
            </div>
            <div className='mt-5'>
                <CountableCard/>
            </div>
        </section>
        <section>
            <div className='flex items-center flex-col '>
                <img src={human} alt="human" className='size-[73px]'/>
                <p>Başlamağa hazırsınız?</p>
                <p>İndi testdən keçin və hansı iş istiqamətinin sizə ən uyğun olduğunu öyrənin</p>
                <div className='flex mt-[70px]'>
                    <button className='text-white font-semibold text-[20px] px-[10px] py-[5px] rounded-[10px] cursor-pointer flex items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'>Testə Başla <span><img src={arrow} alt="arrow"  className='w-[20px]'/></span></button>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Home