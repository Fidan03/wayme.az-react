import { useState, useRef } from 'react';
import close from '../assets/close.png';
import downArrow from '../assets/arrowDown.png';
import programming from '../assets/programming.png';

const Modal = ({ item, onClose }) => {
  const [openId, setOpenId] = useState(null);
  const contentRefs = useRef({});

  const handleToggle = (id) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 grid place-items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-[20px] p-px 
                   w-[1300px] max-w-[95vw] max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-background rounded-[20px] p-6 w-full h-full overflow-hidden">

          {/* Header */}
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-[30px] font-semibold text-white">
              {item.title}
            </h1>

            <button
              onClick={onClose}
              className="bg-[#26356B] rounded-full size-[40px] flex items-center justify-center"
            >
              <img
                src={close}
                alt="close"
                className="w-6 h-6 cursor-pointer"
              />
            </button>
          </div>

          <p className="font-medium mb-4 text-[#A2A8B2] text-[20px]">
            Sahələr:
          </p>

          {/* Cards */}
          <div className="flex flex-wrap justify-center gap-5 max-h-[60vh] pr-2 overflow-y-auto">

            {item.directions.map((direction) => {
              const isOpen = openId === direction.id;

              return (
                <div
                  key={direction.id}

                  /* ✅ WHOLE CARD CLICKABLE */
                  onClick={() => handleToggle(direction.id)}

                  className="
                    flex flex-col items-start self-start
                    border border-white/10
                    bg-[#357CFF33]
                    rounded-[20px]
                    px-3 py-2.5
                    w-[275px]
                    cursor-pointer

                    transition-all duration-300 ease-in-out
                    hover:scale-[1.03]
                    hover:bg-[#357CFF55]
                    active:scale-[0.97]
                  "
                >
                  {/* Top */}
                  <div className="flex items-start mb-2.5 w-full">
                    <img
                      src={programming}
                      alt="programming"
                      className="w-[44px] h-[44px] mr-4"
                    />

                    <div>
                      <h3 className="font-semibold text-sm text-white">
                        {direction.title}
                      </h3>

                      <p className="text-xs text-[#A2A8B2]">
                        React, Vue, Angular
                      </p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center w-full pointer-events-none">
                    <img
                      src={downArrow}
                      alt="downArrow"
                      className={`w-[18px] my-1.5 transition-transform duration-300 ease-in-out ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div
                    ref={(el) =>
                      (contentRefs.current[direction.id] = el)
                    }
                    className="overflow-hidden transition-all duration-500 ease-in-out w-full"
                    style={{
                      maxHeight: isOpen
                        ? `${contentRefs.current[direction.id]?.scrollHeight}px`
                        : '0px',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p className="text-sm text-[#A2A8B2] text-center">
                      {direction.description}
                    </p>
                  </div>

                </div>
              );
            })}

          </div>

        </div>
      </div>
    </div>
  );
};

export default Modal;
