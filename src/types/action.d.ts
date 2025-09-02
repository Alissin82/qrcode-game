import type { Missions } from './missions';

interface Action {
    id: number;
    name: string;
    region_id: string;
    tasks: Task[];
    action_team_for: {
        status: 'Pending' | 'Timeout' | 'Completed';
        Completed;
        status_label: string;
        completed_task_count: number;
    };
    tasks_count: number;
    region: Region;
    started_by_team: boolean;
    created_at: string;
    icon: Media;
    meta: Meta;
}

interface ActionDetail extends Action {
    estimated_time: number;
    attachment_boy: Media;
    attachment_girl: Media;
    team_completed_task_count: number;
}

interface Meta {
    regions: {
        total: number;
        completed: number;
    };
    actions: {
        total: number;
        completed: number;
    };
}

interface Media {
    id: number;
    uuid: string;
    file_name: string;
    mime_type: string;
    download_url: string;
    disk: string;
}
