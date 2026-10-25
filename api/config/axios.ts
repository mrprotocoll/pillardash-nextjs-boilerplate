import Axios from "axios";

import { ApiErrorHandler } from "@/api/config/error";
import { alert } from "@/lib/alert";
import { ROUTES } from "@/lib/routes";
import { logout } from "@/redux/reducers/authSlice";
import { store } from "@/redux/store";

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000/v1",
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

axios.interceptors.request.use(
    (config) => {
        const { auth } = store.getState();
        const token = auth.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response?.status === 401) {
                store.dispatch(logout());
                alert.error("Unauthorised. Please login again.");
                window.location.href = ROUTES.login;
                return Promise.reject(error);
            }
        }

        // Handle all other errors
        ApiErrorHandler.handle(error);

        return Promise.reject(error);
    }
);

export default axios;
