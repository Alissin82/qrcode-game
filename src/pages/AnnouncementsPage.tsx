import { useEffect, useState } from 'react';
import { ANNOUNCEMENTS_DATA } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { apiClient, formatPersianDateTime, formatPersianDateRelative } from '../utils';

export const AnnouncementsPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState<any>([]);
    const [isBoy, setIsBoy] = useState(true);

    const bgColor = isBoy
        ? 'bg-accent'
        : 'bg-secondary';

    const getList = async () => {
        try {
            const res =
                await apiClient.get(`/notify`);
            setList(res.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getList();
    }, []);

    if (loading) return;
    return (
        <div
            className={`min-h-screen ${bgColor} font-sans text-white`}
        >
            <div className='mx-auto w-full max-w-xl p-4 pb-32 text-right'>
                {/* Header */}
                <header className='mb-10 flex items-center justify-start gap-x-2'>
                    <button
                        className='btn btn-circle btn-ghost bg-white/20'
                        onClick={() => {
                            navigate(
                                '/dashboard',
                            );
                        }}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        >
                            <line
                                x1='5'
                                y1='12'
                                x2='19'
                                y2='12'
                            ></line>
                            <polyline points='12 5 19 12 12 19'></polyline>
                        </svg>
                    </button>
                    <h1 className='text-xl font-bold'>
                        جدیدترین اعلانات
                    </h1>
                </header>

                {/* Announcements List */}
                <section className='space-y-8'>
                    {list.map((item : any) => (
                        <div key={item.id}>
                            <div className='mb-3 flex items-baseline justify-between'>
                                <h2 className='text-base font-bold lg:text-lg'>
                                    {item.title}
                                </h2>
                                <div className='text-sm opacity-80'>
                                    <span>
                                        {
                                            item.time
                                        }
                                    </span>
                                    <span className='mx-2'>
                                        {
                                            formatPersianDateTime(item.created_at, true)
                                        }
                                    </span>
                                </div>
                            </div>
                            <p className='leading-relaxed opacity-90'>
                                {item.content}
                            </p>
                            {/* Add a divider unless it's the last item */}
                            {/* {index <
                                ANNOUNCEMENTS_DATA.length -
                                    1 && (
                                <div className='divider before:bg-white/20 after:bg-white/20'></div>
                            )} */}
                        </div>
                    ))}
                </section>
            </div>
            {/* The bottom menu would go here if needed */}
            {/* <BottomMenu /> */}
        </div>
    );
};
