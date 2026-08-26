import { Button } from "@/shared/ui/button";
import { Link } from "@tanstack/react-router";

export function Footer() {
    return (
        <footer className="bg-[#18181b] text-white pt-16 pb-8 px-6 md:px-10 border-t border-white/10">
            <div className="mx-auto max-w-7xl">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-10 md:gap-0">
                    <div className="flex flex-col items-start">
                        <img
                            src="/logo.png"
                            alt="Agl Market"
                            className="w-20 h-auto mb-8 object-contain object-top-left"
                        />

                        <p className="max-w-xs text-white/90 text-sm font-medium mb-6">
                            Trading With Agl Market: spreads<br />
                            starting at 0.5, minimum deposit of $10.
                        </p>

                        <div className="flex flex-col gap-1.5 font-semibold">
                            <a href="mailto:support@aglarea.com" className="hover:text-primary transition-colors text-sm">support@aglarea.com</a>
                            <a href="tel:+180098765432" className="hover:text-primary transition-colors text-sm">+1 800.98.76.5432</a>
                        </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-10 w-full md:w-auto">
                        {/* Social & App Icons */}
                        <div className="flex flex-wrap gap-4 md:gap-16">
                            <div className="flex flex-wrap gap-2.5">
                                <Button className="hover:bg-secondary bg-secondary h-fit p-2">
                                    <img src="/icon/facebook.png" alt="Facebook" className="w-10 h-10 object-contain" />
                                </Button>
                                <Button className="hover:bg-secondary bg-secondary h-fit p-2">
                                    <img src="/icon/twitter.png" alt="Twitter" className="w-10 h-10 object-contain" />
                                </Button>
                                <Button className="hover:bg-secondary bg-secondary h-fit p-2">
                                    <img src="/icon/instram.png" alt="Instagram" className="w-10 h-10 object-contain" />
                                </Button>
                                <Button className="hover:bg-secondary bg-secondary h-fit p-2">
                                    <img src="/icon/youtube.png" alt="YouTube" className="w-10 h-10 object-contain" />
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2.5">
                                <Button className="hover:bg-secondary bg-secondary h-fit p-2">
                                    <img src="/icon/mac-os-logo.png" alt="Apple" className="w-10 h-10 object-contain" />
                                </Button>
                                <Button className="hover:bg-secondary bg-secondary h-fit p-2">
                                    <img src="/icon/playstore.png" alt="Play Store" className="w-10 h-10 object-contain" />
                                </Button>
                                <Button className="hover:bg-secondary bg-secondary h-fit p-2">
                                    <img src="/icon/android.png" alt="Android" className="w-10 h-10 object-contain" />
                                </Button>
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <div className="grid grid-cols-2 gap-8 md:gap-32 text-left w-full md:w-auto">
                            <div className="flex flex-col gap-4">
                                <h4 className="text-xl font-bold">Trading</h4>
                                <ul className="flex flex-col gap-2.5 text-[13px] text-white/60">
                                    <li><a href="#" className="hover:text-primary flex items-center gap-1.5"><span className="text-white/40 text-[8px]">▶</span> Trading Account Type</a></li>
                                    <li><a href="#" className="hover:text-primary flex items-center gap-1.5"><span className="text-white/40 text-[8px]">▶</span> Deposit & Withdrawal</a></li>
                                    <li><a href="#" className="hover:text-primary flex items-center gap-1.5"><span className="text-white/40 text-[8px]">▶</span> Instrument Trading</a></li>
                                    <li><a href="#" className="hover:text-primary flex items-center gap-1.5"><span className="text-white/40 text-[8px]">▶</span> Platform Trading</a></li>
                                    <li><a href="#" className="hover:text-primary flex items-center gap-1.5"><span className="text-white/40 text-[8px]">▶</span> Education Trading</a></li>
                                </ul>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h4 className="text-xl font-bold">Company</h4>
                                <ul className="flex flex-col gap-2.5 text-[13px] text-white/60">
                                    <li><Link to="/about-us" className="hover:text-primary flex items-center gap-1.5"><span className="text-white/40 text-[8px]">▶</span> About Us</Link></li>
                                    <li><a href="#" className="hover:text-primary flex items-center gap-1.5"><span className="text-white/40 text-[8px]">▶</span> Regulation</a></li>
                                    <li><a href="#" className="hover:text-primary flex items-center gap-1.5"><span className="text-white/40 text-[8px]">▶</span> Contact Us</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Risk Disclosure Section */}
                <div className="flex flex-col gap-3 mb-10 pt-8 border-t border-white/5">
                    <h4 className="text-[17px] font-bold">Risk Disclosure</h4>
                    <p className="text-white/50 text-[13px] leading-relaxed text-justify md:text-left pr-0 md:pr-20">
                        All financial products traded on margin carry a high level of risk to your capital. These products are not suitable for all investors, and you may lose more than your initial deposit. Ensure you fully understand the risks and seek independent advice if necessary. For further information, please see our full Risk Statement, Terms of Business, and Privacy Policy. Please see our official documents for more information.
                    </p>
                </div>

                {/* Bottom Footer */}
                <div className="pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-white/80 text-[13px]">
                    <p>Privacy Policy . Terms of Service. Risk Disclosure</p>
                </div>
            </div>
        </footer>
    );
}