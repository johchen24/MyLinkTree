"use client";

export default function MainForm() {
    function handleSubmit(e){

    }
    
    return(
        <form onSubmit={handleSubmit}className="inline-flex items-center shadow-lg shadow-grey-500/20">
            <span className="bg-white py-4 pl-4">mylinktree.to/</span>
            <input type="text" className="py-4 bg-white" placeholder="username"/>
            <button type="submit" className="bg-blue-500 text-white py-4 px-6">
                Create Now
            </button>
        </form>
    );
}