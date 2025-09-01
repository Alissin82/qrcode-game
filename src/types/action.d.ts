import type { Missions } from './missions';

interface Action {
    id: number;
    name: string;
    region_id: string;
    tasks: Task[];
    action_team_for: {
        status: 'Pending' | 'Timeout', 'Completed',
        completed_task_count: number
    };
    tasks_count: number;
    region: Region;
    started_by_team: boolean;
    created_at: string;
    icon: Media;
    meta: Meta;
}

interface ActionDetail extends Action {
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
    attachment_boy: Media;
    attachment_girl: Media;
    icon: Media;
    created_at: string;
    meta: Meta;
}

interface Meta {
    regions: {
        total: number;
        completed: number;
    },
    actions: {
        total: number;
        completed: number;
    }
}

interface Media {
    id: number;
    uuid: string;
    file_name: string;
    mime_type: string;
    download_url: string;
}
