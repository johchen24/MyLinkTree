import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Account({searchParams}) {
    const session = await getServerSession(authOptions);
    const {username} = await searchParams;
    
    if (!session) {
        redirect('/');
    }
    return(
        <div>
            <form>
                <h1 className="text-4xl font-bold text-center mb-2">
                    Grab your username
                </h1>
                <p className="text-center mb-6 text-gray-500">
                    Choose your username
                </p>
                <input className="block p-2 bg-white mx-auto border-2 border-gray-300 rounded-md" type="text" placeholder="username" />
                <button type="submit">Claim username</button>
            </form>
        </div>
        
    )
}
