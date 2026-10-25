import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    icon?: ReactNode;
    rightIcon?: ReactNode;
}

export default function Input({
    label,
    error,
    icon,
    rightIcon,
    className = "",
    id,
    ...props
}: InputProps) {
    return (
        <div className={`space-y-2 ${className}`}>
            <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
                {label}
                {props.required && <span aria-hidden='true'> *</span>}
            </label>
            <div className='relative'>
                {icon && (
                    <span className='pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500'>
                        {icon}
                    </span>
                )}
                <input
                    {...props}
                    id={id}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${id}-error` : undefined}
                    className={`focus:ring-primary-500 w-full rounded-lg border bg-white px-3 py-3 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-2 ${icon ? "pl-11" : ""} ${rightIcon ? "pr-12" : ""} ${error ? "border-red-500" : "border-gray-300"}`}
                />
                {rightIcon && (
                    <span className='absolute inset-y-0 right-3 flex items-center'>
                        {rightIcon}
                    </span>
                )}
            </div>
            {error && (
                <p id={`${id}-error`} className='text-sm text-red-600'>
                    {error}
                </p>
            )}
        </div>
    );
}
