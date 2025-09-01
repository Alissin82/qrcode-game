import QrScanner from 'react-qr-scanner';
import { useCallback, useEffect, useState } from 'react';
import { config } from '../../config/config.ts';
import clsx from 'clsx';

interface QrCodeScannerProps {
    onScan: (data: string) => void;
    onError: () => void;
    isOpen: boolean;
}

function QrCodeScanner({ onScan, onError, isOpen }: QrCodeScannerProps) {
    const [localIsOpen, setLocalIsOpen] = useState(false);
    const [qrData, setQrData] = useState<QrData>();
    const [testInput, setTestInput] = useState('');
    const [statusText, setStatusText] = useState<{ text: string; success: boolean; }>({ text: '', success: true });


    function handleClick() {
        if (!qrData)
            onScan(testInput);
        else {
            const text = JSON.parse(qrData.text);
            onScan(text);
        }
    }

    const handleScan = useCallback((data: QrData) => {
        setStatusText({
            text: 'با موفقیت اسکن شد',
            success: true,
        });
        setQrData(data);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        setLocalIsOpen(isOpen);
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="z-100 flex h-[100vh] fixed bg-gray-800/50 w-[100vw] items-center justify-center overflow-hidden">
            <div
                className="h-[85%] w-[85%] rounded-md bg-white">
                <div
                    className={'px-[24px] py-[20px] w-full h-full flex flex-col items-center justify-center gap-[24px]'}>
                    <p className="text-black font-bold text-[36px]">اسکن QR Code</p>
                    {
                        !config.isProd &&
                        <div
                            className={'flex text-black gap-4 h-[50px] border-[1px] border-gray-600 rounded-md w-[90%]'}>
                            <input
                                className={'w-full h-full px-4'}
                                value={testInput} onChange={(e) => setTestInput(e.target.value)} />
                        </div>
                    }
                    <div className="h-[70vw] w-[70vw] max-w-[90%%] max-h-[50%]">
                        <QrScanner
                            delay={300}
                            onError={onError}
                            onScan={handleScan}
                            style={{ width: '100%', height: '100%' }}
                            constraints={{
                                audio: false,
                                video: { facingMode: 'environment' },
                            }}
                        />
                    </div>
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
                    <button
                        onClick={handleClick}
                        className={'h-[54px]  w-full rounded-[12px] text-[18px] font-bold text-white bg-gradient-to-r from-[#EF4770] to-[#074F9A]'}>
                        تایید
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QrCodeScanner;
