import resultsData from '../../data/results'

const ResultsCard = () => {
  return (
    <div className='grid grid-cols-4 gap-8 max-w-7xl mx-auto py-8'>
      {resultsData.map((item) => (
        <div key={item.id} className='flex flex-col items-center text-center px-4 bg-[#132746] rounded-[15px] pb-5'>
          <h3 className='text-white font-semibold text-xl mb-2'>{item.title}</h3>
          <p className='text-[#A2A8B2]'>{item.desc}</p>
        </div>
      ))}
    </div>
  )
}

export default ResultsCard