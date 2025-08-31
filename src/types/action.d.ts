import type { Missions } from './missions';

interface Action {
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
    meta: Meta;
}

interface ActionDetail {
    completed_mission_count: number;
    id: number;
    name: string;
    region_id: string;
    missions: Missions[];
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
    attachments: [
        {
            id: number;
            uuid: string;
            file_name: string;
            mime_type: string;
            download_api: string;
        },
    ];
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
