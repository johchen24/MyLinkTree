import { useFormStatus } from "react-dom";

// Generic submit button that supports color variants and custom classes.
// If you pass a custom className, color classes are not applied so you can fully control styling.
export default function SubmitButton({ children, variant = 'emerald', className = '' }) {
    const { pending } = useFormStatus();

    // Palette for quick variant switching without changing callers everywhere
    // Centralized color variants; include hover states so callers get sane defaults
    const palette = {
        emerald: {
            base: 'bg-emerald-800/80',
            hover: 'hover:bg-emerald-800/90',
            disabled: 'disabled:bg-emerald-700 disabled:cursor-not-allowed',
        },
        amber: {
            base: 'bg-amber-600/80',
            hover: 'hover:bg-amber-600/90',
            disabled: 'disabled:bg-amber-500 disabled:cursor-not-allowed',
        },
        slate: {
            base: 'bg-slate-800/80',
            hover: 'hover:bg-slate-800/90',
            disabled: 'disabled:bg-slate-700 disabled:cursor-not-allowed',
        },
    };

    const colors = palette[variant] || palette.emerald;

    // If a custom className is provided, skip default color classes to avoid Tailwind conflicts
    const colorClasses = className ? '' : `${colors.base} ${colors.hover} ${colors.disabled}`;

    return (
        <button
            type="submit"
            disabled={pending}
            className={`${colorClasses} text-white disabled:text-gray-200 px-4 py-2 rounded-md block w-full flex items-center justify-center gap-2 cursor-pointer ${className}`}
        >
            {pending && <span>Saving...</span>}
            {!pending && children}
        </button>
    );
}