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
    <main className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/30">
      {/* Global Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-cyan-400 to-primary origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />
      
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
    </main>
  );
}