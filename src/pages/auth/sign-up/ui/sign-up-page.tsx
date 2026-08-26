import { SignUpForm } from "./sign-up-form";

export function SignUpPage() {
    return (
        <div className="flex w-full min-h-screen bg-[#041011]">
            {/* Left side Image */}
            <div className="hidden lg:flex flex-1 relative">
                <img 
                    src="/auth-image.webp" 
                    alt="Auth Background" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            {/* Right side Form */}
            <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
                <SignUpForm />
            </div>
        </div>
    );
}
