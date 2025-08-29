import { useState } from 'react';
import Menu from '../components/ui/Menu';
import { MY_TEAM_DATA } from '../utils/constants';

// --- My Team Page Component ---
export const MyTeamPage = () => {
    const [isBoy, setIsBoy] = useState(false);
    const bgColor = isBoy
        ? 'bg-blue-800'
        : 'bg-pink-600';

    return (
        <div
            className={`min-h-screen ${bgColor} font-sans text-white`}
        >
            <div className='mx-auto w-full max-w-xl p-4 pb-32'>
                {/* My Team Header */}
                <header className='mb-8 flex items-center justify-between rounded-2xl bg-black/20 p-4'>
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

                {/* Team Members Section */}
                <section>
                    <div className='mb-4 flex items-center justify-between'>
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
                        <h2 className='text-xl font-bold'>
                            اعضای تیم من
                        </h2>
                    </div>
                    <div className='space-y-3'>
                        {MY_TEAM_DATA.members.map(
                            (member, index) => (
                                <div
                                    key={
                                        member.id
                                    }
                                    className='mt-2 flex items-center justify-between rounded-lg border-1 bg-white/20 p-3 text-right'
                                >
                                    <span className='font-bold'>
                                        {
                                            member.role
                                        }
                                    </span>
                                    <div className='flex items-center gap-3'>
                                        <div className='flex items-center gap-3'>
                                            <span>
                                                {
                                                    member.name
                                                }
                                            </span>
                                            <div className='avatar'>
                                                <div className='w-10 rounded-full'>
                                                    <img
                                                        src={
                                                            member.avatar
                                                        }
                                                        alt={
                                                            member.name
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <span className='font-bold'>
                                                {index +
                                                    1}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                </section>
            </div>
            <Menu />
        </div>
    );
};
