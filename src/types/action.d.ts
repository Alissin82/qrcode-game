interface Action {
    id: number;
    name: string;
    region: Region;
    missions: Mission[];
    started_by_team: {
        id: number;
        status: 'Pending' | 'Completed';
    }[];
    completed_mission_count: number;
}

interface MissionsRequest {
    actions: [
        {
            id: number;
            name: string;
            region_id: string;
            missions: [
                {
                    id: number;
                    title: string;
                    score: string;
                    action_id: string;
                    created_at: string;
                },
            ];
            region: {
                id: number;
                name: string;
                x: string;
                y: string;
                order: string;
                lockable: string;
                created_at: string;
                updated_at: string;
            };
            started_by_team: boolean;
            created_at: string;
        },
    ];
    meta: {
        actions: {
            total: number;
            completed: number;
        };
    };
}
