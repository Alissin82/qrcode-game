import { useState } from 'react';
import { VIDEO_MISSION_DATA } from '../utils/constants';

export const VideoMissionPage = () => {
    const [isBoy, setIsBoy] = useState(true);
    const [step, setStep] = useState(1); // 1 for video, 2 for answer
    const [answer, setAnswer] = useState('');
    const bgColor = isBoy
        ? 'bg-accent'
        : 'bg-secondary';

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Fake API call
        console.log('Submitting answer:', answer);
        alert(`پاسخ شما ثبت شد: ${answer}`);
        // Reset or navigate away
        setStep(1);
        setAnswer('');
    };

    return (
        <div
            className={`min-h-screen ${bgColor} flex items-center justify-center font-sans text-white`}
        >
            <div className='w-full max-w-xl p-4 text-center'>
                {/* Header */}
                <header className='mb-8 flex items-center justify-between'>
                    <h1 className='text-xl font-bold'>
                        بازگشت
                    </h1>
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
                </header>

                {/* Main Content */}
                <main className='space-y-6'>
                    <div className='mb-2 rounded-2xl bg-black/20 p-6'>
                        <h2 className='text-2xl font-bold'>
                            {
                                VIDEO_MISSION_DATA.title
                            }
                        </h2>
                        {step === 2 && (
                            <p className='mt-2 opacity-80'>
                                مرحله ۱ از{' '}
                                {
                                    VIDEO_MISSION_DATA.totalSteps
                                }
                            </p>
                        )}
                    </div>

                    {step === 1 && (
                        <div className='rounded-2xl bg-black/20 p-6'>
                            <img
                                src={
                                    VIDEO_MISSION_DATA.videoThumbnail
                                }
                                alt='Video Thumbnail'
                                className='w-full rounded-lg'
                            />
                        </div>
                    )}

                    {step === 2 && (
                        <form
                            onSubmit={
                                handleSubmit
                            }
                            className='rounded-2xl bg-black/20 p-6 text-right'
                        >
                            <label
                                htmlFor='answer'
                                className='mb-2 block font-bold'
                            >
                                چه چیز اموزنده ای
                                از فیلم دیده شده
                                یاد گرفتید
                            </label>
                            <textarea
                                id='answer'
                                value={answer}
                                onChange={(e) =>
                                    setAnswer(
                                        e.target
                                            .value,
                                    )
                                }
                                className='textarea textarea-bordered h-48 w-full bg-black/20'
                                placeholder='پاسخ خود را در اینجا وارد نمایید'
                            ></textarea>
                        </form>
                    )}

                    {step === 1 && (
                        <button
                            onClick={() =>
                                setStep(2)
                            }
                            className='btn btn-success btn-lg mt-2 w-full'
                        >
                            ادامه مرحله
                        </button>
                    )}

                    {step === 2 && (
                        <button
                            onClick={handleSubmit}
                            type='submit'
                            className='btn btn-success btn-lg mt-2 w-full'
                        >
                            ثبت پاسخ
                        </button>
                    )}
                </main>
            </div>
        </div>
    );
};
