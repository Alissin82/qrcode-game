import { useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import Menu from '../components/ui/Menu';
import { GAMES_DATA } from '../utils/constants';

export const GamesPage = () => {
    const [isBoy, setIsBoy] = useState(false);
    const [activeTab, setActiveTab] =
        useState('all');
    const bgColor = isBoy
        ? 'bg-accent'
        : 'bg-secondary';

    return (
        <div
            className={`min-h-screen ${bgColor} font-sans text-white`}
        >
            <div className='mx-auto w-full max-w-xl p-4 pb-32'>
                {/* Header */}
                <header className='mb-6 flex items-center justify-start gap-4'>
                                        <button className='btn btn-circle btn-ghost bg-white/20'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        >
                            <line
                                x1='5'
                                y1='12'
                                x2='19'
                                y2='12'
                            ></line>
                            <polyline points='12 5 19 12 12 19'></polyline>
                        </svg>
                    </button>
                    <h1 className='text-xl font-bold'>
                        ستاره های طلایی
                    </h1>

                </header>

                {/* Golden Star */}
                <section className='mb-6 text-center bg-black/20 p-4 rounded-2xl'>
                    <div className='avatar placeholder'>
                        <div className='flex w-24 items-center justify-center rounded-full bg-yellow-500'>
                            <span className='flex h-full w-full items-center justify-center'>
                                <FaStar
                                    size={40} className='text-rose-700'
                                />
                            </span>
                        </div>
                    </div>
               
                {/* Stats Section */}
                <section className='mt-6 grid grid-cols-2 gap-4 text-center'>
                    <div className='rounded-2xl bg-black/20 p-4'>
                        <p className='text-2xl font-bold'>
                            ۲,۰۰۰,۰۰۰
                        </p>
                        <p className='text-sm opacity-80'>
                            امتیاز کلی تیم شما
                        </p>
                    </div>
                    <div className='rounded-2xl bg-black/20 p-4'>
                        <p className='text-2xl font-bold'>
                            ۱,۰۰۰,۰۰۰
                        </p>
                        <p className='text-sm opacity-80'>
                            امتیاز های دریافتی
                        </p>
                    </div>
                </section>
                 </section>

                {/* Filter Tabs */}
                <section className='mb-6 flex items-center justify-between rounded-2xl p-2 text-sm gap-2'>
                                        <button
                        onClick={() => setActiveTab('all')}
                        className={`flex-1 rounded-xl py-2 font-bold transition-all duration-300
            ${activeTab === 'all'
                                ? isBoy
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg scale-105 text-white'
                                    : 'bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 shadow-lg scale-105 text-white'
                                : 'bg-white/20 hover:bg-white/30 text-black'
                            }`}
                    >
                        همه بازی ها
                    </button>
                    <button
                        onClick={() => setActiveTab('digital')}
                        className={`flex-1 rounded-xl py-2 font-bold transition-all duration-300
            ${activeTab === 'digital'
                                ? isBoy
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg scale-105 text-white'
                                    : 'bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 shadow-lg scale-105 text-white'
                                : 'bg-white/20 hover:bg-white/30 text-black'
                            }`}
                    >
                        بازی دیجیتال
                    </button>
                    <button
                        onClick={() => setActiveTab('card')}
                        className={`flex-1 rounded-xl py-2 font-bold transition-all duration-300
            ${activeTab === 'card'
                                ? isBoy
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg scale-105 text-white'
                                    : 'bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 shadow-lg scale-105 text-white'
                                : 'bg-white/20 hover:bg-white/30 text-black'
                            }`}
                    >
                        بازی کارتی
                    </button>

                </section>

                {/* Games List */}
                <section className='space-y-3'>
                    <h3 className='mb-2 text-right text-lg font-bold'>
                        همه بازی ها
                    </h3>
                    {GAMES_DATA.map((game) => (
                        <div
                            key={game.id}
                            className='mt-2 flex items-center justify-between rounded-2xl bg-black/20 p-4'
                        >
                            <div className='flex items-center gap-4'>
                                                  <div className='avatar placeholder'>
                                <div
                                    className={`w-16 rounded-lg ${game.color}`}
                                >
                                    <span className='text-3xl items-center justify-center flex h-full w-full'>
                                        {
                                            game.icon
                                        }
                                    </span>
                                </div>
                            </div>
    
                            <div className='text-right'>
                                <p className='font-bold'>
                                    {game.title}
                                </p>
                                <p className='text-xs opacity-80'>
                                    {
                                        game.description
                                    }
                                </p>
                            </div>
                            </div>
                              <button className={`btn btn-circle font-bold transition-all duration-300 
      ${isBoy
                                    ? 'bg-gradient-to-tr from-blue-500 to-purple-600 hover:scale-110'
                                    : 'bg-gradient-to-tr from-yellow-400 via-orange-400 to-pink-400 hover:scale-110'
                                }`}>
                                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
                                    <path d='M8 5v14l11-7z'></path>
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
