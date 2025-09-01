export interface Mission {
    title: string;
    color: string;
    content: string;
    phone: string;
    bio: string;
    score: number;
    coin: number;
    gender: boolean;
    start: Date | string;
    tasks: Task;
}

interface Missions {
    id: number;
    title: string;
    score: string;
    action_id: string;
    tasks: Task[];
    created_at: string;
}
