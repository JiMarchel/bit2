import { Check } from "lucide-react";

export function Header() {
    return (
        <section className="bg-muted-3 min-h-screen w-full flex items-center justify-center p-6 pt-24 lg:p-12">
            <div className="w-full max-w-7xl mx-auto bg-[#E8E9EC] rounded-[40px] p-10 lg:p-16 flex flex-col lg:flex-row items-center gap-10 shadow-2xl relative">
                
                {/* Left Content */}
                <div className="flex-1 flex flex-col gap-8 z-10">
                    <h1 className="text-[40px] lg:text-[56px] leading-[1.1] font-extrabold text-[#111] max-w-xl">
                        Powerful Trading <br />
                        <span className="relative inline-block">
                            <span className="relative z-10">Platforms</span>
                            <span className="absolute left-0 bottom-2 w-full h-2 bg-[#2D9BFC] z-0"></span>
                        </span> for <span className="relative inline-block">
                            <span className="relative z-10">Every</span>
                            <span className="absolute left-0 bottom-2 w-full h-2 bg-[#2D9BFC] z-0"></span>
                        </span> <br />
                        <span className="relative inline-block">
                            <span className="relative z-10">Trader</span>
                            <span className="absolute left-0 bottom-2 w-full h-2 bg-[#2D9BFC] z-0"></span>
                        </span>
                    </h1>

                    <div className="bg-[#111] text-white rounded-xl px-7 py-4 flex items-center gap-4 w-fit shadow-xl mt-2">
                        <div className="bg-white rounded-full p-1 text-black flex items-center justify-center">
                            <Check className="w-7 h-7 stroke-3" />
                        </div>
                        <span className="text-3xl font-bold tracking-wide">Metatrader 5</span>
                    </div>

                    <p className="text-[#555] text-[17px] max-w-md leading-relaxed mt-2 font-medium">
                        Denouncing pleasure and praising pain was born and will give complete account of the system and expound.
                    </p>

                    <div className="flex flex-col gap-4 mt-6">
                        <FeatureItem text="Extensive Technical Indicators" />
                        <FeatureItem text="Automated Trading with Expert Advisors" />
                        <FeatureItem text="Low Resource Requirements" />
                    </div>
                </div>

                {/* Right Content */}
                <div className="flex-1 relative w-full flex items-center justify-center min-h-100 lg:min-h-125">
                    <img 
                        src="/Double-Phone.webp" 
                        alt="Double Phones" 
                        className="w-full h-auto max-w-162.5 object-contain transform lg:scale-125 lg:translate-x-12 lg:-translate-y-4"
                    />
                </div>
            </div>
        </section>
    );
}

function FeatureItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-4 text-gray-700 text-lg">
            {/* Candlestick Icon SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black shrink-0">
                <rect x="4" y="8" width="5" height="10" rx="1" fill="currentColor" />
                <rect x="6" y="4" width="1" height="4" fill="currentColor" />
                <rect x="6" y="18" width="1" height="4" fill="currentColor" />
                <rect x="15" y="10" width="5" height="10" rx="1" fill="currentColor" />
                <rect x="17" y="6" width="1" height="4" fill="currentColor" />
                <rect x="17" y="20" width="1" height="3" fill="currentColor" />
            </svg>
            <span className="font-medium text-[#555] text-[17px]">{text}</span>
        </div>
    );
}