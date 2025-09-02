import { useContext, useEffect, useMemo, useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import Menu from '../components/ui/Menu';
import { apiClient } from '../utils';
import { useNavigate } from 'react-router-dom';
import { TeamDataContext } from '../contexts/TeamDataContext';
import { FaGamepad, FaTrophy } from "react-icons/fa";


export const GamesPage = () => {
    const { data: team, setData: setTeam } = useContext(TeamDataContext);

    const className = useMemo(() => {
        return team?.gender ? 'bg-accent' : 'bg-secondary';
    }, [team]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const [gamesList, setGamesList] = useState<any>([]);
    const [score, setScore] = useState<any>();

    const getGames = async () => {
        try {
            const res = await apiClient.get(`/games`);
            setGamesList(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getScores = async () => {
        try {
            const res = await apiClient.get(`/games/score`);

            setScore(res.data.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleGoToGame = (id: number) => {
        navigate(`/games/${id}`);
    };

    useEffect(() => {
        getGames();
        getScores();
    }, []);

    if (isLoading) return;
    return (
        <div className={`min-h-screen ${className} font-sans text-white`}>
            <div className="mx-auto w-full max-w-xl p-4 pb-32">
                {/* Header */}
                <header className="mb-6 flex items-center justify-start gap-4">
                    <button className="btn btn-circle btn-ghost bg-white/20" onClick={() => navigate('/dashboard')}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                    <h1 className="text-xl font-bold">ستاره های طلایی</h1>
                </header>

                {/* Golden Star */}
                <section className="mb-6 rounded-2xl bg-black/20 p-4 text-center">
                    <div className="avatar placeholder">
                        <div className="flex w-24 items-center justify-center rounded-full bg-yellow-500">
                            <span className="flex h-full w-full items-center justify-center">
                                <FaStar size={40} className="text-rose-700" />
                            </span>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <section className="mt-6 grid grid-cols-2 gap-4 text-center">
                        <div className="rounded-2xl bg-black/20 p-4">
                            <p className="text-2xl font-bold">{score.total_score}</p>
                            <p className="text-sm opacity-80">امتیاز کلی تیم شما</p>
                        </div>
                        <div className="rounded-2xl bg-black/20 p-4">
                            <p className="text-2xl font-bold">{score.incoming_score}</p>
                            <p className="text-sm opacity-80">امتیاز های دریافتی</p>
                        </div>
                    </section>
                </section>

                {/* Filter Tabs */}
                {/* <section className='mb-6 flex items-center justify-between gap-2 rounded-2xl p-2 text-sm'>
                    <button
                        onClick={() =>
                            setActiveTab('all')
                        }
                        className={`flex-1 rounded-xl py-2 font-bold transition-all duration-300 ${
                            activeTab === 'all'
                                ? isBoy
                                    ? 'scale-105 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                                    : 'scale-105 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white shadow-lg'
                                : 'bg-white/20 text-black hover:bg-white/30'
                        }`}
                    >
                        همه بازی ها
                    </button>
                    <button
                        onClick={() =>
                            setActiveTab(
                                'digital',
                            )
                        }
                        className={`flex-1 rounded-xl py-2 font-bold transition-all duration-300 ${
                            activeTab ===
                            'digital'
                                ? isBoy
                                    ? 'scale-105 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                                    : 'scale-105 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white shadow-lg'
                                : 'bg-white/20 text-black hover:bg-white/30'
                        }`}
                    >
                        بازی دیجیتال
                    </button>
                    <button
                        onClick={() =>
                            setActiveTab('card')
                        }
                        className={`flex-1 rounded-xl py-2 font-bold transition-all duration-300 ${
                            activeTab === 'card'
                                ? isBoy
                                    ? 'scale-105 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                                    : 'scale-105 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white shadow-lg'
                                : 'bg-white/20 text-black hover:bg-white/30'
                        }`}
                    >
                        بازی کارتی
                    </button>
                </section> */}

                {/* Games List */}
                <section className="space-y-3">
                    <h3 className="mb-2 text-right text-lg font-bold">لیست بازی ها</h3>
                    {gamesList.map((item: any) => (
                        <div
                            key={item.id}
                            className="mt-2 flex items-center justify-between rounded-2xl bg-black/20 p-4"
                            onClick={() => handleGoToGame(item.id)}
                        >
                            <div className="flex items-center gap-4">
                                <div className="avatar placeholder">
                               <div
  className={`w-16 h-16 p-4 flex items-center justify-center rounded-2xl shadow-lg 
  ${team?.gender
    ? "bg-gradient-to-br from-indigo-700 via-purple-800 to-blue-700" // 🌌 پسرانه
    : "bg-gradient-to-br from-pink-400 via-rose-500 to-fuchsia-600" // 🌸 دخترانه
  }`}
>
  <FaGamepad className="text-3xl drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] text-white" />
</div>
                                </div>

                                <div className="text-right">
                                    <p className="font-bold">{item.title}</p>
                                    {/* <p className='text-xs opacity-80'>
                                            {
                                                item.description
                                            }
                                        </p> */}
                                </div>
                            </div>
                            <button className={`btn btn-circle font-bold transition-all duration-300 ${className}`}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    color='#ffffff'
                                >
                                    <path d="M8 5v14l11-7z"></path>
                                </svg>
                            </button>
                        </div>
                    ))}
                </section>
            </div>
            <Menu />
        </div>
    );
};
