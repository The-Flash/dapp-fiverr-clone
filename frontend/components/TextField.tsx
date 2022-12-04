import { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    className?: string;
}

export default function TextField({
    label,
    className,
    ...props
}: IProps) {
    return (
        <div className={`flex flex-col ${className}`}>
            <label className="font-semibold mb-2 text-sm">{label}</label>
            <input
                {...props}
                className="border p-1 pl-2 bg-transparent rounded-md"
            />
        </div>
    )
}