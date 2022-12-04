import { useSession } from "next-auth/react";
import Head from "next/head";
import UploadProfilePhotoForm from "../../components/UploadProfilePhotoForm";


function CompleteProfile() {
    const session = useSession();
    console.log(session);
    return (
        <main className="bg-background text-white h-screen flex justify-center items-center">
            <Head>
                <title>Complete Your Profile</title>
            </Head>
            <UploadProfilePhotoForm/>
        </main>
    )
}

export default CompleteProfile;