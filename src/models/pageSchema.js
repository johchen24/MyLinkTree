import { Schema, models, model } from "mongoose";

const PageSchema = new Schema({
    uri: { type: String, required: true, min: 1, unique: true},
    owner: { type: String, required: true},
    displayName: { type: String, default: ''},
    location: { type: String, default: ''},
    bio: { type: String, default: ''},
    bgType: { type: String, default: 'color'},
    bgColor: { type: String, default: '#000000'}
}, { timestamps: true });

export const Page = models?.Page || model('Page', PageSchema);
