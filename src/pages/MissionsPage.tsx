import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMedal, FaStar, FaCheck, FaMapMarkerAlt, FaPencilAlt, FaPlay, FaCamera, FaClock } from 'react-icons/fa';

import Menu from '../components/ui/Menu';

const MissionsPage = () => {
    const navigate = useNavigate();
    const [isBoy, setIsBoy] = useState(true);
    
    // Stats data from backend - these would be fetched from API
    const [completedOperations, setCompletedOperations] = useState({ completed: 3, total: 10 });
    const [completedLocations, setCompletedLocations] = useState({ completed:1, total: 6 });

    let className = isBoy ? 'bg-accent' : 'bg-secondary';

    const missions = [
        {
            id: 1,
            title: 'عملیات سری رد خون',
            status: 'completed',
            statusText: 'تکمیل شده',
            statusIcon: FaCheck,
            statusColor: 'text-green-500',
            icon: FaMedal,
            iconBg: 'bg-pink-500',
            location: 'نماز خانه',
            operationsCompleted: '۱/۴',
            progress: 100,
            buttonText: 'شروع با اسکن QRCode',
            buttonIcon: FaPlay,
            buttonBg: 'bg-gradient-to-r from-green-500 to-yellow-500'
        },
        {
            id: 2,
            title: 'عملیات مکانیزم ماشه',
            status: 'reserved',
            statusText: 'رزرو شده',
            statusIcon: FaPencilAlt,
            statusColor: 'text-purple-500',
            icon: FaStar,
            iconBg: 'bg-purple-500',
            location: 'نماز خانه',
            operationsCompleted: '۱/۴',
            progress: 0,
            buttonText: 'رزرو شده',
            buttonIcon: null,
            buttonBg: 'bg-blue-800'
        },
        {
            id: 3,
            title: 'عملیات خیبر 5',
            status: 'in-progress',
            statusText: 'در حال انجام',
            statusIcon: FaClock,
            statusColor: 'text-yellow-500',
            icon: FaCamera,
            iconBg: 'bg-purple-600',
            location: 'نماز خانه',
            operationsCompleted: '۱/۴',
            progress: 25,
            buttonText: 'شروع با اسکن QRCode',
            buttonIcon: FaPlay,
            buttonBg: 'bg-gradient-to-r from-green-500 to-yellow-500'
        }
    ];

    return (
        <div className={`min-h-screen ${className} font-sans text-white`} dir='rtl'>
            {/* Main container with responsive max-width */}
            <div className='relative mx-auto w-full max-w-xl p-4 pb-24'>
               

                {/* Stats Section */}
                <div className='mb-6'>
                    <div className='rounded-2xl p-6' style={{ backgroundColor: '#FFFFFF3D' }}>
                        <div className='grid grid-cols-2 gap-4'>
                            {/* Right Section - Completed Operations */}
                            <div className='text-center border-l border-white/20 pl-4'>
                                <h3 className='text-sm font-bold mb-2'>عملیات تکمیل شده</h3>
                                <div className='text-2xl font-bold text-white'>{completedOperations.completed}/{completedOperations.total}</div>
                            </div>
                            
                            {/* Left Section - Completed Locations */}
                            <div className='text-center pr-4'>
                                <h3 className='text-sm font-bold mb-2'>مکان های تکمیل شده</h3>
                                <div className='text-2xl font-bold text-white'>{completedLocations.completed}/{completedLocations.total}</div>
                            </div>
                        </div>
                    </div>
                </div>
                

                {/* Page Title */}
                <div className='mb-6 text-center'>
                    <h1 className='text-3xl font-bold'>لیست عملیات</h1>
                    <p className='mt-2 text-sm opacity-80'>ماموریت‌های خود را انتخاب کنید و جایزه بگیرید</p>
                </div>

                {/* Missions Grid - Matching the image design */}
                <div className='space-y-4'>
                    {missions.map((mission) => (
                        <div key={mission.id} className='rounded-2xl p-6 mb-4' style={{ backgroundColor: '#00000052' }}>
                            {/* Header Row */}
                            <div className='flex items-center justify-between mb-4'>
                                {/* Right: Icon */}
                                <div className={`${mission.iconBg} rounded-lg p-3 w-12 h-12 flex items-center justify-center`}>
                                    <mission.icon size={20} className='text-white' />
                                </div>
                                
                                {/* Center: Title */}
                                <h3 className='text-lg font-bold text-center flex-1 mx-4'>{mission.title}</h3>
                                
                                {/* Left: Status */}
                                <div className='flex items-center gap-2'>
                                    <span className='text-sm'>{mission.statusText}</span>
                                    <mission.statusIcon size={16} className={mission.statusColor} />
                                </div>
                            </div>
                            
                            {/* Progress Section */}
                            <div className='mb-4'>
                                <div className='mb-2 text-sm'>پیشرفت کلی</div>
                                <div className='flex items-center gap-3'>
                                    <progress 
                                        className='progress progress-primary flex-1' 
                                        value={mission.progress} 
                                        max='100'
                                    ></progress>
                                    <span className='text-sm'>{mission.progress}%</span>
                                </div>
                            </div>
                            
                            {/* Details Section */}
                            <div className='grid grid-cols-2 gap-3 mb-4'>
                                <div className='bg-blue-800/50 rounded-lg p-3'>
                                    <div className='text-sm mb-1'>مکان:</div>
                                    <div className='flex items-center gap-2'>
                                        <FaMapMarkerAlt size={14} />
                                        <span className='text-sm'>{mission.location}</span>
                                    </div>
                                </div>
                                <div className='bg-blue-800/50 rounded-lg p-3'>
                                    <div className='text-sm mb-1'>عملیات انجام شده</div>
                                    <span className='text-sm'>{mission.operationsCompleted}</span>
                                </div>
                            </div>
                            
                            {/* Action Button */}
                            <button 
                                onClick={() => {
                                    if (mission.buttonText === 'شروع با اسکن QRCode') {
                                        navigate(`/mission/${mission.id}`);
                                    }
                                }}
                                className={`${mission.buttonBg} w-full py-3 rounded-lg text-white font-medium flex items-center justify-center gap-2`}
                            >
                                {mission.buttonIcon && <mission.buttonIcon size={16} />}
                                {mission.buttonText}
                            </button>
                        </div>
                    ))}
                </div>



                {/* Quick Actions */}
                <section className='mt-8 rounded-xl bg-black/10 p-6'>
                    <h3 className='mb-4 text-lg font-bold text-center'>عملیات سریع</h3>
                    <div className='grid grid-cols-2 gap-4'>
                        <button className='btn bg-primary border-none text-white'>
                            <FaMedal className='mr-2' />
                            ماموریت جدید
                        </button>
                        <button className='btn bg-yellow-500 border-none text-white'>
                            <FaStar className='mr-2' />
                            جایزه روزانه
                        </button>
                    </div>
                </section>

                {/* Floating Action Button */}
                <div className='fixed right-6 bottom-18 z-20 lg:right-auto lg:left-1/2 lg:ml-[280px]'>
                    <div className='indicator'>
                        <span className='indicator-item badge h-8 w-8 rounded-full border-none bg-rose-800 text-base'>
                            ⚡
                        </span>
                        <button className='btn btn-lg btn-warning h-18 w-18 flex-col rounded-full text-xs text-rose-600'>
                            <FaStar size={32} />
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

export default MissionsPage; 