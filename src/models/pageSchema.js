import { Schema, models, model } from "mongoose";

const PageSchema = new Schema({
    uri: { type: String, required: true, min: 1, unique: true},
}, { timestamps: true });

const Page = models?.Page || model('Page', PageSchema);
