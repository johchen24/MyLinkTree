'use server';
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/pageSchema";

export async function savePageSettings(formData) {
    mongoose.connect(process.env.MONGO_URI);
    const session = await getServerSession(authOptions);
    if (session) {
        const displayName = formData.get('displayName');
        const location = formData.get('location');
        const bio = formData.get('bio');
        const bgType = formData.get('bgType');
        await Page.updateOne({owner:session?.user?.email}, {
            $set: {
                displayName: displayName,
                location: location,
                bio: bio,
                bgType: bgType
            }
        })
        return true;
    }
    return false;

}