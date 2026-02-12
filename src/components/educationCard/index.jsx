import education from '../../data/educationMockData'

const EducationCard = () => {
  return (
    <div className='max-w-7xl mx-auto grid grid-cols-3 gap-6 px-4'>
      {education.map((item) => (
        <div
          key={item.id}
          className='flex gap-[20px] bg-[#132746] px-8 py-6 rounded-xl flex-col'
        >
            <div className='flex items-center gap-3'>
                <img src={item.icon} alt={item.title} className='w-12 h-12' />
                <h3 className='text-white font-semibold text-lg'>
                    {item.title}
                </h3>
            </div>

          <div>
            <p className='text-[#A2A8B2] text-sm mt-2'>
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default EducationCard
