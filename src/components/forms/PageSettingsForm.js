'use client';
import { useState } from "react";
import { MdColorLens } from "react-icons/md";
import { FaImages, FaRegSave } from "react-icons/fa";
import Image from "next/image";
import SubmitButton from "../buttons/SubmitButton";
import { savePageSettings } from "@/actions/pageActions";
import toast from "react-hot-toast";

export default function PageSettingsForm({page, user}) {
    const [bgType, setBgType] = useState(page.bgType);
    const [bgColor, setBgColor] = useState(page.bgColor);

    async function saveBaseSettings(formData){
        const result = await savePageSettings(formData);
        if (result) {
            toast.success('Saved!');
        }
    }

    return (
        <div className="-m-4">
            <form action={saveBaseSettings}>
                <div className="bg-gray-300 h-72 flex justify-center items-center flex-col mb-8" style={{backgroundColor: bgType === 'color' ? bgColor : 'transparent'}}>
                    <div className="bg-white rounded-lg p-3 shadow-lg">
                        <div className="radio-togglers mb-4"> {/* This went into radio togglers*/}
                            <label>
                                <input type="radio" name="bgType" value="color" defaultChecked={page.bgType === 'color'}/>
                                <div>
                                    <MdColorLens />
                                    <span>Color</span>
                                </div>
                            </label>
                            <label>
                                <input type="radio" name="bgType" value="image" defaultChecked={page.bgType === 'image'}/>
                                <div>
                                    <FaImages />
                                    <span>Image</span>
                                </div>
                            </label>
                        </div>
                        {bgType === 'color' && (
                            <div className="flex items-center gap-2 justify-center">
                                <span>Background Color</span>
                                <input type="color" name="bgColor" defaultValue={page.bgColor}/>         
                            </div>
                        )}
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