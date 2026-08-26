import { AccountTypes } from './account-types';
import { Hero } from './hero';
import { MarketsToday } from './markets-today';
import { RegisterNow } from './register-now';
import { Services } from './services';
import { WhyUs } from './why-us';

export function HomePage() {
  return (
    <>
      <Hero />
      <MarketsToday />
      <Services />
      <AccountTypes />
      <WhyUs />
      <RegisterNow />
    </>
  );
}
