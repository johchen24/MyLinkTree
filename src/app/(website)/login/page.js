import LoginWithGoogle from "@/components/buttons/LoginWithGoogle";

export default function Login() {
    return(
        <div>
            <div className="p-4 max-w-xs mx-auto">
                <h1 className="text-4xl font-bold text-center mb-2">
                    Sign In
                </h1>
                <p className="text-center mb-6 text-gray-500">
                    Help your followers find everything you do, in one place. Get started below.
                </p>
                <LoginWithGoogle />
            </div>
            
        </div>
    );
}