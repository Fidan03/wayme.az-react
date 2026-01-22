import logo from '../../assets/logo.png'
import about from '../../assets/about.png'
import frame from '../../assets/Frame 74.png'
import arrow from '../../assets/maki_arrow.png'
import blur from '../../assets/blur.png'

const Home = () => {
  return (
    <div className='bg-background w-full'>
        <div className="max-w-7xl mx-auto h-100% flex justify-between items-center px-4">
            <div className='logo'>
                <img src={logo} alt="logo" className='h-17 w-39.5'/>
            </div>
            <div className='about'>
                <img src={about} alt="about" />
            </div>
        </div>
        <div>
            <div>
                <img src={frame} alt="frame" />
            </div>
            <p>İdeal iş istiqamətinizi tapın</p>
            <p>Ən uyğun karyera istiqamətini müəyyən etmək üçün psixoloji keyfiyyətlərinizin və peşəkar bacarıqlarınızın kompleks qiymətləndirmə sistemi</p>
            <div>
                <button>Testə Başla</button>
                <img src={arrow} alt="arrow" />
            </div>
        </div>
    </div>
  )
}

export default Home