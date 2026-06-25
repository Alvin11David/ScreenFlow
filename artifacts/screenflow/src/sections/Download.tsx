import { motion } from "framer-motion";
import { Download, Monitor, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DownloadSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto rounded-3xl border border-white/10 bg-white/5 p-12 md:p-20 backdrop-blur-xl"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to flow?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join the creative professionals who have already made ScreenFlow their default recording tool. Free forever for basic use.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 h-14 text-base bg-white text-black hover:bg-white/90 gap-2">
              <Apple className="w-5 h-5" />
              Download for Mac
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base border-white/10 hover:bg-white/5 gap-2 bg-transparent">
              <Monitor className="w-5 h-5" />
              Download for Windows
            </Button>
          </div>
          
          <p className="mt-8 text-sm text-muted-foreground">
            Requires macOS 11.0+ or Windows 10+. <a href="#" className="underline hover:text-white transition-colors">See full requirements</a>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}