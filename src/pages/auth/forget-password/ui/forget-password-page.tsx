import { ForgetPasswordForm } from "./forget-password-form";
import { HeadphonesIcon } from "lucide-react";

export function ForgetPasswordPage() {
    return (
        <div className="flex w-full min-h-screen bg-[#001415] relative items-center justify-center p-6">
            <ForgetPasswordForm />
            
            {/* We Are Here! floating badge */}
            <div className="absolute bottom-8 right-10 hidden md:flex items-center gap-3">
                <span className="text-white/80 text-sm font-medium">We Are Here!</span>
                <div className="bg-primary text-black p-2.5 rounded-full shadow-lg">
                    <HeadphonesIcon className="w-6 h-6" />
                </div>
            </div>
        </div>
    );
}
