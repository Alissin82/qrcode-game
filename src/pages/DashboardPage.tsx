import type { AxiosResponse } from 'axios';
import {
    useContext,
    useEffect,
    useMemo,
} from 'react';
import {
    FaMedal,
    FaTrophy,
} from 'react-icons/fa6';
import {
    LuAlarmClock,
    LuLogOut,
} from 'react-icons/lu';
import { TbCoinFilled } from 'react-icons/tb';
import SettingsIcon from '../components/ui/icons/SettingIcon';
import Menu from '../components/ui/Menu';
import Upgrade from '../components/ui/Upgrade';
import { TeamDataContext } from '../contexts/TeamDataContext.ts';
import type { ApiResponse } from '../types/apiResponse';
import { apiClient } from '../utils';
import { useNavigate } from 'react-router-dom';
import BellIcon from '../components/ui/icons/BellIcon.tsx';

const DashboardPage = () => {
    const navigate = useNavigate();
    const { data: team, setData: setTeam } =
        useContext(TeamDataContext);

    const className = useMemo(() => {
        return team?.gender
            ? 'bg-accent'
            : 'bg-secondary';
    }, [team]);

    useEffect(() => {
        async function fetchTeam() {
            const response: AxiosResponse<
                ApiResponse<Team>
            > = await apiClient.get(`/teams/me`);
            setTeam(response.data.data);
        }

        if (!team) fetchTeam();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem(`token`);
        navigate(`/login`);
    };

    return (
        <div
            className={`min-h-screen ${className} font-sans text-white`}
        >
            <div className='relative mx-auto w-full max-w-xl p-4 pb-24'>
                <header className='mb-6 flex items-center justify-between rounded-2xl bg-white/20 p-4'>
                    <div className='flex items-center gap-3 text-right'>
                        <div className='avatar'>
                            <div className='ring-offset-base-100 w-14 rounded-full ring ring-amber-200 ring-offset-2'>
                                <img
                                    src='/images/logo3.jpg'
                                    alt='User Avatar'
                                />
                            </div>
                        </div>
                        <div>
                            <p className='font-bold'>
                                {team?.name}
                            </p>
                            {/* <p className="text-sm opacity-80">
                                سطح سرباز
                            </p> */}
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <button
                            className='btn btn-square btn-ghost bg-white/10'
                            onClick={() =>
                                navigate(
                                    '/settings',
                                )
                            }
                        >
                            <SettingsIcon />
                        </button>
                        <div
                            className='indicator'
                            onClick={() =>
                                navigate(
                                    '/notifications',
                                )
                            }
                        >
                            <button className='btn btn-square btn-ghost bg-white/10'>
                                <BellIcon />
                            </button>
                        </div>
                        <div
                            className='indicator'
                            onClick={() =>
                                handleLogout()
                            }
                        >
                            <button className='btn btn-square btn-ghost bg-white/10'>
                                <LuLogOut
                                    size={24}
                                />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Coins Section */}
                <div className='flex items-center justify-between gap-2'>
                    <section
                        className={`mb-8 flex w-1/2 items-center justify-between rounded-xl bg-black/10 p-4`}
                    >
                        <div className='flex items-center gap-2'>
                            <div className='rounded-full bg-indigo-300 p-1'>
                                <FaTrophy />
                            </div>
                        </div>
                        <span className='text-2xl font-bold tracking-widest text-indigo-300'>
                            {team?.score}
                        </span>
                    </section>
                    <section
                        className={`mb-8 flex w-1/2 items-center justify-between rounded-xl bg-black/10 p-4`}
                    >
                        <div className='flex items-center gap-2'>
                            <div className='rounded-full bg-yellow-400 p-1 text-black'>
                                <img src="/images/coin_1fa99.png" alt="nist" width={16} height={16} />
                            </div>
                        </div>
                        <span className='text-2xl font-bold tracking-widest text-yellow-500'>
                            {team?.coin}
                        </span>
                    </section>
                </div>

                {/* Missions Section */}
                {/* <section className='mb-8 text-center'>
                    <h2 className='mb-6 text-2xl font-bold'>
                        آماده انجام ماموریت هستی؟
                    </h2>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='bg-primary flex flex-col items-center justify-between rounded-2xl p-6'>
                            <div className='mb-4 rounded-full bg-white/20 p-2'>
                                <FaMedal />
                            </div>
                            <h3 className='mb-2 text-base font-bold lg:text-xl'>
                                دریافت جایزه
                                روزانه
                            </h3>
                            <p className='mb-4 text-sm opacity-90'>
                                12:59:00 تا دریافت
                                جایزه
                            </p>
                            <button className='btn bg-neutral w-full rounded-full border-none text-white'>
                                500 سکه جایزه
                            </button>
                        </div>
                        <div className='flex flex-col items-center justify-between rounded-2xl bg-yellow-500 p-6'>
                            <div className='mb-4 rounded-full bg-black/20 p-2'>
                                <FaMedal />
                            </div>
                            <h3 className='mb-2 text-base font-bold lg:text-xl'>
                                انجام ماموریت
                            </h3>
                            <p className='mb-4 text-sm opacity-90'>
                                3 سوال باقی مونده
                            </p>
                            <button className='btn bg-primary w-full rounded-full border-none text-white'>
                                500 سکه جایزه
                            </button>
                        </div>
                    </div>
                </section> */}

                {/* Team Progress Section */}
                {/* <section className='mb-8 rounded-xl bg-black/10 p-6'>
                    <div className='flex items-center justify-between align-middle'>
                        <h3 className='mb-5 text-lg font-bold'>
                            پیشرفت تیم
                        </h3>
                        <div className='mb-2 flex items-center justify-between text-sm opacity-80'>
                            <span>۷۰ ٪</span>
                        </div>
                    </div>
                    <progress
                        dir='rtl'
                        className='progress progress-primary w-full'
                        value='70'
                        max='100'
                    ></progress>
                    <span className='my-2 flex justify-center'>
                        ٪ ۳۰ تا دریافت جایزه بعدی!
                    </span>
                </section> */}
                <Upgrade />
            </div>

            {/* Bottom Navigation */}
            <Menu />
        </div>
    );
};

export default DashboardPage;
