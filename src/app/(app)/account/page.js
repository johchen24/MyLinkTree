import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UsernameForm from "@/components/forms/UsernameForm";
import { Page } from "@/models/pageSchema";
import mongoose from "mongoose";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import PageSocialsForm from "@/components/forms/PageSocialsForm";

export default async function Account({searchParams}) {
    const session = await getServerSession(authOptions);
    const {username} = await searchParams;
    
    if (!session) {
        redirect('/');
    }

    mongoose.connect(process.env.MONGO_URI);    
    const page = await Page.findOne({owner: session?.user?.email});
    if (page){
        return (
            <>
                <PageSettingsForm page={page} user={session?.user}/>
                <PageSocialsForm page={page} user={session?.user}/>
            </>
        )
    }
    return(
        <div>
            <UsernameForm username={username}/>
        </div>
        
    )
}
