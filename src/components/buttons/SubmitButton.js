import { useFormStatus } from "react-dom";

export default function SubmitButton({children}) {
    const {pending} = useFormStatus();
    return (
        <button
            type="submit" 
            disabled={pending}
            className="bg-emerald-800 disabled:bg-emerald-600 text-white disabled:text-gray-200 
            px-4 py-2 rounded-md block w-full flex items-center justify-center gap-2"
        >
            {children} 
        </button>
    );
}