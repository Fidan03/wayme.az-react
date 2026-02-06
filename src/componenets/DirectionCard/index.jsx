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
          <div
            className="flex gap-5 px-8 py-6 rounded-xl justify-between items-center w-95"
            style={{ backgroundColor: item.color }}
          >
            <div className="flex justify-start gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-12 h-12"
                />
              </div>

              <div>
                <h3 className="text-white font-semibold text-lg text-start">
                  {item.title}
                </h3>

                <p className="relative mt-2 h-6">
                  <span
                    className={`absolute transition-opacity duration-300 ${
                      hovered === item.id ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ color: item.textColor }}
                  >
                    Ətraflı bax
                  </span>

                  <span
                    className={`absolute transition-opacity duration-300 ${
                      hovered === item.id ? 'opacity-0' : 'opacity-100'
                    }`}
                    style={{ color: item.textColor }}
                  >
                    {item.description}
                  </span>
                </p>
              </div>
            </div>

            <div
              className="rounded-[10px] size-6 flex justify-center items-center cursor-pointer"
              style={{ backgroundColor: item.arrowColor }}
              onClick={() => setActiveModal(item)}
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
