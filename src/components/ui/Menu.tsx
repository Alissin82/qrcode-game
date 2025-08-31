import { useState } from 'react';
import { FaMedal } from 'react-icons/fa6';
import { TbLayoutGridFilled } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';
import HomeIcon from './icons/HomeIcon';
import MissionIcon from './icons/MissionIcon';
import TeamIcon from './icons/TeamIcon';

const Menu = () => {
    const [isBoy, setIsBoy] = useState(true);

    const baseLinkClass =
        'flex flex-col items-center gap-1 opacity-70 hover:opacity-100 w-16';
    const activeLinkClass = `bg-accent from-accent to-secondary flex h-16 w-16 flex-col items-center gap-1 rounded-lg p-3`;

    // In a real app, the active style for 'Home' might be different.
    // We use a function with NavLink's `isActive` prop to conditionally apply styles.
    const getLinkClass = ({ isActive }: any) =>
        isActive
            ? `${activeLinkClass} opacity-100`
            : baseLinkClass;

    return (
        <footer className='fixed right-0 bottom-0 left-0 bg-black/20 backdrop-blur-sm'>
            <div className='mx-auto flex w-full max-w-xl items-center justify-around p-2 text-xs text-white'>
                <NavLink
                    to='/dashboard'
                    className={getLinkClass}
                >
                    <HomeIcon />
                    <span>خانه</span>
                </NavLink>
                <NavLink
                    to='/missions'
                    className={getLinkClass}
                >
                    <MissionIcon />
                    <span>عملیات‌ها</span>
                </NavLink>
                <NavLink
                    to='/gifts'
                    className={getLinkClass}
                >
                    <FaMedal size={22} />

                    <span>جوایز</span>
                </NavLink>
              {/*
                <NavLink
                    to='/puzzles'
                    className={getLinkClass}
                >
                    <TbLayoutGridFilled
                        size={24}
                    />

                    <span>پازل</span>
                </NavLink>
                */}
                <NavLink
                    to='/teams'
                    className={getLinkClass}
                >
                    <TeamIcon />
                    <span>تیم ها</span>
                </NavLink>
            </div>
        </footer>
    );
};

export default Menu;
