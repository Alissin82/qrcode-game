import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { FaCheck, FaClock, FaLock, FaMapMarkerAlt, FaMedal, FaPlay, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import Menu from '../components/ui/Menu';
import { TeamDataContext } from '../contexts/TeamDataContext.ts';
import { apiClient } from '../utils';
import Upgrade from '../components/ui/Upgrade.tsx';
import type { Action, Meta } from '../types/action';
import QrCodeScanner from '../components/ui/QrCodeScanner.tsx';
import type { AxiosResponse } from 'axios';
import type { ApiResponse } from '../types/apiResponse';

const ActionsPage = () => {
    const navigate = useNavigate();
    const scanned = useRef(false);
    const [actions, setActions] = useState<Action[] | null>(null);
    const [meta, setMeta] = useState<Meta | null>(null);
    const { data: teamData } = useContext(TeamDataContext);
    const className = useMemo(() => {
        return teamData?.gender ? 'bg-accent' : 'bg-secondary';
    }, [teamData]);
    const [scanning, setScanning] = useState(false);

    // Array of refs for each icon
    const iconRefs = useRef<HTMLImageElement[]>([]);

    useEffect(() => {
        async function fetchActions() {
            const response: AxiosResponse<ApiResponse<any>> = await apiClient.get(`/actions`);
            const fetchedActions = response.data.data.actions;
            setActions(fetchedActions);
            setMeta(response.data.data.meta.actions);

            fetchedActions.forEach((action: Action, index: number) => {
                if (iconRefs.current[index]) {
                    iconRefs.current[index].setAttribute('src', action.icon.download_url);
                }
            });
        }

        fetchActions();
    }, []);

    async function handleScan(id: any) {
        if (id) scanned.current = true;
        const response = await apiClient.post(`/actions/${id}/start`);
        setScanning(false);
        if (response.status === 200) navigate(`/mission/${response.data.data.id}`);
    }

    return (
        <div className={`min-h-screen ${className} font-sans text-white`} dir="rtl">
            {scanning && <QrCodeScanner onScan={handleScan} onError={() => {
            }} isOpen={scanning} />}
            <div className="relative mx-auto w-full max-w-xl p-4 pb-24">
                {/* ... your other UI parts ... */}

                <div className="space-y-4">
                    {actions &&
                        actions.length > 0 &&
                        actions.map((action, index) => (
                            <div
                                key={action.id}
                                className="mb-4 rounded-2xl p-4"
                                style={{ backgroundColor: '#00000052' }}
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    {action.started_by_team && (
                                        <div
                                            className={`flex h-12 w-12 items-center justify-center rounded-lg bg-pink-500 p-3`}
                                        >
                                            <FaMedal size={20} className="text-white" />
                                        </div>
                                    )}
                                    <div className="btn rounded-lg bg-purple-600 p-2">
                                        <img
                                            ref={(el) => {
                                                if (el) iconRefs.current[index] = el;
                                            }}
                                            alt="action icon"
                                            className="w-[32px] h-[32px]"
                                        />
                                    </div>
                                    <h3 className="mx-4 flex-1 text-center text-lg font-bold">{action.name}</h3>
                                    {/* ...status and lock icons... */}
                                </div>
                                {/* ...rest of card... */}
                            </div>
                        ))}
                </div>

                <section className="mt-8 rounded-xl bg-black/10 p-6">
                    <h3 className="mb-4 text-center text-lg font-bold">عملیات سریع</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="btn bg-primary border-none text-white">
                            <FaMedal className="mr-2" />
                            ماموریت جدید
                        </button>
                        <button className="btn border-none bg-yellow-500 text-white">
                            <FaStar className="mr-2" />
                            جایزه روزانه
                        </button>
                    </div>
                </section>

                <Upgrade />
            </div>
            <Menu />
        </div>
    );
};

export default ActionsPage;
