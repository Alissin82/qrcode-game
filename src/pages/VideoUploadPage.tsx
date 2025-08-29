import { useState } from 'react';

const VIDEO_UPLOAD_DATA = {
    title: 'پیدا کردن مکان و بارگذاری ویدیو',
    currentStep: 3,
    totalSteps: 7,
};

export const VideoUploadPage = () => {
    const [isBoy, setIsBoy] = useState(true);
    const [selectedFile, setSelectedFile] =
        useState<File | null>(null);
    const bgColor = isBoy
        ? 'bg-blue-800'
        : 'bg-pink-600';

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
            console.log(
                'File selected:',
                e.target.files[0].name,
            );
        }
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
                                VIDEO_UPLOAD_DATA.title
                            }
                        </h2>
                        <p className='mt-2 opacity-80'>
                            مرحله{' '}
                            {
                                VIDEO_UPLOAD_DATA.currentStep
                            }{' '}
                            از{' '}
                            {
                                VIDEO_UPLOAD_DATA.totalSteps
                            }
                        </p>
                    </div>

                    <div className='mb-2 space-y-4 rounded-2xl bg-black/20 p-6 text-right'>
                        <h3 className='font-bold'>
                            راهنمای انجام ویدیو
                        </h3>
                        <p>
                            لطفاً یک ویدیو از محیط
                            اطراف خود ضبط کرده و
                            آپلود کنید. ویدیو باید
                            حداقل ۳۰ ثانیه و
                            حداکثر ۲ دقیقه باشد.
                        </p>
                        <div className='flex items-center gap-2 rounded-lg bg-black/20 p-3'>
                            <span>📍</span>
                            <p className='text-sm'>
                                نکته: مطمئن شوید
                                ویدیو با کیفیت
                                مناسب و صدای واضح
                                ضبط شده باشد.
                            </p>
                        </div>
                    </div>

                    <div className='flex flex-col items-center gap-4 rounded-2xl bg-black/20 p-8'>
                        <div className='flex h-20 w-20 items-center justify-center rounded-full bg-pink-500'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='36'
                                height='36'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            >
                                <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path>
                                <polyline points='17 8 12 3 7 8'></polyline>
                                <line
                                    x1='12'
                                    y1='3'
                                    x2='12'
                                    y2='15'
                                ></line>
                            </svg>
                        </div>
                        <h3 className='text-lg font-bold'>
                            انتخاب ویدیو
                        </h3>
                        <p className='text-sm opacity-80'>
                            ویدیو خود را از گالری
                            انتخاب کنید
                        </p>
                        <label
                            htmlFor='video-upload'
                            className='btn btn-outline w-full max-w-xs border-white/50 text-white'
                        >
                            انتخاب ویدیو
                        </label>
                        <input
                            id='video-upload'
                            type='file'
                            accept='video/*'
                            className='hidden'
                            onChange={
                                handleFileChange
                            }
                        />
                        {selectedFile && (
                            <p className='mt-2 text-sm'>
                                فایل انتخاب شده:{' '}
                                {
                                    selectedFile.name
                                }
                            </p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};
