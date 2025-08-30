export interface ApiResponse<T> {
    data: T;
    message: string;
    code: string;
    errors: any[]
}