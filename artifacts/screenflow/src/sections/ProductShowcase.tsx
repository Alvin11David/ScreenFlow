import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);

  return (
    <section ref={containerRef} className="py-32 perspective-[2000px] overflow-hidden hidden md:block">
      <div className="container mx-auto px-4">
        <motion.div
          style={{ y, rotateX }}
          className="relative max-w-5xl mx-auto rounded-xl border border-white/10 shadow-2xl bg-card overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-10 bg-white/5 flex items-center px-4 gap-2 border-b border-white/10">
            <div className="w-3 h-3 rounded-full bg-white/20" />
            <div className="w-3 h-3 rounded-full bg-white/20" />
            <div className="w-3 h-3 rounded-full bg-white/20" />
          </div>
          <img 
            src="/images/hero-mockup.png" 
            alt="Product Interaction" 
            className="w-full h-auto mt-10 opacity-80"
          />
          {/* Overlay elements */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}