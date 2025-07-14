'use client';
import { MdColorLens } from "react-icons/md";
import { FaImages, FaRegSave } from "react-icons/fa";
import Image from "next/image";
import SubmitButton from "../buttons/SubmitButton";
import { savePageSettings } from "@/actions/pageActions";
import toast from "react-hot-toast";

export default function PageSettingsForm({page, user}) {
    async function saveBaseSettings(formData){
        const result = await savePageSettings(formData);
        if (result) {
            toast.success('Saved!');
        }
    }

    return (
        <div className="-m-4">
            <form action={saveBaseSettings}>
                <div className="bg-gray-300 h-56 flex justify-center items-center">
                    <div className="radio-togglers"> {/* This went into radio togglers*/}
                        <label>
                            <input type="radio" name="bgType" value="color"/>
                            <div>
                                <MdColorLens />
                                <span>Color</span>
                            </div>
                        </label>
                        <label>
                            <input type="radio" name="bgType" value="image"/>
                            <div>
                                <FaImages />
                                <span>Image</span>
                            </div>
                        </label>
                    </div>
                </div>
                <div className="flex justify-center -mb-12">
                    <Image 
                        className="rounded-full relative -top-15 border-4 border-white shadow-lg shadow-emerald-900/50"
                        src={user?.image} 
                        alt="bg" 
                        width={128} 
                        height={128}

                    />
                </div>
                <div className="p-4 styled">
                    <label htmlFor="nameIn">Display Name</label>
                    <input type="text" name="displayName" defaultValue={page.displayName} id="nameIn" placeholder="John Doe"/>
                    <label htmlFor="locationIn">Location</label>
                    <input type="text" name="location" defaultValue={page.location} id="locationIn" placeholder="New York, NY"/>
                    <label htmlFor="bioIn">Bio</label>
                    <textarea name="bio" defaultValue={page.bio} id="bioIn" placeholder="Your Bio..."/>
                    <div className="max-w-md mx-auto mt-4">
                        <SubmitButton>
                            <FaRegSave className="text-xl" />
                            <span>Save</span>
                        </SubmitButton>
                    </div>
                </div>
            </form>
        </div>
        
    )
}