import Link from "next/link";

function HeaderNav() {
    return (
        <ul className="w-48 flex justify-between font-semibold">
            <li>
                <Link href="/signin">
                    Sign In
                </Link>
            </li>
            <li>
                <Link 
                href="/join"
                className="border border-gray-200 px-6 py-1 rounded-md"
                >
                    Join
                </Link>
            </li>
        </ul>
    )
}

export default HeaderNav