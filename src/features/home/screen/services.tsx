import Silk from "#/components/silk";
import { Button } from "#/components/ui/button";

const services = [
  {
    icon: "/icon/brush.png",
    title: "Technical Analysis",
    description:
      "Find fault with a man who chooses to annoying consequences.",
  },
  {
    icon: "/icon/puzzle.png",
    title: "Trading Platforms",
    description:
      "Perfectly simple easy to distinguish. In a free hour, when our power.",
  },
  {
    icon: "/icon/electric.png",
    title: "Educational Resources",
    description:
      "Rejects pleasures to secure other great pleasures, or else he endures.",
  },
];

function ServiceIcon({ src }: { src: string }) {
  return (
    <Button className="relative size-12 overflow-hidden bg-muted-2 p-0 mb-2 hover:bg-muted-2">
      <span className="absolute -right-2 -top-2 h-1 w-10 rounded-full bg-primary blur-sm" />
      <span className="absolute -left-2 -bottom-2 h-1 w-10 rounded-full bg-primary blur-sm" />
      <img src={src} alt="" className="relative z-10 size-5" />
    </Button>
  );
}

function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="md:px-8">
      <ServiceIcon src={icon} />
      <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-white/60">{description}</p>
      <Button
        className="mt-7 w-full bg-muted-2 text-white rounded hover:bg-muted-2"
        size="lg"
      >
        Read More
      </Button>
    </div>
  );
}

export function Services() {
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
        <div className="relative z-10 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Services for Every Traders
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/60 md:text-lg">
            Discover the most competitive prices in the market, updated
            regularly for your advantage.
          </p>
        </div>
      </div>

      <div className="bg-muted-3 px-4 py-10 md:px-6 md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/10">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
