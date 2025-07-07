'use server';

import { Page } from "@/models/pageSchema";
import mongoose from "mongoose";


export default async function claimUsername(formData) {
    const username = formData.get('Username');
    mongoose.connect(process.env.MONGO_URI);
    const existingPageDoc = await Page.findOne({uri: username});
    if (existingPageDoc) {
        return false;
    } else {
        await Page.create({uri: username});
        return true;
    }

}