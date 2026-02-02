import data from '../../data/directionsData'
import downArrow from '../../assets/arrowDown.png'

const DirectionCard = () => {
  return (
    <>
      {data.map((item) => (
        <div
          key={item.id}
          className='flex gap-[20px] px-8 py-6 rounded-xl bg-transparent-[20%] justify-center' 
          style={{ backgroundColor: item.color, opacity: '0.8' }}
        >
          <div className='flex items-center gap-3 flex-wrap'>
            <img src={item.icon} alt={item.title} className='w-12 h-12' />
          </div>
          <div>
            <h3 className='text-white font-semibold text-lg'>{item.title}</h3>
            <p className='text-[#A2A8B2] mt-2'>{item.description}</p>
          </div>
          <div className="rounded-full p-2" style={{ backgroundColor: item.arrowColor }}>
            <img src={downArrow} alt="downArrow" />
          </div>
        </div>
      ))}
    </>
  )
}

export default DirectionCard
