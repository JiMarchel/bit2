import { SignInForm } from "./sign-in-form";

export function SignInPage() {
    return (
        <div className="flex w-full min-h-screen bg-[#041011]">
            {/* Left side Image */}
            <div className="hidden lg:flex flex-1 relative">
                <img 
                    src="/auth-image.webp" 
                    alt="Auth Background" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
                <div className="absolute inset-0 flex flex-col justify-center p-12 lg:p-24 z-10 text-white">
                    <h2 className="text-5xl xl:text-6xl font-bold mb-4 tracking-tight drop-shadow-lg">Welcome back!</h2>
                    <p className="text-lg xl:text-xl text-white/90 max-w-md drop-shadow-md leading-relaxed font-medium">
                        We are glad to see you again! Get access to your Orders, Wishlist and Recommendations.
                    </p>
                </div>
            </div>

            {/* Right side Form */}
            <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
                <SignInForm />
            </div>
        </div>
    );
}