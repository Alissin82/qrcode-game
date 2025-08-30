import { createContext } from 'react';

interface TeamDataContextProps {
    data: Team | null;
    setData: (data: Team) => void
}

export const TeamDataContext = createContext<TeamDataContextProps>({
    data: null,
    setData: (_data: Team) => {
    }
})