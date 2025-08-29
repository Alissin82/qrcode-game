import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowRight, FaKey, FaMapMarkerAlt, FaClock, FaBook, FaDownload, FaPlay, FaVideo, FaFileAlt, FaPuzzlePiece, FaImage } from 'react-icons/fa';
import Menu from '../components/ui/Menu';
import { FaArrowLeft } from 'react-icons/fa6';

const MissionDetailPage = () => {
    const { missionId } = useParams();
    const navigate = useNavigate();
    const [isBoy, setIsBoy] = useState(true);

    let className = isBoy ? 'bg-accent' : 'bg-secondary';

    // Mission data - this would come from backend based on missionId
    const mission = {
        id: missionId,
        title: 'عملیات سری رد خون',
        location: 'بوفه',
        progress: 40,
        estimatedTime: '8 ساعت',
        operationsCompleted: '۱/۷',
        totalOperations: 7,
        steps: [
            {
                id: 1,
                title: 'تماشا ویدیو',
                icon: FaVideo,
                iconBg: 'bg-pink-500',
                status: 'active',
                buttonText: 'آماده شروع',
                buttonBg: 'bg-yellow-500'
            },
            {
                id: 2,
                title: 'چهار گزینه ای',
                icon: FaFileAlt,
                iconBg: 'bg-blue-400',
                status: 'locked',
                buttonText: 'آماده شروع',
                buttonBg: 'bg-gray-500'
            },
            {
                id: 3,
                title: 'داکیومنت',
                icon: FaFileAlt,
                iconBg: 'bg-gray-600',
                status: 'locked',
                buttonText: 'آماده شروع',
                buttonBg: 'bg-gray-500'
            },
            {
                id: 4,
                title: 'پازل',
                icon: FaPuzzlePiece,
                iconBg: 'bg-pink-500',
                status: 'locked',
                buttonText: 'آماده شروع',
                buttonBg: 'bg-gray-500'
            },
            {
                id: 5,
                title: 'تصویر',
                icon: FaImage,
                iconBg: 'bg-yellow-500',
                status: 'locked',
                buttonText: 'آماده شروع',
                buttonBg: 'bg-gray-500'
            },
            {
                id: 6,
                title: 'متن',
                icon: FaFileAlt,
                iconBg: 'bg-gray-600',
                status: 'locked',
                buttonText: 'آماده شروع',
                buttonBg: 'bg-gray-500'
            }
        ]
        
    };

    return (
        <div className={`min-h-screen ${className} font-sans text-white`} dir="rtl">
            {/* Main container with responsive max-width */}
            <div className='relative mx-auto w-full max-w-xl p-4 pb-24' dir='rtl'>
                
                {/* Header Section */}
                <header>
                    {/* Back Button */}
                    <div className='flex items-center justify-start mb-4'>
                        <button 
                            onClick={() => navigate('/missions')}
                            className='btn btn-circle bg-white text-black hover:bg-gray-100'
                        >
                            <FaArrowRight />
                        </button>
                        <span className='mr-3 text font-bold'>بازگشت</span>
                    </div>
                    
                    {/* Mission Title Card */}
                    <div className='rounded-t-2xl p-6' dir='rtl' style={{ backgroundColor: '#00000052' }}>
                        <div className='flex flex-row-reverse items-center justify-end gap-2 mb-3' dir='rtl'>
                            <h1 className=' text-xl font-bold'>{mission.title}</h1>
                            <div className='btn bg-purple-600 rounded-lg p-2'>
                                <FaKey size={20} className='text-yellow-400' />
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <FaMapMarkerAlt size={16} />
                            <span className='text-sm'>{mission.location}</span>
                        </div>
                    </div>
                </header>

                {/* Overall Progress Section */}
            
                <section className='mb-6' >
                    <div className='mb-4 rounded-b-xl p-4' style={{ backgroundColor: '#00000052' }}>
                        <h2 className='text-lg font-bold mb-2 text-right'>پیشرفت کلی</h2>
                        <div className='flex flex-row-reverse items-center gap-3'>
                            <span className='text-sm font'>{mission.progress}٪</span>
                            <progress 
                                className='progress progress-warning flex-1' 
                                value={mission.progress} 
                                max='100'></progress>
                        </div>
                        <div className='grid grid-cols-2 gap-4 mt-3'>
                        <div className='rounded-xl p-4' style={{ backgroundColor: '#FFFFFF3D' }} >
                            <div className='flex items-center gap-2 mb-2'>
                                <FaClock size={16} />
                                <span className='text-sm'>زمان تخمینی عملیات:</span>
                            </div>
                            <div className='text-lg font-bold'>{mission.estimatedTime}</div>
                        </div>
                        <div className='rounded-xl p-4' style={{ backgroundColor: '#FFFFFF3D' }}>
                            <div className='text-sm mb-2'>عملیات انجام شده</div>
                            <div className='text-lg font-bold'>{mission.operationsCompleted}</div>
                        </div>
                    </div>
                    </div>
                    
                    {/* Stats Cards */}
                    
                </section>

                {/* Instructions Section */}
                <section className='mb-6'>
                    <div className='rounded-2xl p-6' style={{ backgroundColor: '#00000052' }}>
                        <div className='flex items-center gap-3 mb-4'>
                            <h2 className='text-lg font-bold'>راهنمای انجام</h2>
                            <FaBook size={20} />
                        </div>
                        <p className='text-sm leading-relaxed mb-4 text-right'>
                            برای تکمیل ماموریت، تمام مراحل باید به ترتیب انجام شوند. هر مرحله پس از تکمیل مرحله قبلی باز می‌شود. 
                            برای تکمیل ماموریت، تمام مراحل باید به ترتیب انجام شوند. هر مرحله پس از تکمیل مرحله قبلی باز می‌شود.
                            برای تکمیل ماموریت، تمام مراحل باید به ترتیب انجام شوند. هر مرحله پس از تکمیل مرحله قبلی باز می‌شود.
                        </p>
                        <button className='btn bg-white text-black border-none w-full'>
                            <FaDownload className='ml-2' />
                            دانلود راهنمای بازی
                        </button>
                    </div>
                </section>

                {/* Mission Steps Section */}
                <section className='mb-6'>
                    <h2 className='text-lg font-bold mb-4 text-right'>مراحل مأموریت</h2>
                    <div className='space-y-3'>
                        {mission.steps.map((step) => (
                            <div key={step.id} className='rounded-xl  mb-3 p-4' style={{ backgroundColor: '#00000052' }}>
                                <div className='flex items-center justify-between'>
                                    {/* Step Info */}
                                    <div className='flex items-center gap-3'>
                                        <div className={`${step.iconBg} rounded-lg p-2 w-10 h-10 flex items-center justify-center`}>
                                            <step.icon size={18} className='text-white' />
                                        </div>
                                        <span className='font-medium'>{step.title}</span>
                                    </div>
                                    
                                    {/* Action Button */}
                                    <button className={`${step.buttonBg} px-4 py-2 rounded-lg text-white font-medium flex items-center gap-2`}>
                                        <FaPlay size={14} />
                                        {step.buttonText}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Floating Action Button */}
                <div className='fixed left-6 bottom-18 z-20 lg:left-auto lg:right-1/2 lg:mr-[280px]'>
                    <div className='indicator'>
                        <span className='indicator-item badge h-8 w-8 rounded-full border-none bg-rose-800 text-base'>
                            ⚡
                        </span>
                        <button className='btn btn-lg btn-warning h-18 w-18 flex-col rounded-full text-xs text-rose-600'>
                            <FaPlay size={32} />
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

export default MissionDetailPage; 