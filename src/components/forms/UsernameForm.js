"use client";
import { FaRegHandPointRight } from "react-icons/fa";
import claimUsername from "@/actions/claimUsername";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function UsernameForm({username}) {
    const [taken, setTaken] = useState(false);
    async function handleSubmit(formData) {
        const result = await claimUsername(formData);
        setTaken(result === false);
        if (result) {
            redirect('/account/'+formData.get('Username'));
        }
    }

    return(
        <form action={handleSubmit}>
            <h1 className="text-4xl font-bold text-center mb-2">
                Grab your username
            </h1>
            <p className="text-center mb-6 text-gray-500">
                Choose your username
            </p>
            <div className="max-w-xs mx-auto">
                <input 
                    className="block p-2 bg-white border-2 border-gray-300 rounded-md w-full mb-2 text-center" 
                    type="text" name="Username" placeholder="Username" defaultValue={username}/>
                {taken && (
                    <div className="bg-red-100 border border-red-500 p-2 mb-2">
                        This username is already taken.
                    </div>
                )}   
                <button
                    type="submit" 
                    className="bg-emerald-700 text-white px-4 py-2 rounded-md block w-full flex items-center justify-center gap-2"
                >
                    <FaRegHandPointRight className="text-xl" />
                    <span>Claim Your Username</span>

                </button>
            </div>
        </form>
    )
}
