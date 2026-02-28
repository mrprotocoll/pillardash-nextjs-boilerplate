import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/pillardash-ui-react/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                md: "1.5rem",
                lg: "2rem",
            },
            screens: {
                "2xl": "1300px",
            },
        },
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "var(--color-primary)",
                    50: "var(--color-primary-50)",
                    100: "var(--color-primary-100)",
                    200: "var(--color-primary-200)",
                    300: "var(--color-primary-300)",
                    400: "var(--color-primary-400)",
                    500: "var(--color-primary-500)",
                    600: "var(--color-primary-600)",
                    700: "var(--color-primary-700)",
                    800: "var(--color-primary-800)",
                    900: "var(--color-primary-900)",
                },
                secondary: {
                    DEFAULT: "var(--color-secondary)",
                    50: "var(--color-secondary-50)",
                    100: "var(--color-secondary-100)",
                    200: "var(--color-secondary-200)",
                    300: "var(--color-secondary-300)",
                    400: "var(--color-secondary-400)",
                    500: "var(--color-secondary-500)",
                    600: "var(--color-secondary-600)",
                    700: "var(--color-secondary-700)",
                    800: "var(--color-secondary-800)",
                    900: "var(--color-secondary-900)",
                },
                tertiary: "var(--tertiary)",
                dark: "var(--dark)",
            },
            boxShadow: {
                subtle: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                "deep-shadow": "0 10px 25px rgba(0, 0, 0, 0.2)",
            },
        },
    },
    plugins: [],
} satisfies Config;
