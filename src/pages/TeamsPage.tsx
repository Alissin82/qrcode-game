import { useState } from 'react';
import Menu from '../components/ui/Menu';
import {
    MY_TEAM_DATA,
    TEAMS_DATA,
} from '../utils/constants';

export const TeamsLeaderboardPage = () => {
    const [isBoy, setIsBoy] = useState(false); // Set to false for pink theme by default
    const bgColor = isBoy
        ? 'bg-blue-800'
        : 'bg-pink-600'; // Example theme colors

    const topThreeTeams = TEAMS_DATA.slice(0, 3);
    const otherTeams = TEAMS_DATA.slice(3);

    return (
        <div
            className={`min-h-screen ${bgColor} font-sans text-white`}
        >
            <div className='mx-auto w-full max-w-xl p-4 pb-32'>
                {/* My Team Header */}
                <header className='mb-6 flex items-center justify-between rounded-2xl bg-black/20 p-4'>
                    <div className='text-right'>
                        <p className='text-lg font-bold'>
                            {MY_TEAM_DATA.name}
                        </p>
                        <p className='text-sm'>
                            {
                                MY_TEAM_DATA
                                    .members
                                    .length
                            }{' '}
                            نفر اعضا
                        </p>
                        <button className='btn btn-xs btn-warning mt-2'>
                            مشاهده اعضا
                        </button>
                    </div>
                    <div className='text-left'>
                        <p className='text-2xl font-bold'>
                            {MY_TEAM_DATA.score.toLocaleString(
                                'fa-IR',
                            )}
                        </p>
                        <p className='text-sm'>
                            امتیاز
                        </p>
                    </div>
                    <div className='avatar'>
                        <div className='w-16 rounded-full'>
                            <img
                                src={
                                    MY_TEAM_DATA.avatar
                                }
                                alt={
                                    MY_TEAM_DATA.name
                                }
                            />
                        </div>
                    </div>
                </header>

                {/* Top Teams Section */}
                <section className='mb-6'>
                    <h2 className='mb-4 text-center text-xl font-bold'>
                        تیم های برتر
                    </h2>
                    <div className='flex items-end justify-center gap-4'>
                        {topThreeTeams.map(
                            (team, index) => (
                                <div
                                    key={team.id}
                                    className={`flex flex-col items-center ${index === 0 ? 'order-2' : index === 1 ? 'order-1' : 'order-3'}`}
                                >
                                    <div
                                        className={`avatar indicator ${index === 0 ? 'mb-2' : ''}`}
                                    >
                                        <span className='indicator-item badge badge-primary'>
                                            {
                                                team.rank
                                            }
                                        </span>
                                        <div
                                            className={`w-20 rounded-full ring-4 ${index === 0 ? 'w-24 ring-yellow-400' : 'ring-gray-400'}`}
                                        >
                                            <img
                                                src={
                                                    team.avatar
                                                }
                                                alt={
                                                    team.name
                                                }
                                            />
                                        </div>
                                    </div>
                                    <p className='font-bold'>
                                        {
                                            team.name
                                        }
                                    </p>
                                    <p className='text-sm'>
                                        {team.score.toLocaleString(
                                            'fa-IR',
                                        )}
                                    </p>
                                </div>
                            ),
                        )}
                    </div>
                </section>

                {/* Leaderboard List */}
                <section className='space-y-5'>
                    {otherTeams.map((team) => (
                        <div
                            key={team.id}
                            className='mt-2 flex items-center justify-between rounded-lg border-1 bg-white/20 p-3 text-right'
                        >
                            <div className='text-lg font-bold'>
                                {team.score.toLocaleString(
                                    'fa-IR',
                                )}
                            </div>
                            <div className='flex items-center gap-3'>
                                <div className='flex items-center gap-3'>
                                    <span>
                                        {
                                            team.name
                                        }
                                    </span>
                                    <div className='avatar'>
                                        <div className='w-10 rounded-full'>
                                            <img
                                                src={
                                                    team.avatar
                                                }
                                                alt={
                                                    team.name
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className='text-lg font-bold'>
                                        {
                                            team.rank
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
            <Menu />
        </div>
    );
};
