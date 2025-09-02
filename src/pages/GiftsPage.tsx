import { useContext, useMemo } from 'react';
import { FaMedal } from 'react-icons/fa6';
import { TbCoinFilled } from 'react-icons/tb';
import GetScors from '../components/ui/GetScors';
import Menu from '../components/ui/Menu';
// import { MY_TEAM_DATA } from '../utils/constants';
import { TeamDataContext } from '../contexts/TeamDataContext';

export const GiftsPage = () => {
    const { data: team, setData: setTeam } = useContext(TeamDataContext);

    const className = useMemo(() => {
        return team?.gender ? 'bg-accent' : 'bg-secondary';
    }, [team]);

  

    return (
        <div className={`min-h-screen ${className} font-sans text-white`}>
            <div className="mx-auto w-full max-w-xl p-4 pb-32">
                {/* Top Stats Section */}
                <section className="mb-6 flex items-center justify-around rounded-2xl bg-black/20 p-6 text-center shadow-md">
                    <div>
                        <p className="text-3xl font-extrabold">{team?.coin}</p>
                        <p className="mt-1 flex items-center justify-center gap-2 text-sm opacity-80">
                            سکه
                            <FaMedal size={22} />
                        </p>
                    </div>
                    <div className="h-16 w-px bg-white/20"></div>{' '}
                    <div>
                        <p className="text-3xl font-extrabold">{team?.score}</p>
                        <p className="mt-1 flex items-center justify-center gap-2 text-sm opacity-80">
                            امتیاز
                            <TbCoinFilled size={22} />
                        </p>
                    </div>
                </section>

                <GetScors />

                {/* Filter Tabs */}
                {/* <section className='mb-6 flex items-center justify-between rounded-2xl bg-black/20 p-2 text-sm shadow-md'>
                    <button
                        onClick={() =>
                            setActiveTab('all')
                        }
                        className={`btn flex-1 gap-2 rounded-xl font-bold transition ${
                            activeTab === 'all'
                                ? activeBtnColor
                                : 'btn-ghost text-white hover:bg-white/10'
                        }`}
                    >
                        همه جوایز
                        <FaHeart />
                    </button>
                    <button
                        onClick={() =>
                            setActiveTab(
                                'achievements',
                            )
                        }
                        className={`btn flex-1 gap-2 rounded-xl font-bold transition ${
                            activeTab ===
                            'achievements'
                                ? activeBtnColor
                                : 'btn-ghost text-white hover:bg-white/10'
                        }`}
                    >
                        دستاورد ها
                        <LuNotepadText />
                    </button>
                    <button
                        onClick={() =>
                            setActiveTab('daily')
                        }
                        className={`btn flex-1 gap-2 rounded-xl font-bold transition ${
                            activeTab === 'daily'
                                ? activeBtnColor
                                : 'btn-ghost text-white hover:bg-white/10'
                        }`}
                    >
                        جوایز روزانه
                        <FaStar />
                    </button>
                </section> */}

                {/* Gifts List */}
                {/* <section className='flex flex-col gap-3'>
                    {GIFTS_DATA.map((gift) => (
                        <div
                            key={gift.id}
                            className={`flex items-center justify-between rounded-2xl p-4 shadow-md ${
                                gift.claimed
                                    ? 'bg-white/30'
                                    : 'bg-black/20'
                            }`}
                        >
                            <div className='flex items-center gap-4'>
                                <div className='avatar placeholder flex items-center self-center align-middle'>
                                    <div
                                        className={`flex h-16 w-16 items-center justify-center rounded-full ${gift.color}`}
                                    >
                                        <span className='flex items-center justify-center self-center text-3xl'>
                                            {
                                                gift.icon
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <p className='text-lg font-extrabold'>
                                        {
                                            gift.title
                                        }
                                    </p>
                                    <p className='text-sm opacity-80'>
                                        {gift.reward.toLocaleString(
                                            'fa-IR',
                                        )}{' '}
                                        سکه
                                    </p>
                                </div>
                            </div>
                            <div className='flex items-center gap-4'>
                                {gift.claimed ? (
                                    <button className='btn btn-disabled rounded-xl bg-gray-500/50 text-white shadow-inner'>
                                        دریافت شده
                                    </button>
                                ) : (
                                    <button
                                        className={`btn rounded-xl font-bold shadow-md transition hover:scale-105 ${claimBtnColor}`}
                                    >
                                        دریافت
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </section> */}
            </div>
            <Menu />
        </div>
    );
};
