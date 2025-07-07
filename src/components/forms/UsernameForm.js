"use client";
import claimUsername from "@/actions/claimUsername";
import { useState } from "react";
import { redirect } from "next/navigation";
import SubmitButton from "../buttons/SubmitButton";
import { FaRegHandPointRight } from "react-icons/fa";

export default function UsernameForm({username}) {
    const [taken, setTaken] = useState(false);
    async function handleSubmit(formData) {
        const result = await claimUsername(formData);
        setTaken(result === false);
        if (result) {
            redirect('/account?created='+formData.get('Username'));
        }
    }

    return(
        <form action={handleSubmit}>
            <h1 className="text-4xl font-bold text-center mb-2">
                Claim your username
            </h1>
            <p className="text-center mb-6 text-gray-500">
                Choose your myLinkTree username
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
                <SubmitButton>
                    <FaRegHandPointRight className="text-xl" />
                    <span>Claim Your Username</span>
                </SubmitButton>
            </div>
        </form>
    )
}
