"use client";

import { Button } from "pillardash-ui-react";

import CONSTANTS from "@/lib/constants";

export default function ResetPasswordSuccessful() {
    return (
        <>
            <div className='grid min-h-screen md:grid-cols-2'>
                <div className='flex items-center justify-center p-6'>
                    <div className='w-full max-w-md space-y-5 text-center'>
                        <p className='text-[20px] font-[600]'>Your New Password has been Set!</p>
                        <p className='text-[14px] text-gray-400'>
                            You can now log in to your {CONSTANTS.appName} account using your new
                            password.
                        </p>

                        <Button
                            type='submit'
                            className='mt-4 w-full rounded-lg hover:bg-primary-300 hover:text-white'
                        >
                            Go back to Login
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
