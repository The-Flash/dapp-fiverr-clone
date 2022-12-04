
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { signIn } from "next-auth/react";
import Button from "./Button";
import FormError from "./FormError";
import TextField from "./TextField";
import { CREATE_USER_QUERY } from "../graphql/queries/auth";
import { ICreateUserResponse } from "../utils/types";
import { useRouter } from "next/router";

interface IErrors {
    _all?: string;
    email?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
}

interface ICreateUserVariables {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
}

export default function SignUpForm() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<IErrors>({});
    const router = useRouter();

    const [createUser, { loading, error }] = useMutation<ICreateUserResponse, ICreateUserVariables>(CREATE_USER_QUERY);

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrors((state) => {
                return { ...state, password: "Passwords must be equal" };
            })
            return;
        }

        if (username.length < 5) {
            setErrors((state) => {
                return { ...state, username: "Username must be have 5 or more characters" }
            });
            return;
        }
        const data = {
            email,
            username,
            firstName,
            lastName,
            password,
            confirmPassword
        }
        try {
            await createUser({
                variables: data
            });
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false
            });
            if (res?.ok) {
                // go to home
                router.push("/complete-profile");
            } else {
                setErrors((state) => {
                    return { ...state, _all: "Could not sign you in" }
                });
                router.push("/");
            }
        } catch (e: any) {
            setErrors((state) => {
                return { ...state, _all: e?.message }
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
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <FormError errors={errors} value="email" />
            <TextField
                required
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2" />
            <FormError errors={errors} value="username" />
            <TextField
                required
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-2" />
            <FormError errors={errors} value="firstName" />
            <TextField
                required
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-2" />
            <FormError errors={errors} value="lastName" />
            <TextField
                required
                label="Password" type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2" />
            <FormError errors={errors} value="password" />
            <TextField
                label="Confirm Password" type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2" />
            <FormError errors={errors} value="_all" />
            <Button
                className="mt-2"
                type="submit"
                onClick={() => setErrors({})}
            >Sign Up</Button>
        </form>
    )
}