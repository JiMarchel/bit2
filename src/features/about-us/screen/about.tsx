import { Button } from "@/shared/ui/button";

export function About() {
    return (
        <section className="bg-[#EBEBEB] min-h-screen w-full pt-32 pb-20 px-6 flex flex-col items-center text-center">
            
            {/* Top Content */}
            <div className="max-w-5xl mx-auto mb-16">
                <h1 className="text-[32px] md:text-[42px] font-extrabold text-black mb-4 tracking-tight">
                    AGL Markets Partnership and Brokerage
                </h1>
                <p className="text-gray-700 text-sm md:text-[15px] max-w-4xl mx-auto leading-relaxed">
                    AGL Markets has a reputation as being one of the premier partnership platforms in the industry. Partners have worked with AGL Markets and formed long standing relationships. These relationships have been a central part to the success of our partners and of AGL Markets.
                </p>
            </div>

            {/* Central Card */}
            <div className="w-full max-w-4xl bg-linear-to-b from-[#F2F2F2] to-[#D0D0D0] p-10 md:p-16 mb-16 text-left shadow-sm">
                <div className="max-w-2xl mx-auto md:mx-0 md:ml-12">
                    <h2 className="text-3xl md:text-[44px] leading-tight font-extrabold text-black mb-8 tracking-tight">
                        Built for long-term growth
                    </h2>
                    
                    <div className="flex flex-col gap-6 text-gray-700 text-sm md:text-[15px] font-medium mb-10 max-w-lg leading-relaxed">
                        <p>
                            With a passion to provide high-quality financial brokerage service, AGL Markets was established to cater the trading software and best trading environment.
                        </p>
                        <p>
                            The long-run vision and deep client understanding are valued to be the highest strength at AGL Markets.
                        </p>
                    </div>
                    
                    <Button className="bg-primary hover:bg-primary/90 text-black font-bold rounded px-6 py-5 flex items-center gap-2 w-fit text-sm">
                        Explore Platforms <span className="text-[10px]">▶</span>
                    </Button>
                </div>
            </div>

            {/* Pills */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mb-12">
                <div className="bg-[#D6D6D6] px-5 py-3 rounded-md text-black/90 font-bold text-sm md:text-[15px]">
                    High-quality brokerage service
                </div>
                <div className="bg-[#D6D6D6] px-5 py-3 rounded-md text-black/90 font-bold text-sm md:text-[15px]">
                    Best trading environment
                </div>
                <div className="bg-[#D6D6D6] px-5 py-3 rounded-md text-black/90 font-bold text-sm md:text-[15px]">
                    Forex, CFD, Commodity, and stocks
                </div>
            </div>

            {/* Bottom Text */}
            <p className="text-gray-700 text-sm md:text-[15px] font-medium max-w-2xl mx-auto text-center leading-relaxed">
                Our team of industry experts strives to provide their valuable service for individuals and corporate to trade better in Forex, CFD, Commodity and the International stock market.
            </p>

        </section>
    );
}