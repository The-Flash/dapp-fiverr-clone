import { ReactNode } from "react";

interface IProps<T> {
    errors: T,
    value: keyof T
}

function FormError<T>({ errors, value }: IProps<T>) {
    if (!errors[value]) {
        return null;
    }
    return (
        <p className="text-sm text-red-600 text-center">{errors[value] as ReactNode}</p>
    )
}

export default FormError