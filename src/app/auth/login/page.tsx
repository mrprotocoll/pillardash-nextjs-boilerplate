"use client";

import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button, Input, alert } from "pillardash-ui-react";

import { handleApiResponse } from "@/api/config/util";
import Logo from "@/components/layouts/Logo";
import EyeIcon from "@/components/utilities/Icons/EyeIcon";
import EyeOffIcon from "@/components/utilities/Icons/EyeOffIcon";
import LockIcon from "@/components/utilities/Icons/LockIcon";
import MessagingIcon from "@/components/utilities/Icons/MessagingIcon";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/lib/routes";

export default function LoginPage() {
    const { login, state } = useAuth();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const router = useRouter();

    const handleLogin = async () => {
        const nextErrors: { email?: string; password?: string } = {};

        if (!email.trim()) {
            nextErrors.email = "Email is required";
        }

        if (!password) {
            nextErrors.password = "Password is required";
        }

        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            return;
        }

        try {
            const response = await login({ email, password });
            const payload = response?.data;

            if (payload?.status) {
                handleApiResponse({
                    response: payload,
                    onSuccess: () => router.push(ROUTES.home),
                });
                return;
            }

            alert.success("Login successful");
            router.push(ROUTES.home);
        } catch {
            const message = state.login.error?.message || "Unable to login. Please try again.";
            alert.error(message);
        }
    };

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
                        value={email}
                        onChange={(event) => {
                            const value = event.target.value;
                            setEmail(value);

                            if (errors.email) {
                                setErrors((prev) => ({ ...prev, email: undefined }));
                            }
                        }}
                        error={errors.email}
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
                        value={password}
                        onChange={(event) => {
                            const value = event.target.value;
                            setPassword(value);

                            if (errors.password) {
                                setErrors((prev) => ({ ...prev, password: undefined }));
                            }
                        }}
                        error={errors.password}
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
                <Button
                    onClick={handleLogin}
                    type='submit'
                    className='mt-4 w-full'
                    disabled={state.login.isPending}
                    loading={state.login.isPending}
                >
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
