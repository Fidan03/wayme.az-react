import frame from '../../assets/Frame 74.png'
import blur from '../../assets/blur.png'
import EducationCard from '../../componenets/EducationCard/index.jsx'
import DirectionCard from '../../componenets/DirectionCard/index.jsx'
import ProcessCard from '../../componenets/processCard/index.jsx'
import ResultsCard from '../../componenets/resultsCard/index.jsx'
import CountableCard from '../../componenets/conutableCard/index.jsx'
import human from '../../assets/human.png'
import Wave from '../../componenets/wave/index.jsx'
import Header from '../../layout/header/index.jsx'
import Button from '../../componenets/startButton/index.jsx'

const Home = () => {
  return (
    <div className='bg-background w-full pt-[20px]'>
        <section>
            <div className='bgDesign flex gap-40 absolute '>
                <div><img src={blur} alt="blur" className='relative bottom-50'/></div>
                <div><img src={blur} alt="blur" className='relative top-50'/></div>
            </div>
            <div>
                <div>
                    <Header/>
                </div>
                <div className='flex flex-col justify-center items-center text-center mt-[100px]'>
                    <div>
                        <img src={frame} alt="frame" className='w-77.5'/>
                    </div>
                    <p className='text-[80px] font-bold w-[762px] mt-[20px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent' >İdeal iş istiqamətinizi tapın</p>
                    <p className='font-medium w-[710px] text-[#A2A8B2] mt-[10px]'>Ən uyğun karyera istiqamətini müəyyən etmək üçün psixoloji keyfiyyətlərinizin və peşəkar bacarıqlarınızın kompleks qiymətləndirmə sistemi</p>
                    <div className='mt-[70px] relative z-1'>
                        <Button/>
                    </div>
                </div>
                <div className='mt-[35px] mb-10 drop-shadow-2xl drop-shadow-[#214CA4]'>
                    <Wave />
                </div>
            </div>
        </section>
        <section className='flex flex-col items-center px-[100px]'>
        <div className='mt-[50px] w-full max-w-7xl'>
            <EducationCard />
        </div>

        <div className='w-full max-w-7xl flex items-center flex-col bg-[#132746] p-10 mt-10 rounded-3xl'>
            <p className='font-bold text-[36px] bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
            Mövcud İstiqamətlər
            </p>
            <p className='text-[#A2A8B2] text-[20px] mb-10'>
            Ən çox tələb olunan və perspektivli ixtisaslar
            </p>

            <div className='flex flex-wrap w-full flex-gap-6 gap-6 justify-center'>
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
        <section className='pb-10 flex justify-center items-center mt-10'>
            <div className='flex items-center justify-center flex-col bg-[#132746] w-[875px] h-[395px] rounded-2xl'>
                <img src={human} alt="human" className='size-[73px] mb-10'/>
                <p className='font-bold text-[36px] text-white'>Başlamağa hazırsınız?</p>
                <p className='text-[#A2A8B2] font-medium text-[19px] '>İndi testdən keçin və hansı iş istiqamətinin sizə ən uyğun olduğunu öyrənin</p>
                <div className='mt-[70px]'>
                    <Button/>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Home