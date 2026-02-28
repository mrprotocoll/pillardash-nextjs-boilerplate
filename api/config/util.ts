import { alert } from "pillardash-ui-react";

import { ApiResponse } from "@/api/types";

export const handleApiResponse = <T>({
    response,
    onSuccess,
    message,
}: {
    response: ApiResponse<T>;
    onSuccess?: () => void;
    message?: string;
}) => {
    if (response.status === "success") {
        alert.success(message || response.message);
        if (onSuccess) onSuccess();
    } else {
        alert.error(response.message);
    }
};
