import { useCallback, useState } from 'react';
import QrScanner from 'react-qr-scanner';
import {
    FaCoins,
    FaHeart,
} from 'react-icons/fa6';

type QrCodeType = {
    type: string;
    id: number;
    amount: number;
};

function GetScors() {
    const [isBoy, setIsBoy] = useState(false);
    const [activeTab, setActiveTab] =
        useState('coin');
    const [qrCodeData, setQrCodeData] =
        useState<QrCodeType | null>(null);

    const handleScan = useCallback(
        (data: { text: string }) => {
            if (data) {
                setQrCodeData(
                    JSON.parse(data.text),
                );
            }
        },
        [],
    );

    const handleError = () => {
        console.log(`error`);
    };

    const activeBtnColor = isBoy
        ? 'bg-gradient-to-r from-blue-400 to-indigo-600 text-white'
        : 'bg-gradient-to-r from-yellow-300 to-orange-500 text-black';

    return (
        <section className='mb-6 flex items-center justify-around rounded-2xl bg-black/20 p-6 text-center shadow-md'>
            <button
                onClick={() => {
                    setActiveTab('coin');
                    (
                        document.getElementById(
                            'my_modal_2',
                        ) as HTMLFormElement
                    ).showModal();
                }}
                className={`btn flex-1 gap-2 rounded-xl font-bold transition ${
                    activeTab === 'coin'
                        ? activeBtnColor
                        : 'btn-ghost text-white hover:bg-white/10'
                }`}
            >
                دریافت سکه
                <FaCoins />
            </button>
            <button
                onClick={() => {
                    setActiveTab('score');
                    (
                        document.getElementById(
                            'my_modal_2',
                        ) as HTMLFormElement
                    ).showModal();
                }}
                className={`btn flex-1 gap-2 rounded-xl font-bold transition ${
                    activeTab === 'score'
                        ? activeBtnColor
                        : 'btn-ghost text-white hover:bg-white/10'
                }`}
            >
                دریافت امتیاز
                <FaHeart />
            </button>

            <dialog
                id='my_modal_2'
                className='modal'
            >
                <div className='modal-box'>
                    {qrCodeData !== null ? (
                        <>
                            <p className='text-gray-700 mb-2'>
                                شما از این qr code
                                امتیاز :{' '}
                                {
                                    qrCodeData.amount
                                }{' '}
                                دریافت میکنید.
                            </p>
                            <button className='btn w-full'>
                                {' '}
                                ثبت{' '}
                            </button>
                        </>
                    ) : (
                        <>
                            <p className='text-gray-600'>
                                ابتدا qr code را
                                اسکن کنید.
                            </p>
                        </>
                    )}

                    {qrCodeData !== null ? (
                        <> </>
                    ) : (
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
                    )}
                </div>
                <form
                    method='dialog'
                    className='modal-backdrop'
                >
                    <button>close</button>
                </form>
            </dialog>
        </section>
    );
}

export default GetScors;
