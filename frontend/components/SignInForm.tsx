import React, { useState } from "react";
import { useRouter } from "next/router";
import Button from "./Button";
import TextField from "./TextField";
import { signIn } from "next-auth/react";
import FormError from "./FormError";

interface IErrors {
    _all?: string;
}

export default function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<IErrors>({});
    const router = useRouter();

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false
            });
            if (res?.ok) {
                // go to home
                router.push("/");
            } else {
                setErrors((state) => {
                    return { ...state, _all: "Incorrect email/password" }
                });
            }
        } catch (e) {
            setErrors((state) => {
                return { ...state, _all: "An unknown error occurred. Try again later" }
            });
        }
    }

    return (
        <form
            className="mt-5 w-1/2"
            onSubmit={handleSubmit}
        >
            <TextField
                required
                label="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <TextField
                required
                label="Password" type="password"
                className="mt-2"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <FormError errors={errors} value="_all"/>
            <Button
                className="mt-2"
                type="submit"
            >Sign In</Button>
        </form>
    )
}