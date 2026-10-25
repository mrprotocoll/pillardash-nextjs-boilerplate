"use client";

import { type ReactNode, useEffect, useState } from "react";

import { type Notification, notificationEventName } from "@/lib/alert";

export default function NotificationProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const timers = new Set<ReturnType<typeof setTimeout>>();
        const onNotification = (event: Event) => {
            const notification = (event as CustomEvent<Notification>).detail;
            setNotifications((current) => [...current, notification]);
            const timer = setTimeout(() => {
                setNotifications((current) =>
                    current.filter((item) => item.id !== notification.id)
                );
                timers.delete(timer);
            }, 5000);
            timers.add(timer);
        };
        window.addEventListener(notificationEventName, onNotification);
        return () => {
            window.removeEventListener(notificationEventName, onNotification);
            timers.forEach(clearTimeout);
        };
    }, []);

    return (
        <>
            {children}
            <div
                className='fixed top-4 right-4 z-50 flex max-w-sm flex-col gap-2'
                aria-live='polite'
                aria-atomic='false'
            >
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        role={notification.type === "error" ? "alert" : "status"}
                        className={`flex items-start gap-3 rounded-lg border bg-white p-4 text-sm shadow-lg ${notification.type === "error" ? "border-red-300 text-red-700" : "border-green-300 text-green-700"}`}
                    >
                        <span>{notification.message}</span>
                        <button
                            type='button'
                            aria-label='Dismiss notification'
                            className='ml-auto font-bold'
                            onClick={() =>
                                setNotifications((current) =>
                                    current.filter((item) => item.id !== notification.id)
                                )
                            }
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}
