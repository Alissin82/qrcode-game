import { useContext, useState } from 'react';

// --- Icon Components ---
// NOTE: The following icons are from the 'react-icons' library.
// Make sure to install it by running: npm install react-icons
import { FaArrowRight } from 'react-icons/fa6';
import Menu from '../components/ui/Menu';
import { TeamDataContext } from '../contexts/TeamDataContext';
import { apiClient } from '../utils';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { AxiosResponse } from 'axios';
import type { ApiResponse } from '../types/apiResponse';

// --- Placeholder for Bottom Menu ---
// You can replace this with your actual Menu component

const SettingsPage = () => {
    const navigate = useNavigate();
    const { data: team, setData: setTeam } =
        useContext(TeamDataContext);

    // State to toggle between boy (blue) and girl (pink) themes
    const [isBoy, setIsBoy] = useState(true);
    // State to manage the team color from the color picker
    const [teamColor, setTeamColor] =
        useState('#1f4567');
    // State for team name input
    const [teamName, setTeamName] = useState(
        team?.name || '',
    );
    // State for gender selection
    const [gender, setGender] = useState('');

    // Handler function to update the team color state
    const handleColorChange = (e: any) => {
        setTeamColor(e.target.value);
    };

    async function fetchTeam() {
        const response: AxiosResponse<
            ApiResponse<Team>
        > = await apiClient.get(`/teams/me`);
        setTeam(response.data.data);
    }

    // Handler function to handle form submission
    const handleSubmit = async (
        e: React.FormEvent,
    ) => {
        e.preventDefault();
        try {
            const res = await apiClient.put(
                `/teams`,
                {
                    gender:
                        gender === 'true'
                            ? true
                            : false,
                    color: teamColor,
                    name: teamName,
                },
            );

            toast.success(
                'اطلاعات با موفقیت ویرایش شد.',
            );
            fetchTeam()
            navigate('/dashboard');
        } catch (error) {
            toast.error(`دوباره امتحان کنید.`);
            console.log(error);
        }
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
                <header className='mb-10 flex items-center justify-start'>
                    <button className='btn btn-square btn-ghost rounded-full bg-white/20'>
                        <FaArrowRight />
                    </button>
                    <h1 className='px-2 text-xl font-bold'>
                        تنظیمات
                    </h1>
                </header>

                {/* Profile Picture Section */}
                {/* <section className='mb-12 flex justify-center'>
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
                </section> */}

                {/* Form Section */}
                <form
                    onSubmit={handleSubmit}
                    className='space-y-6 text-right'
                >
                    {/* Team Name Input */}
                    <div className='py-4'>
                        <label
                            htmlFor='teamName'
                            className='mb-2 block font-semibold'
                        >
                            نام گروه
                        </label>
                        <input
                            type='text'
                            id='teamName'
                            value={teamName}
                            onChange={(e) =>
                                setTeamName(
                                    e.target
                                        .value,
                                )
                            }
                            placeholder={
                                team?.name
                            }
                            className='input input-bordered input-lg w-full bg-black/20 text-right placeholder:text-xs placeholder:text-gray-300'
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
                                className='input input-bordered input-lg w-full bg-black/20 pr-12 text-right'
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
                    <select
                        id='gender'
                        className='select select-bordered input input-bordered mt-8 h-12 w-full rounded-lg bg-black/20 text-right'
                        value={gender}
                        onChange={(e) =>
                            setGender(
                                e.target.value,
                            )
                        }
                        required
                    >
                        <option disabled value=''>
                            جنسیت را انتخاب کنید .
                        </option>
                        <option value='true'>
                            پسر
                        </option>
                        <option value='false'>
                            دختر
                        </option>
                    </select>
                    {/* Save Button */}
                    <div className='pt-4'>
                        <button
                            type='submit'
                            className='btn btn-lg w-full rounded-xl border-none text-xl font-bold text-white'
                            style={{
                                background: isBoy
                                    ? 'linear-gradient(to left, #10B981, #34D399)' // سبز وقتی true
                                    : 'linear-gradient(to left, #F97316, #FB923C)', // نارنجی وقتی false
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
