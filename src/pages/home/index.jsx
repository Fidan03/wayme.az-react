import logo from '../../assets/logo.png'
import about from '../../assets/about.png'
import frame from '../../assets/Frame 74.png'
import arrow from '../../assets/maki_arrow.png'
import blur from '../../assets/blur.png'
import wave from '../../assets/wave.png'
import EducationCard from '../../componenets/educationCard'

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
                    <img src={wave} alt="wave" />
                </div>
            </div>
        </section>
        <section>
            <div>
                <EducationCard />
            </div>
            <div></div>
        </section>
    </div>
  )
}

export default Home