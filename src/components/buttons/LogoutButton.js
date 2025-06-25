"use client";
import { signOut } from "next-auth/react";
import { MdOutlineLogout } from "react-icons/md";

export default function LogoutButton() {
    return (
        <button onClick={() => signOut()} className="flex items-center gap-1 border border-slate-200 p-2 px-4 shadow rounded-md">
            <span>Sign out</span>
            <MdOutlineLogout className="" />
        </button>
    )
}