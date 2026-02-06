import close from '../assets/close.png';

const Modal = ({ item, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      
      <div className="bg-white rounded-xl p-6 w-[400px] relative">

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">{item.title}</h1>

          <button onClick={onClose}>
            <img src={close} alt="close" className="w-5 h-5" />
          </button>
        </div>

        <p className="font-medium mb-2">Sahələr:</p>

        <p>{item.directions}</p>

      </div>

    </div>
  );
};

export default Modal;
