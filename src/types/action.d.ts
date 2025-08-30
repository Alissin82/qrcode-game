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
