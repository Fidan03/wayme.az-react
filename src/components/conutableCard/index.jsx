import { useState, useEffect } from 'react';

const CountableCard = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    questionCount: 0,
    durationRange: '',
    freePercent: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/WayMe/stats', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`API Error: ${res.status}`);
        }

        const data = await res.json();

        // Ensure all fields exist to avoid uncontrolled input warnings
        setStats({
          userCount: data.userCount ?? 0,
          questionCount: data.questionCount ?? 0,
          durationRange: data.durationRange ?? '',
          freePercent: data.freePercent ?? 0,
        });
      } catch (err) {
        console.error('API error:', err);
        setError('Server is temporarily unavailable. Try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="text-white">Yüklənir...</p>;
  if (error) return <p className="text-red-500">Xəta: {error}</p>;

  const cards = [
    { title: stats.userCount, desc: 'İstifadəçi' },
    { title: stats.questionCount, desc: 'Sual' },
    { title: stats.durationRange, desc: 'Dəqiqə' },
    { title: stats.freePercent + '%', desc: 'Pulsuz' },
  ];

  return (
    <div className="flex justify-between flex-wrap">
      {cards.map((item, index) => (
        <div
          key={index}
          className="mx-5 my-10 p-[2px] rounded-[15px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        >
          <div className="flex flex-col justify-center items-center text-center bg-[#132746] w-full sm:w-[285px] h-[163px] rounded-[13px] p-6 sm:p-0">
            <p className="font-bold text-[36px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {item.title}
            </p>
            <p className="text-[19px] font-medium text-[#A2A8B2]">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountableCard;