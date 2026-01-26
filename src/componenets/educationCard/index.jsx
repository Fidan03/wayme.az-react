import React from 'react'
import education from '../../data/educationMockData'

const EducationCard = () => {
  return (
    <div>
        {education.map((item) => (
            <div key={item.id} className='flex bg-[#132746]'>
                <div className=''><img src={item.icon} alt={item.title} className='' /></div>
                <div className=''>
                    <h3 className=''>{item.title}</h3>
                    <p className=''>{item.description}</p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default EducationCard