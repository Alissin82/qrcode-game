import { useState } from 'react';
import {
    FaArrowRight,
    FaBook,
    FaClock,
    FaDownload,
    FaFileAlt,
    FaImage,
    FaKey,
    FaMapMarkerAlt,
    FaPlay,
    FaPuzzlePiece,
    FaVideo,
} from 'react-icons/fa';
import {
    useNavigate,
    useParams,
} from 'react-router-dom';
import Menu from '../components/ui/Menu';

const MissionDetailPage = () => {
    const { missionId } = useParams();
    const navigate = useNavigate();
    const [isBoy, setIsBoy] = useState(true);

    let className = isBoy
        ? 'bg-accent'
        : 'bg-secondary';

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
                buttonBg: 'bg-yellow-500',
            },
            {
                id: 2,
                title: 'چهار گزینه ای',
                icon: FaFileAlt,
                iconBg: 'bg-blue-400',
                status: 'locked',
                buttonText: 'آماده شروع',
                buttonBg: 'bg-gray-500',
            },
            {
                id: 3,
                title: 'داکیومنت',
                icon: FaFileAlt,
                iconBg: 'bg-gray-600',
                status: 'locked',
                buttonText: 'آماده شروع',
                buttonBg: 'bg-gray-500',
            },
            {
                id: 4,
                title: 'پازل',
                icon: FaPuzzlePiece,
                iconBg: 'bg-pink-500',
                status: 'locked',
                buttonText: 'آماده شروع',
                buttonBg: 'bg-gray-500',
            },
            {
                id: 5,
                title: 'تصویر',
                icon: FaImage,
                iconBg: 'bg-yellow-500',
                status: 'locked',
                buttonText: 'آماده شروع',
                buttonBg: 'bg-gray-500',
            },
            {
                id: 6,
                title: 'متن',
                icon: FaFileAlt,
                iconBg: 'bg-gray-600',
                status: 'locked',
                buttonText: 'آماده شروع',
                buttonBg: 'bg-gray-500',
            },
        ],
    };

    return (
        <div
            className={`min-h-screen ${className} font-sans text-white`}
            dir='rtl'
        >
            {/* Main container with responsive max-width */}
            <div
                className='relative mx-auto w-full max-w-xl p-4 pb-24'
                dir='rtl'
            >
                {/* Header Section */}
                <header>
                    {/* Back Button */}
                    <div className='mb-4 flex items-center justify-start'>
                        <button
                            onClick={() =>
                                navigate(
                                    '/missions',
                                )
                            }
                            className='btn btn-circle bg-white text-black hover:bg-gray-100'
                        >
                            <FaArrowRight />
                        </button>
                        <span className='text mr-3 font-bold'>
                            بازگشت
                        </span>
                    </div>

                    {/* Mission Title Card */}
                    <div
                        className='rounded-t-2xl p-6'
                        dir='rtl'
                        style={{
                            backgroundColor:
                                '#00000052',
                        }}
                    >
                        <div
                            className='mb-3 flex flex-row-reverse items-center justify-end gap-2'
                            dir='rtl'
                        >
                            <h1 className='text-xl font-bold'>
                                {mission.title}
                            </h1>
                            <div className='btn rounded-lg bg-purple-600 p-2'>
                                <FaKey
                                    size={20}
                                    className='text-yellow-400'
                                />
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <FaMapMarkerAlt
                                size={16}
                            />
                            <span className='text-sm'>
                                {mission.location}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Overall Progress Section */}

                <section className='mb-6'>
                    <div
                        className='mb-4 rounded-b-xl p-4'
                        style={{
                            backgroundColor:
                                '#00000052',
                        }}
                    >
                        <h2 className='mb-2 text-right text-lg font-bold'>
                            پیشرفت کلی
                        </h2>
                        <div className='flex flex-row-reverse items-center gap-3'>
                            <span className='font text-sm'>
                                {mission.progress}
                                ٪
                            </span>
                            <progress
                                className='progress progress-warning flex-1'
                                value={
                                    mission.progress
                                }
                                max='100'
                            ></progress>
                        </div>
                        <div className='mt-3 grid grid-cols-2 gap-4'>
                            <div
                                className='rounded-xl p-4'
                                style={{
                                    backgroundColor:
                                        '#FFFFFF3D',
                                }}
                            >
                                <div className='mb-2 flex items-center gap-2'>
                                    <FaClock
                                        size={16}
                                    />
                                    <span className='text-sm'>
                                        زمان
                                        تخمینی
                                        عملیات:
                                    </span>
                                </div>
                                <div className='text-lg font-bold'>
                                    {
                                        mission.estimatedTime
                                    }
                                </div>
                            </div>
                            <div
                                className='rounded-xl p-4'
                                style={{
                                    backgroundColor:
                                        '#FFFFFF3D',
                                }}
                            >
                                <div className='mb-2 text-sm'>
                                    عملیات انجام
                                    شده
                                </div>
                                <div className='text-lg font-bold'>
                                    {
                                        mission.operationsCompleted
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                </section>

                {/* Instructions Section */}
                <section className='mb-6'>
                    <div
                        className='rounded-2xl p-6'
                        style={{
                            backgroundColor:
                                '#00000052',
                        }}
                    >
                        <div className='mb-4 flex items-center gap-3'>
                            <h2 className='text-lg font-bold'>
                                راهنمای انجام
                            </h2>
                            <FaBook size={20} />
                        </div>
                        <p className='mb-4 text-right text-sm leading-relaxed'>
                            برای تکمیل ماموریت،
                            تمام مراحل باید به
                            ترتیب انجام شوند. هر
                            مرحله پس از تکمیل
                            مرحله قبلی باز می‌شود.
                            برای تکمیل ماموریت،
                            تمام مراحل باید به
                            ترتیب انجام شوند. هر
                            مرحله پس از تکمیل
                            مرحله قبلی باز می‌شود.
                            برای تکمیل ماموریت،
                            تمام مراحل باید به
                            ترتیب انجام شوند. هر
                            مرحله پس از تکمیل
                            مرحله قبلی باز می‌شود.
                        </p>
                        <button className='btn w-full border-none bg-white text-black'>
                            <FaDownload className='ml-2' />
                            دانلود راهنمای بازی
                        </button>
                    </div>
                </section>

                {/* Mission Steps Section */}
                <section className='mb-6'>
                    <h2 className='mb-4 text-right text-lg font-bold'>
                        مراحل مأموریت
                    </h2>
                    <div className='space-y-3'>
                        {mission.steps.map(
                            (step) => (
                                <div
                                    key={step.id}
                                    className='mb-3 rounded-xl p-4'
                                    style={{
                                        backgroundColor:
                                            '#00000052',
                                    }}
                                >
                                    <div className='flex items-center justify-between'>
                                        {/* Step Info */}
                                        <div className='flex items-center gap-3'>
                                            <div
                                                className={`${step.iconBg} flex h-10 w-10 items-center justify-center rounded-lg p-2`}
                                            >
                                                <step.icon
                                                    size={
                                                        18
                                                    }
                                                    className='text-white'
                                                />
                                            </div>
                                            <span className='font-medium'>
                                                {
                                                    step.title
                                                }
                                            </span>
                                        </div>

                                        {/* Action Button */}
                                        <button
                                            className={`${step.buttonBg} flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-white`}
                                        >
                                            <FaPlay
                                                size={
                                                    14
                                                }
                                            />
                                            {
                                                step.buttonText
                                            }
                                        </button>
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                </section>

                {/* Floating Action Button */}
                <div className='fixed bottom-18 left-6 z-20 lg:right-1/2 lg:left-auto lg:mr-[280px]'>
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
