'use client';
import { useState } from "react";
import { MdColorLens, MdOutlineCloudUpload } from "react-icons/md";
import { FaImages, FaRegSave } from "react-icons/fa";
import Image from "next/image";
import SubmitButton from "../buttons/SubmitButton";
import { savePageSettings } from "@/actions/pageActions";
import toast from "react-hot-toast";

export default function PageSettingsForm({page, user}) {
    const [bgType, setBgType] = useState(page.bgType);
    const [bgColor, setBgColor] = useState(page.bgColor);
    const [bgImage, setBgImage] = useState(page.bgImage);
    const [avatar, setAvatar] = useState(user?.image);

    async function saveBaseSettings(formData){
        const result = await savePageSettings(formData);
        if (result) {
            toast.success('Saved!');
        }
    }

    async function upload(e, callbackFn){
        const file = e.target.files?.[0];
        if (file){
            const uploadPromise = new Promise((resolve, reject) => {
                const data = new FormData();
                data.set('file', file);
                fetch('/api/upload', {
                    method: 'POST',
                    body: data
                }).then(res => {
                    if (res.ok) {
                        res.json().then(link=>{
                            callbackFn(link);
                            resolve(link);
                        });
                    } else {
                        reject();
                    }
                });
            });

            toast.promise(uploadPromise, {
                loading: 'Uploading...',
                success: 'Uploaded!',
                error: 'Failed to upload'
            });
        }
    }

    async function handleCoverImageChange(e){
        await upload(e, (link) => setBgImage(link));
    }

    async function handleAvatarImageChange(e){
        await upload(e, (link) => setAvatar(link));
    }

    return (
        <div className="-m-4">
            <form action={saveBaseSettings}>
                <div className="bg-gray-300 min-h-[300px] flex justify-center items-center flex-col mb-8 bg-cover bg-center" style={bgType === 'image' ? {backgroundImage: `url(${bgImage})`} : {backgroundColor: bgColor}}>
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
                                <input type="color" name="bgColor" className="rounded-full cursor-pointer" onChange={(e) => setBgColor(e.target.value)} defaultValue={page.bgColor}/>         
                            </div>
                        )}
                        {bgType === 'image' && (
                            <div className="flex justify-center">
                                <label className="border border-gray-300/50 rounded-lg p-2 px-4 shadow-md cursor-pointer">
                                    <span>Change Background Image</span>
                                    <input type="hidden" name="bgImage" value={bgImage}/>
                                    <input type="file" className="hidden" onChange={handleCoverImageChange}/>
                                </label>

                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-center -mb-12">
                    <div className="relative -top-15 w-[128px] h-[128px]">
                        <div className="overflow-hidden rounded-full border-4 border-white shadow-lg shadow-emerald-900/50 h-full w-full">
                            <Image 
                                className="object-cover rounded-full"
                                src={avatar} 
                                alt={ 'avatar' }
                                width={128} 
                                height={128}
                            />
                        </div>
                        <label htmlFor="avatarIn"className="absolute bottom-0 right-0 bg-gray-200 rounded-full p-2 shadow-lg shadow-emerald-900/50 cursor-pointer">
                            <MdOutlineCloudUpload className="text-2xl"/>
                            <input type="file" className="hidden" onChange={handleAvatarImageChange} id="avatarIn"/>
                            <input type="hidden" name="avatar" value={avatar}/>
                        </label>
                    </div>

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