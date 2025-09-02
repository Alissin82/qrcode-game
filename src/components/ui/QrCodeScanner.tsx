import QrScanner from 'react-qr-scanner';
import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
 // آیکون پیش‌فرض

interface QrCodeScannerProps {
<<<<<<< HEAD
    onScan: (data: any) => void;
    onError: () => void;
    isOpen: boolean;
    onClose: () => void; 
}

function QrCodeScanner({ onScan, onError, isOpen, onClose }: QrCodeScannerProps) {
    const [qrData, setQrData] = useState<QrData>();
    const [statusText, setStatusText] = useState<{ text: string; success: boolean }>({
        text: '',
        success: true,
    });

    const handleScan = useCallback((data: any) => {
        if (!data?.text) return;
        const scanData = JSON.parse(data?.text);
        if (scanData) {
            try {
                setQrData(scanData);
                setStatusText({ text: '✅ کد با موفقیت اسکن شد', success: true });
            } catch {
                setStatusText({ text: '❌ کد نامعتبر است', success: false });
            }
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            setQrData(undefined);
            setStatusText({ text: '', success: true });
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="relative flex w-[90%] max-w-md flex-col items-center rounded-2xl bg-white p-6 shadow-2xl">
                {/* آیکون بالا */}
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-blue-600">
                    <span className="text-2xl text-white">📷</span>
                </div>

                {/* عنوان */}
                <h2 className="mb-6 text-lg font-bold text-gray-900">اسکن QR Code</h2>

                {/* QR Scanner */}
                <div className="relative mb-6 flex h-[260px] w-[260px] items-center justify-center">
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

                    {/* قاب رنگی گوشه‌ها */}
                    <div className="absolute inset-0 rounded-lg">
                        <div className="absolute top-0 left-0 h-8 w-8 rounded-tl-lg border-t-4 border-l-4 border-yellow-400"></div>
                        <div className="absolute top-0 right-0 h-8 w-8 rounded-tr-lg border-t-4 border-r-4 border-blue-500"></div>
                        <div className="absolute bottom-0 left-0 h-8 w-8 rounded-bl-lg border-b-4 border-l-4 border-teal-500"></div>
                        <div className="absolute right-0 bottom-0 h-8 w-8 rounded-br-lg border-r-4 border-b-4 border-pink-500"></div>
                    </div>
                </div>

                {/* وضعیت اسکن */}
                {statusText.text && (
                    <p
                        className={clsx(
                            'mb-4 w-full rounded-lg px-3 py-2 text-center text-sm font-bold transition-all duration-300',
                            {
                                'bg-green-100 text-green-700 shadow': statusText.success,
                                'bg-red-100 text-red-600 shadow': !statusText.success,
                            }
                        )}
                    >
                        {statusText.text}
                    </p>
                )}

                {/* دکمه‌ها */}
                <div className="flex w-full flex-col gap-3">
                    <button
                        disabled={!qrData}
                        onClick={() => {
                            if (qrData) {
                                onScan(qrData);
                                onClose(); // بستن بعد از اسکن موفق
                            }
                        }}
                        className={clsx(
                            'w-full rounded-xl py-3 text-base font-bold shadow-md transition',
                            qrData
                                ? 'bg-gradient-to-r from-blue-600 to-pink-500 text-white hover:opacity-90'
                                : 'cursor-not-allowed bg-gray-200 text-gray-400'
                        )}
                    >
                        اسکن QR Code
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full rounded-xl bg-gray-100 py-3 text-base font-bold text-gray-600 hover:bg-gray-200"
                    >
                        انصراف
                    </button>
                </div>
            </div>
=======
  onScan: (data: string) => void;
  onError: () => void;
  isOpen: boolean;
  onClose: () => void; // برای دکمه انصراف
}

function QrCodeScanner({ onScan, onError, isOpen, onClose }: QrCodeScannerProps) {
  const [qrData, setQrData] = useState<QrData>();
  const [statusText, setStatusText] = useState<{ text: string; success: boolean }>({ text: '', success: true });

  const handleScan = useCallback((data: QrData | null) => {
    if (data && data.text) {
      try {
        JSON.parse(data.text);
        setQrData(data);
        setStatusText({ text: '✅ کد با موفقیت اسکن شد', success: true });
      } catch {
        setStatusText({ text: '❌ کد نامعتبر است', success: false });
      }
    }
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative flex w-[90%] max-w-md flex-col items-center rounded-2xl bg-white shadow-2xl p-6">
        
        {/* آیکون بالا */}
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 mb-4">
          #
>>>>>>> 10aaf153510a966dcbd27dcdd4398b00aaa4d934
        </div>

        {/* عنوان */}
        <h2 className="text-lg font-bold text-gray-900 mb-6">اسکن QR Code</h2>

        {/* QR Scanner */}
        <div className="relative w-[260px] h-[260px] flex items-center justify-center mb-6">
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
          {/* قاب گوشه‌ها */}
          <div className="absolute inset-0 rounded-lg">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-yellow-400 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-teal-500 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-pink-500 rounded-br-lg"></div>
          </div>
        </div>

        {/* وضعیت اسکن */}
        {statusText.text && (
          <p
            className={clsx(
              'mb-4 w-full rounded-lg px-3 py-2 text-sm font-bold text-center transition-all duration-300',
              {
                'bg-green-100 text-green-700 shadow': statusText.success,
                'bg-red-100 text-red-600 shadow': !statusText.success,
              }
            )}
          >
            {statusText.text}
          </p>
        )}

        {/* دکمه‌ها */}
        <div className="w-full flex flex-col gap-3">
          <button
            onClick={() => qrData && onScan(qrData.text)}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-pink-500 py-3 text-base font-bold text-white shadow-md hover:opacity-90"
          >
            اسکن QR Code
          </button>
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-gray-100 py-3 text-base font-bold text-gray-600 hover:bg-gray-200"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}

export default QrCodeScanner;
