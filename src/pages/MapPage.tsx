import { TbHome } from 'react-icons/tb';
import { Link } from 'react-router-dom';

export default function MapPage() {
    return (
        <>
            <div
                style={{
                    backgroundImage:
                        "url('/images/map.png')",
                }}
                className='block h-screen w-full bg-cover bg-no-repeat lg:hidden'
            >
                <Link to='/dashboard'>
                    <button className='btn btn-neutral absolute right-3 bottom-3 h-16 w-16 rounded-full'>
                        <TbHome
                            size={28}
                            className='text-black'
                        />
                    </button>
                </Link>
            </div>

            <div className='hidden h-screen w-full items-center justify-center lg:flex'>
                <h2 className='text-accent text-center text-2xl font-bold'>
                    لطفا با موبایل یا تبلت بصورت
                    عمودی وارد شوید
                </h2>
            </div>
        </>
    );
}
