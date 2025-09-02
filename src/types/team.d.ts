// interface Team {
//     name: string;
//     color: string;
//     content: string;
//     phone: string;
//     bio: string;
//     score: number;
//     coin: number;
//     gender: boolean;
//     start: Date|string
// }

interface TeamLeadbord {
    id: number;
    name: string;
    score: number;
    coin:number;
    score_teams_count: number;
    gender:string;
}

interface Team {
    id: number;
    name: string;
    color: null | string;
    content: null | string;
    phone: null | string;
    bio: null | string;
    score: string;
    coin: string;
    hash: string;
    gender: boolean;
    start: string;
    created_at: string;
    updated_at: string;
    total_mission_score: number;
}
