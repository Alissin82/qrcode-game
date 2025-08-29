import { useState } from 'react';
import { FaMedal } from 'react-icons/fa6';
import { TbLayoutGridFilled } from 'react-icons/tb';
import HomeIcon from './icons/HomeIcon';
import MissionIcon from './icons/MissionIcon';
import TeamIcon from './icons/TeamIcon';

export default function Menu() {
    const [isBoy, setIsBoy] = useState(true);
    return (
        <footer className='fixed right-0 bottom-0 left-0 bg-black/20 backdrop-blur-sm'>
            <div className='mx-auto flex w-full max-w-xl items-center justify-around p-2 text-xs'>
                <a
                    href='#'
                    className='flex flex-col items-center gap-1 opacity-70 hover:opacity-100'
                >
                    <TbLayoutGridFilled
                        size={24}
                    />

                    <span>پازل</span>
                </a>
                <a
                    href='#'
                    className='flex flex-col items-center gap-1 opacity-70 hover:opacity-100'
                >
                    <TeamIcon />
                    <span>تیم ها</span>
                </a>
                <a
                    href='#'
                    className='flex flex-col items-center gap-1 opacity-70 hover:opacity-100'
                >
                    <FaMedal size={22} />

                    <span>جوایز دریافتی</span>
                </a>
                <a
                    href='#'
                    className='flex flex-col items-center gap-1 opacity-70 hover:opacity-100'
                >
                    <MissionIcon />
                    <span>عملیات‌ها</span>
                </a>
                <a
                    href='#'
                    className='bg-accent from-accent to-secondary flex h-16 w-16 flex-col items-center gap-1 rounded-lg bg-linear-to-t p-3'
                >
                    <HomeIcon />
                    <span>خانه</span>
                </a>
            </div>
        </footer>
    );
}
