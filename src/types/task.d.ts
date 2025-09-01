interface Task {
    id: number;
    duration: number;
    score: number;
    text: string;
    taskable: MCQ | FileUpload;
    type: 'MCQ' | 'FileUpload';
    locked_for_team: boolean | undefined;
    done_by_team: boolean | undefined;
    type_label: string;

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