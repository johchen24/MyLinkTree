import { MdColorLens } from "react-icons/md";
import { FaImages } from "react-icons/fa";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function PageSettingsForm({page}) {
    const session = await getServerSession(authOptions);
    return (
        <div className="-m-4">
            <form>
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
                <div className="flex justify-center">
                    <Image 
                        className="rounded-full relative -top-15 border-4 border-white shadow-lg shadow-emerald-900/50"
                        src={session?.user?.image} 
                        alt="bg" 
                        width={128} 
                        height={128}

                    />
                </div>
                <div>
                    <input type="text" placeholder="Display name"/>
                    <input type="text" placeholder="Location"/>
                    <textarea name="" placeholder="Bio"/>
                </div>
            </form>
        </div>
        
    )
}