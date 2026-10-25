import { AxiosError } from "axios";

import { ApiError } from "@/api/types";
import { alert } from "@/lib/alert";

export class ApiErrorHandler {
    static handle(error: unknown) {
        if (this.isAxiosError(error)) {
            const apiError = error.response?.data as ApiError;

            if (apiError && apiError.message) {
                alert.error(apiError.message);
            } else {
                // Fallback for errors without proper structure
                switch (error.response?.status) {
                    case 400:
                        alert.error("Invalid request. Please check your input.");
                        break;
                    case 403:
                        alert.error("Access denied.");
                        break;
                    case 404:
                        alert.error("Resource not found.");
                        break;
                    case 500:
                        alert.error("Server error. Please try again later.");
                        break;
                    default:
                        alert.error("An error occurred. Please try again.");
                }
            }
        } else if (error instanceof Error) {
            alert.error(error.message);
        } else {
            alert.error("An unexpected error occurred. Please try again.");
        }
    }

    private static isAxiosError(error: unknown): error is AxiosError<ApiError> {
        return (error as AxiosError).isAxiosError;
    }
}
