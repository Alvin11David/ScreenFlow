import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useGetStats } from "@workspace/api-client-react";

const fallbackStats = {
  activeUsers: 500,
  videosCreated: 10,
  appStoreRating: 4.9,
  countries: 180,
};

const logos = [
  "Vercel", "Linear", "Raycast", "Framer", "Stripe",
  "Notion", "Figma", "Loom", "Arc", "Clerk",
];

const statConfig = [
  { key: "activeUsers" as const, suffix: "K+", label: "Active users", decimals: 0 },
  { key: "videosCreated" as const, suffix: "M+", label: "Videos created", decimals: 0 },
  { key: "appStoreRating" as const, suffix: "", label: "App Store rating", decimals: 1 },
  { key: "countries" as const, suffix: "+", label: "Countries", decimals: 0 },
];

function CountUp({ target, suffix, decimals }: { target: number; suffix: string; decimals: number }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {decimals > 0 ? current.toFixed(decimals) : Math.floor(current)}
      {suffix}
    </span>
  );
}

export function SocialProof() {
  const { data: statsData } = useGetStats();
  const stats =
    statsData && typeof statsData === "object" ? statsData : fallbackStats;

  return (
    <section className="py-20 border-y border-border bg-muted/20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {statConfig.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                <CountUp target={stats[stat.key]} suffix={stat.suffix} decimals={stat.decimals} />
              </div>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mb-8 font-semibold tracking-widest uppercase">
          Trusted by craft-obsessed teams at
        </p>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }} />

          <div className="flex overflow-hidden">
            <motion.div
              className="flex shrink-0 gap-16 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 25, ease: "linear", repeat: Infinity }}
            >
              {[...logos, ...logos].map((logo, i) => (
                <div
                  key={`${logo}-${i}`}
                  className="text-xl font-bold tracking-tight text-muted-foreground/50 hover:text-muted-foreground transition-colors duration-300 whitespace-nowrap select-none"
                >
                  {logo}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
