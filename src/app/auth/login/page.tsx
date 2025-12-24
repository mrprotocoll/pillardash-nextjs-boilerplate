"use client";

import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button, Input } from "pillardash-ui-react";

import Logo from "@/components/layouts/Logo";
import EyeIcon from "@/components/utilities/Icons/EyeIcon";
import EyeOffIcon from "@/components/utilities/Icons/EyeOffIcon";
import LockIcon from "@/components/utilities/Icons/LockIcon";
import MessagingIcon from "@/components/utilities/Icons/MessagingIcon";
import { ROUTES } from "@/lib/routes";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const router = useRouter();
    function handleLogin() {
        router.push(ROUTES.home);
    }

    return (
        <>
            <div className='w-full max-w-md space-y-5 text-center'>
                <Link href={ROUTES.home} className='mx-auto flex items-center justify-center'>
                    <Logo />
                </Link>
                <div>
                    <p className='-space-x-6 text-[28px] font-[600] text-gray-600'>Welcome Back</p>
                    <div className='text-gray-400'>Enter your Email and password to login.</div>
                </div>

                <div className='mt-3 space-y-4 text-left'>
                    <Input
                        id='userId'
                        label='Email'
                        required={true}
                        type='text'
                        value={""}
                        placeholder='Enter your Email'
                        icon={
                            <div className='text-gray-500'>
                                <MessagingIcon />
                            </div>
                        }
                    />
                    <Input
                        id='password'
                        label='Password'
                        required={true}
                        type={showPassword ? "text" : "password"}
                        value={""}
                        placeholder='Enter your password'
                        icon={<LockIcon />}
                        rightIcon={
                            <button type='button' onClick={() => setShowPassword((prev) => !prev)}>
                                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </button>
                        }
                    />
                </div>
                <Link href={ROUTES.forgotPassword}>
                    <p className='text-right text-sm text-primary hover:underline'>
                        Forgot Password?
                    </p>
                </Link>
                <Button onClick={handleLogin} type='submit' className='mt-4 w-full'>
                    login
                </Button>

                <div className='mt-8 text-center text-sm text-gray-600'>
                    Don&#39;t have an account?{" "}
                    <Link
                        href={ROUTES.signup}
                        className='font-medium text-primary-600 hover:text-primary-700'
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </>
    );
}
