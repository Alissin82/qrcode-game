import type { AxiosResponse } from 'axios';
import {
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import toast from 'react-hot-toast';
import {
    useNavigate,
    useParams,
} from 'react-router-dom';
import { TeamDataContext } from '../contexts/TeamDataContext.ts';
import type { ApiResponse } from '../types/apiResponse';
import { apiClient } from '../utils';

export const QuestionnairePage = () => {
    const { id } = useParams();

    const { data: teamData } = useContext(
        TeamDataContext,
    );
    const className = useMemo(() => {
        return teamData?.gender
            ? 'bg-accent'
            : 'bg-secondary';
    }, [teamData]);

    const [loading, setLoading] =
        useState<boolean>(true);
    const [taskData, setTaskData] =
        useState<any>();
    const navigate = useNavigate();
    const [selectedAnswer, setSelectedAnswer] =
        useState();

    const [answers, setAnswers] = useState([]);

    const handleSubmit = async (
        e: React.FormEvent,
    ) => {
        e.preventDefault();
        try {
            if (selectedAnswer === null) {
                toast.error(
                    'لطفا یک گزینه را انتخاب کنید.',
                );
                return;
            }

            const res: AxiosResponse<
                ApiResponse<any>
            > = await apiClient.post(
                `/mcq/${taskData?.taskable.id}`,
                {
                    answer: selectedAnswer,
                },
            );

            if (res.data.code === 'CORRECT') {
                toast.success(`آفرین`);
            } else {
                toast.error(`جواب شما غلط بود`);
            }
            setTimeout(
                () =>
                    navigate(
                        `/mission/${taskData?.action_id}`,
                    ),
                1250,
            );
        } catch (error) {
            toast.error(`پاسخ شما اشتباه است`);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res: AxiosResponse<
                    ApiResponse<any>
                > = await apiClient.get(
                    `/tasks/${id}`,
                );
                setAnswers(
                    Object.values(
                        res.data.data.taskable
                            .options,
                    ),
                );
                setTaskData(res.data.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div
            className={`min-h-screen ${className} flex items-center justify-center font-sans text-white`}
        >
            <div className='w-full max-w-xl p-4 text-center'>
                <header className='mb-8 flex items-center justify-between'>
                    <div
                        onClick={() =>
                            navigate(
                                `/mission/${taskData?.action_id}`,
                            )
                        }
                        className={
                            'flex w-full items-center justify-start gap-x-2'
                        }
                    >
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
                        <p className='text-xl font-bold'>
                            بازگشت
                        </p>
                    </div>
                </header>

                <main className='space-y-6'>
                    <div className='rounded-2xl bg-black/20 p-6'>
                        <h2 className='text-2xl font-bold'>
                            سوالات چهار گزینه ای
                        </h2>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className='space-y-4 text-right'
                    >
                        <div className='my-2 rounded-2xl bg-black/20 p-6'>
                            <h3 className='mb-4 font-bold'>
                                {
                                    taskData
                                        ?.taskable
                                        .question
                                }
                            </h3>
                        </div>

                        <div className='flex flex-col gap-2'>
                            {loading ? (
                                <div
                                    className={
                                        'flex h-[100vh] w-[100vw] items-center justify-center gap-4'
                                    }
                                >
                                    <p>
                                        در حال
                                        بارگذاری
                                    </p>
                                    <span
                                        role='status'
                                        aria-label='Loading'
                                        className='inline-block h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-transparent'
                                    ></span>
                                </div>
                            ) : (
                                answers.map(
                                    (
                                        i,
                                        index,
                                    ) => (
                                        <button
                                            key={
                                                index
                                            }
                                            type='button'
                                            onClick={() =>
                                                setSelectedAnswer(
                                                    i,
                                                )
                                            }
                                            className={`btn btn-block h-auto justify-start py-3 text-white ${i === selectedAnswer ? 'btn-primary' : 'border-white/20 bg-black/20'}`}
                                        >
                                            {i}
                                        </button>
                                    ),
                                )
                            )}
                        </div>

                        <div className='pt-4'>
                            <button
                                type='submit'
                                className='btn btn-success btn-lg w-full text-white'
                                onClick={
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
