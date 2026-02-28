import type { Metadata } from "next";

import CONSTANTS from "@/lib/constants";
import "@/styles/globals.css";

export const metadata: Metadata = {
    title: {
        default: `Auth :: ${CONSTANTS.appName}`,
        template: `%s :: ${CONSTANTS.appName}`,
    },
    robots: {
        index: false,
        follow: false,
    },
};

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='mx-auto flex min-h-screen items-center justify-center bg-white'>
            <div className='w-full max-w-md space-y-8 text-left'>{children}</div>
        </div>
    );
}
