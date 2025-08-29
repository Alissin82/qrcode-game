import { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import { useNavigate } from 'react-router-dom';

// You can keep this component in a file like `src/components/LoginPage.jsx`

const LoginPage = () => {
    const navigate = useNavigate();

    // State to hold the scanned QR code data
    const [qrData, setQrData] = useState();
    // State for the dropdown selections
    const [gender, setGender] = useState('');
    const [deviceType, setDeviceType] =
        useState('');
    // State to control the visibility of the bottom drawer
    const [isDrawerOpen, setIsDrawerOpen] = 
        useState(false);

    // This function is called when a QR code is successfully scanned
    const handleScan = (data: any) => {
        if (data) {
            console.log('Scanned QR Code:', data);
            setQrData(data.text);
        }
    };

    // This function handles errors from the scanner
    const handleError = (err: any) => {
        console.error('QR Scanner Error:', err);
    };

    // This function handles the login button click
    const handleLogin = (e: any) => {
        e.preventDefault();
        if (!qrData) {
            // In a real app, you'd show a toast or an inline error message
            console.error(
                'Please scan a QR code first.',
            );
            return;
        }
        if (!gender || !deviceType) {
            console.error(
                'Please select both gender and device type.',
            );
            return;
        }
        // Open the confirmation drawer instead of logging in directly
        setIsDrawerOpen(true);
    };

    // This function is called when the user confirms the device
    const handleConfirmDevice = () => {
        console.log(
            'Device confirmed. Navigating to dashboard with:',
            {
                qrData,
                gender,
                deviceType,
            },
        );
        // --- Navigation Logic Here ---
        // In a real app with React Router, you would use: navigate('/dashboard');
        // For this example, we'll simulate it by changing the window location.
        navigate('/dashboard');
    };

    return (
        // Main container with a light gray background, filling the screen
        <div className='flex min-h-screen items-center justify-center md:bg-gray-100 font-sans md:*:p-4'>
            {/* Card container with a white background, rounded corners, and shadow */}
            <div className='w-full md:max-w-md space-y-8 md:rounded-2xl bg-white p-8 md:shadow-xl'>
                {/* QR Code Scanner Section */}
                <div className='text-center'>
                    {/* The container for the scanner has a border with corner accents */}
                    <div className='relative mx-auto h-64 w-64 overflow-hidden rounded-lg border-2 border-gray-200 p-1'>
                        {/* Corner accents for styling */}
                        <span className='absolute top-0 left-0 h-8 w-8 rounded-tl-lg border-t-4 border-l-4 border-yellow-400'></span>
                        <span className='absolute top-0 right-0 h-8 w-8 rounded-tr-lg border-t-4 border-r-4 border-blue-400'></span>
                        <span className='absolute bottom-0 left-0 h-8 w-8 rounded-bl-lg border-b-4 border-l-4 border-green-400'></span>
                        <span className='absolute right-0 bottom-0 h-8 w-8 rounded-br-lg border-r-4 border-b-4 border-pink-400'></span>

                        {/* The QR Scanner Component */}
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
                    <p className='mt-6 text-gray-600'>
                        جهت ورود به سامانه qr code
                        مربوط به تیم خود را اسکن
                        کنید
                    </p>
                    {qrData && (
                        <p className='mt-2 rounded-md bg-green-100 p-2 text-sm font-bold text-green-600'>
                            اسکن موفق: {qrData}
                        </p>
                    )}
                </div>

                {/* Form Section */}
                <form
                    className='space-y-6'
                    onSubmit={handleLogin}
                >
                    {/* Gender Dropdown */}
                    <div>
                        <label
                            htmlFor='gender'
                            className='mb-1 block text-right text-sm font-medium text-gray-700'
                        >
                            جنسیت
                        </label>
                        <select
                            id='gender'
                            className='select select-bordered w-full bg-gray-100 text-right'
                            value={gender}
                            onChange={(e) =>
                                setGender(
                                    e.target
                                        .value,
                                )
                            }
                            required
                        >
                            <option
                                disabled
                                value=''
                            >
                                پسر
                            </option>
                            <option value='male'>
                                پسر
                            </option>
                            <option value='female'>
                                دختر
                            </option>
                        </select>
                    </div>

                    {/* Device Type Dropdown */}
                    <div>
                        <label
                            htmlFor='device'
                            className='my-1 block text-right text-sm font-medium text-gray-700'
                        >
                            انتخاب نوع دستگاه ورود
                        </label>
                        <select
                            id='device'
                            className='select select-bordered w-full bg-gray-100 text-right'
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
                                value=''
                            >
                                انتخاب نوع دستگاه
                                ورود را به سامانه
                            </option>
                            <option value='mobile'>
                                موبایل
                            </option>
                            <option value='tablet'>
                                تبلت
                            </option>
                            <option value='desktop'>
                                کامپیوتر
                            </option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type='submit'
                            className='btn btn-lg mt-4 w-full rounded-xl border-none text-xl font-bold text-white'
                            style={{
                                background:
                                    'linear-gradient(to left, #00b48d, #fcb917)',
                            }}
                        >
                            ورود به بازی
                        </button>
                    </div>
                </form>
            </div>

            {/* Confirmation Drawer (Modal) */}
            <div
                className={`modal modal-bottom !absolute !w-full !p-0 ${isDrawerOpen ? 'modal-open' : ''}`}
            >
                <div className='modal-box text-right'>
                    <h3 className='text-lg font-bold'>
                        آیا ورود با این دستگاه رو
                        تایید میکنید؟
                    </h3>
                    <div className='modal-action justify-center'>
                        <button
                            onClick={() =>
                                setIsDrawerOpen(
                                    false,
                                )
                            }
                            className='btn btn-ghost btn-md'
                        >
                            رد دستگاه
                        </button>
                        <button
                            onClick={
                                handleConfirmDevice
                            }
                            className='lale from-primary to-neutral btn btn-md rounded-md border-none bg-linear-to-l font-light text-white shadow-lg'
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
