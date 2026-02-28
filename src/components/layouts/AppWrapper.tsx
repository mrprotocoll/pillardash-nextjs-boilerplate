"use client";

import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AlertProvider } from "pillardash-ui-react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "@/redux/store";
import { ThemeProvider } from "@/styles/config/ThemeContext";

export default function AppWrapper({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        retry: 1,
                        refetchOnWindowFocus: false,
                    },
                    mutations: {
                        retry: 0,
                    },
                },
            })
    );

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <PersistGate loading={null} persistor={persistor}>
                    <AlertProvider>
                        <ThemeProvider>
                            <div>{children}</div>
                        </ThemeProvider>
                    </AlertProvider>
                </PersistGate>
            </QueryClientProvider>
        </Provider>
    );
}
