import process from '../../data/porcessData';
import './process.css';

const ProcessCard = () => {
  return (
    <div className="grid grid-cols-3 gap-10 max-w-7xl mx-auto py-8">
      {process.map((item, index) => (
        <div
          key={item.id}
          className={`flex flex-col items-center text-center px-10 pb-5 bg-[#132746] rounded-[15px] 
            ${index < 3 ? 'animate-from-top' : 'animate-from-bottom'}`}
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className="w-[64px] h-[64px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex justify-center items-center rounded-b-[20px] mb-4">
            <p className="font-bold text-[36px] text-white">{item.icon}</p>
          </div>
          <h3 className="text-white font-semibold text-xl mb-2">{item.title}</h3>
          <p className="text-[#A2A8B2]">{item.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default ProcessCard;
