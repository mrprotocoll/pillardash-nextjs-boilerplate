"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Button, Input } from "pillardash-ui-react";

import MessagingIcon from "@/components/utilities/Icons/MessagingIcon";
import CONSTANTS from "@/lib/constants";
import { ROUTES } from "@/lib/routes";

export default function ResetPassword() {
    const [countDown, setCountDown] = useState<number>(0);

    const handleClick = () => {
        setCountDown(30);
    };

    useEffect(() => {
        if (countDown <= 0) {
            return;
        }

        const timer = setTimeout(() => {
            setCountDown((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [countDown]);

    const showCountDown = countDown > 0;
    const isButtonDisabled = countDown > 0;

    return (
        <>
            <div className='w-full max-w-md space-y-5 text-gray-600'>
                <p className='text-[28px] font-[600]'>Forgot Password</p>
                <p className='text-[13px] text-gray-600'>
                    No worries — Enter the email linked to your {CONSTANTS.appName} account and
                    we’ll send you a link to reset your password.
                </p>
                <div className='space-y-8 text-left'>
                    <Input
                        id='userId'
                        label='Email'
                        type='text'
                        value={""}
                        placeholder='Enter your email'
                        icon={<MessagingIcon />}
                    />
                </div>
                {showCountDown && (
                    <p>
                        Resend link in <span className='text-primary'>{countDown}s</span>
                    </p>
                )}
                <Button
                    type='submit'
                    className='mt-4 w-full'
                    onClick={handleClick}
                    disabled={isButtonDisabled}
                >
                    Send reset link
                </Button>
                <div className='flex gap-3'>
                    <p>Remember your password? </p>{" "}
                    <Link href={ROUTES.login}>
                        <p className='text-sm text-primary'>Go back to login</p>
                    </Link>
                </div>
            </div>
        </>
    );
}
