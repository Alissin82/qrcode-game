import {
    useEffect,
    useState
} from 'react';

import { useParams } from 'react-router-dom';
import UnityGame from '../components/ui/UnityGame';
import { apiClient } from '../utils';

export default function GamePages() {
    const { id: gameId } = useParams();
    const [currentGame, setCurrentGame] =
        useState();

    const getGame = async () => {
        try {
            const res = await apiClient.get(
                `/games/${gameId}`,
            );
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
