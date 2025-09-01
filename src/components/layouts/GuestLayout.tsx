import { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import type { AxiosResponse } from 'axios';
import type { ApiResponse } from '../../types/apiResponse';
import { apiClient } from '../../utils';
import { TeamDataContext } from '../../contexts/TeamDataContext.ts';

export default function GuestLayout() {
    const { setData: setTeam } = useContext(TeamDataContext);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchTeam() {
            try {
                const response: AxiosResponse<ApiResponse<Team>> = await apiClient.get(`/teams/me`);
                setTeam(response.data.data);
                navigate('/dashboard');
                setLoading(false);
            } catch (e) {
                setLoading(false);
            }
        }

        fetchTeam();
    }, []);

    if (!loading) {
        return <Outlet />;
    }
}
