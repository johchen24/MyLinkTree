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

    function handleFileChange(e){
        const file = e.target.files?.[0];
        if (file){
            const data = new FormData;
            data.set('file', file);
            fetch('/api/upload', {
                method: 'POST',
                body: data
            }).then(res => res.json())
        }
    }

    return (
        <div className="-m-4">
            <form action={saveBaseSettings}>
                <div className="bg-gray-300 h-72 flex justify-center items-center flex-col mb-8" style={{backgroundColor: bgType === 'color' ? bgColor : 'transparent'}}>
                    <div className="bg-white rounded-lg p-3 shadow-lg">
                        <div className="radio-togglers mb-4"> {/* This went into radio togglers*/}
                            <label className="input-label">
                                <input type="radio" name="bgType" value="color" defaultChecked={bgType === 'color'} onClick={() => setBgType('color')}/>
                                <div>
                                    <MdColorLens />
                                    <span>Color</span>
                                </div>
                            </label>
                            <label className="input-label">
                                <input type="radio" name="bgType" value="image" defaultChecked={bgType === 'image'} onClick={() => setBgType('image')}/>
                                <div>
                                    <FaImages />
                                    <span>Image</span>
                                </div>
                            </label>
                        </div> {/* radio togglers*/}
                        {bgType === 'color' && (
                            <div className="flex items-center gap-2 justify-center">
                                <span>Change Background Color</span>
                                <input type="color" name="bgColor" className="rounded-full" onChange={(e) => setBgColor(e.target.value)} defaultValue={page.bgColor}/>         
                            </div>
                        )}
                        {bgType === 'image' && (
                            <div className="flex justify-center">
                                <label className="border border-gray-300/50 rounded-lg p-2 px-4 shadow-md">
                                    <span>Change Background Image</span>
                                    <input type="file" name="bgImage" className="hidden" onChange={handleFileChange}/>
                                </label>

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
                    <label htmlFor="nameIn" className="input-label">Display Name</label>
                    <input type="text" name="displayName" defaultValue={page.displayName} id="nameIn" placeholder="John Doe"/>
                    <label htmlFor="locationIn" className="input-label">Location</label>
                    <input type="text" name="location" defaultValue={page.location} id="locationIn" placeholder="New York, NY"/>
                    <label htmlFor="bioIn" className="input-label">Bio</label>
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