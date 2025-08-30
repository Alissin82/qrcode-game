import {
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    FaMapMarkerAlt,
    FaMedal,
    FaPencilAlt,
    FaPlay,
    FaStar,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import QrScanner from 'react-qr-scanner';
import Menu from '../components/ui/Menu';
import { TeamDataContext } from '../contexts/TeamDataContext.ts';
import { apiClient } from '../utils';

const MissionsPage = () => {
    const navigate = useNavigate();
    const scanned = useRef(false);
    const [actions, setActions] = useState<
        Action[] | null
    >(null);
    const [meta, setMeta] = useState<Meta | null>(
        null,
    );

    const { data: teamData } = useContext(
        TeamDataContext,
    );

    const [scanning, setScanning] =
        useState(false);

    useEffect(() => {
        async function fetchActions() {
            const response =
                await apiClient.get(`/actions`);
            setActions(
                response.data.data.actions,
            );
            setMeta(
                response.data.data.meta.actions,
            );
        }

        fetchActions();
    }, []);

    const isBoy = useMemo(() => {
        return teamData?.gender;
    }, [teamData]);

    let className = isBoy
        ? 'bg-accent'
        : 'bg-secondary';

    async function handleScan(data: any) {
        if (!data) return;
        if (scanned.current) return;
        const id = JSON.parse(data?.text)?.id;
        if (id) scanned.current = true;

        const response = await apiClient.post(
            `/actions/${id}/start`,
        );
        console.log(response)
        setScanning(false);
        if (response.status == 200)
            navigate('/mission/1');
    }

    return (
        <div
            className={`min-h-screen ${className} font-sans text-white`}
            dir='rtl'
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
            <div className='relative mx-auto w-full max-w-xl p-4 pb-24'>
                {/* Stats Section */}
                <div className='mb-6'>
                    <div
                        className='rounded-2xl p-6'
                        style={{
                            backgroundColor:
                                '#FFFFFF3D',
                        }}
                    >
                        <div className='grid grid-cols-2 gap-4'>
                            {/* Right Section - Completed Operations */}
                            <div className='border-l border-white/20 pl-4 text-center'>
                                <h3 className='mb-2 text-sm font-bold'>
                                    عملیات تکمیل
                                    شده
                                </h3>
                                <div className='text-2xl font-bold text-white'>
                                    {
                                        meta?.completed
                                    }
                                </div>
                            </div>

                            {/* Left Section - Completed Locations */}
                            <div className='pr-4 text-center'>
                                <h3 className='mb-2 text-sm font-bold'>
                                    مکان های تکمیل
                                    شده
                                </h3>
                                <div className='text-2xl font-bold text-white'>
                                    0
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page Title */}
                <div className='mb-6 text-center'>
                    <h1 className='text-3xl font-bold'>
                        لیست عملیات
                    </h1>
                    <p className='mt-2 text-sm opacity-80'>
                        ماموریت‌های خود را انتخاب
                        کنید و جایزه بگیرید
                    </p>
                </div>

                {/* Missions Grid - Matching the image design */}
                <div className='space-y-4'>
                    {actions &&
                        actions?.length > 0 &&
                        actions.map((action) => (
                            <div
                                key={action.id}
                                className='mb-4 rounded-2xl p-6'
                                style={{
                                    backgroundColor:
                                        '#00000052',
                                }}
                            >
                                <div className='mb-4 flex items-center justify-between'>
                                    {action.started_by_team && (
                                        <div
                                            className={`flex h-12 w-12 items-center justify-center rounded-lg bg-pink-500 p-3`}
                                        >
                                            <FaMedal
                                                size={
                                                    20
                                                }
                                                className='text-white'
                                            />
                                        </div>
                                    )}
                                    <h3 className='mx-4 flex-1 text-center text-lg font-bold'>
                                        {
                                            action.name
                                        }
                                    </h3>
                                    {action.started_by_team && (
                                        <div className='flex items-center gap-2'>
                                            <span className='text-sm'>
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
                                <div className='mb-4'>
                                    <div className='mb-2 text-sm'>
                                        پیشرفت کلی
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <progress
                                            className='progress progress-primary flex-1'
                                            value={
                                                (action
                                                    .meta
                                                    .completed /
                                                    action
                                                        .meta
                                                        .total) *
                                                100
                                            }
                                            max={
                                                100
                                            }
                                        ></progress>
                                        <span className='text-sm'>
                                            {action
                                                .meta
                                                .total >
                                            0
                                                ? (action
                                                      .meta
                                                      .completed /
                                                      action
                                                          .meta
                                                          .total) *
                                                  100
                                                : 0}
                                            %
                                        </span>
                                    </div>
                                </div>

                                {/* Details Section */}
                                <div className='mb-4 grid grid-cols-2 gap-3'>
                                    <div className='rounded-lg bg-blue-800/50 p-3'>
                                        <div className='mb-1 text-sm'>
                                            مکان:
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <FaMapMarkerAlt
                                                size={
                                                    14
                                                }
                                            />
                                            <span className='text-sm'>
                                                {
                                                    action
                                                        .region
                                                        .name
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    <div className='rounded-lg bg-blue-800/50 p-3'>
                                        <div className='mb-1 text-sm'>
                                            عملیات
                                            انجام
                                            شده
                                        </div>
                                        <span className='text-sm'>
                                            {
                                                action
                                                    .meta
                                                    .completed
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
                <section className='mt-8 rounded-xl bg-black/10 p-6'>
                    <h3 className='mb-4 text-center text-lg font-bold'>
                        عملیات سریع
                    </h3>
                    <div className='grid grid-cols-2 gap-4'>
                        <button className='btn bg-primary border-none text-white'>
                            <FaMedal className='mr-2' />
                            ماموریت جدید
                        </button>
                        <button className='btn border-none bg-yellow-500 text-white'>
                            <FaStar className='mr-2' />
                            جایزه روزانه
                        </button>
                    </div>
                </section>

                {/* Floating Action Button */}
                <div className='fixed right-6 bottom-18 z-20 lg:right-auto lg:left-1/2 lg:ml-[280px]'>
                    <div className='indicator'>
                        <span className='indicator-item badge h-8 w-8 rounded-full border-none bg-rose-800 text-base'>
                            ⚡
                        </span>
                        <button className='btn btn-lg btn-warning h-18 w-18 flex-col rounded-full text-xs text-rose-600'>
                            <FaStar size={32} />
                            ارتقا امتیاز
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <Menu />
        </div>
    );
};

export default MissionsPage;
