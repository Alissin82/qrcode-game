import {
    useEffect,
    useMemo,
    useState,
} from 'react';
import {
    FaMedal,
    FaRocket,
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

    // Gender-based background and header glassmorphism
    // gender: false = female, true = male
    const className = useMemo(() => {
        if (team?.gender === false) {
            // female
            return 'bg-gradient-to-br from-pink-400 via-fuchsia-500 to-rose-400';
        } else if (team?.gender === true) {
            // male
            return 'bg-gradient-to-br from-blue-500 via-indigo-700 to-cyan-400';
        } else {
            return 'bg-secondary';
        }
    }, [team]);

    // Gender-based header glass style
    const headerGlass = useMemo(() => {
        if (team?.gender === false) {
            // female
            return 'backdrop-blur-xl bg-white/30 border border-pink-200/40 shadow-lg';
        } else if (team?.gender === true) {
            // male
            return 'backdrop-blur-xl bg-white/20 border border-blue-200/40 shadow-lg';
        } else {
            return 'backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg';
        }
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
            className={`min-h-screen ${className} font-sans text-white transition-colors duration-700`}
        >
            {/* Main container with responsive max-width */}
            <div className='relative mx-auto w-full max-w-xl p-4 pb-24'>
                {/* Header Section */}
                <header className={`mb-6 flex items-center justify-between rounded-2xl px-4 py-3 ${headerGlass} transition-all duration-700`}>
                    <div className='flex bg items-center gap-3 text-right'>
                        <div className='avatar'>
                            <div className='ring-primary ring-offset-base-100 w-14 rounded-full ring ring-offset-2 transition-all duration-500 hover:scale-110'>
                                <img
                                    src='/images/profile.jpg'
                                    alt='User Avatar'
                                    className='transition-all duration-500 hover:scale-110'
                                />
                            </div>
                        </div>
                        <div>
                            <p className='font-bold'>
                                {team?.name}
                            </p>
                            <p className='text-sm opacity-80'>
                                سطح سرباز
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>

                        <button className='btn btn-square btn-ghost bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-white/20 active:scale-95'>
                            <SettingsIcon />
                        </button>
                        <div className='indicator'>
                            <span className='indicator-item badge badge-secondary animate-bounce'>
                                3
                            </span>
                            <button className='btn btn-square btn-ghost bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-white/20 active:scale-95'>
                                <BellIcon />
                            </button>
                        </div>
                    </div>

                </header>

                {/* Coins Section */}
                <div className='flex items-center justify-between gap-2'>
                    <section
                        className={`mb-8 flex w-1/2 items-center justify-between rounded-xl bg-black/10 p-4 transition-all duration-300 hover:scale-105 hover:bg-indigo-900/30`}
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
                        className={`mb-8 flex w-1/2 items-center justify-between rounded-xl bg-black/10 p-4 transition-all duration-300 hover:scale-105 hover:bg-yellow-200/30`}
                    >
                        <div className='flex items-center gap-2'>
                            <div className='rounded-full bg-yellow-400 p-1 text-black'>
                                <TbCoinFilled />
                            </div>
                        </div>
                        <span className='text-2xl font-bold tracking-widest text-yellow-500'>
                            {team?.coin}
                        </span>

                    </section>
                </div>

                {/* Missions Section */}
                <section className='mb-8 text-center'>
                    <h2 className='mb-6 text-2xl font-bold'>
                        آماده انجام ماموریت هستی؟
                    </h2>
                    <div className='grid grid-cols-2 gap-4'>
                        {/* Daily Reward Card */}
                        <div className='bg-primary flex flex-col items-center justify-between rounded-2xl p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-primary/90'>
                            <div className='mb-4 rounded-full bg-white/20 p-2 animate-pulse'>
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
                            <button className='btn bg-neutral w-full rounded-full border-none text-white transition-all duration-300 hover:scale-105 active:scale-95'>
                                500 سکه جایزه
                            </button>
                        </div>
                        {/* Perform Mission Card */}
                        <div className='flex flex-col items-center justify-between rounded-2xl bg-yellow-500 p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-yellow-400'>
                            <div className='mb-4 rounded-full bg-black/20 p-2 animate-bounce'>
                                <FaMedal />
                            </div>
                            <h3 className='mb-2 text-base font-bold lg:text-xl'>
                                انجام ماموریت
                            </h3>
                            <p className='mb-4 text-sm opacity-90'>
                                3 سوال باقی مونده
                            </p>
                            <button className='btn bg-primary w-full rounded-full border-none text-white transition-all duration-300 hover:scale-105 active:scale-95'>
                                500 سکه جایزه
                            </button>
                        </div>
                    </div>
                </section>

                {/* Team Progress Section */}
                <section className='mb-8 rounded-xl bg-black/10 p-6 transition-all duration-300 hover:scale-105 hover:bg-black/20'>
                    <div className='flex justify-between'>
                        <div className='order-first mb-4 text-lg font-bold '>
                            پیشرفت تیم
                        </div>
                        <div className='text-sm opacity-80 text-left order-last'>
                            <span>۷۰ ٪</span>
                        </div>
                    </div>
                    <progress
                        dir='rtl'
                        className='progress progress-primary w-full transition-all duration-700'
                        value='70'
                        max='100'
                    ></progress>
                    <span className='flex justify-center'>
                        ٪ ۳۰ تا دریافت جایزه
                        بعدی!
                    </span>
                 
                </section>
                   <div className='fixed bottom-24 justify-start mt-6'>
                        <div
                            onClick={() => setIsScanning(true)}
                            className='cursor-pointer relative'
                        >
                            <div className='indicator'>
                                <span className='indicator-item badge top-[12px] right-[12px] h-[32px] w-[32px] rounded-full border-none bg-rose-800 text-base animate-pulse'>
                                    ⚡
                                </span>
                                <button className='btn btn-lg h-[98px] w-[98px] flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-400 text-base text-rose-600 shadow-2xl border-4 border-yellow-200 transition-all duration-500 hover:shadow-yellow-400/60 active:shadow-lg relative overflow-hidden'>
                                    <FaRocket className='text-yellow-700 animate-bounce-slow drop-shadow-lg' size={36} />
                                    <span className='font-bold whitespace-nowrap drop-shadow-lg transition-colors duration-300 hover:text-yellow-900'>ارتقا امتیاز</span>
                                </button>
                            </div>
                        </div>
                    </div>
                {/* Floating Action Button */}
               
            </div>

            {/* Bottom Navigation */}
            <Menu />
        </div>
    );
};

export default DashboardPage;
