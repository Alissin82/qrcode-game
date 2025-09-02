import { useContext, useEffect, useMemo, useState } from 'react';
import Menu from '../components/ui/Menu';
import { apiClient } from '../utils';
import { MY_TEAM_DATA } from '../utils/constants';
import { TeamDataContext } from '../contexts/TeamDataContext';

export const TeamsLeaderboardPage = () => {
    const { data: team, setData: setTeam } = useContext(TeamDataContext);

    const className = useMemo(() => {
        return team?.gender ? 'bg-accent' : 'bg-secondary';
    }, [team]);

    const [teams, setTeams] = useState<TeamLeadbord[]>();

    const [loading, setLoading] = useState<boolean>(true);

    const getTeams = async () => {
        try {
            const res = await apiClient.get(`/leaderboard`);
            setTeams(res.data.data.teams);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTeams();
    }, []);

    if (loading) return;
    return (
        <div className={`min-h-screen ${className} font-sans text-white`}>
            <div className="mx-auto w-full max-w-xl p-4 pb-32">
                {/* My Team Header */}
                {/* <header className='mb-6 flex items-center justify-between rounded-2xl bg-black/30 p-4 shadow-lg backdrop-blur-md transition hover:scale-[1.02] hover:shadow-2xl'>
                    <div className='flex items-center gap-3 text-right'>
                        <div className='avatar p-2'>
                            <div className='w-16 rounded-full shadow-md ring-4 ring-yellow-400'>
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
                        <div>
                            <p className='text-lg font-extrabold drop-shadow-md'>
                                {
                                    MY_TEAM_DATA.name
                                }
                            </p>
                            <p className='text-sm opacity-90'>
                                {
                                    MY_TEAM_DATA
                                        .members
                                        .length
                                }{' '}
                                نفر اعضا
                            </p>
                            <button className='btn btn-xs btn-warning mt-2 rounded-full shadow-md transition hover:scale-105'>
                                مشاهده اعضا
                            </button>
                        </div>
                    </div>
                    <div className='text-left'>
                        <p className='text-2xl font-extrabold text-yellow-300 drop-shadow-lg'>
                            {MY_TEAM_DATA.score.toLocaleString(
                                'fa-IR',
                            )}
                        </p>
                        <p className='text-sm opacity-80'>
                            امتیاز
                        </p>
                    </div>
                </header> */}

                {/* Top Teams Section */}
                <section className="mb-6">
                    <h2 className="mb-4 text-center text-2xl font-extrabold tracking-wide drop-shadow-lg">
                        🏆 تیم های برتر
                    </h2>
                    <div className="flex items-end justify-center gap-6">
                        {teams!.slice(0, 3).map((team, index) => (
                            <div
                                key={team.id}
                                className={`flex flex-col items-center transition hover:-translate-y-2 hover:scale-110`}
                            >
                                <div className={`avatar indicator ${index === 0 ? 'mb-2' : ''}`}>
                                    <div className="avatar avatar-placeholder">
                                        <div className="text-neutral-content w-12 rounded-full bg-gray-900 p-2">
                                            <span>{index + 1}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-2 font-bold py-1">{team.name}</p>
                                <p className="text-sm font-semibold text-yellow-200 py-1">{team.score.toLocaleString('fa-IR')} <p className='px-1 inline-block text-[10px]'>امتیاز</p></p>
                                <p className="text-sm font-semibold text-yellow-200">{team.coin.toLocaleString('fa-IR')} <p className='px-1 inline-block text-[10px]'>سکه</p></p>

                            </div>
                        ))}
                    </div>
                </section>

                {/* Leaderboard List */}
                <section className="space-y-5">
                    {teams?.slice(3).map((team, index) => (
                        <div
                            key={team.id}
                            className="mt-2 flex items-center justify-between rounded-xl bg-white/10 px-6 py-4 text-right shadow-md backdrop-blur-md transition hover:scale-[1.02] hover:bg-white/20"
                        >
                            <div className="flex items-center gap-3">
                                <div className="avatar avatar-placeholder">
                                    <div className="text-neutral-content w-12 rounded-full bg-gray-900 p-2">
                                        <span>{index + 1}</span>
                                    </div>
                                </div>
                                <span className="font-bold">{team.name}</span>
                            </div>
                            <div className="text-lg font-extrabold text-yellow-300 flex items-center">
                                {team.score.toLocaleString('fa-IR')}<p className='px-1 inline-block text-[10px]'>امتیاز</p>
                                <p className='inline-block mx-2'>{"-"}</p>
                                {team.coin.toLocaleString('fa-IR')}<p className='px-1 inline-block text-[10px]'>سکه</p>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
            <Menu />
        </div>
    );
};
