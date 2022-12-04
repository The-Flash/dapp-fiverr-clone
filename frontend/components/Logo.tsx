import Link from "next/link";

function Logo() {
  return (
    <h6 className="font-[900] text-3xl">
        <Link href="/" className="after:content-['\2022'] after:text-primary after:ml-1">DiGG</Link>
    </h6>
  )
}

export default Logo;