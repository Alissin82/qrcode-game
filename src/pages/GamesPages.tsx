import {
    useCallback,
    useEffect,
    useState,
} from 'react';
import {
    Unity,
    useUnityContext,
} from 'react-unity-webgl';
import { apiClient } from '../utils';
import UnityGame from '../components/ui/UnityGame';

export default function GamesPage() {
    const [currentGame, setCurrentGame] =
        useState();
    // const {
    //     unityProvider,
    //     isLoaded,
    //     addEventListener,
    //     removeEventListener,
    // } = useUnityContext({
    //     loaderUrl: `${base_game_url}/${game.name}/Build/${game.name}.loader.js`,
    //     dataUrl: `${base_game_url}/${game.name}/Build/${game.name}.data`,
    //     frameworkUrl: `${base_game_url}/${game.name}/Build/${game.name}.framework.js`,
    //     codeUrl: `${base_game_url}/${game.name}/Build/${game.name}.wasm`,
    // });

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

    const getGame = async () => {
        try {
            const res =
                await apiClient.get(`/games/2`);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getGame();
    }, []);

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

    return <UnityGame />;
}
