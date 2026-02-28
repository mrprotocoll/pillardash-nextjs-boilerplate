export const authEndpoints = {
    login: "/auth/login",
    logout: "/auth/logout",
    register: "/auth/register",
    sendVerificationEmail: "/auth/verify/send",
    verifyEmailOTP: "/auth/verify/confirm",
    resendVerificationEmail: "/auth/verify/resend",
    requestPasswordReset: "/auth/password/reset-request",
    resetPassword: "/auth/password/reset",
    changePassword: "/auth/password/change",
    refreshToken: "/auth/token/refresh",
    checkEmailAvailability: "/auth/check-email",
    validateRegistrationToken: "/auth/validate-token",
};
