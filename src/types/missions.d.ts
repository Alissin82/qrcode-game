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
    tasks: [
        {
            id: number;
            mission_id: string;
            type: string;
            duration: string;
            score: string;
            question: null | string;
            option1: null | string;
            option2: null | string;
            option3: null | string;
            option4: null | string;
            order: string;
            answer: null | string;
            content: null | string;
            text: string;
            need_review: string;
            created_at: string;
            updated_at: string;
        },
    ];
    created_at: string;
}
