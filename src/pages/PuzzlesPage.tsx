import { useState } from 'react';
import Menu from '../components/ui/Menu';
import { PUZZLE_DATA } from '../utils/constants';
import ComingSoon from '../components/ui/Soon';

export const PuzzleListPage = () => {
    const [isBoy, setIsBoy] = useState(true);
    const [selectedPuzzle, setSelectedPuzzle] = useState(null);
    const bgColor = isBoy
        ? 'bg-accent'
        : 'bg-secondary';

     const hasAPI =
        PUZZLE_DATA &&
        PUZZLE_DATA.pieces &&
        PUZZLE_DATA.pieces.length > 0;



    if (selectedPuzzle) {
        return (
            <PuzzleDetailPage
                puzzle={selectedPuzzle}
                onBack={() =>
                    setSelectedPuzzle(null)
                }
                isBoy={isBoy}
            />
        );
    }

    return (
        <div
            className={`min-h-screen ${bgColor} font-sans text-white`}
        >
            <div className='mx-auto w-full max-w-xl p-4 pb-32'>
                {hasAPI ? (

                <ComingSoon message="بخش پازل‌ها بزودی فعال می‌شود 🧩🚀" />
                ):(
                                     <>
                <section className='mb-6 rounded-2xl bg-black/30 p-6 text-center shadow-lg shadow-black/50'>
                    <h2 className='mb-4 text-xl font-extrabold tracking-wider'>
                        پیشرفت پازل
                    </h2>
                    <progress
                        className='progress progress-primary mb-2 w-full h-4 rounded-full bg-white/20'
                        value={
                            (PUZZLE_DATA.completed /
                                PUZZLE_DATA.total) *
                            100
                        }
                        max='100'
                    ></progress>
                    <div className='flex justify-between text-sm opacity-90 font-semibold'>
                        <span>
                            قطعه{' '}
                            {PUZZLE_DATA.completed}{' '}
                            / {PUZZLE_DATA.total}
                        </span>
                        <span>
                            {PUZZLE_DATA.totalRewards}{' '}
                            کل جوایز
                        </span>
                        <span>
                            {PUZZLE_DATA.completed}{' '}
                            تکمیل شده
                        </span>
                        <span>
                            {PUZZLE_DATA.inProgress}{' '}
                            در دسترس
                        </span>
                    </div>
                </section>

                <section className='grid grid-cols-2 gap-4'>
                    {PUZZLE_DATA.pieces.map(
                        (piece) => (
                            <button
                                key={piece.id}
                                onClick={() =>
                                    piece.status !==
                                        'locked' &&
                                    setSelectedPuzzle(
                                        piece as any,
                                    )
                                }
                                disabled={
                                    piece.status ===
                                    'locked'
                                }
                                className={`relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-2xl p-4 text-center transition-transform duration-300 hover:scale-105 ${piece.status === 'unlocked' ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl shadow-pink-600/50' : 'bg-black/20 shadow-inner'}`}
                            >
                                {piece.status ===
                                    'locked' && (
                                    <div className='absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-2xl'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='48'
                                            height='48'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            stroke='currentColor'
                                            strokeWidth='2'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                        >
                                            <rect
                                                x='3'
                                                y='11'
                                                width='18'
                                                height='11'
                                                rx='2'
                                                ry='2'
                                            ></rect>
                                            <path d='M7 11V7a5 5 0 0 1 10 0v4'></path>
                                        </svg>
                                    </div>
                                )}
                                <div className='mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-black/20 shadow-inner'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='28'
                                        height='28'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    >
                                        <path d='M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z'></path>
                                        <polyline points='14 2 14 8 20 8'></polyline>
                                    </svg>
                                </div>
                                <h3 className='font-bold tracking-wide'>
                                    {piece.title}
                                </h3>
                                {piece.action ===
                                    'scan' && (
                                    <div className='mt-2  cursor-pointer rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-4 py-2 text-sm text-white font-bold shadow-lg shadow-pink-500/50'>
                                        اسکن QR Code
                                    </div>
                                )}
                            </button>
                        ),
                    )}
                </section>
                </>
                )}
            </div>
            <Menu />
        </div>
    );
};

// --- Puzzle Detail Page (QR Scanner) ---
export const PuzzleDetailPage = ({
    puzzle,
    onBack,
    isBoy,
}: any) => {
    const bgColor = isBoy
        ? 'bg-accent'
        : 'bg-secondary';

    return (
        <div
            className={`min-h-screen ${bgColor} flex items-center justify-center font-sans text-white`}
        >
            <div className='w-full max-w-xl p-4'>
                <div className='flex flex-col items-center gap-6 rounded-2xl bg-white p-8 text-center text-black shadow-2xl shadow-pink-600/50'>
                    <div className='flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50 animate-pulse'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='40'
                            height='40'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        >
                            <path d='M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v11A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5v-11zM5 8v8M9 8v8M15 8v8M19 8v8M8 4v2M12 4v2M16 4v2'></path>
                        </svg>
                    </div>
                    <h2 className='text-3xl font-extrabold tracking-wide'>
                        اسکن QR Code
                    </h2>

                    <div className='relative h-64 w-64'>
                        <img
                            src='https://placehold.co/256x256/000000/FFFFFF?text=QR'
                            alt='QR Code Placeholder'
                            className='h-full w-full rounded-lg shadow-lg shadow-black/50'
                        />
                        <span className='absolute top-0 left-0 h-8 w-8 rounded-tl-lg border-t-4 border-l-4 border-yellow-400'></span>
                        <span className='absolute top-0 right-0 h-8 w-8 rounded-tr-lg border-t-4 border-r-4 border-blue-400'></span>
                        <span className='absolute bottom-0 left-0 h-8 w-8 rounded-bl-lg border-b-4 border-l-4 border-green-400'></span>
                        <span className='absolute right-0 bottom-0 h-8 w-8 rounded-br-lg border-r-4 border-b-4 border-pink-400'></span>
                    </div>

                    <button
                        onClick={onBack}
                        className='btn w-full rounded-full text-white text-xl font-bold py-6 shadow-2xl shadow-pink-500/50 transition-transform duration-300 hover:scale-110 hover:shadow-[0_0_35px_rgba(255,255,255,0.7)]'
                        style={{
                            background: isBoy
                                ? 'linear-gradient(to left, #4f46e5, #3b82f6, #06b6d4)'
                                : 'linear-gradient(to left, #f59e0b, #f97316, #facc15)',
                        }}
                    >
                        اسکن QR Code
                    </button>
                </div>
            </div>
        </div>
    );
};
