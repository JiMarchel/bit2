import Silk from "#/components/silk";

const cards = [
    {
        title: "Faster & Safe Trade Execution",
        description: "In the fast-paced world of trading, every second counts. At Agile Market, we understand the importance of speed and efficiency in executing trades. That's why we've invested in cutting-edge technology and infrastructure to ensure our clients experience the fastest trade execution possible.",
        icon: "/icon/Faster-&-Safe-Trade-Execution.png"
    },
    {
        title: "User Friendly For New Users",
        description: "At Agile Market, we believe that trading should be accessible to everyone, regardless of their experience level. That's why our platform is designed to be user-friendly and intuitive, making it easy for new users to get started and succeed in the trading world.",
        icon: "/icon/User-Friendly-For-New-Users.png"
    },
    {
        title: "Effecient And Fast Trading",
        description: "Their attention to detail and commitment to delivering a user-friendly platform was evident throughout the project. The system has streamlined our operations and enhanced our clients' event experiences.",
        icon: "/icon/Effecient-And-Fast-Trading.png"
    },
    {
        title: "Instan And Timely Deposits",
        description: "They delivered an exceptional custom software solution. The system has significantly increased our productivity and reduced manual errors. SquareUp's expertise and professionalism have made them a trusted technology partner.",
        icon: "/icon/Instan-And-Timely-Deposits.png"
    }
];

export function WhyUs() {
    return (
        <section>
            <div className="relative flex min-h-80 items-center justify-center overflow-hidden px-6">
                <div className="absolute inset-0">
                    <Silk
                        speed={10}
                        scale={1}
                        color="#001415"
                        noiseIntensity={0}
                        rotation={0}
                    />
                </div>
                <div className="relative z-10 text-center ">
                    <p className="mx-auto mb-5 max-w-xl font-bold text-white md:text-lg">
                        WHY WE ARE BEST
                    </p>
                    <h2 className="text-3xl font-bold text-white md:text-4xl">
                        Global Markets At Your Fingertips
                    </h2>
                </div>
            </div>

            <div className="bg-[#111111] border-y border-white/5">
                <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className={`p-10 md:p-16 flex flex-col gap-6 ${
                                index === 0 ? "border-b border-white/10 md:border-r" :
                                index === 1 ? "border-b border-white/10" :
                                index === 2 ? "border-b border-white/10 md:border-b-0 md:border-r" :
                                ""
                            }`}
                        >
                            <div className="w-16 h-16 shrink-0">
                                <img
                                    src={card.icon}
                                    alt={card.title}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <h3 className="text-xl md:text-2xl font-semibold text-primary">
                                {card.title}
                            </h3>
                            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
