import { motion } from "framer-motion";
import { Play, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            ScreenFlow 2.0 is now live
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b dark:from-white dark:to-white/50 from-foreground to-foreground/60">
            Record at the speed <br className="hidden md:block" /> of thought.
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            The beautiful, impossibly fast screen recorder for teams who care about craft. No more clunky software.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              data-testid="button-download-mac"
              className="rounded-full px-8 h-14 text-base gap-2 w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90"
            >
              <Download className="w-5 h-5" />
              Download for Mac
            </Button>
            <Button
              size="lg"
              variant="outline"
              data-testid="button-watch-film"
              className="rounded-full px-8 h-14 text-base gap-2 w-full sm:w-auto border-border hover:bg-muted bg-transparent"
            >
              <Play className="w-5 h-5" />
              Watch the film
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Also available for Windows and Linux.
          </p>
        </motion.div>

        {/* Product Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 relative max-w-6xl mx-auto"
        >
          {/* Floating stat cards */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 md:-left-12 top-1/3 z-20 hidden sm:block"
          >
            <div className="bg-card/90 dark:bg-white/10 backdrop-blur-xl border border-border dark:border-white/10 rounded-2xl p-4 shadow-xl w-44">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
                <span className="text-xs font-semibold text-foreground">REC 00:12:47</span>
              </div>
              <p className="text-xs text-muted-foreground">4K · 60fps · 0% CPU drop</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -right-4 md:-right-12 top-1/4 z-20 hidden sm:block"
          >
            <div className="bg-card/90 dark:bg-white/10 backdrop-blur-xl border border-border dark:border-white/10 rounded-2xl p-4 shadow-xl w-48">
              <p className="text-xs font-semibold text-muted-foreground mb-1">AI silences removed</p>
              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "78%" }}
                    transition={{ duration: 2, delay: 1.5 }}
                  />
                </div>
                <span className="text-xs font-bold text-primary">78%</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -right-4 md:-right-10 bottom-1/4 z-20 hidden sm:block"
          >
            <div className="bg-card/90 dark:bg-white/10 backdrop-blur-xl border border-border dark:border-white/10 rounded-2xl p-4 shadow-xl">
              <p className="text-xs text-muted-foreground mb-1">Link copied</p>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                </div>
                <span className="text-xs font-semibold text-foreground">screenflow.io/r/xK9p</span>
              </div>
            </div>
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
          <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden border border-border dark:border-white/10 shadow-2xl shadow-primary/20 bg-card">
            <div className="absolute top-0 left-0 right-0 h-12 bg-muted/50 dark:bg-white/5 flex items-center px-4 gap-2 z-20 backdrop-blur-md border-b border-border dark:border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <div className="ml-4 flex-1 max-w-xs mx-auto h-6 rounded-full bg-muted/80 dark:bg-white/10 flex items-center justify-center">
                <span className="text-xs text-muted-foreground">screenflow.app</span>
              </div>
            </div>
            <img
              src="/images/hero-mockup.png"
              alt="ScreenFlow Interface"
              className="w-full h-auto object-cover opacity-90 pt-12"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
