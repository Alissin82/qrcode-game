import { useCallback, useState } from 'react';
import QrScanner from 'react-qr-scanner';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../utils';
import clsx from 'clsx';
import { config } from '../config/config.ts';

const LoginPage = () => {
    const navigate = useNavigate();
    const [qrData, setQrData] = useState<{ hash: string; }>({ hash: '' });
    const [gender, setGender] = useState('');
    const [deviceType, setDeviceType] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [statusText, setStatusText] = useState<{ text: string; success: boolean; }>({ text: '', success: true });

    const handleScan = useCallback((data: { text: string }) => {
        if (data) {
            const hashData: { hash: string } = JSON.parse(data.text);
            setQrData(hashData);
            setStatusText({
                text: 'با موفقیت اسکن شد',
                success: true,
            });
        }
    }, []);

    const handleError = () => {
        setStatusText({
            text: 'اسکن Qr Code با خطا مواجه شد.',
            success: false,
        });
    };

    const handleLogin = async (e: any) => {
        e.preventDefault();
        if (!qrData) {
            setStatusText({
                text: 'ابتدا اسکن کنید',
                success: false,
            });
            return;
        }
        if (!gender || !deviceType) {
            setStatusText({
                text: 'اطلاعات را مشخص کنید',
                success: false,
            });
            return;
        }
        if (qrData) {
            const response = await apiClient.post(
                '/teams/login',
                {
                    hash: qrData?.hash,
                },
            );
            if (response.status == 200) {
                localStorage.setItem('token', response.data.token);
                console.log(response.data.token);
                setIsDrawerOpen(true);
                setStatusText({
                    text: '',
                    success: true,
                });
            }
        }
    };

    const handleConfirmDevice = () => {
        navigate('/dashboard');
    };

    return (
        <div className="flex min-h-screen items-center justify-center font-sans md:bg-gray-100 md:*:p-4">
            <div className="w-full space-y-8 bg-white p-8 md:max-w-md md:rounded-2xl md:shadow-xl">
                <div className="text-center">
                    <div className="relative mx-auto h-64 w-64 overflow-hidden rounded-lg border-2 border-gray-200 p-1">
                        <span
                            className="absolute top-0 left-0 h-8 w-8 rounded-tl-lg border-t-4 border-l-4 border-yellow-400"></span>
                        <span
                            className="absolute top-0 right-0 h-8 w-8 rounded-tr-lg border-t-4 border-r-4 border-blue-400"></span>
                        <span
                            className="absolute bottom-0 left-0 h-8 w-8 rounded-bl-lg border-b-4 border-l-4 border-green-400"></span>
                        <span
                            className="absolute right-0 bottom-0 h-8 w-8 rounded-br-lg border-r-4 border-b-4 border-pink-400"></span>

                        <QrScanner
                            delay={300}
                            onError={handleError}
                            onScan={handleScan}
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

                    {/* Instructions below the scanner */}
                    <p className="mt-6 text-gray-600">
                        جهت ورود به سامانه qr code
                        مربوط به تیم خود را اسکن
                        کنید.
                    </p>
                    {
                        <p
                            className={clsx(
                                'mt-2 rounded-md p-2 text-sm font-bold',
                                {
                                    'bg-green-100 text-green-600':
                                    statusText.success,
                                    'bg-red-100 text-red-600':
                                        !statusText.success,
                                    hidden: !statusText.text,
                                },
                            )}
                        >
                            {statusText.text}
                        </p>
                    }
                </div>

                <div className="space-y-6">
                    <div>

                        {
                            !config.isProd &&
                            <>
                                <label
                                    className="mb-1 block text-right text-sm font-medium text-gray-700"
                                >
                                    هش برای لاگین
                                </label>
                                <input
                                    className="input w-full bg-gray-100 text-right"
                                    value={qrData?.hash}
                                    onChange={(e) => setQrData({ hash: e.target.value })}
                                >
                                </input>
                            </>
                        }

                        <label
                            htmlFor="gender"
                            className="mb-1 block text-right text-sm font-medium text-gray-700"
                        >
                            جنسیت
                        </label>
                        <select
                            id="gender"
                            className="select select-bordered w-full bg-gray-100 text-right"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option
                                disabled
                                value=""
                            >
                                جنسیت را انتخاب
                                کنید .
                            </option>
                            <option value="male">
                                پسر
                            </option>
                            <option value="female">
                                دختر
                            </option>
                        </select>
                    </div>

                    {/* Device Type Dropdown */}
                    <div>
                        <label
                            htmlFor="device"
                            className="my-1 block text-right text-sm font-medium text-gray-700"
                        >
                            انتخاب نوع دستگاه ورود
                        </label>
                        <select
                            id="device"
                            className="select select-bordered w-full bg-gray-100 text-right"
                            value={deviceType}
                            onChange={(e) =>
                                setDeviceType(
                                    e.target
                                        .value,
                                )
                            }
                            required
                        >
                            <option
                                disabled
                                value=""
                            >
                                انتخاب نوع دستگاه
                                ورود را به سامانه
                            </option>
                            <option value="mobile">
                                موبایل
                            </option>
                            <option value="tablet">
                                تبلت
                            </option>
                            <option value="desktop">
                                کامپیوتر
                            </option>
                        </select>
                    </div>

                    <div>
                        <button
                            onClick={handleLogin}
                            className="btn btn-lg mt-4 w-full rounded-xl border-none text-xl font-bold text-white"
                            style={{
                                background:
                                    'linear-gradient(to left, #00b48d, #fcb917)',
                            }}
                        >
                            ورود به بازی
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`modal modal-bottom !absolute !w-full !p-0 ${isDrawerOpen ? 'modal-open' : ''}`}
            >
                <div className="modal-box text-right">
                    <h3 className="text-lg font-bold">
                        آیا ورود با این دستگاه رو
                        تایید میکنید؟
                    </h3>
                    <div className="modal-action justify-center">
                        <button
                            onClick={() =>
                                setIsDrawerOpen(
                                    false,
                                )
                            }
                            className="btn btn-ghost btn-md"
                        >
                            رد دستگاه
                        </button>
                        <button
                            onClick={
                                handleConfirmDevice
                            }
                            className="lale from-primary to-neutral btn btn-md rounded-md border-none bg-linear-to-l font-light text-white shadow-lg"
                        >
                            تایید دستگاه
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
