import wave1 from '../../assets/wave1.png';
import wave2 from '../../assets/wave2.png';
import wave3 from '../../assets/wave3.png';
import './wave.css';

const Wave = () => {
  return (
    <div className="wave-container">
      <div className="wave-wrapper animate-wave1">
        <img src={wave1} alt="wave1" className="wave-img" />
        <img src={wave1} alt="wave1" className="wave-img" />
        <img src={wave1} alt="wave1" className="wave-img" />
        <img src={wave1} alt="wave1" className="wave-img" />
      </div>

      <div className="wave-wrapper animate-wave2">
        <img src={wave2} alt="wave2" className="wave-img" />
        <img src={wave2} alt="wave2" className="wave-img" />
        <img src={wave2} alt="wave2" className="wave-img" />
        <img src={wave2} alt="wave2" className="wave-img" />
      </div>

      <div className="wave-wrapper animate-wave3">
        <img src={wave3} alt="wave3" className="wave-img" />
        <img src={wave3} alt="wave3" className="wave-img" />
        <img src={wave3} alt="wave3" className="wave-img" />
        <img src={wave3} alt="wave3" className="wave-img" />
      </div>
    </div>
  );
};

export default Wave;