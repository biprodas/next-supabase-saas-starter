import { Hero } from "./_components/hero";
import { Features } from "./_components/features";
import { Pricing } from "./_components/pricing";
import { CtaBanner } from "./_components/cta-banner";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      <CtaBanner />
    </>
  );
}
