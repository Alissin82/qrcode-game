import {
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaMedal,
    FaStar,
    FaMapMarkerAlt,
    FaPlay,
    FaPencilAlt,
} from 'react-icons/fa';

import Menu from '../components/ui/Menu';
import { apiClient } from '../utils';
import { TeamDataContext } from '../contexts/TeamDataContext.ts';
import type { AxiosResponse } from 'axios';
import type { ApiResponse } from '../types/apiResponse';
import QrScanner from 'react-qr-scanner';
import Upgrade from '../components/ui/Upgrade.tsx';

const MissionsPage = () => {
    const navigate = useNavigate();
    const scanned = useRef(false);
    const [actions, setActions] = useState<
        Action[] | null
    >(null);
    const { data: teamData } = useContext(
        TeamDataContext,
    );
    // Stats data from backend - these would be fetched from API
    const [completedOperations] = useState({
        completed: 3,
        total: 10,
    });
    const [completedLocations] = useState({
        completed: 1,
        total: 6,
    });
    const [scanning, setScanning] =
        useState(false);

    useEffect(() => {
        async function fetchActions() {
            const response: AxiosResponse<
                ApiResponse<Action[]>
            > = await apiClient.get(`/actions`);
            setActions(response.data.data);
        }

        fetchActions();
    }, []);

    const isBoy = useMemo(() => {
        return teamData?.gender;
    }, [teamData]);

    let className = isBoy
        ? 'bg-accent'
        : 'bg-secondary';

    async function handleScan(data) {
        if (!data) return;
        if (scanned.current) return;
        const id = JSON.parse(data?.text)?.id;
        if (id) scanned.current = true;

        const response = await apiClient.post(
            `/actions/${id}/start`,
        );
        setScanning(false);
        if (response.status == 200)
            navigate('/mission/1');
    }

    return (
        <div
            className={`min-h-screen ${className} font-sans text-white`}
            dir="rtl"
        >
            {scanning && (
                <div
                    className={
                        'absolute z-50 flex h-[100%] w-[100%] items-center justify-center'
                    }
                >
                    <div
                        className={
                            'flex h-[90%] w-[90%] flex-col items-center justify-center gap-[24px] rounded-md bg-white'
                        }
                    >
                        <p
                            className={
                                'text-black'
                            }
                        >
                            اسکن QR Code
                        </p>
                        <div
                            className={
                                'h-[180px] w-[220px]'
                            }
                        >
                            <QrScanner
                                delay={300}
                                onError={() =>
                                    setScanning(
                                        false,
                                    )
                                }
                                onScan={
                                    handleScan
                                }
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                constraints={{
                                    audio: false,
                                    video: {
                                        facingMode:
                                            'environment',
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
            {/* Main container with responsive max-width */}
            <div className="relative mx-auto w-full max-w-xl p-4 pb-24">
                {/* Stats Section */}
                <div className="mb-6">
                    <div
                        className="rounded-2xl p-6"
                        style={{
                            backgroundColor:
                                '#FFFFFF3D',
                        }}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            {/* Right Section - Completed Operations */}
                            <div className="border-l border-white/20 pl-4 text-center">
                                <h3 className="mb-2 text-sm font-bold">
                                    عملیات تکمیل
                                    شده
                                </h3>
                                <div className="text-2xl font-bold text-white">
                                    {
                                        completedOperations.completed
                                    }
                                    /
                                    {
                                        completedOperations.total
                                    }
                                </div>
                            </div>

                            {/* Left Section - Completed Locations */}
                            <div className="pr-4 text-center">
                                <h3 className="mb-2 text-sm font-bold">
                                    مکان های تکمیل
                                    شده
                                </h3>
                                <div className="text-2xl font-bold text-white">
                                    {
                                        completedLocations.completed
                                    }
                                    /
                                    {
                                        completedLocations.total
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page Title */}
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold">
                        لیست عملیات
                    </h1>
                    <p className="mt-2 text-sm opacity-80">
                        ماموریت‌های خود را انتخاب
                        کنید و جایزه بگیرید
                    </p>
                </div>

                {/* Missions Grid - Matching the image design */}
                <div className="space-y-4">
                    {actions &&
                        actions?.length > 0 &&
                        actions.map((action) => (
                            <div
                                key={action.id}
                                className="mb-4 rounded-2xl p-6"
                                style={{
                                    backgroundColor:
                                        '#00000052',
                                }}
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    {action.started_by_team && (
                                        <div
                                            className={`flex h-12 w-12 items-center justify-center rounded-lg bg-pink-500 p-3`}
                                        >
                                            <FaMedal
                                                size={
                                                    20
                                                }
                                                className="text-white"
                                            />
                                        </div>
                                    )}
                                    <h3 className="mx-4 flex-1 text-center text-lg font-bold">
                                        {
                                            action.name
                                        }
                                    </h3>
                                    {action.started_by_team && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm">
                                                {
                                                    'رزرو شده'
                                                }
                                            </span>
                                            <FaPencilAlt
                                                size={
                                                    16
                                                }
                                                className={
                                                    'text-purple-500'
                                                }
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Progress Section */}
                                <div className="mb-4">
                                    <div className="mb-2 text-sm">
                                        پیشرفت کلی
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <progress
                                            className="progress progress-primary flex-1"
                                            value={
                                                (action
                                                        .started_by_team
                                                        .length /
                                                    action
                                                        .missions
                                                        .length) *
                                                100
                                            }
                                            max="100"
                                        ></progress>
                                        <span className="text-sm">
                                            {action
                                                .started_by_team
                                                .length >
                                            0
                                                ? (action
                                                        .started_by_team
                                                        .length /
                                                    action
                                                        .missions
                                                        .length) *
                                                100
                                                : 0}
                                            %
                                        </span>
                                    </div>
                                </div>

                                {/* Details Section */}
                                <div className="mb-4 grid grid-cols-2 gap-3">
                                    <div className="rounded-lg bg-blue-800/50 p-3">
                                        <div className="mb-1 text-sm">
                                            مکان:
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaMapMarkerAlt
                                                size={
                                                    14
                                                }
                                            />
                                            <span className="text-sm">
                                                {
                                                    action.region.name
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    <div className="rounded-lg bg-blue-800/50 p-3">
                                        <div className="mb-1 text-sm">
                                            عملیات
                                            انجام
                                            شده
                                        </div>
                                        <span className="text-sm">
                                            {
                                                action.completed_mission_count
                                            }
                                        </span>
                                    </div>
                                </div>

                                {!action.started_by_team ? (
                                    <button
                                        onClick={() => {
                                            setScanning(
                                                true,
                                            );
                                        }}
                                        className={`flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-yellow-500 py-3 font-medium text-white`}
                                    >
                                        <FaPlay />
                                        شروع با
                                        اسکن
                                        QRCode
                                    </button>
                                ) : (
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/mission/${action.id}`,
                                            )
                                        }
                                        className={`flex w-full items-center justify-center gap-2 rounded-lg bg-[#00000052] bg-gradient-to-r py-3 font-medium text-white`}
                                    >
                                        رزرو شده
                                    </button>
                                )}
                            </div>
                        ))}
                </div>

                {/* Quick Actions */}
                <section className="mt-8 rounded-xl bg-black/10 p-6">
                    <h3 className="mb-4 text-center text-lg font-bold">
                        عملیات سریع
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="btn bg-primary border-none text-white">
                            <FaMedal className="mr-2" />
                            ماموریت جدید
                        </button>
                        <button className="btn border-none bg-yellow-500 text-white">
                            <FaStar className="mr-2" />
                            جایزه روزانه
                        </button>
                    </div>
                </section>

                {/* Floating Action Button */}
              <Upgrade/>
            </div>

            {/* Bottom Navigation */}
            <Menu />
        </div>
    );
};

export default MissionsPage;
