import { useState } from 'react';
import Menu from '../components/ui/Menu';
import { PUZZLE_DATA } from '../utils/constants';

export const PuzzleListPage = () => {
    const [isBoy, setIsBoy] = useState(true);
    const bgColor = isBoy
        ? 'bg-accent'
        : 'bg-secondary';

    // This would typically come from a router, but we'll simulate it for now
    const [selectedPuzzle, setSelectedPuzzle] =
        useState(null);

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
                <section className='mb-6 rounded-2xl bg-black/20 p-6 text-center'>
                    <h2 className='mb-4 text-xl font-bold'>
                        پیشرفت پازل
                    </h2>
                    <progress
                        className='progress progress-primary mb-2 w-full'
                        value={
                            (PUZZLE_DATA.completed /
                                PUZZLE_DATA.total) *
                            100
                        }
                        max='100'
                    ></progress>
                    <div className='flex justify-between text-sm'>
                        <span>
                            قطعه{' '}
                            {
                                PUZZLE_DATA.completed
                            }{' '}
                            / {PUZZLE_DATA.total}
                        </span>
                        <span>
                            {
                                PUZZLE_DATA.totalRewards
                            }{' '}
                            کل جوایز
                        </span>
                        <span>
                            {
                                PUZZLE_DATA.completed
                            }{' '}
                            تکمیل شده
                        </span>
                        <span>
                            {
                                PUZZLE_DATA.inProgress
                            }{' '}
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
                                className={`relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-2xl p-4 text-center ${piece.status === 'unlocked' ? 'bg-purple-500' : 'bg-black/20'}`}
                            >
                                {piece.status ===
                                    'locked' && (
                                    <div className='absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
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
                                <div className='mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-black/20'>
                                    {/* Placeholder Icon */}
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
                                        <path d='M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z'></path>
                                        <polyline points='14 2 14 8 20 8'></polyline>
                                    </svg>
                                </div>
                                <h3 className='font-bold'>
                                    {piece.title}
                                </h3>
                                {piece.action ===
                                    'scan' && (
                                    <div className='mt-2 rounded-full bg-blue-900 px-3 py-1 text-xs text-white'>
                                        اسکن QR
                                        Code
                                    </div>
                                )}
                            </button>
                        ),
                    )}
                </section>
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
                <div className='flex flex-col items-center gap-6 rounded-2xl bg-white p-8 text-center text-black'>
                    <div className='flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white'>
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
                    <h2 className='text-2xl font-bold'>
                        اسکن QR Code
                    </h2>

                    <div className='relative h-64 w-64'>
                        <img
                            src='https://placehold.co/256x256/000000/FFFFFF?text=QR'
                            alt='QR Code Placeholder'
                            className='h-full w-full'
                        />
                        <span className='absolute top-0 left-0 h-8 w-8 rounded-tl-lg border-t-4 border-l-4 border-yellow-400'></span>
                        <span className='absolute top-0 right-0 h-8 w-8 rounded-tr-lg border-t-4 border-r-4 border-blue-400'></span>
                        <span className='absolute bottom-0 left-0 h-8 w-8 rounded-bl-lg border-b-4 border-l-4 border-green-400'></span>
                        <span className='absolute right-0 bottom-0 h-8 w-8 rounded-br-lg border-r-4 border-b-4 border-pink-400'></span>
                    </div>

                    <button
                        onClick={onBack}
                        className='btn btn-lg w-full rounded-full text-white'
                        style={{
                            background:
                                'linear-gradient(to left, #8B5CF6, #EC4899)',
                        }}
                    >
                        اسکن QR Code
                    </button>
                </div>
            </div>
        </div>
    );
};
