"use client";

import { useEffect, useState } from "react";

import { Mail, RefreshCw, Timer } from "lucide-react";

import { alert } from "@/lib/alert";

interface EmailVerificationOTPProps {
    email?: string;
    onVerify?: (otp: string) => Promise<void> | void;
    onResend?: () => Promise<void> | void;
    isVerifying?: boolean;
    isResending?: boolean;
}

const EmailVerificationOTP = ({
    email = "john.doe@example.com",
    onVerify = (otp: string) => console.log("Verify OTP:", otp),
    onResend = () => console.log("Resend OTP"),
    isVerifying = false,
    isResending = false,
}: EmailVerificationOTPProps) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(60);
    const canResend = timer === 0;
    const [error, setError] = useState("");

    // Timer countdown
    useEffect(() => {
        if (timer === 0) return;

        const interval = setInterval(() => {
            setTimer((remaining) => Math.max(remaining - 1, 0));
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    // Handle OTP input
    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError("");

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }

        // Auto-submit when all fields are filled
        if (newOtp.every((digit) => digit !== "") && index === 5) {
            handleVerify(newOtp.join(""));
        }
    };

    // Handle backspace
    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    // Handle verification
    const handleVerify = async (otpCode: string) => {
        try {
            await onVerify(otpCode);
        } catch (err) {
            console.log(err);
            alert.error("Invalid OTP. Please try again.");
            setError("Invalid OTP. Please try again.");
        }
    };

    // Handle resend
    const handleResend = async () => {
        setTimer(60);
        try {
            await onResend();
        } catch {
            alert.error("Unable to resend code. Please try again.");
        }
    };

    return (
        <div className='from-primary-50 to-primary-100 flex min-h-screen items-center justify-center bg-gradient-to-br p-4'>
            <div className='w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl md:p-12'>
                {/* Header */}
                <div className='mb-8'>
                    <div className='bg-secondary-100 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full'>
                        <Mail className='text-secondary-500 h-8 w-8' />
                    </div>
                    <h1 className='mb-2 text-2xl font-bold text-gray-800 md:text-3xl'>
                        Verify Your Email
                    </h1>
                    <p className='text-sm text-gray-600 md:text-base'>
                        We&#39;ve sent a 6-digit code to
                    </p>
                    <p className='text-primary-600 font-semibold'>{email}</p>
                </div>

                {/* OTP Input */}
                <div className='mb-6'>
                    <div className='mb-4 flex justify-center space-x-3'>
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type='text'
                                inputMode='numeric'
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className={`text-dark focus:ring-primary-500 h-12 w-12 rounded-xl border-2 text-center text-xl font-bold transition-colors focus:ring-2 focus:outline-none ${
                                    error ? "border-red-300" : "border-gray-300"
                                }`}
                            />
                        ))}
                    </div>

                    {error && <p className='mb-4 text-sm text-red-500'>{error}</p>}
                </div>

                {/* Timer and Resend */}
                <div className='mb-6'>
                    {!canResend ? (
                        <div className='flex items-center justify-center text-sm text-gray-600'>
                            <Timer className='mr-2 h-4 w-4' />
                            <span>Resend code in {timer}s</span>
                        </div>
                    ) : (
                        <button
                            onClick={handleResend}
                            disabled={isResending}
                            className='text-primary-600 hover:text-primary-700 mx-auto flex items-center justify-center text-sm font-semibold transition-colors'
                        >
                            <RefreshCw
                                className={`mr-2 h-4 w-4 ${isResending ? "animate-spin" : ""}`}
                            />
                            Resend Code
                        </button>
                    )}
                </div>

                {/* Verify Button */}
                <button
                    onClick={() => handleVerify(otp.join(""))}
                    disabled={otp.some((digit) => digit === "") || isVerifying}
                    className='bg-primary-500 hover:bg-primary-600 flex w-full items-center justify-center rounded-xl px-6 py-3 font-semibold text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-gray-300'
                >
                    {isVerifying ? <RefreshCw className='h-5 w-5 animate-spin' /> : "Verify Email"}
                </button>

                {/* Help Text */}
                <p className='mt-6 text-xs text-gray-500'>
                    Didn&#39;t receive the code? Check your spam folder or contact support.
                </p>
            </div>
        </div>
    );
};

export default EmailVerificationOTP;
