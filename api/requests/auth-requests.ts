import { authEndpoints } from "@/api/endpoints/auth-endpoints";
import api from "@/api/index";
import { ApiResponse } from "@/api/types";
import { RegisterFormData } from "@/app/auth/types";

const AuthRequests = {
    login: async ({ email, password }: { email: string; password: string }) => {
        try {
            return await api.post(authEndpoints.login, { email, password });
        } catch (error) {
            throw error;
        }
    },

    logout: async () => {
        const response = await api.post(authEndpoints.logout);
        return response.data;
    },
    register: async (data: RegisterFormData): Promise<ApiResponse<{ id: string }>> => {
        try {
            const response = await api.post(authEndpoints.register, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    sendVerificationEmail: async (email: string) => {
        try {
            const response = await api.post(authEndpoints.sendVerificationEmail, { email });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    verifyEmailOTP: async (email: string, otp: string): Promise<ApiResponse> => {
        try {
            const response = await api.post(authEndpoints.verifyEmailOTP, { email, token: otp });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    resendVerificationEmail: async (email: string): Promise<ApiResponse> => {
        try {
            const response = await api.post(authEndpoints.resendVerificationEmail, { email });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    requestPasswordReset: async (email: string) => {
        try {
            const response = await api.post(authEndpoints.requestPasswordReset, { email });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    resetPassword: async (token: string, newPassword: string) => {
        try {
            const response = await api.post(authEndpoints.resetPassword, { token, newPassword });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    changePassword: async (currentPassword: string, newPassword: string) => {
        try {
            const response = await api.post(authEndpoints.changePassword, {
                currentPassword,
                newPassword,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    refreshToken: async (refreshToken: string) => {
        try {
            const response = await api.post(authEndpoints.refreshToken, { refreshToken });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    checkEmailAvailability: async (email: string) => {
        try {
            const response = await api.get(
                `${authEndpoints.checkEmailAvailability}?email=${encodeURIComponent(email)}`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    validateRegistrationToken: async (token: string) => {
        try {
            const response = await api.get(
                `${authEndpoints.validateRegistrationToken}?token=${encodeURIComponent(token)}`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default AuthRequests;
