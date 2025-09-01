interface Task<T> {
    id: number;
    duration: number;
    action_id: number;
    score: number;
    text: string;
    taskable: T;
    type: 'MCQ' | 'FileUpload';
    locked_for_team: boolean | undefined;
    done_by_team: boolean | undefined;
    type_label: string;
    action_tasks_count: number;
    order: number;
}

interface MCQ {
    id: number;
    question: string;
    options: Option[];
}

interface FileUpload {
    id: number;
    description: string;
}

interface Option {
    label: string;
    value: number;
}