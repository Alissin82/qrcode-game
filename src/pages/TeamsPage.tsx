import { useState } from 'react';
import Menu from '../components/ui/Menu';
import {
    MY_TEAM_DATA,
    TEAMS_DATA,
} from '../utils/constants';

export const TeamsLeaderboardPage = () => {
    const [isBoy, setIsBoy] = useState(true); // Set to false for pink theme by default
    const bgColor = isBoy
        ? 'bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-700'
        : 'bg-gradient-to-br from-pink-700 via-rose-600 to-pink-500';
    const topThreeTeams = TEAMS_DATA.slice(0, 3);
    const otherTeams = TEAMS_DATA.slice(3);

    return (
        <div
            className={`min-h-screen ${bgColor} font-sans text-white`}
        >
            <div className='mx-auto w-full max-w-xl p-4 pb-32'>
                {/* My Team Header */}
                <header className='mb-6 flex items-center justify-between rounded-2xl bg-black/30 p-4 shadow-lg backdrop-blur-md transition hover:scale-[1.02] hover:shadow-2xl'>
                    <div className='flex text-right items-center gap-3'>
                        <div className='avatar p-2'>
                            <div className='w-16 rounded-full ring-4 ring-yellow-400 shadow-md'>
                                <img
                                    src={MY_TEAM_DATA.avatar}
                                    alt={MY_TEAM_DATA.name}
                                />
                            </div>
                        </div>
                        <div>
                            <p className='text-lg font-extrabold drop-shadow-md'>
                                {MY_TEAM_DATA.name}
                            </p>
                            <p className='text-sm opacity-90'>
                                {MY_TEAM_DATA.members.length} نفر اعضا
                            </p>
                            <button className='btn btn-xs btn-warning mt-2 rounded-full shadow-md hover:scale-105 transition'>
                                مشاهده اعضا
                            </button>
                        </div>
                    </div>
                    <div className='text-left'>
                        <p className='text-2xl font-extrabold text-yellow-300 drop-shadow-lg'>
                            {MY_TEAM_DATA.score.toLocaleString('fa-IR')}
                        </p>
                        <p className='text-sm opacity-80'>
                            امتیاز
                        </p>
                    </div>
                </header>

                {/* Top Teams Section */}
                <section className='mb-6'>
                    <h2 className='mb-4 text-center text-2xl font-extrabold tracking-wide drop-shadow-lg'>
                        🏆 تیم های برتر
                    </h2>
                    <div className='flex items-end justify-center gap-6'>
                        {topThreeTeams.map((team, index) => (
                            <div
                                key={team.id}
                                className={`flex flex-col items-center transition hover:scale-110 hover:-translate-y-2`}
                            >
                                <div
                                    className={`avatar indicator ${index === 0 ? 'mb-2' : ''}`}
                                >
                                    <span className='indicator-item badge badge-primary text-white font-bold shadow-md'>
                                        {team.rank}
                                    </span>
                                    <div
                                        className={`rounded-full ring-4 overflow-hidden shadow-xl ${index === 0
                                            ? 'w-24 ring-yellow-400 animate-bounce'
                                            : 'w-20 ring-gray-300'}`
                                        }
                                    >
                                        <img
                                            src={team.avatar}
                                            alt={team.name}
                                        />
                                    </div>
                                </div>
                                <p className='font-bold mt-2'>
                                    {team.name}
                                </p>
                                <p className='text-sm text-yellow-200 font-semibold'>
                                    {team.score.toLocaleString('fa-IR')}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Leaderboard List */}
                <section className='space-y-5'>
                    {otherTeams.map((team) => (
                        <div
                            key={team.id}
                            className='mt-2 flex items-center justify-between rounded-xl bg-white/10 px-6 py-4 text-right backdrop-blur-md shadow-md transition hover:scale-[1.02] hover:bg-white/20'
                        >
                            <div className='flex items-center gap-3'>
                                <div className='text-lg font-bold text-white'>
                                    {team.rank}
                                </div>
                                <div className='avatar'>
                                    <div className='w-10 rounded-full ring-2 ring-primary shadow-md'>
                                        <img
                                            src={team.avatar}
                                            alt={team.name}
                                        />
                                    </div>
                                </div>
                                <span className='font-bold'>
                                    {team.name}
                                </span>

                            </div>
                            <div className='text-lg font-extrabold text-yellow-300'>
                                {team.score.toLocaleString('fa-IR')}
                            </div>

                        </div>
                    ))}
                </section>
            </div>
            <Menu />
        </div>
    );
};
