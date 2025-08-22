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
    // Use lean() to ensure we pass a plain object to client components
    const pageDoc = await Page.findOne({owner: session?.user?.email}).lean();
    if (pageDoc){
        const clientSafePage = {
            displayName: pageDoc.displayName ?? '',
            location: pageDoc.location ?? '',
            bio: pageDoc.bio ?? '',
            bgType: pageDoc.bgType ?? 'color',
            bgColor: pageDoc.bgColor ?? '#000000',
            bgImage: pageDoc.bgImage ?? '',
            buttons: pageDoc.buttons ?? {},
        };
        return (
            <>
                <PageSettingsForm page={clientSafePage} user={session?.user}/>
                <PageSocialsForm page={clientSafePage} user={session?.user}/>
            </>
        )
    }
    return(
        <div>
            <UsernameForm username={username}/>
        </div>
        
    )
}
