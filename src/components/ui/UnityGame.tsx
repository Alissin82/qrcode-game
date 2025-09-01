import { useCallback, useEffect } from 'react';
import {
    Unity,
    useUnityContext,
} from 'react-unity-webgl';

function UnityGame({
    currentGame,
}: {
    currentGame: any;
}) {
    console.log(currentGame);
    console.log(
        `${currentGame.base_url}${currentGame.name}/Build/WebBuilds.loader.js`,
    );
    console.log(
        `${currentGame.base_url}${currentGame.name}/Build/WebBuilds.data`,
    );

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

    const handleGameOver = useCallback(
        (pointsEarned: unknown) => {
            if (typeof pointsEarned !== 'number')
                return;
            // router.post(
            //     route(
            //         'active-game.points-earned',
            //         {
            //             points_earned:
            //                 pointsEarned,
            //         },
            //     ),
            // );
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

    // if (!isLoaded)
    //     return (

    //     );
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
