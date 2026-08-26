import { Button } from "@/shared/ui/button";

export function Transaction() {
    return (
        <section className="bg-[#EBEBEB] w-full pt-24 pb-20 px-6 flex flex-col items-center">

            {/* Top Content */}
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-12">
                <div className="bg-primary text-black text-sm md:text-[15px] font-bold px-6 py-2 rounded-full mb-6 inline-block shadow-sm">
                    Deposit & Withdrawal
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-6 tracking-tight">
                    Easy Funding, Secure Withdrawals
                </h2>
                <p className="text-[#555] text-sm md:text-[15px] font-medium leading-relaxed max-w-3xl">
                    At AGL Markets, we understand that the ability to easily deposit and withdraw funds is a vital aspect of your trading journey. AGL Markets charges $0 for all deposit methods allowing you to put the savings back into your trading bankroll.
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto mb-14">
                {/* Deposit Card */}
                <div className="bg-[#001415] rounded-xl p-8 md:p-12 flex flex-col items-start shadow-xl h-fit">
                    <h3 className="text-white text-3xl md:text-[40px] font-bold mb-6 tracking-tight">Deposit</h3>
                    <p className="text-[#9ea3a1] text-[15px] leading-relaxed mb-10 font-medium">
                        At AGL Markets, we understand that the ability to easily deposit and withdraw funds is a vital aspect of your trading journey. AGL Markets charges $0 for all deposit methods allowing you to put the savings back into your trading bankroll.
                    </p>
                    <div className="mt-auto">
                        <Button className="bg-primary hover:bg-primary/90 text-black font-extrabold px-8 py-6 rounded-full text-base">
                            Go To Client Area
                        </Button>
                    </div>
                </div>

                {/* Withdrawal Card */}
                <div className="bg-[#001415] rounded-xl p-8 md:p-12 flex flex-col items-start shadow-xl">
                    <h3 className="text-white text-3xl md:text-[40px] font-bold mb-6 tracking-tight">Withdrawal</h3>
                    <p className="text-[#9ea3a1] text-[15px] leading-relaxed mb-10 font-medium">
                        To initiate a withdrawal, please log in to your account and visit the Withdrawal section. Our intuitive interface will guide you through selecting your preferred method and entering required details. For your security, we only process withdrawals to accounts that match your registered trading name. This important measure helps protect your funds from unauthorised access. We offer multiple withdrawal options to suit your needs, ensuring you can retrieve your profits quickly and conveniently. Explore the options below and choose the method that best suits your needs.
                    </p>
                    <div className="mt-auto">
                        <Button className="bg-primary hover:bg-primary/90 text-black font-extrabold px-8 py-6 rounded-full text-base">
                            Go To Client Area
                        </Button>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
                <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
                    <div className="bg-[#D3D3D3] px-5 py-3.5 rounded-md text-black/90 font-bold text-sm md:text-[15px]">
                        Secure account matching
                    </div>
                    <div className="bg-[#D3D3D3] px-5 py-3.5 rounded-md text-black/90 font-bold text-sm md:text-[15px]">
                        Approval-first processing
                    </div>
                    <div className="bg-[#D3D3D3] px-5 py-3.5 rounded-md text-black/90 font-bold text-sm md:text-[15px]">
                        Flexible withdrawal options
                    </div>
                </div>
                <p className="text-[#555] text-[15px] font-medium text-center">
                    Note: Processing begins after internal approval of your withdrawal request.
                </p>
            </div>

        </section>
    );
}