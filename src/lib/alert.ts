export interface Notification {
    id: number;
    message: string;
    type: "success" | "error";
}

const eventName = "app:notification";
let nextId = 0;

function notify(type: Notification["type"], message: string) {
    if (typeof window !== "undefined") {
        window.dispatchEvent(
            new CustomEvent<Notification>(eventName, {
                detail: { id: ++nextId, message, type },
            })
        );
    }
}

export const alert = {
    success: (message: string) => notify("success", message),
    error: (message: string) => notify("error", message),
};

export { eventName as notificationEventName };
