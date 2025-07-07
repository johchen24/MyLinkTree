'use server';

import { Page } from "@/models/pageSchema";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function claimUsername(formData) {
    const username = formData.get('Username');
    await mongoose.connect(process.env.MONGO_URI);
    const existingPageDoc = await Page.findOne({uri: username});
    if (existingPageDoc) {
        return false;
    } else {
        const session = await getServerSession(authOptions);
        await Page.create({uri: username, owner: session?.user?.email});
        return true;
    }

}