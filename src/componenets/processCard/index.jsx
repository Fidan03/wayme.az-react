import process from '../../data/porcessData'

const ProcessCard = () => {
  return (
    <div className='grid grid-cols-3 gap-8 max-w-7xl mx-auto py-8 gap-10'>
        {process.map((item) => (
            <div key={item.id} className='flex flex-col items-center text-center px-4 bg-[#132746] rounded-[15px] pb-5 px-10'>
                <div className='size-[64px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex justify-center items-center rounded-b-[20px]'>
                    <p className='font-bold text-[36px] text-white'>{item.icon}</p>
                </div>
                <h3 className='text-white font-semibold text-xl mb-2'>{item.title}</h3>
                <p className='text-[#A2A8B2]'>{item.desc}</p>
            </div>
        ))}
    </div>
  )
}

export default ProcessCard