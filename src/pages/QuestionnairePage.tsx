import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { apiClient } from '../utils';

export const QuestionnairePage = () => {
    
    const { id } = useParams();
    const [isBoy, setIsBoy] = useState(true);

    const [loading, setLoading] =
        useState<boolean>(true);

    const [data, setData] = useState<any>();

    const [selectedAnswer, setSelectedAnswer] =
        useState<string | null>(null);
    const [q, setQ] = useState<number | null>(
        null,
    );

    const bgColor = isBoy
        ? 'bg-accent'
        : 'bg-secondary';

    const handleSubmit = async (
        e: React.FormEvent,
    ) => {
        e.preventDefault();
        try {
            if (q === null) {
                alert(
                    'لطفا یک گزینه را انتخاب کنید.',
                );
                return;
            }

            const res = await apiClient.post(
                `/tasks/${id}`,
                {
                    answer: q,
                },
            );

            if (res.status === 200) {
                toast.success(`آفرین`);

            }
        } catch (error) {
            toast.error(`پاسخ شما اشتباه است`);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiClient.get(
                    `/tasks/${id}`,
                );
                setData(res.data.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    if (loading) return;
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
                        {/* <p className='mt-2 opacity-80'>
                            مرحله{' '}
                            {currentQuestionIndex +
                                1}{' '}
                            از{' '}
                            {
                                QUESTIONS_DATA.length
                            }
                        </p> */}
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className='space-y-4 text-right'
                    >
                        <div className='my-2 rounded-2xl bg-black/20 p-6'>
                            <h3 className='mb-4 font-bold'>
                                {data.question}
                            </h3>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <button
                                type='button'
                                onClick={() => {
                                    setSelectedAnswer(
                                        data.option1,
                                    );
                                    setQ(1);
                                }}
                                className={`btn btn-block h-auto justify-start py-3 text-white ${data.option1 === selectedAnswer ? 'btn-primary' : 'border-white/20 bg-black/20'}`}
                            >
                                {data.option1}
                            </button>
                            <button
                                type='button'
                                onClick={() => {
                                    setSelectedAnswer(
                                        data.option2,
                                    );
                                    setQ(2);
                                }}
                                className={`btn btn-block h-auto justify-start py-3 text-white ${data.option2 === selectedAnswer ? 'btn-primary' : 'border-white/20 bg-black/20'}`}
                            >
                                {data.option2}
                            </button>
                            <button
                                type='button'
                                onClick={() => {
                                    setSelectedAnswer(
                                        data.option3,
                                    );
                                    setQ(3);
                                }}
                                className={`btn btn-block h-auto justify-start py-3 text-white ${data.option3 === selectedAnswer ? 'btn-primary' : 'border-white/20 bg-black/20'}`}
                            >
                                {data.option3}
                            </button>
                            <button
                                type='button'
                                onClick={() => {
                                    setSelectedAnswer(
                                        data.option4,
                                    );
                                    setQ(4);
                                }}
                                className={`btn btn-block h-auto justify-start py-3 text-white ${data.option4 === selectedAnswer ? 'btn-primary' : 'border-white/20 bg-black/20'}`}
                            >
                                {data.option4}
                            </button>
                        </div>

                        <div className='pt-4'>
                            <button
                                type='submit'
                                className='btn btn-success btn-lg w-full'
                                onClick={() =>
                                    handleSubmit
                                }
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
