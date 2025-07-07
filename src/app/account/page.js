import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UsernameForm from "@/components/forms/UsernameForm";

export default async function Account({searchParams}) {
    const session = await getServerSession(authOptions);
    const {username} = await searchParams;
    
    if (!session) {
        redirect('/');
    }
    return(
        <div>
            <UsernameForm desiredUsername={username}/>
        </div>
        
    )
}
