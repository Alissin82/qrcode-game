import type { Missions } from './missions';

interface Action {
    id: number;
    name: string;
    region_id: string;
    tasks: Task[];
    team_tasks_completed_count: number;
    tasks_count: number;
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
    meta: Meta;
}

interface ActionDetail {
    team_completed_task_count: number;
    id: number;
    name: string;
    region_id: string;
    tasks: Task[];
    estimated_time: number;
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
    attachment: {
        id: number;
        uuid: string;
        file_name: string;
        mime_type: string;
        download_url: string;
    };
    icon:
        {
            id: number;
            uuid: string;
            file_name: string;
            mime_type: string;
            download_url: string;
        };
    created_at: string;
    meta: Meta;
}

interface Meta {
    total: number;
    completed: number;
}

interface MissionsRequest {
    actions: Action[];
    meta: Meta;
}
