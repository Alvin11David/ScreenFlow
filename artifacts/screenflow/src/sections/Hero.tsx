import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getOS } from "@/lib/utils";

function useClientOS() {
  const [os, setOs] = useState<"mac" | "windows" | "linux" | null>(null);
  useEffect(() => { setOs(getOS()); }, []);
  return os;
}

const waveHeights = [30,55,42,78,52,68,38,88,62,48,72,44,82,58,36,68,52,76,43,62,88,48,66,38,77,57,52,71,43,82,34,64,50,74,45,60,85,48,66,40];

function ProductMockup() {
  const clips = [
    { name: "Intro.mp4", duration: "0:14", active: false, color: "#7c3aed" },
    { name: "Demo_v3.mp4", duration: "1:47", active: true,  color: "#0ea5e9" },
    { name: "Outro.mp4",  duration: "0:09", active: false, color: "#ec4899" },
  ];

  const codeLines = [
    { color: "#a78bfa", width: "55%", indent: 0 },
    { color: "#67e8f9", width: "72%", indent: 16 },
    { color: "#f9a8d4", width: "48%", indent: 32 },
    { color: "#86efac", width: "80%", indent: 16 },
    { color: "#a78bfa", width: "40%", indent: 16 },
    { color: "#67e8f9", width: "65%", indent: 0 },
    { color: "#fde68a", width: "58%", indent: 16 },
    { color: "#f9a8d4", width: "35%", indent: 32 },
  ];

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl" style={{ background: "#0d0f1a" }}>
      {/* ── Title bar ── */}
      <div className="flex items-center px-4 h-11 border-b border-white/[0.06]" style={{ background: "#13151f" }}>
        <div className="flex gap-1.5 mr-4 flex-shrink-0">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <span className="text-xs text-white/30 font-medium">ScreenFlow — Demo_v3.mp4</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md flex-shrink-0" style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.25)" }}>
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
          </span>
          <span className="text-[10px] font-bold text-red-400">REC  00:01:47</span>
        </div>
      </div>

      {/* ── Three-column body ── */}
      <div className="flex" style={{ height: "280px" }}>
        {/* Left: clips list */}
        <div className="w-44 flex-shrink-0 flex flex-col gap-1 p-2.5 border-r border-white/[0.06]" style={{ background: "#111320" }}>
          <p className="text-[9px] font-semibold uppercase tracking-widest text-white/25 px-1 mb-1">Clips</p>
          {clips.map((clip) => (
            <div
              key={clip.name}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-all"
              style={clip.active ? { background: "rgba(124,58,237,0.18)", border: "1px solid rgba(124,58,237,0.3)" } : { border: "1px solid transparent" }}
            >
              <div className="w-9 h-6 rounded flex-shrink-0 flex items-center justify-center" style={{ background: clip.color + "33" }}>
                <div className="w-0 h-0" style={{ borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: `6px solid ${clip.color}` }} />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] font-medium truncate" style={{ color: clip.active ? "#e2e8f0" : "rgba(255,255,255,0.45)" }}>{clip.name}</p>
                <p className="text-[9px]" style={{ color: "rgba(255,255,255,0.25)" }}>{clip.duration}</p>
              </div>
            </div>
          ))}

          <div className="mt-auto p-2 rounded-xl" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}>
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-3.5 h-3.5 rounded flex items-center justify-center" style={{ background: "rgba(124,58,237,0.4)" }}>
                <span className="text-[7px]">✦</span>
              </div>
              <span className="text-[9px] font-bold" style={{ color: "#a78bfa" }}>AI Polish</span>
            </div>
            <p className="text-[9px]" style={{ color: "rgba(255,255,255,0.35)" }}>14 silences removed</p>
            <div className="mt-1.5 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(to right, #7c3aed, #0ea5e9)" }}
                initial={{ width: "0%" }}
                whileInView={{ width: "78%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.8 }}
              />
            </div>
          </div>
        </div>

        {/* Center: preview canvas */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden" style={{ background: "#0a0c16" }}>
          {/* Ambient glow behind content */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(124,58,237,0.08) 0%, transparent 60%)" }} />

          {/* Fake app window being recorded */}
          <div className="relative w-4/5 h-[200px] rounded-xl overflow-hidden shadow-2xl" style={{ background: "#1a1d2e", border: "1px solid rgba(255,255,255,0.08)" }}>
            {/* mini titlebar */}
            <div className="flex items-center gap-1 px-3 h-7 border-b" style={{ borderColor: "rgba(255,255,255,0.06)", background: "#1e2133" }}>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full" style={{ background: "#ff5f57" }} />
                <div className="w-2 h-2 rounded-full" style={{ background: "#ffbd2e" }} />
                <div className="w-2 h-2 rounded-full" style={{ background: "#28c840" }} />
              </div>
              <div className="flex-1 mx-3 h-3.5 rounded" style={{ background: "rgba(255,255,255,0.06)" }} />
            </div>
            {/* code content */}
            <div className="p-4 space-y-2">
              {codeLines.map((line, i) => (
                <div key={i} className="flex items-center gap-2" style={{ paddingLeft: line.indent }}>
                  <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 9, width: 12, flexShrink: 0 }}>{i + 1}</span>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: line.width }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 + i * 0.07 }}
                    style={{ height: 6, borderRadius: 3, background: line.color + "55", flexShrink: 0 }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Webcam PiP bubble */}
          <div className="absolute bottom-3 right-3 w-14 h-14 rounded-full overflow-hidden shadow-xl flex-shrink-0" style={{ border: "2px solid rgba(255,255,255,0.15)", background: "linear-gradient(135deg, #7c3aed 0%, #0ea5e9 100%)" }}>
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-6 h-6 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
            </div>
          </div>
        </div>

        {/* Right: properties */}
        <div className="w-40 flex-shrink-0 p-3 flex flex-col gap-3 border-l border-white/[0.06]" style={{ background: "#111320" }}>
          <p className="text-[9px] font-semibold uppercase tracking-widest text-white/25">Properties</p>

          {[
            { label: "Volume", value: "100%", pct: 100 },
            { label: "Zoom",   value: "1.2×",  pct: 60 },
            { label: "Speed",  value: "1.0×",  pct: 50 },
          ].map((p) => (
            <div key={p.label}>
              <div className="flex justify-between mb-1">
                <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.4)" }}>{p.label}</span>
                <span className="text-[9px] font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>{p.value}</span>
              </div>
              <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div className="h-full rounded-full" style={{ width: `${p.pct}%`, background: "linear-gradient(to right, #7c3aed, #0ea5e9)" }} />
              </div>
            </div>
          ))}

          <div className="mt-1 space-y-1.5">
            <p className="text-[9px] font-semibold uppercase tracking-widest text-white/25">Export</p>
            {["MP4 (H.265)", "WebM", "GIF"].map((fmt, i) => (
              <div key={fmt} className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg" style={{ background: i === 0 ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.04)", border: i === 0 ? "1px solid rgba(124,58,237,0.3)" : "1px solid transparent" }}>
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: i === 0 ? "#a78bfa" : "rgba(255,255,255,0.2)" }} />
                <span className="text-[9px]" style={{ color: i === 0 ? "#c4b5fd" : "rgba(255,255,255,0.35)" }}>{fmt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="px-4 py-3 border-t border-white/[0.06]" style={{ background: "#0f1119" }}>
        {/* Playback controls */}
        <div className="flex items-center gap-3 mb-2.5">
          <div className="flex items-center gap-2">
            <button className="text-white/30 hover:text-white/60 transition-colors text-xs">⏮</button>
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #7c3aed, #0ea5e9)" }}>
              <div className="w-0 h-0 ml-0.5" style={{ borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: "6px solid white" }} />
            </div>
            <button className="text-white/30 hover:text-white/60 transition-colors text-xs">⏭</button>
          </div>
          <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>01:47 / 02:47</span>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-16 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
              <div className="h-full rounded-full" style={{ width: "63%", background: "rgba(255,255,255,0.3)" }} />
            </div>
            <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.3)" }}>vol</span>
          </div>
        </div>

        {/* Waveform */}
        <div className="flex items-end gap-[2px] h-10 w-full">
          {waveHeights.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-[1px]"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.012 }}
              style={{
                height: `${h}%`,
                transformOrigin: "bottom",
                background: i / waveHeights.length < 0.63
                  ? `linear-gradient(to top, #7c3aed, #0ea5e9)`
                  : "rgba(255,255,255,0.1)",
                opacity: i / waveHeights.length < 0.63 ? 0.85 : 0.4,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          {/* Announcement badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            ScreenFlow 2.0 is now live
          </div>

          {/* Hero headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b dark:from-white dark:to-white/50 from-foreground to-foreground/60">
            Record at the speed <br className="hidden md:block" /> of thought.
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            The beautiful, impossibly fast screen recorder for teams who care about craft. No more clunky software.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              data-testid="button-download-mac"
              onClick={() => {
                window.open("https://drive.google.com/file/d/1jfcLFfD39XIuFoYtV6-fFP_C8NvHHtEa/view?usp=sharing", "_blank", "noopener,noreferrer");
                window.location.href = "/thanks";
              }}
              className="btn-glow rounded-full px-8 h-14 text-base gap-2 w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90 transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              Download for {getOS() === "mac" ? "Mac" : getOS() === "windows" ? "Windows" : "Linux"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              data-testid="button-watch-film"
              onClick={() => { window.location.href = "/#testimonials"; }}
              className="rounded-full px-8 h-14 text-base gap-2 w-full sm:w-auto border-foreground/20 dark:border-white/20 hover:bg-muted dark:hover:bg-white/5 bg-transparent text-foreground transition-all duration-300"
            >
              <Play className="w-5 h-5" />
              Watch the film
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Also available for Windows and Linux. Free to start.
          </p>
        </motion.div>

        {/* Product mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 relative max-w-5xl mx-auto"
        >
          {/* Floating stat cards */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 md:-left-10 top-1/3 z-20 hidden sm:block"
          >
            <div className="backdrop-blur-xl rounded-2xl p-3.5 shadow-xl w-44 bg-card/95 border border-border">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                </span>
                <span className="text-xs font-semibold text-foreground">REC 00:12:47</span>
              </div>
              <p className="text-xs text-muted-foreground">4K · 60fps · 0% CPU drop</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -right-4 md:-right-10 top-1/4 z-20 hidden sm:block"
          >
            <div className="backdrop-blur-xl rounded-2xl p-3.5 shadow-xl w-48 bg-card/95 border border-border">
              <p className="text-xs font-semibold text-muted-foreground mb-1.5">AI silences removed</p>
              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 rounded-full overflow-hidden bg-muted/80">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(to right, #7c3aed, #0ea5e9)" }}
                    initial={{ width: "0%" }}
                    animate={{ width: "78%" }}
                    transition={{ duration: 2, delay: 1.5 }}
                  />
                </div>
                <span className="text-xs font-bold text-violet-500 dark:text-violet-400">78%</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -right-4 md:-right-8 bottom-1/4 z-20 hidden sm:block"
          >
            <div className="backdrop-blur-xl rounded-2xl p-3.5 shadow-xl bg-card/95 border border-border">
              <p className="text-xs text-muted-foreground mb-1">Link copied</p>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full flex items-center justify-center bg-green-500/15">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                <span className="text-xs font-semibold text-foreground">screenflow.io/r/xK9p</span>
              </div>
            </div>
          </motion.div>

          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

          {/* Glow beneath the mockup */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-20 rounded-full pointer-events-none" style={{ background: "hsl(263 70% 60% / 0.2)", filter: "blur(40px)" }} />

          <ProductMockup />
        </motion.div>
      </div>
    </section>
  );
}
