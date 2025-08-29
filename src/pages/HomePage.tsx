// Assuming you have your font file imported or linked in your main CSS/HTML
// And your background image path is correct.

import { Link } from 'react-router-dom';
import Logo from '../components/ui/Logo';

const HomePage = () => {
    return (
        <div
            className='relative flex h-screen items-center justify-center overflow-y-hidden bg-cover bg-center bg-no-repeat'
            style={{
                backgroundImage:
                    "url('/images/bg-home.jpg')",
            }} // <--- Replace with your actual image path
        >
            <div className='absolute inset-0 bg-black opacity-60'></div>{' '}
            {/* Optional: Dark overlay */}
            <div className='relative z-10 flex flex-col items-center p-8 text-center text-white'>
                {/* Logo Section */}
                <div className='mb-12'>
                    <Logo />
                </div>

                {/* Welcome Text */}
                <div className='mb-12 leading-loose'>
                    {' '}
                    {/* Adjust margin and line spacing */}
                    <p
                        className='mb-2 text-xl font-bold lg:text-3xl'
                        style={{
                            fontFamily:
                                'YourPersianFont',
                        }}
                    >
                        خوش آمدید به دنیای
                    </p>
                    <p
                        className='text-xl font-bold lg:text-3xl'
                        style={{
                            fontFamily:
                                'YourPersianFont',
                        }}
                    >
                        ماموریت های جذاب
                    </p>
                </div>

                {/* Start Game Button */}
                <div>
                    {/* Using DaisyUI's btn component with custom colors */}
                    <Link to='/login'>
                        <button className='lale from-primary to-neutral btn btn-xl rounded-xl border-none bg-linear-to-l px-16 py-4 text-xl text-white shadow-lg lg:text-2xl'>
                            شروع بازی
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
