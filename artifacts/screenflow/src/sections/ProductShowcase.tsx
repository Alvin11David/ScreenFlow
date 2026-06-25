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
            className="relative rounded-2xl border border-border shadow-2xl shadow-primary/10 overflow-hidden"
          >
            {/* CSS video share page mockup — always dark, like a real app window */}
            <div style={{ background: "#0d0f1a" }} className="w-full">
              {/* Title bar */}
              <div style={{ background: "#13151f", borderBottom: "1px solid rgba(255,255,255,0.06)" }} className="flex items-center px-4 h-10 gap-3">
                <div className="flex gap-1.5 flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)" }} className="flex-1 rounded h-5 mx-4 flex items-center px-3">
                  <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>screenflow.io/r/xK9p</span>
                </div>
                <div style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.25)" }} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md flex-shrink-0">
                  <span className="text-[10px] font-semibold" style={{ color: "#a78bfa" }}>Share</span>
                </div>
              </div>

              {/* Video player area */}
              <div style={{ background: "#000", height: 220, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(124,58,237,0.35) 0%, rgba(14,165,233,0.25) 60%, rgba(236,72,153,0.15) 100%)" }} />
                <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 30% 40%, rgba(124,58,237,0.2) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(14,165,233,0.15) 0%, transparent 50%)" }} />
                {/* Play button */}
                <div style={{ position: "relative", zIndex: 2, width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1.5px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <div style={{ width: 0, height: 0, marginLeft: 5, borderTop: "10px solid transparent", borderBottom: "10px solid transparent", borderLeft: "16px solid rgba(255,255,255,0.9)" }} />
                </div>
                {/* Duration badge */}
                <div style={{ position: "absolute", bottom: 12, right: 14, background: "rgba(0,0,0,0.55)", borderRadius: 4, padding: "2px 6px", fontSize: 11, fontFamily: "monospace", color: "rgba(255,255,255,0.85)", zIndex: 2 }}>2:47</div>
                {/* Chapter markers */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.08)", zIndex: 2 }}>
                  <motion.div initial={{ width: "0%" }} whileInView={{ width: "0%" }} viewport={{ once: true }} style={{ height: "100%", background: "linear-gradient(to right, #7c3aed, #0ea5e9)", borderRadius: 2 }} />
                </div>
              </div>

              {/* Info bar */}
              <div style={{ padding: "14px 20px 0", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.88)", marginBottom: 3 }}>ScreenFlow Product Demo v3</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Recorded today · 2:47</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                  <span>👁</span><span>247 views</span>
                </div>
              </div>

              {/* Reactions + comments */}
              <div style={{ padding: "12px 20px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {[{ emoji: "👍", count: 12 }, { emoji: "❤️", count: 8 }, { emoji: "🔥", count: 5 }].map((r) => (
                    <div key={r.emoji} style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 20, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 11 }}>
                      <span>{r.emoji}</span>
                      <span style={{ color: "rgba(255,255,255,0.5)" }}>{r.count}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { initials: "AK", color: "#7c3aed", text: "Great walkthrough! 🙌", time: "2m ago" },
                    { initials: "MJ", color: "#0ea5e9", text: "Can you share the source repo?", time: "5m ago" },
                  ].map((c) => (
                    <div key={c.initials} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                      <div style={{ width: 26, height: 26, borderRadius: "50%", background: c.color + "30", border: `1.5px solid ${c.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: c.color, fontWeight: 700, flexShrink: 0 }}>{c.initials}</div>
                      <div>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", lineHeight: 1.4 }}>{c.text}</div>
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>{c.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Bottom glow */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/20 blur-[60px] rounded-full pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
