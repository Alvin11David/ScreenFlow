import { motion } from "framer-motion";

const logos = [
  "Vercel", "Linear", "Raycast", "Framer", "Stripe",
  "Notion", "Figma", "Loom", "Arc", "Clerk",
];

const stats = [
  { value: "500K+", label: "Active users" },
  { value: "10M+", label: "Videos created" },
  { value: "4.9", label: "App Store rating" },
  { value: "180+", label: "Countries" },
];

function CountUp({ value }: { value: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-3xl md:text-4xl font-bold text-foreground"
    >
      {value}
    </motion.span>
  );
}

export function SocialProof() {
  return (
    <section className="py-20 border-y border-border bg-muted/20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <CountUp value={stat.value} />
              <p className="text-sm text-muted-foreground mt-1 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Logos marquee */}
        <p className="text-center text-xs text-muted-foreground mb-8 font-semibold tracking-widest uppercase">
          Trusted by craft-obsessed teams at
        </p>

        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background dark:from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background dark:from-background to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden">
            <motion.div
              className="flex shrink-0 gap-16 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 25, ease: "linear", repeat: Infinity }}
            >
              {[...logos, ...logos].map((logo, i) => (
                <div
                  key={`${logo}-${i}`}
                  className="text-xl font-bold tracking-tight text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-300 whitespace-nowrap select-none"
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
