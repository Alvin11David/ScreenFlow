import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/utils";

export function DownloadSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-1/4 bottom-0 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto rounded-3xl border border-border bg-card/80 backdrop-blur-xl overflow-hidden"
        >
          {/* Top gradient bar */}
          <div className="h-1 w-full bg-gradient-to-r from-primary via-cyan-400 to-primary" />

          <div className="p-10 md:p-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-8 uppercase tracking-wide"
            >
              Free forever for basic use
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-foreground"
            >
              Ready to flow?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Join the creative professionals who have already made ScreenFlow their default recording tool.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-10"
            >
              <Button
                size="lg"
                data-testid="button-go-to-app-cta"
                onClick={() => {
                  window.open(APP_URL, "_blank", "noopener,noreferrer");
                }}
                className="rounded-full px-8 h-14 text-base gap-2 bg-foreground text-background hover:bg-foreground/90 transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5" />
                Go to ScreenFlow App
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground"
            >
              <span>No credit card required</span>
              <span className="hidden sm:block w-px h-4 bg-border" />
              <span>14-day free trial on Pro</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
