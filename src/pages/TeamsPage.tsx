import { useContext, useEffect, useMemo, useState } from 'react';
import Menu from '../components/ui/Menu';
import { apiClient } from '../utils';
import { TeamDataContext } from '../contexts/TeamDataContext';
import { TbCoinFilled } from 'react-icons/tb';
import { FaTrophy } from 'react-icons/fa6';

export const TeamsLeaderboardPage = () => {
    const [teams, setTeams] = useState<TeamLeadbord[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const { data: team } = useContext(TeamDataContext);

    const className = useMemo(() => {
        return team?.gender ? 'bg-accent' : 'bg-secondary';
    }, [team]);

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

    return (
        <div className={`min-h-screen ${className} font-sans text-white`}>
            <div className="mx-auto w-full max-w-xl p-4 pb-32">
                <section className="mb-6">
                    <h2 className="mb-4 text-center text-2xl font-extrabold tracking-wide drop-shadow-lg">
                        🏆 تیم های برتر
                    </h2>
                    <div className="flex items-end justify-center gap-6">
                        {loading ? (
                            <div className={'flex h-full w-full items-center justify-center'}>
                                <span
                                    role="status"
                                    aria-label="Loading"
                                    className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-transparent"
                                ></span>
                            </div>
                        ) : (
                            teams!.slice(0, 3).map((team, index) => (
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
                                    <p className="mt-2 py-1 font-bold">{team.name}</p>
                                    <p className="flex items-center gap-1 text-sm font-semibold text-yellow-200">
                                        {team.score.toLocaleString('fa-IR')}
                                        <FaTrophy />
                                    </p>
                                    <p className="flex items-center gap-1 text-sm font-semibold text-yellow-200/75">
                                        <span>{team.coin.toLocaleString('fa-IR')}</span>
                                        <TbCoinFilled />
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </section>

                <section className="space-y-5">
                    {loading
                        ? null
                        : teams?.slice(3).map((team, index) => (
                              <div
                                  key={team.id}
                                  className="mt-2 flex items-center justify-between rounded-xl bg-white/10 px-6 py-4 text-right shadow-md backdrop-blur-md transition hover:scale-[1.02] hover:bg-white/20"
                              >
                                  <div className="flex items-center gap-3">
                                      <div className="avatar avatar-placeholder">
                                          <div className="text-neutral-content w-12 rounded-full bg-gray-900 p-2">
                                              <span>{index + 4}</span>
                                          </div>
                                      </div>
                                      <span className="font-bold">{team.name}</span>
                                  </div>
                                  <div className="flex items-center gap-5">
                                      <div className="flex items-center gap-1 text-lg font-extrabold text-yellow-300">
                                          {team.score.toLocaleString('fa-IR')}
                                          <FaTrophy />
                                      </div>
                                      <div className="flex items-center gap-1 text-lg font-extrabold text-yellow-300/75">
                                          {team.coin.toLocaleString('fa-IR')}
                                          <TbCoinFilled />
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
