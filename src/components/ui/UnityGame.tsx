import { useCallback, useEffect } from 'react';
import {
    Unity,
    useUnityContext,
} from 'react-unity-webgl';
import { apiClient } from '../../utils';
import {
    useNavigate,
    useParams,
} from 'react-router-dom';

function UnityGame({
    currentGame,
}: {
    currentGame: any;
}) {
    const { id: gameId } = useParams();

    const navigate = useNavigate();
    const {
        unityProvider,
        isLoaded,
        addEventListener,
        removeEventListener,
    } = useUnityContext({
        loaderUrl: `${currentGame.base_url}${currentGame.name}/Build/WebBuilds.loader.js`,
        dataUrl: `${currentGame.base_url}${currentGame.name}/Build/WebBuilds.data`,
        frameworkUrl: `${currentGame.base_url}${currentGame.name}/Build/WebBuilds.framework.js`,
        codeUrl: `${currentGame.base_url}${currentGame.name}/Build/WebBuilds.wasm`,
    });

    const handleSendPoint = async (
        pointsEarned: any,
    ) => {
        try {
            const res = await apiClient.post(
                `/games/${gameId}`,
                { score: pointsEarned },
            );
            if (res.status === 200) {
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleGameOver = useCallback(
        (pointsEarned: unknown) => {
            if (typeof pointsEarned !== 'number')
                return;
            handleSendPoint(pointsEarned);
        },
        [],
    );

    useEffect(() => {
        addEventListener(
            'GameFinished',
            handleGameOver,
        );
        return () => {
            removeEventListener(
                'GameFinished',
                handleGameOver,
            );
        };
    }, [
        addEventListener,
        removeEventListener,
        handleGameOver,
    ]);

    return (
        <>
            {!isLoaded && (
                <div className='container flex min-h-screen flex-col items-center justify-center'>
                    <div className='card card-bordered card-compact'>
                        <div className='card-body text-center'>
                            <h2 className='h2'>
                                لطفا کمی صبر کنید
                                ...
                            </h2>
                            <p className='text-base-content/80'>
                                فایل های چالش در
                                حال دانلود هستند
                                لطفا کمی صبر کنید.
                            </p>
                            <span className='loading loading-ring loading-lg mx-auto' />
                        </div>
                    </div>
                </div>
            )}
            <Unity
                className={`min-h-screen w-full ${!isLoaded && 'hidden'} `}
                unityProvider={unityProvider}
            />
        </>
    );
}

export default UnityGame;
