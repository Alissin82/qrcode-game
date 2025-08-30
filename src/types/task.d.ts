interface Task {
    id: number;
    mission_id: number;
    duration: number;
    score: number;
    text: string;
    type: 'text' | 'image' | 'document' ;
}