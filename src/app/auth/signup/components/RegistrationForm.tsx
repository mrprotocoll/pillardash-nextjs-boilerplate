import React, { useState } from "react";

import { EyeIcon } from "lucide-react";
import { Button, Input, alert } from "pillardash-ui-react";

import { handleApiResponse } from "@/api/config/util";
import AuthRequests from "@/api/requests/auth-requests";
import EmailVerificationOTP from "@/app/auth/signup/components/EmailVerificationOTP";
import { RegisterFormData } from "@/app/auth/types";
import Logo from "@/components/layouts/Logo";
import EyeOffIcon from "@/components/utilities/Icons/EyeOffIcon";
import LockIcon from "@/components/utilities/Icons/LockIcon";
import MessagingIcon from "@/components/utilities/Icons/MessagingIcon";
import CONSTANTS from "@/lib/constants";

export default function RegistrationForm() {
    const [formData, setFormData] = useState<RegisterFormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [registrationStatus, setRegistrationStatus] = useState<
        "form" | "verification" | "success"
    >("form");

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        if (errors[id]) {
            setErrors((prev) => ({ ...prev, [id]: "" }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        try {
            if (validateForm()) {
                setLoading(true);

                // Simulate API call for registration
                const response = await AuthRequests.register(formData);

                // Store email in localStorage for verification
                localStorage.setItem(CONSTANTS.dev.emailVerifyKey, formData.email);

                handleApiResponse({
                    response,
                    onSuccess: () => {
                        localStorage.setItem("ladealConsultantId", response?.data?.id as string);
                        setRegistrationStatus("verification");
                    },
                });
            }
        } finally {
            setLoading(false);
        }
    };

    if (registrationStatus === "verification") {
        return (
            <EmailVerificationOTP
                email={formData.email}
                onVerify={async (otp) => {
                    const response = await AuthRequests.verifyEmailOTP(formData.email, otp);
                    handleApiResponse({
                        response,
                        onSuccess: () => {
                            alert.success("Email verified successfully");
                        },
                    });
                }}
                onResend={async () => {
                    const response = await AuthRequests.resendVerificationEmail(formData.email);
                    handleApiResponse({
                        response,
                        onSuccess: () => alert.success("Verification code resent successfully"),
                    });
                }}
            />
        );
    }
    return (
        <div className='space-y-6'>
            <div className='mb-8 text-center'>
                <div className='mx-auto mb-4 flex items-center justify-center'>
                    <Logo />
                </div>
                <h2 className='mb-2 text-2xl font-bold text-gray-900'>Sign Up</h2>
                <p className='text-gray-600'>Let&#39;s start with your basic details</p>
            </div>

            <Input
                id='firstName'
                value={formData.firstName}
                className='text-dark'
                label='First Name'
                onChange={handleInputChange}
                error={errors.firstName}
                placeholder='Enter your first name'
                required={true}
            />

            <Input
                id='lastName'
                value={formData.lastName}
                label='Lasr Name'
                onChange={handleInputChange}
                error={errors.lastName}
                placeholder='Enter your last name'
                required={true}
            />
            <Input
                id='email'
                value={formData.email}
                label='Email Address'
                onChange={handleInputChange}
                error={errors.email}
                placeholder='Enter your email address'
                required={true}
                icon={
                    <div className='text-gray-400'>
                        <MessagingIcon />
                    </div>
                }
            />
            <Input
                id='password'
                label='Password'
                required={true}
                type={showPassword ? "text" : "password"}
                value={formData.password}
                placeholder='Enter your password'
                icon={<LockIcon />}
                onChange={handleInputChange}
                error={errors.password}
                rightIcon={
                    <button
                        type='button'
                        className={
                            "absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                        }
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                }
            />
            <Input
                id='confirmPassword'
                label='Confirm Password'
                required={true}
                onChange={handleInputChange}
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                placeholder='Enter your password'
                icon={<LockIcon />}
                error={errors.confirmPassword}
                rightIcon={
                    <button
                        type='button'
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className='absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600'
                    >
                        {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                }
            />

            <Button disabled={loading} loading={loading} onClick={handleSubmit} className='w-full'>
                Sign Up
            </Button>
        </div>
    );
}
