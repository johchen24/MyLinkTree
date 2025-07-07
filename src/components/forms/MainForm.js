"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function MainForm({user}) {
    const router = useRouter();
    const [username, setUsername] = useState("");

    async function handleSubmit(e){
        e.preventDefault();
        if (username.length > 0){ // FIX LATER: check if already signed in, pass prop from page
            if (user) {
                router.push('/account?username='+username);
            }
            await signIn('google', {callbackUrl: '/account?username='+username})
        }
    }

    return(
        <form onSubmit={handleSubmit}className="inline-flex items-center shadow-lg shadow-grey-500/20">
            <span className="bg-white py-4 pl-4">mylinktree.to/</span>
            <input 
                type="text" className="py-4 bg-white" placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit" className="bg-blue-500 text-white py-4 px-6">
                Create Now
            </button>
        </form>
    );
}