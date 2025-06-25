'use client';
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function LoginWithGoogle() {
    return(
        <button 
            onClick={() => signIn("google")}
            className="bg-white shadow-lg text-center w-full py-4 flex items-center gap-3 justify-center"
        >
            <FaGoogle className="h-7 w-7"/>
            <span>Sign In with Google</span>
        </button>
    );
}