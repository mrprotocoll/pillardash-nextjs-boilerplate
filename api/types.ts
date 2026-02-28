export interface ApiResponse<T = never> {
    status: "success" | "error" | "warning";
    message: string;
    data: T | null;
    code: number;
}

export interface ApiError {
    status: "error" | "warning";
    message: string;
    data: null;
    code: number;
}
