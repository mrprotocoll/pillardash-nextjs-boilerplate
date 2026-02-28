"use client";

import { useCallback } from "react";

import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import AuthRequests from "@/api/requests/auth-requests";
import { RegisterFormData } from "@/app/auth/types";
import {
    loginSuccess,
    logout as logoutAction,
    refreshToken as refreshTokenAction,
} from "@/redux/reducers/authSlice";
import { AppDispatch } from "@/redux/store";

export function useAuth() {
    const dispatch = useDispatch<AppDispatch>();

    const loginMutation = useMutation({
        mutationFn: AuthRequests.login,
        onSuccess: (response) => {
            const { accessToken, refreshToken } = response?.data?.data ?? {};

            if (accessToken && refreshToken) {
                dispatch(loginSuccess({ accessToken, refreshToken }));
            }
        },
    });

    const logoutMutation = useMutation({
        mutationFn: AuthRequests.logout,
        onSuccess: () => {
            dispatch(logoutAction());
        },
    });

    const registerMutation = useMutation({ mutationFn: AuthRequests.register });

    const sendVerificationEmailMutation = useMutation({
        mutationFn: AuthRequests.sendVerificationEmail,
    });

    const verifyEmailOTPMutation = useMutation({
        mutationFn: ({ email, otp }: { email: string; otp: string }) =>
            AuthRequests.verifyEmailOTP(email, otp),
    });

    const resendVerificationEmailMutation = useMutation({
        mutationFn: AuthRequests.resendVerificationEmail,
    });

    const requestPasswordResetMutation = useMutation({
        mutationFn: AuthRequests.requestPasswordReset,
    });

    const resetPasswordMutation = useMutation({
        mutationFn: ({ token, newPassword }: { token: string; newPassword: string }) =>
            AuthRequests.resetPassword(token, newPassword),
    });

    const changePasswordMutation = useMutation({
        mutationFn: ({
            currentPassword,
            newPassword,
        }: {
            currentPassword: string;
            newPassword: string;
        }) => AuthRequests.changePassword(currentPassword, newPassword),
    });

    const refreshTokenMutation = useMutation({
        mutationFn: AuthRequests.refreshToken,
        onSuccess: (response) => {
            const accessToken = response?.data?.accessToken;

            if (accessToken) {
                dispatch(refreshTokenAction({ accessToken }));
            }
        },
    });

    const checkEmailAvailabilityMutation = useMutation({
        mutationFn: AuthRequests.checkEmailAvailability,
    });

    const validateRegistrationTokenMutation = useMutation({
        mutationFn: AuthRequests.validateRegistrationToken,
    });

    const login = useCallback(
        async (payload: { email: string; password: string }) => {
            return loginMutation.mutateAsync(payload);
        },
        [loginMutation]
    );

    const logout = useCallback(async () => {
        return logoutMutation.mutateAsync();
    }, [logoutMutation]);

    const register = useCallback(
        async (data: RegisterFormData) => {
            return registerMutation.mutateAsync(data);
        },
        [registerMutation]
    );

    const sendVerificationEmail = useCallback(
        async (email: string) => {
            return sendVerificationEmailMutation.mutateAsync(email);
        },
        [sendVerificationEmailMutation]
    );

    const verifyEmailOTP = useCallback(
        async (email: string, otp: string) => {
            return verifyEmailOTPMutation.mutateAsync({ email, otp });
        },
        [verifyEmailOTPMutation]
    );

    const resendVerificationEmail = useCallback(
        async (email: string) => {
            return resendVerificationEmailMutation.mutateAsync(email);
        },
        [resendVerificationEmailMutation]
    );

    const requestPasswordReset = useCallback(
        async (email: string) => {
            return requestPasswordResetMutation.mutateAsync(email);
        },
        [requestPasswordResetMutation]
    );

    const resetPassword = useCallback(
        async (token: string, newPassword: string) => {
            return resetPasswordMutation.mutateAsync({ token, newPassword });
        },
        [resetPasswordMutation]
    );

    const changePassword = useCallback(
        async (currentPassword: string, newPassword: string) => {
            return changePasswordMutation.mutateAsync({ currentPassword, newPassword });
        },
        [changePasswordMutation]
    );

    const refreshToken = useCallback(
        async (refreshTokenValue: string) => {
            return refreshTokenMutation.mutateAsync(refreshTokenValue);
        },
        [refreshTokenMutation]
    );

    const checkEmailAvailability = useCallback(
        async (email: string) => {
            return checkEmailAvailabilityMutation.mutateAsync(email);
        },
        [checkEmailAvailabilityMutation]
    );

    const validateRegistrationToken = useCallback(
        async (token: string) => {
            return validateRegistrationTokenMutation.mutateAsync(token);
        },
        [validateRegistrationTokenMutation]
    );

    return {
        login,
        logout,
        register,
        sendVerificationEmail,
        verifyEmailOTP,
        resendVerificationEmail,
        requestPasswordReset,
        resetPassword,
        changePassword,
        refreshToken,
        checkEmailAvailability,
        validateRegistrationToken,
        state: {
            login: loginMutation,
            logout: logoutMutation,
            register: registerMutation,
            sendVerificationEmail: sendVerificationEmailMutation,
            verifyEmailOTP: verifyEmailOTPMutation,
            resendVerificationEmail: resendVerificationEmailMutation,
            requestPasswordReset: requestPasswordResetMutation,
            resetPassword: resetPasswordMutation,
            changePassword: changePasswordMutation,
            refreshToken: refreshTokenMutation,
            checkEmailAvailability: checkEmailAvailabilityMutation,
            validateRegistrationToken: validateRegistrationTokenMutation,
        },
    };
}
