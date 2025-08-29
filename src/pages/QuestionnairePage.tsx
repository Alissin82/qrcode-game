import { useState } from 'react';
import { QUESTIONS_DATA } from '../utils/constants';

export const QuestionnairePage = () => {
    const [isBoy, setIsBoy] = useState(true);
    const [
        currentQuestionIndex,
        setCurrentQuestionIndex,
    ] = useState(0);
    const [selectedAnswer, setSelectedAnswer] =
        useState<string | null>(null);
    const bgColor = isBoy
        ? 'bg-accent'
        : 'bg-secondary';

    const currentQuestion =
        QUESTIONS_DATA[currentQuestionIndex];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedAnswer === null) {
            alert(
                'لطفا یک گزینه را انتخاب کنید.',
            );
            return;
        }

        console.log({
            question: currentQuestion.question,
            answer: selectedAnswer,
        });

        // Move to the next question or finish
        if (
            currentQuestionIndex <
            QUESTIONS_DATA.length - 1
        ) {
            setCurrentQuestionIndex(
                currentQuestionIndex + 1,
            );
            setSelectedAnswer(null); // Reset selection for next question
        } else {
            alert(
                'شما به تمام سوالات پاسخ دادید!',
            );
            // Here you would navigate to a results page or back
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
                    <div className='rounded-2xl bg-black/20 p-6'>
                        <h2 className='text-2xl font-bold'>
                            سوالات چهار گزینه ای
                        </h2>
                        <p className='mt-2 opacity-80'>
                            مرحله{' '}
                            {currentQuestionIndex +
                                1}{' '}
                            از{' '}
                            {
                                QUESTIONS_DATA.length
                            }
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className='space-y-4 text-right'
                    >
                        <div className='my-2 rounded-2xl bg-black/20 p-6'>
                            <h3 className='mb-4 font-bold'>
                                سوال{' '}
                                {currentQuestionIndex +
                                    1}
                            </h3>
                            <p>
                                {
                                    currentQuestion.question
                                }
                            </p>
                        </div>

                        <div className='flex flex-col gap-2'>
                            {currentQuestion.options.map(
                                (
                                    option,
                                    index,
                                ) => (
                                    <button
                                        key={
                                            index
                                        }
                                        type='button'
                                        onClick={() =>
                                            setSelectedAnswer(
                                                option,
                                            )
                                        }
                                        className={`btn btn-block h-auto justify-end py-3 text-right ${selectedAnswer === option ? 'btn-primary' : 'border-white/20 bg-black/20'}`}
                                    >
                                        {option}
                                    </button>
                                ),
                            )}
                        </div>

                        <div className='pt-4'>
                            <button
                                type='submit'
                                className='btn btn-success btn-lg w-full'
                            >
                                ثبت پاسخ
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
};
