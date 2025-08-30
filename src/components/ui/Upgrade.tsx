import { FaStar } from 'react-icons/fa6';
const Upgrade = () => {
    return (
        <div className='fixed right-0 bottom-20 z-50 lg:right-auto lg:ml-[280px]'>
            <div className='indicator'>
                <span className='indicator-item badge h-8 w-8 animate-bounce rounded-full border-none bg-rose-700 text-base shadow-md'>
                    ⚡
                </span>
                <button className='btn btn-lg h-20 w-20 animate-pulse flex-col rounded-full bg-gradient-to-tr from-yellow-400 via-orange-500 to-red-500 text-sm font-bold shadow-2xl transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-6'>
                    <FaStar
                        size={24}
                        className='text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]'
                    />
                    <span className='mt-1 text-[9px] text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]'>
                        ارتقا امتیاز
                    </span>
                </button>
            </div>
        </div>
    );
};
export default Upgrade;
