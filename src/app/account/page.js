import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { FaRegHandPointRight } from "react-icons/fa";
import claimUsername from "@/actions/claimUsername";

export default async function Account({searchParams}) {
    const session = await getServerSession(authOptions);
    const {username} = await searchParams;
    
    if (!session) {
        redirect('/');
    }
    return(
        <div>
            <form action={claimUsername}>
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
                    <button
                        type="submit" 
                        className="bg-emerald-700 text-white px-4 py-2 rounded-md block w-full flex items-center justify-center gap-2"
                    >
                        <FaRegHandPointRight className="text-xl" />
                        <span>Claim Your Username</span>

                    </button>
                </div>
            </form>
        </div>
        
    )
}
