import React, {
    useEffect,
    useState,
} from 'react';

type CountdownProps = {
    startMinutes: number;
};

const Countdown: React.FC<CountdownProps> = ({
    startMinutes,
}) => {
    const [timeLeft, setTimeLeft] = useState(
        startMinutes * 60,
    ); // total seconds

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) =>
                prev > 0 ? prev - 1 : 0,
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(
            totalSeconds / 60,
        )
            .toString()
            .padStart(2, '0');
        const seconds = (totalSeconds % 60)
            .toString()
            .padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <div className='text-lg font-bold'>
            {formatTime(timeLeft)} دقیقه باقی مانده
        </div>
    );
};

export default Countdown;
