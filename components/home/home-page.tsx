import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Advantages } from "@/components/home/advantages";
import { Agents } from "@/components/home/agents";
import { CeoShowcase } from "@/components/home/ceo-showcase";
import { ClosingCta } from "@/components/home/closing-cta";
import { Hero } from "@/components/home/hero";
import { Workflow } from "@/components/home/workflow";

export function HomePage() {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        <Agents />
        <CeoShowcase />
        <Workflow />
        <Advantages />
        <ClosingCta />
      </main>
      <Footer />
    </div>
  );
}
