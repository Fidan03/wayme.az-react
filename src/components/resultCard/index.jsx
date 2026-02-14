import first from '../../assets/first.png'
import second from '../../assets/second.png'
import third from '../../assets/third.png'
import designer from '../../assets/designer.png'
import programming from '../../assets/programming.png'
import backend from '../../assets/backend.png'

const ResultCard = () => {
  return (
    <div className='bg-[#2F4A73] rounded-2xl p-6 flex flex-col gap-6 w-full'>

      <p className='text-white font-bold text-[22px]'>Testin nəticəsi</p>

      <div className='flex flex-col gap-4'>

        <div className='flex items-center justify-between bg-background rounded-xl p-6'>
          <div className='flex items-center gap-3'>
            <img src={first} alt="first" className='w-8 h-8' />
            <div className='flex items-center gap-2'>
              <img src={designer} alt="designer" className='w-10 h-10' />
              <p className='text-white font-medium'>UX/UI Dizayn</p>
            </div>
          </div>
          <p className='text-white font-semibold text-xl'>60%</p>
        </div>

        <div className='flex items-center justify-between bg-background rounded-xl p-6'>
          <div className='flex items-center gap-3'>
            <img src={second} alt="second" className='w-8 h-8' />
            <div className='flex items-center gap-2'>
              <img src={programming} alt="programming" className='w-10 h-10' />
              <p className='text-white font-medium'>Frontend Developer</p>
            </div>
          </div>
          <p className='text-white font-semibold text-xl'>40%</p>
        </div>

        <div className='flex items-center justify-between bg-background rounded-xl p-6'>
          <div className='flex items-center gap-3'>
            <img src={third} alt="third" className='w-8 h-8' />
            <div className='flex items-center gap-2'>
              <img src={backend} alt="backend" className='w-10 h-10' />
              <p className='text-white font-medium'>Backend Developer</p>
            </div>
          </div>
          <p className='text-white font-semibold text-xl'>20%</p>
        </div>

      </div>
    </div>
  )
}

export default ResultCard
