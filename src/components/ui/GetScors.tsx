import { useCallback, useContext, useState } from 'react';
import QrScanner from 'react-qr-scanner';
import { FaCoins, FaHeart } from 'react-icons/fa6';
import { FaQrcode } from 'react-icons/fa';
import { apiClient } from '../../utils';
import toast from 'react-hot-toast';
import type { AxiosResponse } from 'axios';
import type { ApiResponse } from '../../types/apiResponse';
import { TeamDataContext } from '../../contexts/TeamDataContext';

type QrCodeType = {
    type: string;
    id: number;
    amount: number;
};

function GetScors() {
    const { data: team, setData: setTeam } = useContext(TeamDataContext);
    const [isBoy, setIsBoy] = useState(false);
    const [activeTab, setActiveTab] = useState('coin');
    const [qrCodeData, setQrCodeData] = useState<any>(null);

    async function fetchTeam() {
        try {
            const response: AxiosResponse<ApiResponse<Team>> = await apiClient.get(`/teams/me`);
            setTeam(response.data.data);
        } catch (e) {
            console.log(e);
        }
    }

    const handleScan = useCallback(async (data: { text: string }) => {
        if (data) {
            setQrCodeData(JSON.parse(data.text));
        }
    }, []);

    const handleGetCoin = useCallback(async () => {
        try {
            const url = `/coins/${qrCodeData?.id}`;
            const res = await apiClient.post(url, {
                id: qrCodeData?.id,
            });
            (document.getElementById('my_modal_2') as HTMLDialogElement).close();
            fetchTeam();
            setQrCodeData(null)
        } catch (error) {
            toast.error('از کد یکبار استفاده شده است');
            (document.getElementById('my_modal_2') as HTMLDialogElement).close();
        }
    }, [qrCodeData]);

    const handleGetScore = useCallback(async () => {
        try {
            const url = `/score-cards/${qrCodeData?.id}`;
            const res = await apiClient.post(url, {
                id: qrCodeData?.id,
            });
            (document.getElementById('my_modal_2') as HTMLDialogElement).close();
            fetchTeam();
            setQrCodeData(null)
        } catch (error) {
            toast.error('از کد یکبار استفاده شده است');
            (document.getElementById('my_modal_2') as HTMLDialogElement).close();
        }
    }, [qrCodeData]);

    const handleError = () => {
        console.log(`error`);
    };

    const activeBtnColor = isBoy
        ? 'bg-gradient-to-r from-blue-400 to-indigo-600 text-white'
        : 'bg-gradient-to-r from-yellow-300 to-orange-500 text-black';

    return (
        <section className="mb-8 flex items-center justify-around gap-4 rounded-2xl bg-black/20 p-6 text-center shadow-md">
            <button
                onClick={() => {
                    setActiveTab('coin');
                    (document.getElementById('my_modal_2') as HTMLDialogElement).show();
                }}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 font-bold shadow-lg transition-transform hover:scale-105 ${
                    isBoy
                        ? 'bg-gradient-to-r from-blue-400 to-indigo-600 text-white'
                        : 'bg-gradient-to-r from-pink-400 to-rose-500 text-white'
                }`}
            >
                دریافت سکه
                <FaCoins />
            </button>

            {/* دکمه دریافت امتیاز */}
            <button
                onClick={() => {
                    setActiveTab('score');
                    (document.getElementById('my_modal_2') as HTMLDialogElement).show();
                }}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 font-bold shadow-lg transition-transform hover:scale-105 ${
                    isBoy
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white'
                        : 'bg-gradient-to-r from-yellow-300 to-orange-500 text-black'
                }`}
            >
                دریافت امتیاز
                <FaHeart />
            </button>

            <dialog id="my_modal_2" className="modal">
                <div className="modal-box max-w-sm overflow-hidden rounded-3xl p-0">
                    {/* هدر با آیکون */}
                    <div className="flex flex-col items-center justify-center py-6">
                        <div className="rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-[2px]">
                            <div className="rounded-full p-4">
                                <FaQrcode />
                            </div>
                        </div>
                        <h2 className="mt-3 text-lg font-bold text-gray-800">اسکن QR Code</h2>
                    </div>

                    {/* QR Scanner یا نمایش QR */}
                    <div className="flex justify-center px-6">
                        {qrCodeData !== null ? (
                            <div className="w-full text-center">
                                <p className="mb-4 font-semibold text-gray-700">
                                    شما {qrCodeData.amount} امتیاز دریافت می‌کنید 🎉
                                </p>
                            </div>
                        ) : (
                            <div className="relative w-full overflow-hidden rounded-2xl border-2 border-dashed border-gray-300">
                                <QrScanner
                                    delay={300}
                                    onError={handleError}
                                    onScan={handleScan}
                                    style={{ width: '100%', height: '220px' }}
                                    constraints={{
                                        audio: false,
                                        video: { facingMode: 'environment' },
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* دکمه‌ها */}
                    <div className="flex flex-col gap-3 p-6">
                        {qrCodeData !== null ? (
                            <button
                                onClick={activeTab === 'score' ? handleGetScore : handleGetCoin}
                                className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 py-3 font-bold text-white shadow-md transition hover:scale-[1.02]"
                            >
                                دریافت امتیاز
                            </button>
                        ) : (
                            <button className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 py-3 font-bold text-white shadow-md transition hover:scale-[1.02]">
                                اسکن QR Code
                            </button>
                        )}

                        <form method="dialog">
                            <button className="w-full rounded-xl bg-gray-200 py-3 font-bold text-gray-700 transition hover:bg-gray-300">
                                انصراف
                            </button>
                        </form>
                    </div>
                </div>

                {/* پس‌زمینه مودال */}
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </section>
    );
}

export default GetScors;
