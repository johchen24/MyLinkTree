"use client";
import { signOut } from "next-auth/react";
import { MdOutlineLogout } from "react-icons/md";

export default function LogoutButton({className = "flex items-center gap-1 border border-emerald-900/80 p-2 px-4 shadow rounded-md"}) {
    return (
        <button onClick={() => signOut()} className={className}>
            <MdOutlineLogout className="w-6 h-6"/>
            <span>Sign out</span>
        </button>
    )
}