import { Hero } from "./hero";
import { LiveMarkets } from "./markets-today";
import { Features } from "./services";
import { AccountTypes } from "./account-types";
import { Platforms } from "./why-us";
import { CallToAction } from "./register-now";

export function HomePage() {
  return (
    <>
      <Hero />
      <LiveMarkets />
      <Features />
      <AccountTypes />
      <Platforms />
      <CallToAction />
    </>
  );
}
