import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Zap, Shield, Globe } from "lucide-react";

const floatingCards = [
  {
    icon: Zap,
    label: "Export speed",
    value: "2.3x faster",
    sub: "vs. industry avg.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    pos: "top-[15%] -left-4 md:-left-16",
    delay: 0,
  },
  {
    icon: Shield,
    label: "Privacy",
    value: "100% local AI",
    sub: "Your data stays yours",
    color: "text-green-400",
    bg: "bg-green-500/10",
    pos: "bottom-[20%] -left-4 md:-left-20",
    delay: 1,
  },
  {
    icon: Globe,
    label: "Share reach",
    value: "180+ countries",
    sub: "Instant CDN delivery",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    pos: "top-[10%] -right-4 md:-right-16",
    delay: 0.5,
  },
];

export function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const rotateX = useTransform(scrollYProgress, [0, 0.4, 1], [12, 0, -8]);

  return (
    <section ref={containerRef} className="py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest uppercase text-primary mb-4"
          >
            The experience
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-foreground"
          >
            Every pixel, on purpose.
          </motion.h2>
        </div>

        {/* 3D mockup area */}
        <div className="relative max-w-5xl mx-auto" style={{ perspective: "2000px" }}>
          {/* Floating stat cards */}
          {floatingCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                animate={{ y: [0, card.delay % 2 === 0 ? -10 : 10, 0] }}
                transition={{ duration: 4 + card.delay, repeat: Infinity, ease: "easeInOut", delay: card.delay }}
                className={`absolute ${card.pos} z-20 hidden md:block`}
              >
                <div className="bg-card/95 backdrop-blur-xl border border-border rounded-2xl p-4 shadow-2xl shadow-primary/10 w-48">
                  <div className={`inline-flex w-8 h-8 rounded-lg ${card.bg} items-center justify-center mb-2`}>
                    <Icon className={`w-4 h-4 ${card.color}`} />
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">{card.label}</p>
                  <p className="font-bold text-foreground">{card.value}</p>
                  <p className="text-xs text-muted-foreground">{card.sub}</p>
                </div>
              </motion.div>
            );
          })}

          {/* Main mockup */}
          <motion.div
            style={{ y, rotateX }}
            className="relative rounded-2xl border border-border dark:border-white/10 shadow-2xl shadow-primary/10 bg-card overflow-hidden"
          >
            {/* Toolbar */}
            <div className="h-10 bg-muted/50 dark:bg-white/5 flex items-center px-4 gap-2 border-b border-border dark:border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <div className="w-3 h-3 rounded-full bg-green-400/80" />
              <div className="flex-1 mx-6 h-5 rounded bg-muted/80 dark:bg-white/5 flex items-center px-3">
                <span className="text-[10px] text-muted-foreground">app.screenflow.io/record</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-red-500/10 border border-red-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-[10px] font-semibold text-red-500">REC</span>
              </div>
            </div>

            <img
              src="/images/hero-mockup.png"
              alt="ScreenFlow in action"
              className="w-full h-auto opacity-90 dark:opacity-80"
            />

            {/* Bottom timeline bar */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent flex items-end pb-3 px-6">
              <div className="w-full h-2 rounded-full bg-muted/80 dark:bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "67%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Bottom glow */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/20 blur-[60px] rounded-full pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
