import { Features } from "@/components/my_components/homepage/features";
import Hero from "@/components/my_components/homepage/hero";
import { FinalCTA } from "@/components/my_components/homepage/homeCTA";
import { HowItWorks } from "@/components/my_components/homepage/howItWorks";
import { PricingTeaser } from "@/components/my_components/homepage/pricingTeaser";
import { ProblemSolution } from "@/components/my_components/homepage/problemSolution";
import { ProductPreview } from "@/components/my_components/homepage/productPreview";
import SocialProof from "@/components/my_components/homepage/socialProof";

export default function Home() {
  return (
    <div>
      <Hero />
      <SocialProof />
      <ProblemSolution />
      <Features />
      <HowItWorks />
      <ProductPreview />
      <PricingTeaser />
      <FinalCTA />

    </div>
  );
}
