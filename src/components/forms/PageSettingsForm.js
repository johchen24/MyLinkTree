import { MdColorLens } from "react-icons/md";
import { FaImages } from "react-icons/fa";
    
export default function PageSettingsForm({page}) {
    return (
        <form className="-m-4">
            <div className="bg-gray-300 h-32 flex justify-center items-center">
                <div className="radio-togglers">
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
            <div>avatar</div>
        </form>
    )
}