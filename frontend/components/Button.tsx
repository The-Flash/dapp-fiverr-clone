import type { ButtonHTMLAttributes, ReactNode } from "react"

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    className?: string;
}

export default function Button(
    { children, className, ...props } : IProps
) {
    return (
        <button
        {...props}
            className={`text-center w-full bg-primary text-white rounded-md p-2 font-semibold ${className}`}
        >
            {children}
        </button>
    )
}