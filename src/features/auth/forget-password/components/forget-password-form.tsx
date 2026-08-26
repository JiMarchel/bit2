import { Label } from "#/components/ui/label";
import { Input } from "#/components/ui/input";
import { Button } from "#/components/ui/button";
import { Link } from "@tanstack/react-router";

export function ForgetPasswordForm() {
    return (
        <div className="flex flex-col items-center w-full max-w-[450px] relative text-center">
            <h1 className="text-white text-4xl md:text-[52px] font-bold mb-4 tracking-tight">Forgot Password</h1>
            <p className="text-gray-400 mb-10 text-sm md:text-base">Fill email field, we will send you link verification</p>

            <form className="flex flex-col gap-6 w-full text-left">
                <div className="flex flex-col gap-2.5">
                    <Label htmlFor="email" className="text-white/90 text-sm md:text-base font-semibold">Email Address</Label>
                    <Input id="email" type="email" placeholder="JohnDoe@gmail.com" className="bg-[#0b282c] border-[#1f5f64] text-white placeholder:text-white/60 h-11 md:h-12 rounded" />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-black font-semibold h-12 md:h-14 text-lg mt-4 rounded-md shadow-[0_0_15px_rgba(163,255,0,0.2)]">
                    Send Link
                </Button>
            </form>

            <p className="text-center text-white/70 text-xs md:text-sm mt-8">
                Don't have an account? <Link to="/sign-up" className="text-primary hover:underline font-medium">Sign Up</Link>
            </p>
        </div>
    );
}
