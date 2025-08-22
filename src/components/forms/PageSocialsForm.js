'use client';
import SectionBox from "../layout/SectionBox";
import { savePageSocials } from "@/actions/pageActions";
import { useState } from "react";
import SubmitButton from "../buttons/SubmitButton";
import {MdEmail, MdPhone} from "react-icons/md";
import {FaSquareInstagram, FaDiscord} from "react-icons/fa6";
import {FaFacebook, FaTiktok, FaYoutube, FaGithub, FaTelegram, FaPlus, FaRegSave, FaTrash} from "react-icons/fa";
import { toast } from "react-hot-toast";

export const allButtons = [
    {key: 'email', 'label': 'email', icon: MdEmail, placeholder: 'johndoe@example.com'},
    {key: 'mobile', 'label': 'mobile', icon: MdPhone, placeholder: '+1 123-456-7890'},
    {key: 'instagram', 'label': 'instagram', icon: FaSquareInstagram, placeholder: 'johndoe'},
    {key: 'facebook', 'label': 'facebook', icon: FaFacebook, placeholder: 'johndoe'},
    {key: 'discord', 'label': 'discord', icon: FaDiscord, placeholder: 'johndoe'},
    {key: 'tiktok', 'label': 'tiktok', icon: FaTiktok, placeholder: 'tiktok.com/johndoe'},
    {key: 'youtube', 'label': 'youtube', icon: FaYoutube, placeholder: 'youtube.com/johndoe'},
    {key: 'github', 'label': 'github', icon: FaGithub, placeholder: 'github.com/johndoe'},
    {key: 'telegram', 'label': 'telegram', icon: FaTelegram, placeholder: 't.me/johndoe'},
];

export default function PageSocialsForm({page, user}){
    const savedSocials = Object.keys(page.buttons);
    const savedSocialsInfo = savedSocials.map(s => allButtons.find(b => b.key === s));
    const [activeButtons, setActiveButtons] = useState(savedSocialsInfo);

    async function saveForm(formData){
        await savePageSocials(formData);
        toast.success('Saved!');
    }
    

    function addSocialToPage(button){
        setActiveButtons(prev => {
            return [...prev, button];
        });
    }

    function removeSocialFromPage({key:keyToRemove}){
        setActiveButtons(prev => {
            return prev.filter(b => b.key !== keyToRemove);
        })
    }

    const availableButtons = allButtons.filter(b => !activeButtons.includes(b));
    return(
        <SectionBox>
            <form action={saveForm}>
                <h2 className="text-2xl font-bold mb-4">Socials</h2>
                {activeButtons.map(b => (
                    <div key={b.key} className="mb-4 flex items-center gap-3">
                        {/* Left pill label kept at a fixed height to align with the input */}
                        <div className="w-36 h-10 flex items-center gap-2 rounded-lg bg-amber-600/60 text-gray-700 px-3">
                            <b.icon />
                            <span className="capitalize">{b.label}</span>
                        </div>
                        {/* Input takes remaining width and shares the same height */}
                        <input
                            name={b.key}
                            defaultValue={page.buttons[b.key]}
                            type="text"
                            placeholder={b.placeholder}
                            className="h-10 flex-1 rounded-lg border border-gray-300 bg-white px-3 text-gray-900 focus:outline-none focus:ring-1 focus:border-emerald-800/60"
                        />
                        <button type="button" className="hover:text-red-600/80 cursor-pointer" onClick={() => removeSocialFromPage(b)}>
                            <FaTrash />
                        </button>
                    </div>
                ))}
                <div className="flex flex-wrap gap-2 justify-center border-t border-gray-300 mt-4 pt-4">
                    {availableButtons.map(b => (
                        <button 
                            type="button"
                            key={b.key}
                            onClick={() => addSocialToPage(b)}
                            className="flex items-center gap-1 p-2 rounded-lg bg-amber-600/40 hover:bg-amber-600/80 transition-colors"
                        >
                            <b.icon />
                            <span className="capitalize">{b.label}</span>
                            <FaPlus />
                        </button>
                    ))}
                </div>
                <div className="mt-8 max-w-md mx-auto">
                    <SubmitButton variant="amber">
                        <FaRegSave className="text-xl" />
                        <span>Save</span>
                    </SubmitButton>
                </div>
            </form>
        </SectionBox>
    )
}