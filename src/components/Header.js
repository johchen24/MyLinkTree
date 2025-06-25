import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "./buttons/LogoutButton";
import { GiDekuTree } from "react-icons/gi";

export default async function Header() {
    const session = await getServerSession(authOptions);
    return(
        <header className = "bg-white border-b border-gray-100 py-4">
            <div className="max-w-4xl flex justify-between mx-auto px-6">
                <div className="flex items-center gap-6">
                    <Link href={'/'} className="flex items-center gap-1 text-emerald-700">
                        <GiDekuTree className="text-3xl" />
                        <span className="font-bold italic">MyLinkTree</span>
                    </Link>
                    <nav className="flex items-center gap-4 text-slate-500 text-sm">
                        <Link href={'/about'}>About</Link>
                        <Link href={'/pricing'}>Pricing</Link>
                        <Link href={'/contact'}>Contact</Link>
                    </nav>
                </div>
                <nav className="flex items-center gap-4 text-sm text-slate-500">
                    {!!session && (
                        <>
                            <Link href={'/account'}>Hello, {session?.user?.name}</Link>
                            <LogoutButton />
                        </>
                    )}
                    {!session && (
                        <>
                            <Link href={'/login'}>Sign In</Link>
                            <Link href={'/login'}>Create an Account</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}