import { useState } from 'react';
import {
    FaHeart,
    FaMedal,
    FaStar,
} from 'react-icons/fa6';
import { LuNotepadText } from 'react-icons/lu';
import { TbCoinFilled } from 'react-icons/tb';
import Menu from '../components/ui/Menu';
import {
    GIFTS_DATA,
    MY_TEAM_DATA,
} from '../utils/constants';

export const GiftsPage = () => {
    const [isBoy, setIsBoy] = useState(false);
    const [activeTab, setActiveTab] =
        useState('all');
    const bgColor = isBoy
        ? 'bg-accent'
        : 'bg-secondary';

    return (
        <div
            className={`min-h-screen ${bgColor} font-sans text-white`}
        >
            <div className='mx-auto w-full max-w-xl p-4 pb-32'>
                {/* Top Stats Section */}
                <section className='mb-6 flex items-center justify-around rounded-2xl bg-black/20 p-6 text-center'>
                    <div>
                        <p className='text-2xl font-bold'>
                            {MY_TEAM_DATA.score.toLocaleString(
                                'fa-IR',
                            )}
                        </p>
                        <p className='flex items-center gap-2 opacity-80'>
                            کل جوایز
                            <FaMedal size={24} />
                        </p>
                    </div>
                    <div className='h-16 w-px bg-white/20'></div>{' '}
                    {/* Divider */}
                    <div>
                        <p className='text-2xl font-bold'>
                            ۲۴
                        </p>
                        <p className='flex items-center gap-2 opacity-80'>
                            جوایز دریافتی
                            <TbCoinFilled
                                size={24}
                            />
                        </p>
                    </div>
                </section>

                {/* Filter Tabs */}
                <section className='mb-6 flex items-center justify-between rounded-2xl bg-black/20 p-2 text-sm'>
                    <button
                        onClick={() =>
                            setActiveTab(
                                'achievements',
                            )
                        }
                        className={`btn flex-1 ${activeTab === 'achievements' ? 'bg-white' : 'btn-ghost'}`}
                    >
                        دستاورد ها
                        <LuNotepadText />
                    </button>
                    <button
                        onClick={() =>
                            setActiveTab('daily')
                        }
                        className={`btn flex-1 ${activeTab === 'daily' ? 'bg-white' : 'btn-ghost'}`}
                    >
                        جوایز روزانه
                        <FaStar />
                    </button>
                    <button
                        onClick={() =>
                            setActiveTab('all')
                        }
                        className={`btn flex-1 ${activeTab === 'all' ? 'bg-white' : 'btn-ghost'}`}
                    >
                        همه جوایز
                        <FaHeart />
                    </button>
                </section>

                {/* Gifts List */}
                <section className='flex flex-col gap-2'>
                    {GIFTS_DATA.map((gift) => (
                        <div
                            key={gift.id}
                            className={`flex items-center justify-between rounded-2xl p-4 ${gift.claimed ? 'bg-white/30' : 'bg-black/20'}`}
                        >
                            <div className='flex items-center gap-4'>
                                {gift.claimed ? (
                                    <button className='btn btn-disabled bg-white/30 text-white'>
                                        دریافت شده
                                    </button>
                                ) : (
                                    <button className='btn btn-success'>
                                        دریافت
                                    </button>
                                )}
                            </div>
                            <div className='text-right'>
                                <p className='font-bold'>
                                    {gift.title}
                                </p>
                                <p className='text-sm'>
                                    {gift.reward.toLocaleString(
                                        'fa-IR',
                                    )}{' '}
                                    سکه
                                </p>
                            </div>
                            <div
                                className={`avatar placeholder`}
                            >
                                <div
                                    className={`w-16 rounded-full ${gift.color}`}
                                >
                                    <span className='text-3xl'>
                                        {
                                            gift.icon
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
            <Menu />
        </div>
    );
};
