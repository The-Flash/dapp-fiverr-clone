import { ReactNode } from "react";
import Logo from "../components/Logo";

interface IProps {
    children: ReactNode
}

function AuthLayout({ children }: IProps) {
    return (
        <div className="h-screen bg-background">
            <main className="p-20">
                <div className="w-3/4 flex justify-between m-auto">
                    {children}
                    <section>
                        <div className="text-center h-full flex justify-start items-center">
                            <Logo />
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default AuthLayout;