import { useContext, useEffect, useMemo, useState } from 'react';
import { TeamDataContext } from '../contexts/TeamDataContext.ts';
import { useNavigate, useParams } from 'react-router-dom';
import type { AxiosResponse } from 'axios';
import type { ApiResponse } from '../types/apiResponse';
import { apiClient } from '../utils';
import toast from 'react-hot-toast';

export const UploadFileMission = () => {
    const { id: taskId } = useParams();
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [task, setTask] = useState<Task<FileUpload>>();
    const [loading, setLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);

    const { data: teamData } = useContext(TeamDataContext);
    const className = useMemo(() => {
        return teamData?.gender ? 'bg-accent' : 'bg-secondary';
    }, [teamData]);

    const handleSubmit = async () => {
        try {
            const data = {
                file: selectedFile,
            };
            setIsUploading(true);
            const res: AxiosResponse<ApiResponse<any>> = await apiClient.post(`/file-upload/${task?.taskable.id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setIsUploading(false);

            if (res.status == 200) {
                toast.success(`با موفقیت انجام شد`);
            }
            setTimeout(() => navigate(`/mission/${task?.action_id}`), 1250);
        } catch (error) {
            setIsUploading(false);
            toast.error(`با خطا مواجه شد`);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res: AxiosResponse<ApiResponse<Task<FileUpload>>> = await apiClient.get(`/tasks/${taskId}`);
                setTask(res.data.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedFile) handleSubmit();
    }, [selectedFile]);

    return (
        <div className={`min-h-screen ${className} flex items-center justify-center font-sans text-white`}>
            <div className="w-full max-w-xl p-4 text-center">
                <header className="mb-8 flex items-center justify-between">
                    <div
                        onClick={() => navigate(`/mission/${task?.action_id}`)}
                        className={'flex w-full items-center justify-between'}
                    >
                        <p className="text-xl font-bold">بازگشت</p>
                        <button className="btn btn-circle btn-ghost bg-white/20">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </button>
                    </div>
                </header>

                <main className="space-y-6">
                    <div className="mb-2 rounded-2xl bg-black/20 p-4">
                        <h2 className="text-2xl font-bold">آپلود فایل</h2>
                        <p className="mt-2 opacity-80">
                            مرحله {task && task?.order + 1} از {task?.action_tasks_count}
                        </p>
                    </div>

                    <div className="mb-2 flex flex-col gap-2 space-y-4 rounded-2xl bg-black/20 p-4 text-right">
                        <h3 className="font-bold">راهنمای آپلود فایل</h3>
                        <p>{task?.taskable.description}</p>
                        <div className="flex items-center gap-2 rounded-lg bg-black/20 p-3">
                            <span>📍</span>
                            <p className="text-sm">نکته: مطعن شوید که فایل را به درستی آپلود میکنید</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-4 rounded-2xl bg-black/20 p-8">
                        {isUploading ? (
                            <div className={'flex h-[100px] w-full items-center justify-center gap-4'}>
                                <p>در حال آپلود</p>
                                <span
                                    role="status"
                                    aria-label="Loading"
                                    className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-transparent"
                                ></span>
                            </div>
                        ) : (
                            <>
                                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-pink-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="36"
                                        height="36"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="17 8 12 3 7 8"></polyline>
                                        <line x1="12" y1="3" x2="12" y2="15"></line>
                                    </svg>
                                </div>

                                <h3 className="text-lg font-bold">انتخاب فایل</h3>
                                <p className="text-sm opacity-80">فایل خود را از گالری انتخاب کنید</p>
                                <label
                                    htmlFor="video-upload"
                                    className="btn btn-outline absolute h-[200px] w-full max-w-xs border-white/50 opacity-[1%]"
                                ></label>
                                <input
                                    id="video-upload"
                                    type="file"
                                    accept="application/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </>
                        )}

                        {selectedFile && <p className="mt-2 text-sm">فایل انتخاب شده: {selectedFile.name}</p>}
                    </div>
                </main>
            </div>
        </div>
    );
};
