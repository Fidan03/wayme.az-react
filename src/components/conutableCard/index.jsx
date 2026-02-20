import { useState, useEffect } from 'react';

const CountableCard = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    questionCount: 0,
    durationRange: '',
    freePercent: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/WayMe/stats');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats({
          userCount: data.userCount,
          questionCount: data.questionCount,
          durationRange: data.durationRange,
          freePercent: data.freePercent
        });
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p className="text-white">Yüklənir...</p>;
  }

  if (error) {
    return <p className="text-red-500">Xəta: {error}</p>;
  }

  const cards = [
    { title: stats.userCount, desc: 'İstifadəçi' },
    { title: stats.questionCount, desc: 'Sual' },
    { title: stats.durationRange, desc: 'Dəqiqə' },
    { title: stats.freePercent + '%', desc: 'Pulsuz' }
  ];

  return (
    <div className="flex justify-between flex-wrap">
      {cards.map((item, index) => (
        <div
          key={index}
          className="mx-5 my-10 p-[2px] rounded-[15px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        >
          <div className="flex flex-col justify-center items-center text-center bg-[#132746] w-[285px] h-[163px] rounded-[13px]">
            <p className="font-bold text-[36px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {item.title}
            </p>
            <p className="text-[19px] font-medium text-[#A2A8B2]">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountableCard;