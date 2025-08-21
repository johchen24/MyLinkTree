'use server';
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/pageSchema";
import { User } from "@/models/userSchema";

export async function savePageSettings(formData) {
    mongoose.connect(process.env.MONGO_URI);
    const session = await getServerSession(authOptions);
    if (session) {
        const dataKeys = ['displayName', 'location', 'bio', 'bgType', 'bgColor', 'bgImage'];
        const dataToUpdate = {};
        for (const key of dataKeys) {
            if (formData.has(key)) {
                dataToUpdate[key] = formData.get(key);
            }
        }

        await Page.updateOne({owner:session?.user?.email}, {
            $set: {
                ...dataToUpdate
            }
        })

        if (formData.has('avatar')) {
            const avatarLink = formData.get('avatar');
            await User.updateOne({email: session?.user?.email}, {
                $set: {
                    image: avatarLink
                }
            })
        }
        return true;
    }
    return false;

}