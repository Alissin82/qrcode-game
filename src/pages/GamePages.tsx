import {
    useCallback,
    useEffect,
    useState,
} from 'react';

import { apiClient } from '../utils';
import UnityGame from '../components/ui/UnityGame';

export default function GamePages() {
    const [currentGame, setCurrentGame] =
        useState();

    const getGame = async () => {
        try {
            const res =
                await apiClient.get(`/games/1`);
            setCurrentGame(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getGame();
    }, []);

    return (
        <>
            {currentGame && (
                <UnityGame
                    currentGame={currentGame}
                />
            )}
        </>
    );
}
