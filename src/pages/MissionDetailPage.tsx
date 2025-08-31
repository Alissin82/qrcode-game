import type { AxiosResponse } from 'axios';
import {
    useContext,
    useEffect,
    useState,
} from 'react';
import {
    FaArrowRight,
    FaBook,
    FaClock,
    FaDownload,
    FaKey,
    FaMapMarkerAlt,
    FaPlay,
    FaPuzzlePiece,
} from 'react-icons/fa';
import {
    useNavigate,
    useParams,
} from 'react-router-dom';
import Menu from '../components/ui/Menu';
import { TeamDataContext } from '../contexts/TeamDataContext.ts';
import type { ApiResponse } from '../types/apiResponse';
import { apiClient } from '../utils';
import type { ActionDetail } from '../types/action';

const MissionDetailPage = () => {
    const { missionId } = useParams();
    const navigate = useNavigate();
    const [action, setAction] =
        useState<ActionDetail>();

    useEffect(() => {
        async function fetchAction() {
            const response: AxiosResponse<
                ApiResponse<ActionDetail>
            > = await apiClient(
                `/actions/${missionId}`,
            );

            setAction(response.data.data);
        }

        fetchAction();
    }, []);

    const { data: teamData } = useContext(
        TeamDataContext,
    );

    let className = teamData?.gender
        ? 'bg-accent'
        : 'bg-secondary';

    async function downloadFile(
        url: string,
        filename: string,
    ) {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href =
            window.URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    }

    const handleDownload = () => {
        try {
            downloadFile(
                action?.attachments[0]
                    .download_api!,
                'file.pdf',
            );
        } catch (error) {
            console.log(error);
        }
    };

    const hanleStart = (task: any) => {
        console.log(task);
        console.log(task.id);
        switch (task.type) {
            case 'scan':
                navigate(
                    `/video-mission/${task.id}`,
                );
                break;
            case 'question':
                navigate(
                    `/questionnaire-mission/${task.id}`,
                );
                break;

            case 'content':
                navigate(
                    `/upload-video-mission/${task.id}`,
                );
                break;

            case 'message':
                navigate(
                    `/upload-video-mission/${task.id}`,
                );
                break;

            case 'intrupt':
                navigate(
                    `/upload-video-mission/${task.id}`,
                );
                break;

            default:
                console.warn(
                    '⚠️ نوع تسک ناشناخته است:',
                    task,
                );
        }
    };

    if (!action) return;
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
                                {action?.name}
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
                                {
                                    action?.region
                                        .name
                                }
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
                                {action.meta
                                    .total > 0
                                    ? (action.meta
                                          .completed /
                                          action
                                              .meta
                                              .total) *
                                      100
                                    : 0}
                                %
                            </span>
                            <progress
                                className='progress progress-warning flex-1'
                                value={
                                    (10 / 5) * 100
                                }
                                max={100}
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
                                        action.estimated_time
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
                                        action
                                            ?.meta
                                            .completed
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
                        <button
                            className='btn w-full border-none bg-white text-black'
                            onClick={() =>
                                handleDownload()
                            }
                        >
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
                        {action &&
                            action.missions &&
                            action?.missions.map(
                                (mission) =>
                                    mission.tasks.map(
                                        (
                                            task,
                                        ) => (
                                            <div
                                                key={
                                                    mission.id
                                                }
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
                                                            className={`flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500 p-2`}
                                                        >
                                                            <FaPuzzlePiece
                                                                size={
                                                                    18
                                                                }
                                                                className='text-white'
                                                            />
                                                        </div>
                                                        <span className='font-medium'>
                                                            {
                                                                task?.type
                                                            }
                                                        </span>
                                                    </div>

                                                    {/* Action Button */}
                                                    <button
                                                        className={`flex cursor-pointer items-center gap-2 rounded-3xl bg-yellow-500 px-4 py-2 font-medium text-white`}
                                                        onClick={() =>
                                                            hanleStart(
                                                                task,
                                                            )
                                                        }
                                                    >
                                                        <FaPlay
                                                            size={
                                                                14
                                                            }
                                                        />
                                                        {
                                                            'آماده شروع'
                                                        }
                                                    </button>
                                                </div>
                                            </div>
                                        ),
                                    ),
                            )}
                    </div>
                </section>

                {/* Floating Action Button */}
            </div>

            {/* Bottom Navigation */}
            <Menu />
        </div>
    );
};

export default MissionDetailPage;
