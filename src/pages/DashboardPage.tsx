import {
    useEffect,
    useMemo,
    useState,
} from 'react';
import {
    FaMedal,
    FaStar,
    FaTrophy,
} from 'react-icons/fa6';
import { TbCoinFilled } from 'react-icons/tb';
import BellIcon from '../components/ui/icons/BellIcon';
import SettingsIcon from '../components/ui/icons/SettingIcon';
import Menu from '../components/ui/Menu';
import { apiClient } from '../utils';
import type { AxiosResponse } from 'axios';
import type { ApiResponse } from '../types/apiResponse';

const DashboardPage = () => {
    const [team, setTeam] =
        useState<Team | null>();

    const className = useMemo(() => {
        return team?.gender
            ? 'bg-accent'
            : 'bg-secondary';
    }, [team]);

    const [isScanning, setIsScanning] =
        useState(false);

    useEffect(() => {
        async function fetchTeam() {
            const response: AxiosResponse<
                ApiResponse<Team>
            > = await apiClient.get(`/teams/me`);
            setTeam(response.data.data);
        }

        fetchTeam();
    }, []);
    
    return (
        <div
            className={`min-h-screen ${className} font-sans text-white`}
        >
            {/* Main container with responsive max-width */}
            <div className='relative mx-auto w-full max-w-xl p-4 pb-24'>
                {/* Header Section */}
                <header className='mb-6 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <button className='btn btn-square btn-ghost bg-white/10'>
                            <SettingsIcon />
                        </button>
                        <div className='indicator'>
                            <span className='indicator-item badge badge-secondary'>
                                3
                            </span>
                            <button className='btn btn-square btn-ghost bg-white/10'>
                                <BellIcon />
                            </button>
                        </div>
                    </div>
                    <div className='flex items-center gap-3 text-right'>
                        <div>
                            <p className='font-bold'>
                                {team?.name}
                            </p>
                            <p className='text-sm opacity-80'>
                                سطح سرباز
                            </p>
                        </div>
                        <div className='avatar'>
                            <div className='ring-primary ring-offset-base-100 w-14 rounded-full ring ring-offset-2'>
                                <img
                                    src='/images/profile.jpg'
                                    alt='User Avatar'
                                />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Coins Section */}
                <div className='flex items-center justify-between gap-2'>
                    <section
                        className={`mb-8 flex w-1/2 items-center justify-between rounded-xl bg-black/10 p-4`}
                    >
                        <span className='text-2xl font-bold tracking-widest text-indigo-300'>
                            {team?.score}
                        </span>
                        <div className='flex items-center gap-2'>
                            <div className='rounded-full bg-indigo-300 p-1'>
                                <FaTrophy />
                            </div>
                        </div>
                    </section>
                    <section
                        className={`mb-8 flex w-1/2 items-center justify-between rounded-xl bg-black/10 p-4`}
                    >
                        <span className='text-2xl font-bold tracking-widest text-yellow-500'>
                            {team?.coin}
                        </span>
                        <div className='flex items-center gap-2'>
                            <div className='rounded-full bg-yellow-400 p-1 text-black'>
                                <TbCoinFilled />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Missions Section */}
                <section className='mb-8 text-center'>
                    <h2 className='mb-6 text-2xl font-bold'>
                        آماده انجام ماموریت هستی؟
                    </h2>
                    <div className='grid grid-cols-2 gap-4'>
                        {/* Daily Reward Card */}
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
                        {/* Perform Mission Card */}
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
                </section>

                {/* Team Progress Section */}
                <section className='mb-8 rounded-xl bg-black/10 p-6'>
                    <h3 className='mb-4 text-lg font-bold'>
                        پیشرفت تیم
                    </h3>
                    <div className='mb-2 flex items-center justify-between text-sm opacity-80'>
                        <span>۷۰ ٪</span>
                        <span>
                            ٪ ۳۰ تا دریافت جایزه
                            بعدی!
                        </span>
                    </div>
                    <progress
                        dir='rtl'
                        className='progress progress-primary w-full'
                        value='70'
                        max='100'
                    ></progress>
                </section>

                {/* Floating Action Button */}
                <div
                    onClick={() =>
                        setIsScanning(true)
                    }
                    className='fixed right-6 bottom-18 z-20 lg:right-auto lg:left-1/2 lg:ml-[280px]'
                >
                    <div className='indicator'>
                        <span className='indicator-item badge top-[12px] right-[12px] h-[32px] w-[32px] rounded-full border-none bg-rose-800 text-base'>
                            ⚡
                        </span>
                        <button className='btn btn-lg btn-warning h-[98px] w-[98px] flex-col rounded-full bg-yellow-500 text-xs text-rose-600'>
                            <FaStar
                                size={8}
                                className={
                                    'h-[32px] w-[32px]'
                                }
                            />
                            ارتقا امتیاز
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <Menu />
        </div>
    );
};

export default DashboardPage;
