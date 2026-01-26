import resultsData from '../../data/results'
import success from '../../assets/success.png'

const ResultsCard = () => {
  return (
    <div className='grid grid-cols-2 gap-x-15 gap-y-10 max-w-7xl mx-auto py-8'>
      {resultsData.map((item) => (
        <div key={item.id} className='flex mt-10'>
          <img src={success} alt="success" className='size-[40px] mr-5'/>
          <div>
            <h3 className='text-white font-semibold text-xl mb-2'>{item.title}</h3>
            <p className='text-[#A2A8B2]'>{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ResultsCard