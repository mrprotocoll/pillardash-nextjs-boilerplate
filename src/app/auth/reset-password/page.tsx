"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Button, Input, alert } from "pillardash-ui-react";

import { handleApiResponse } from "@/api/config/util";
import EyeIcon from "@/components/utilities/Icons/EyeIcon";
import EyeOffIcon from "@/components/utilities/Icons/EyeOffIcon";
import LockIcon from "@/components/utilities/Icons/LockIcon";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/lib/routes";

export default function ResetPassword() {
    const { resetPassword, state } = useAuth();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleResetPassword = async () => {
        const token = searchParams.get("token") || "";
        const nextErrors: { password?: string; confirmPassword?: string } = {};

        if (!password) {
            nextErrors.password = "Password is required";
        }

        if (!confirmPassword) {
            nextErrors.confirmPassword = "Confirm password is required";
        }

        if (password && confirmPassword && password !== confirmPassword) {
            nextErrors.confirmPassword = "Passwords do not match";
        }

        if (!token) {
            alert.error("Reset token is missing from URL");
            return;
        }

        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            return;
        }

        try {
            const response = await resetPassword(token, password);

            handleApiResponse({
                response,
                onSuccess: () => {
                    router.push(ROUTES.login);
                },
            });
        } catch {
            const message = state.resetPassword.error?.message || "Unable to reset password.";
            alert.error(message);
        }
    };

    return (
        <>
            <div className='w-full max-w-md space-y-5'>
                <p className='text-[28px] font-[600] text-dark'>Create a New Password</p>
                <p className='text-[13px] text-gray-400'>
                    Enter a strong, secure password you will remember. This will replace your old
                    one.
                </p>
                <div className='space-y-8 text-left'>
                    <Input
                        id='password'
                        label='New Password'
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
                    <Input
                        id='confirmPassword'
                        label='Confirm New Password'
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(event) => {
                            const value = event.target.value;
                            setConfirmPassword(value);

                            if (errors.confirmPassword) {
                                setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                            }
                        }}
                        error={errors.confirmPassword}
                        placeholder='Enter your password'
                        icon={<LockIcon />}
                        rightIcon={
                            <button type='button' onClick={() => setShowPassword((prev) => !prev)}>
                                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </button>
                        }
                    />
                </div>

                <Button
                    className='w-full'
                    onClick={handleResetPassword}
                    disabled={state.resetPassword.isPending}
                    loading={state.resetPassword.isPending}
                >
                    Reset Password
                </Button>
                <div className='flex gap-3'>
                    <p className='text-gray-600'>Changed your mind? </p>{" "}
                    <Link href={ROUTES.login}>
                        <p className='text-sm text-primary-600 hover:underline'>Go back to login</p>
                    </Link>
                </div>
            </div>
        </>
    );
}
