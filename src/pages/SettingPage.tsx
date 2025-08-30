import { useState } from 'react';

// --- Icon Components ---
// NOTE: The following icons are from the 'react-icons' library.
// Make sure to install it by running: npm install react-icons
import { FaArrowRight } from 'react-icons/fa6';
import { TbCamera } from 'react-icons/tb';
import Menu from '../components/ui/Menu';

// --- Placeholder for Bottom Menu ---
// You can replace this with your actual Menu component

const SettingsPage = () => {
    // State to toggle between boy (blue) and girl (pink) themes
    const [isBoy, setIsBoy] = useState(false);
    // State to manage the team color from the color picker
    const [teamColor, setTeamColor] =
        useState('#1f4567');

    // Handler function to update the team color state
    const handleColorChange = (e: any) => {
        setTeamColor(e.target.value);
    };

    // Dynamically set the background color based on the isBoy state
    // These classes ('bg-secondary', 'bg-accent') should be defined in your DaisyUI theme config
    const bgColor = isBoy
        ? 'bg-accent'
        : 'bg-secondary';

    return (
        <div
            className={`min-h-screen ${bgColor} font-sans text-white`}
        >
            {/* Main container with responsive max-width */}
            <div className='mx-auto w-full max-w-xl p-4 pb-32'>
                {/* Header */}
                <header className='mb-10 flex items-center justify-between'>
                    <h1 className='text-xl font-bold'>
                        تنظیمات
                    </h1>
                    <button className='btn btn-square btn-ghost rounded-full bg-white/20'>
                        <FaArrowRight />
                    </button>
                </header>

                {/* Profile Picture Section */}
                <section className='mb-12 flex  justify-center'>
                    <div className='relative'>
                        <div className='avatar'>
                            <div className='w-32 rounded-full ring-4 ring-white'>
                                <img
                                    src='/images/profile.jpg'
                                    alt='User Avatar'
                                />
                            </div>
                        </div>
                        <button className='btn btn-circle btn-sm absolute right-0 bottom-0 border-2 border-blue-800 bg-white text-black hover:bg-gray-200'>
                            <TbCamera size={20} />
                        </button>
                    </div>
                </section>

                {/* Form Section */}
                <form className='space-y-6 text-right'>
                    {/* Team Name Input */}
                    <div>
                        <label
                            htmlFor='teamName'
                            className='mb-2 block font-semibold'
                        >
                            نام گروه
                        </label>
                        <input
                            type='text'
                            id='teamName'
                            placeholder='نام گروه خود را میتوانید از اینجا تغییر دهید'
                            className='input input-bordered w-full bg-black/20 text-right placeholder:text-gray-400'
                        />
                    </div>

                    {/* Team Color Input */}
                    <div>
                        <label
                            htmlFor='teamColor'
                            className='mb-2 block font-semibold'
                        >
                            رنگ تیم
                        </label>
                        <div className='relative'>
                            {/* This input displays the hex code and is read-only */}
                            <input
                                type='text'
                                value={teamColor}
                                readOnly
                                className='input input-bordered w-full bg-black/20 pr-12 text-right'
                            />
                            {/* This is the clickable swatch that opens the color picker */}
                            <label
                                htmlFor='teamColorPicker'
                                className='absolute top-1/2 left-2 h-8 w-8 -translate-y-1/2 cursor-pointer rounded-lg border-2 border-white'
                                style={{
                                    backgroundColor:
                                        teamColor,
                                }}
                            ></label>
                            {/* The actual color input is visually hidden but functional */}
                            <input
                                type='color'
                                id='teamColorPicker'
                                value={teamColor}
                                onChange={
                                    handleColorChange
                                }
                                className='absolute h-0 w-0 opacity-0'
                            />
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className='pt-4'>
                        <button
                            type='submit'
                            className='btn btn-lg w-full rounded-xl border-none text-xl font-bold text-white'
                            style={{
                                background:
                                    'linear-gradient(to left, #10B981, #34D399)', // Green gradient
                            }}
                        >
                            ذخیره اطلاعات
                        </button>
                    </div>
                </form>
            </div>

            {/* Bottom Navigation */}
            <Menu />
        </div>
    );
};

export default SettingsPage;
