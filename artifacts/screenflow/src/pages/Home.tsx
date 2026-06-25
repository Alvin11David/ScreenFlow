import { Navbar } from "@/sections/Navbar";
import { Hero } from "@/sections/Hero";
import { SocialProof } from "@/sections/SocialProof";
import { Features } from "@/sections/Features";
import { ProductShowcase } from "@/sections/ProductShowcase";
import { Testimonials } from "@/sections/Testimonials";
import { Pricing } from "@/sections/Pricing";
import { FAQ } from "@/sections/FAQ";
import { Blog } from "@/sections/Blog";
import { DownloadSection } from "@/sections/Download";
import { Footer } from "@/sections/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { motion, useScroll } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden selection:bg-primary/30">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-cyan-400 to-primary origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Grain texture overlay */}
      <div className="grain-overlay dark:opacity-[0.028] opacity-[0.018]" aria-hidden="true" />

      {/* Animated gradient mesh background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div
          className="orb-1 absolute rounded-full"
          style={{
            top: "-15%",
            left: "-5%",
            width: "55vw",
            height: "55vw",
            background: "radial-gradient(circle, hsl(263 70% 60% / 0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="orb-2 absolute rounded-full"
          style={{
            top: "35%",
            right: "-10%",
            width: "45vw",
            height: "45vw",
            background: "radial-gradient(circle, hsl(199 89% 58% / 0.12) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        <div
          className="orb-3 absolute rounded-full"
          style={{
            bottom: "10%",
            left: "25%",
            width: "40vw",
            height: "40vw",
            background: "radial-gradient(circle, hsl(263 70% 40% / 0.1) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="relative z-10">
        <CommandPalette />
        <Navbar />
        <Hero />
        <SocialProof />
        <Features />
        <ProductShowcase />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Blog />
        <DownloadSection />
        <Footer />
      </div>
    </main>
  );
}
