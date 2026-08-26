import { Label } from "#/components/ui/label";
import { Input } from "#/components/ui/input";
import { Button } from "#/components/ui/button";
import { Link } from "@tanstack/react-router";
import { HeadphonesIcon } from "lucide-react";

export function SignInForm() {
    return (
        <div className="flex flex-col w-full max-w-112.5 relative">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-3 tracking-tight">Log In</h1>
            <p className="text-gray-400 mb-10 text-sm md:text-base">All fields are required</p>

            <form className="flex flex-col gap-6 w-full">
                <div className="flex flex-col gap-2.5">
                    <Label htmlFor="email" className="text-white/90 text-sm md:text-base font-semibold">Email Address</Label>
                    <Input id="email" type="email" placeholder="JohnDoe@gmail.com" className="bg-[#0b282c] border-[#1f5f64] text-white placeholder:text-white/60 h-11 md:h-12 rounded" />
                </div>

                <div className="flex flex-col gap-2.5">
                    <Label htmlFor="password" className="text-white/90 text-sm md:text-base font-semibold">Password</Label>
                    <Input id="password" type="password" placeholder="***********" className="bg-[#0b282c] border-[#1f5f64] text-white h-11 md:h-12 rounded placeholder:text-white/40 placeholder:tracking-widest" />
                </div>

                <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="remember" className="w-4 h-4 bg-[#0b282c] border-[#1f5f64] rounded text-primary focus:ring-primary focus:ring-offset-0 focus:ring-1" />
                        <Label htmlFor="remember" className="text-white/80 text-sm">Remember Me</Label>
                    </div>
                    <Link to="/forget-password" className="text-primary hover:underline text-sm font-medium">Forgot Password ?</Link>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-black font-semibold h-12 md:h-14 text-lg mt-4 rounded-md shadow-[0_0_15px_rgba(163,255,0,0.2)]">
                    Login
                </Button>
            </form>

            <p className="text-center text-white/70 text-xs md:text-sm mt-8">
                Don't have an account? <Link to="/sign-up" className="text-primary hover:underline font-medium">Sign Up</Link>
            </p>

            {/* We Are Here! floating badge (for desktop/tablet representation) */}
            <div className="absolute -bottom-32 -right-10 hidden md:flex items-center gap-3">
                <span className="text-white/80 text-sm font-medium">We Are Here!</span>
                <div className="bg-primary text-black p-2.5 rounded-full shadow-lg">
                    <HeadphonesIcon className="w-6 h-6" />
                </div>
            </div>
        </div>
    );
}