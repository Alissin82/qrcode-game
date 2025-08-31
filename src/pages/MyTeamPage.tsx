import { useState } from 'react';
import Menu from '../components/ui/Menu';
import { MY_TEAM_DATA } from '../utils/constants';

// --- My Team Page Component ---
export const MyTeamPage = () => {
    const [isBoy, setIsBoy] = useState(true);
    const bgColor = isBoy
        ? 'bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-700'
        : 'bg-gradient-to-br from-pink-700 via-rose-600 to-pink-500';

    return (
        <div
            className={`min-h-screen ${bgColor} font-sans text-white`}
        >
            <div className='mx-auto w-full max-w-xl p-4 pb-32'>
                {/* My Team Header */}
                <header className='mb-8 flex items-center justify-between rounded-2xl bg-black/30 p-5 shadow-lg backdrop-blur-md transition hover:scale-[1.02] hover:shadow-2xl'>
                        <div className='flex items-center gap-6'>
                        <div className='avatar'>
                        <div className='w-16 rounded-full ring-4 ring-yellow-400 shadow-xl animate-pulse'>
                            <img
                                src={MY_TEAM_DATA.avatar}
                                alt={MY_TEAM_DATA.name}
                            />
                        </div>
                    </div>
                    <div className='text-right'>
                        <p className='text-xl font-extrabold drop-shadow-md'>
                            {MY_TEAM_DATA.name}
                        </p>
                        <p className='text-sm opacity-90'>
                            {MY_TEAM_DATA.members.length} نفر اعضا
                        </p>
                    </div>
                    </div>
                    <div className='text-left'>
                        <p className='text-3xl font-extrabold text-yellow-300 drop-shadow-lg'>
                            {MY_TEAM_DATA.score.toLocaleString('fa-IR')}
                        </p>
                        <p className='text-sm opacity-80'>امتیاز</p>
                    </div>

                </header>

                {/* Team Members Section */}
                <section>
                    <div className='mb-4 flex items-center justify-start gap-4 py-4'>
                        <button className='btn btn-circle btn-ghost bg-white/20 shadow-md hover:bg-white/30 transition hover:scale-110'>
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
                                className='text-white'
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
                        <h2 className='text-2xl font-extrabold tracking-wide drop-shadow-lg'>
                            اعضای تیم من
                        </h2>
                    </div>
                    <div className='space-y-4'>
                        {MY_TEAM_DATA.members.map((member, index) => (
                            <div
                                key={member.id}
                                className='mt-2 flex items-center justify-between rounded-xl bg-white/10 p-3 text-right backdrop-blur-md shadow-md transition hover:scale-[1.02] hover:bg-white/20'
                            >
                                  <div className='flex items-center gap-3'>
                                    <div className='flex items-center gap-3'>
                                                                                <span className='font-bold text-white'>
                                            {index + 1}
                                        </span>
                                             <div className='avatar'>
                                            <div className='w-10 rounded-full ring-2 ring-primary shadow-md hover:scale-110 transition'>
                                                <img
                                                    src={member.avatar}
                                                    alt={member.name}
                                                />
                                            </div>
                                        </div>
                                        <span className='font-semibold'>
                                            {member.name}
                                        </span>
                                   

                                    </div>
                                </div>
                                <span className='font-bold text-yellow-200 drop-shadow'>
                                    {member.role}
                                </span>
                              
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <Menu />
        </div>
    );
};