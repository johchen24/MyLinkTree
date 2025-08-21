"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MdOutlineSwitchAccount } from "react-icons/md";
import { FaChartLine } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import LogoutButton from "@/components/buttons/LogoutButton";

export default function AppSidebar() {
    const path = usePathname();
    console.log(path);

    return (
        <nav className="inline-flex mx-auto flex-col text-center mt-8 gap-4 text-emerald-950">
            <Link href="/account" className={"flex gap-4 p-2 rounded-lg " + (path === '/account' ? 'bg-emerald-900/10 font-bold' : '')}>
                <MdOutlineSwitchAccount className="w-6 h-6"/>
                <span>My Page</span>
            </Link>
            <Link href="/analytics" className={"flex gap-4 p-2 rounded-lg " + (path === '/analytics' ? 'bg-emerald-900/10 font-bold' : '')}>
                <FaChartLine className="w-6 h-6"/>
                <span>Analytics</span>
            </Link>
            <LogoutButton className={'flex gap-4 p-2 rounded-lg'}/>
            <Link href="/" className="flex gap-4 p-2 rounded-lg border-t border-emerald-900/60 pt-4 mt-4">
                <FaHome className="w-6 h-6"/>
                <span>Back to Home</span>
            </Link>
        </nav>
    );
}