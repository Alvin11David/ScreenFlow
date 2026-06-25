import { motion } from "framer-motion";
import { Play, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />

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
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Record at the speed <br className="hidden md:block" /> of thought.
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            The beautiful, impossibly fast screen recorder for teams who care about craft. No more clunky software.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 h-14 text-base bg-white text-black hover:bg-white/90 gap-2 w-full sm:w-auto">
              <Download className="w-5 h-5" />
              Download for Mac
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base border-white/10 hover:bg-white/5 gap-2 w-full sm:w-auto bg-transparent">
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
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 relative max-w-6xl mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
          <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-primary/20 bg-card">
            {/* Window controls */}
            <div className="absolute top-0 left-0 right-0 h-12 bg-white/5 flex items-center px-4 gap-2 z-20 backdrop-blur-md border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
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