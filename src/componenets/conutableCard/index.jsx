import data from '../../data/countableData'

const CountableCard = () => {
  return (
    <div>
        {data.map((item, index) => (
            <div key={index} className='flex flex-col justify-center items-center text-center mx-5 my-10'>
                <p className='font-bold text-[40px] text-white'>{item.title}</p>
                <p className='text-[#A2A8B2] text-[20px]'>{item.desc}</p>
            </div>
        ))}
    </div>
  )
}

export default CountableCard