import Link from "next/link";

import CONSTANTS from "@/lib/constants";
import { ROUTES } from "@/lib/routes";

export default function NotFound() {
    return (
        <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 sm:px-6 lg:px-8'>
            <div className='w-full max-w-lg text-center'>
                <div className='mb-8'>
                    <div className='mb-4 inline-flex items-center space-x-2'>
                        <div className='flex items-end space-x-1'>
                            <div className='h-8 w-2 rounded-sm bg-gradient-to-t from-blue-600 to-blue-400'></div>
                            <div className='h-10 w-2 rounded-sm bg-gradient-to-t from-blue-600 to-blue-400'></div>
                            <div className='h-9 w-2 rounded-sm bg-gradient-to-t from-blue-600 to-blue-400'></div>
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <div className='h-0.5 w-4 rounded-full bg-gradient-to-r from-green-500 to-green-400'></div>
                            <div className='h-0.5 w-6 rounded-full bg-gradient-to-r from-green-500 to-green-400'></div>
                            <div className='h-0.5 w-3 rounded-full bg-gradient-to-r from-green-500 to-green-400'></div>
                        </div>
                    </div>
                    <h1 className='text-2xl font-bold text-gray-900'>{CONSTANTS.appName}</h1>
                </div>

                <div className='mb-8'>
                    <p className='text-9xl font-extrabold italic text-primary'>404</p>
                    <p className='text-2xl font-normal text-primary'>Page not found</p>
                    <p className='mb-6 leading-relaxed text-gray-600'>
                        The page you&#39;re looking for doesn&#39;t exist or has been moved.
                    </p>
                </div>

                <div className='mb-8 flex flex-col justify-center gap-4 sm:flex-row'>
                    <Link
                        href={ROUTES.home}
                        className='inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-white transition hover:opacity-90'
                    >
                        Go Home
                    </Link>
                    <Link
                        href={ROUTES.login}
                        className='inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-gray-700 transition hover:bg-gray-50'
                    >
                        Go to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
