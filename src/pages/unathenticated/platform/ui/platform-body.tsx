import { Button } from "@/shared/ui/button";

export function PlatformBody() {
    return (
        <section className="flex flex-col w-full">
            {/* Top Section - Black Background */}
            <div className="bg-black text-white w-full px-6 py-16 lg:py-28 border-t border-white/5">
                <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                    {/* Left Content */}
                    <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <h2 className="text-4xl md:text-5xl lg:text-[64px] font-bold mb-6 tracking-tight">
                            MetaTrader 5 (MT5)
                        </h2>
                        <p className="text-white/70 text-base md:text-lg max-w-xl leading-relaxed mb-10 font-medium">
                            Whether you're a novice seeking straightforward trading or an experienced trader employing intricate strategies, MT5 caters to your trading requirements.
                        </p>

                        <img
                            src="/icon/LOGO-MT5.png"
                            alt="MT5 Logic"
                            className="w-48 h-auto lg:ml-20"
                        />
                    </div>

                    {/* Right Image */}
                    <div className="flex-1 w-full flex justify-center lg:justify-end relative">
                        <img
                            src="/LAPTOP.webp"
                            alt="Trading Platform on Laptop"
                            className="w-full max-w-175 h-auto object-contain transform lg:scale-110 lg:translate-y-8"
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Section - White Background */}
            <div className="bg-white w-full px-6 py-24 text-center flex flex-col items-center shadow-inner">
                <div className="bg-primary text-black text-sm md:text-base font-bold px-6 py-2.5 rounded-lg mb-8 inline-block shadow-sm">
                    Trade on MetaTrader 5 (MT5)
                </div>

                <h3 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-black mb-16 tracking-tight">
                    Download MetaTrader 5 today!
                </h3>

                <div className="flex flex-wrap justify-center gap-4 md:gap-6 w-full max-w-5xl">
                    <Button className="bg-[#0f0f0f] hover:bg-black text-white h-auto py-5 px-6 md:px-8 rounded-2xl flex items-center gap-3 text-lg md:text-xl font-medium w-full sm:w-auto shadow-xl transition-transform hover:-translate-y-1">
                        <WindowsIcon className="w-7 h-7 text-primary" />
                        Windows
                    </Button>
                    <Button className="bg-[#0f0f0f] hover:bg-black text-white h-auto py-5 px-6 md:px-8 rounded-2xl flex items-center gap-3 text-lg md:text-xl font-medium w-full sm:w-auto shadow-xl transition-transform hover:-translate-y-1">
                        <img src="/icon/mac-os-logo2.png" className="w-7 h-7 object-contain" alt="MacOS" />
                        MacOS
                    </Button>
                    <Button className="bg-[#0f0f0f] hover:bg-black text-white h-auto py-5 px-6 md:px-8 rounded-2xl flex items-center gap-3 text-lg md:text-xl font-medium w-full sm:w-auto shadow-xl transition-transform hover:-translate-y-1">
                        <img src="/icon/mac-os-logo.png" className="w-7 h-7 object-contain" alt="MacOS" />
                        iOS
                    </Button>
                    <Button className="bg-[#0f0f0f] hover:bg-black text-white h-auto py-5 px-6 md:px-8 rounded-2xl flex items-center gap-3 text-lg md:text-xl font-medium w-full sm:w-auto shadow-xl transition-transform hover:-translate-y-1">
                        <img src="/icon/android.png" className="w-7 h-7 object-contain" alt="Android" />
                        Android
                    </Button>
                </div>
            </div>
        </section>
    );
}

function WindowsIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M11.233 1.272L1.08 2.7v8.528h10.153V1.272zM23.01 0v10.978H12.308V1.121L23.01 0zM11.233 12.164H1.08v8.283l10.153 1.408v-9.691zM23.01 12.164v10.749l-10.702 1.48v-12.229H23.01z" />
        </svg>
    )
}