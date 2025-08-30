import {FaStar} from 'react-icons/fa6';

const Upgradee = () => {
return (
<div className='fixed right-0 bottom-20 z-50 lg:right-auto  lg:ml-[280px]'>
  <div className='indicator'>
    <span className='indicator-item badge h-10 w-10 rounded-full border-none bg-rose-700 text-base animate-bounce shadow-md'>
      ⚡
    </span>
    <button
      className='btn btn-lg h-20 w-20 flex-col rounded-full text-sm font-bold 
                 bg-gradient-to-tr from-yellow-400 via-orange-500 to-red-500
                 shadow-2xl hover:scale-110 hover:rotate-6 
                 transition-all duration-300 ease-in-out animate-pulse'
    >
      <FaStar
        size={20}
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

export default Upgradee;