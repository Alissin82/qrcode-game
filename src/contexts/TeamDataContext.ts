import { createContext } from 'react';

interface TeamDataContextProps {
    data: Team | null;
    setData: (data: Team | null) => void;
}

export const TeamDataContext = createContext<TeamDataContextProps>({
    data: null,
    setData: (_data) => {},
});
