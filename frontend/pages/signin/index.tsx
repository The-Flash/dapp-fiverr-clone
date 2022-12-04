import Head from "next/head";
import Link from "next/link";
import { ReactElement } from "react";
import SignInForm from "../../components/SignInForm";
import AuthLayout from "../../layouts/AuthLayout";

function SignIn() {
    return (
        <section className="w-full">
            <h1 className="font-semibold text-lg">Sign In</h1>
            <p className="text-sm text-gray-500 mt-2">Don't have an account?
                <Link href="/join" className="text-blue-800 ml-2 font-semibold">Sign Up.</Link>
            </p>
            <SignInForm />
        </section>
    )
}

SignIn.getLayout = function getLayout(page: ReactElement) {
    return (
        <AuthLayout>
            <Head>
                <title>Sign In to DiGG</title>
            </Head>
            {page}
        </AuthLayout>
    )
}

export default SignIn;