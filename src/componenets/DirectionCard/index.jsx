import { useState } from 'react'
import data from '../../data/directionsData'
import downArrow from '../../assets/arrowDown.png'

const DirectionCard = () => {
  const [hovered, setHovered] = useState(null)

  return (
    <>
      {data.map((item) => (
        <div
          key={item.id}
          className='flex gap-5 px-8 py-6 rounded-xl bg-transparent-[20%] justify-between items-center w-95'
          style={{ backgroundColor: item.color, opacity: '0.8' }}
          onMouseEnter={() => setHovered(item.id)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className='flex justify-start gap-4'>
            <div className='flex items-center gap-3 flex-wrap'>
              <img src={item.icon} alt={item.title} className='w-12 h-12' />
            </div>
            <div>
              <h3 className='text-white font-semibold text-lg text-start'>{item.title}</h3>
              <p className='text-[#A2A8B2] mt-2 text-start' style={{ color: item.textColor }}>
                {hovered === item.id ? 'Ətraflı bax' : item.description}
              </p>
            </div>
          </div>
          <div className="rounded-[10px] size-6 flex justify-center items-center cursor-pointer" style={{ backgroundColor: item.arrowColor }}>
            <img src={downArrow} alt="downArrow" className="w-6 h-6 object-contain"/>
          </div>
        </div>
      ))}
    </>
  )
}

export default DirectionCard
