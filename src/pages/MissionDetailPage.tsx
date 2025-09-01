import { type AxiosResponse } from 'axios';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
    FaArrowRight,
    FaBook,
    FaClock,
    FaDownload,
    FaLock,
    FaMapMarkerAlt,
    FaPlay,
    FaPuzzlePiece,
} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Menu from '../components/ui/Menu';
import { TeamDataContext } from '../contexts/TeamDataContext.ts';
import type { ApiResponse } from '../types/apiResponse';
import { apiClient } from '../utils';
import type { Action, ActionDetail } from '../types/action';
import toast from 'react-hot-toast';
import QrCodeScanner from '../components/ui/QrCodeScanner.tsx';

const MissionDetailPage = () => {
    const { missionId } = useParams();
    const navigate = useNavigate();
    const iconRef = useRef<HTMLImageElement>(null);
    const [action, setAction] = useState<ActionDetail>();
    const [scanning, setScanning] = useState(false);

    const { data: teamData } = useContext(TeamDataContext);
    const className = useMemo(() => {
        return teamData?.gender ? 'bg-accent' : 'bg-secondary';
    }, [teamData]);

    useEffect(() => {
        async function fetchAction() {
            const response: AxiosResponse<ApiResponse<ActionDetail>> = await apiClient(
                `/actions/${missionId}`
            );
            setAction(response.data.data);
            const imgResponse = await fetch(response.data.data.icon.download_url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const blob = await imgResponse.blob();
            iconRef?.current?.setAttribute('src', window.URL.createObjectURL(blob));
        }

        fetchAction();
    }, []);

    // async function downloadFile(url: string, filename: string) {
    //     const response = await fetch(url, {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem('token')}`,
    //         },
    //     });
    //     const blob = await response.blob();
    //     const link = document.createElement('a');
    //     link.href =
    //         window.URL.createObjectURL(blob);
    //     link.download = filename;
    //     link.click();
    // }

    // const handleDownload = () => {
    //     try {
    //         if (teamData?.gender)
    //             downloadFile(action?.attachment_boy.download_url!, 'file.pdf');
    //         else
    //             downloadFile(action?.attachment_girl.download_url!, 'file.pdf');
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    async function downloadFile(url: string, filename: string) {
        try {
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Download failed:', error);
            throw error;
        }
    }

    const handleDownload = async () => {
        try {
            if (!action) {
                console.error('No action data available');
                return;
            }

            const downloadUrl = teamData?.gender
                ? action.attachment_boy?.download_url
                : action.attachment_girl?.download_url;

            if (!downloadUrl) {
                console.error('Download URL not available');
                return;
            }

            // Extract filename from URL or use a default
            const urlParts = downloadUrl.split('/');
            const originalFilename = urlParts[urlParts.length - 1] || 'download';

            await downloadFile(downloadUrl, originalFilename);
        } catch (error) {
            console.error('Download failed:', error);
            // You might want to show a user-friendly error message here
        }
    };

    const hanleStart = (task: any) => {
        switch (task.type) {
            case '':
                navigate(`/video-mission/${task.id}`);
                break;
            case 'MCQ':
                navigate(`/questionnaire-mission/${task.id}`);
                break;

            case 'UploadFile':
                navigate(`/upload-file-mission/${task.id}`);
                break;

            case 'message':
                navigate(`/upload-video-mission/${task.id}`);
                break;

            case 'intrupt':
                navigate(`/upload-video-mission/${task.id}`);
                break;
            default:
                console.warn('⚠️ نوع تسک ناشناخته است:', task);
        }
    };

    if (!action) return;

    async function handleStartScanning() {
        setScanning(true);
    }

    async function handleEnd(id: any) {
        if (id != action?.id) {
            toast.error('لطفا کارت همین عملیات را اسکن کنید.');
            return;
        }

        try {
            const response: AxiosResponse<ApiResponse<Action>> = await apiClient.post(
                `actions/${id}/end`
            );
            if (response.status == 200) {
                toast.success('عملیات با موفقیت تکمیل شد');
                navigate('/missions');
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className={`min-h-screen ${className} font-sans text-white`} dir="rtl">
            {scanning && <QrCodeScanner onScan={handleEnd} onError={() => {}} isOpen={scanning} />}

            <div className="relative mx-auto w-full max-w-xl p-4 pb-24" dir="rtl">
                {/* Header Section */}
                <header>
                    {/* Back Button */}
                    <div className="mb-4 flex items-center justify-start">
                        <button
                            onClick={() => navigate('/missions')}
                            className="btn btn-circle bg-white text-black hover:bg-gray-100"
                        >
                            <FaArrowRight />
                        </button>
                        <span className="text mr-3 font-bold">بازگشت</span>
                    </div>

                    {/* Mission Title Card */}
                    <div
                        className="rounded-t-2xl p-6"
                        dir="rtl"
                        style={{
                            backgroundColor: '#00000052',
                        }}
                    >
                        <div className="mb-3 flex flex-row items-center gap-2" dir="rtl">
                            <div className="btn rounded-lg bg-purple-500 p-2">
                                <img
                                    ref={iconRef}
                                    alt={'action icon'}
                                    className={'h-[32px] w-[32px]'}
                                />
                            </div>
                            <h1 className="text-xl font-bold">{action?.name}</h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaMapMarkerAlt size={16} />
                            <span className="text-sm">{action?.region.name}</span>
                        </div>
                    </div>
                </header>

                {/* Overall Progress Section */}

                <section className="mb-6">
                    <div
                        className="mb-4 rounded-b-xl p-3"
                        style={{
                            backgroundColor: '#00000052',
                        }}
                    >
                        <h2 className="mb-2 text-right text-lg font-bold">پیشرفت کلی</h2>
                        <div className="flex flex-row-reverse items-center gap-3">
                            <span className="font text-sm">
                                {action.team_completed_task_count
                                    ? (action.team_completed_task_count / action.tasks_count) * 100
                                    : 0}
                                %
                            </span>
                            <progress
                                className="progress progress-warning flex-1"
                                value={
                                    action.team_completed_task_count
                                        ? (action.team_completed_task_count / action.tasks_count) *
                                          100
                                        : 0
                                }
                                max={100}
                            ></progress>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                            <div
                                className="rounded-xl p-2"
                                style={{
                                    backgroundColor: '#FFFFFF3D',
                                }}
                            >
                                <div className="mb-2 flex items-center gap-1">
                                    <FaClock size={16} />
                                    <span className="text-sm">زمان تخمینی عملیات:</span>
                                </div>
                                <div className="text-lg font-bold">{action.estimated_time}</div>
                            </div>
                            <div
                                className="rounded-xl p-2"
                                style={{
                                    backgroundColor: '#FFFFFF3D',
                                }}
                            >
                                <div className="mb-2 text-sm">وظایف انجام شده</div>
                                <div className="text-lg font-bold">
                                    {action?.team_completed_task_count ?? 0}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-6">
                    <div
                        className="rounded-2xl p-6"
                        style={{
                            backgroundColor: '#00000052',
                        }}
                    >
                        <div className="mb-4 flex items-center gap-3">
                            <h2 className="text-lg font-bold">راهنمای انجام</h2>
                            <FaBook size={20} />
                        </div>
                        <p className="mb-4 text-right text-sm leading-relaxed">
                            برای تکمیل ماموریت، تمام مراحل باید به ترتیب انجام شوند. پس از انجام
                            تمام وظایف، میتوانید کارت پایان را اسکن کنید.
                        </p>
                        <button
                            className="btn rounded-[16px] border-none bg-white px-[24px] text-black"
                            onClick={handleDownload}
                        >
                            <FaDownload className="ml-2" />
                            دانلود راهنمای بازی
                        </button>
                    </div>
                </section>

                <section className="mb-6">
                    <h2 className="mb-4 text-right text-lg font-bold">مراحل مأموریت</h2>
                    <div className="space-y-3">
                        {action &&
                            action.tasks.map((task: Task<MCQ | FileUpload>) => (
                                <div
                                    key={task.id}
                                    className="mb-3 rounded-xl p-4"
                                    style={{
                                        backgroundColor: '#00000052',
                                    }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500 p-2`}
                                            >
                                                <FaPuzzlePiece size={18} className="text-white" />
                                            </div>
                                            <span className="font-medium">{task?.type_label}</span>
                                        </div>
                                        {task.locked_for_team ? (
                                            <button
                                                className={`flex cursor-pointer items-center gap-2 rounded-3xl bg-[#0000003D] px-4 py-2 font-medium text-white`}
                                                onClick={() => hanleStart(task)}
                                            >
                                                <FaLock size={14} />
                                                {'در صف ...'}
                                            </button>
                                        ) : !task.done_by_team ? (
                                            <button
                                                className={`flex cursor-pointer items-center gap-2 rounded-3xl bg-yellow-500 px-4 py-2 font-medium text-white`}
                                                onClick={() => hanleStart(task)}
                                            >
                                                <FaPlay size={14} />
                                                {'آماده شروع'}
                                            </button>
                                        ) : (
                                            <button
                                                className={`flex cursor-pointer items-center gap-2 rounded-3xl bg-[#0000003D] px-4 py-2 font-medium text-white`}
                                            >
                                                {'قبلا انجام شده'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        {action.tasks.filter((task: Task<MCQ | FileUpload>) => !task.done_by_team)
                            .length == 0 ? (
                            <div
                                className="mb-3 rounded-xl p-4"
                                style={{
                                    backgroundColor: '#00000052',
                                }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500 p-2`}
                                        >
                                            <FaPuzzlePiece size={18} className="text-white" />
                                        </div>
                                        <span className="font-medium">اسکن کنید</span>
                                    </div>
                                    {
                                        <button
                                            className={`flex cursor-pointer items-center gap-2 rounded-3xl bg-yellow-500 px-4 py-2 font-medium text-white`}
                                            onClick={handleStartScanning}
                                        >
                                            <FaPlay size={14} />
                                            {'تکمیل عملیات'}
                                        </button>
                                    }
                                </div>
                            </div>
                        ) : (
                            <div
                                className="mb-3 rounded-xl p-4"
                                style={{
                                    backgroundColor: '#00000052',
                                }}
                            >
                                <div className="flex items-center justify-between opacity-65">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500 p-2`}
                                        >
                                            <FaLock size={18} className="text-white" />
                                        </div>
                                        <span className="font-medium">پایان عملیات</span>
                                    </div>
                                    {
                                        <button
                                            className={`flex items-center gap-2 rounded-3xl bg-gray-600 px-4 py-2 font-medium text-white`}
                                        >
                                            <FaLock size={14} />
                                            {'اسکن'}
                                        </button>
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
            <Menu />
        </div>
    );
};

export default MissionDetailPage;
