'use server';

import { Page } from "@/models/pageSchema";
import mongoose from "mongoose";

export default async function claimUsername(formData) {
    const username = formData.get('Username');
    mongoose.connect(process.env.MONGO_URI);
    try{
        const pageDoc = await Page.create({ uri : username}); // must return plain object to client component
        return JSON.parse(JSON.stringify(pageDoc));
    } catch (e) {
        return;
    }

}