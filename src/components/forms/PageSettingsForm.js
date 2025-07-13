export default function PageSettingsForm({page}) {
    return (
        <form className="-m-4">
            <div className="bg-gray-300 h-32 flex justify-center items-center">
                <div className="radio-togglers">
                    <label>
                        <input type="radio" name="bgType" value="color"/>
                        <span>Color</span>
                    </label>
                    <label>
                        <input type="radio" name="bgType" value="image"/>
                        <span>Image</span>
                    </label>
                </div>
            </div>
            <div>avatar</div>
        </form>
    )
}