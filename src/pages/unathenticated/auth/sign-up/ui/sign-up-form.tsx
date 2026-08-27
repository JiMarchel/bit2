import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Link } from "@tanstack/react-router";

export function SignUpForm() {
    return (
        <div className="flex flex-col w-full max-w-125">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-3 tracking-tight">Create Account</h1>
            <p className="text-gray-400 mb-10 text-sm md:text-base">All fields are required</p>

            <form className="flex flex-col gap-6 w-full">
                <div className="flex flex-col gap-2.5">
                    <Label htmlFor="fullname" className="text-white/90 text-sm md:text-base">Fullname</Label>
                    <Input id="fullname" placeholder="JohnDoe" className="bg-transparent border-white/20 text-white placeholder:text-white/30 h-11 md:h-12 rounded" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2.5">
                        <Label htmlFor="email" className="text-white/90 text-sm md:text-base">Email</Label>
                        <Input id="email" type="email" placeholder="aguunyourbae22@gmail.com" className="bg-[#0b282c] border-[#1f5f64] text-white placeholder:text-white/60 h-11 md:h-12 rounded" />
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <Label htmlFor="phone" className="text-white/90 text-sm md:text-base">Phone Number</Label>
                        <Input id="phone" type="tel" className="bg-white border-white text-black h-11 md:h-12 rounded" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2.5">
                        <Label htmlFor="password" className="text-white/90 text-sm md:text-base">Password</Label>
                        <Input id="password" type="password" className="bg-[#0b282c] border-[#1f5f64] text-white h-11 md:h-12 rounded" />
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <Label htmlFor="repeat-password" className="text-white/90 text-sm md:text-base">Repeat Password</Label>
                        <Input id="repeat-password" type="password" className="bg-white border-white text-black h-11 md:h-12 rounded" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2.5">
                        <Label htmlFor="country" className="text-white/90 text-sm md:text-base">Country</Label>
                        <Input id="country" placeholder="Pilih" className="bg-white border-white text-black h-11 md:h-12 placeholder:text-black/60 rounded" />
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <Label htmlFor="referral" className="text-white/90 text-sm md:text-base">Referral Code</Label>
                        <Input id="referral" placeholder="(Optional)" className="bg-white border-white text-black h-11 md:h-12 placeholder:text-black/60 rounded" />
                    </div>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-black font-semibold h-12 md:h-14 text-base mt-4 rounded-md">
                    + Create Account
                </Button>
            </form>

            <p className="text-center text-white/70 text-xs md:text-sm mt-8">
                Already have an account? <Link to="/sign-in" className="text-primary hover:underline">Sign In</Link>
            </p>
        </div>
    );
}
