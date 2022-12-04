import Head from "next/head";
import Link from "next/link";
import { ReactElement } from "react";
import SignUpForm from "../../components/SignUpForm";
import AuthLayout from "../../layouts/AuthLayout";

export default function Join() {
    return (
        <section className="w-full">
            <h1 className="font-semibold text-lg">Sign Up</h1>
            <p className="text-sm text-gray-500 mt-2">Already have an account?
                <Link href="/signin" className="text-blue-800 ml-2 font-semibold">Sign In.</Link>
            </p>
            <SignUpForm />
        </section>
    )
}

Join.getLayout = function getLayout(page: ReactElement) {
    return (
        <AuthLayout>
            <Head>
                <title>Join DiGG</title>
            </Head>
            {page}
        </AuthLayout>
    )
}