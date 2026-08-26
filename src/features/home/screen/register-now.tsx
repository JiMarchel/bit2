import Silk from "#/components/silk";
import { Button } from "#/components/ui/button";

export function RegisterNow() {
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
                    <h2 className="text-3xl font-bold text-white md:text-4xl">
                        Instant Account Opening & Funding Trade Within Minutes!
                    </h2>
                    <p className="mx-auto mt-5 max-w-xl font-base underline text-white/80 md:text-lg">
                        support@aglarea.com
                    </p>
                    <Button className="mt-10 rounded px-10 py-8" size="lg">Register Now</Button>
                </div>
            </div>
        </section>
    );
}