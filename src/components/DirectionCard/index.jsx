import { useState } from 'react';
import data from '../../data/directionsData';
import downArrow from '../../assets/arrowDown.png';
import Modal from '../../modal/index';

const DirectionCard = () => {
  const [hovered, setHovered] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  return (
    <>
      {data.map((item) => (
        <div
          key={item.id}
          onMouseEnter={() => setHovered(item.id)}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Main Card */}
          <div
            className="
              flex gap-5 px-8 py-6 rounded-xl justify-between items-center w-96 cursor-pointer
              
              transition-all duration-500 ease-in-out
              transform-gpu will-change-transform
              
              hover:scale-[1.04]
              hover:shadow-2xl
              hover:brightness-110
              
              active:scale-[0.97]
            "
            style={{ backgroundColor: item.color }}
            onClick={() => setActiveModal(item)}
          >
            {/* Left Side */}
            <div className="flex justify-start gap-4">
              <div className="flex items-center gap-3 flex-wrap shrink-0">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-12 h-12"
                />
              </div>

              <div className="flex flex-col">
                <h3 className="text-white font-semibold text-lg text-start truncate w-60">
                  {item.title}
                </h3>

                <p className="relative mt-2 h-6">
                  {/* Hover Text */}
                  <span
                    className={`absolute transition-opacity duration-400 ease-in-out w-full ${
                      hovered === item.id ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ color: item.textColor }}
                  >
                    Ətraflı bax
                  </span>

                  {/* Default Text */}
                  <span
                    className={`absolute transition-opacity duration-400 ease-in-out w-full ${
                      hovered === item.id ? 'opacity-0' : 'opacity-100'
                    }`}
                    style={{ color: item.textColor }}
                  >
                    {item.description}
                  </span>
                </p>
              </div>
            </div>

            {/* Arrow */}
            <div
              className="
                rounded-[10px] size-6 flex justify-center items-center
                transition-transform duration-500 ease-in-out
                group-hover:rotate-180
              "
              style={{ backgroundColor: item.arrowColor }}
            >
              <img
                src={downArrow}
                alt="downArrow"
                className="w-6 h-6 object-contain"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Modal */}
      {activeModal && (
        <Modal
          item={activeModal}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  );
};

export default DirectionCard;
