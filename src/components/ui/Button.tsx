import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
}

export default function Button({
    loading = false,
    disabled,
    className = "",
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            disabled={disabled || loading}
            aria-busy={loading}
            className={`bg-primary-500 hover:bg-primary-600 focus-visible:outline-primary-500 inline-flex items-center justify-center rounded-lg px-4 py-3 font-semibold text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
        >
            {loading ? <span role='status'>Loading…</span> : children}
        </button>
    );
}
