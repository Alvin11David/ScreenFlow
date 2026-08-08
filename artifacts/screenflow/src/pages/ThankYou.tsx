import { motion } from "framer-motion";
import { CheckCircle, Download, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Navbar } from "@/sections/Navbar";
import { Footer } from "@/sections/Footer";
import { APP_URL } from "@/lib/utils";

export default function ThankYou() {
  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden selection:bg-primary/30">
      <div className="grain-overlay dark:opacity-[0.028] opacity-[0.018]" aria-hidden="true" />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute rounded-full opacity-40 dark:opacity-100"
          style={{
            top: "-10%",
            left: "-5%",
            width: "50vw",
            height: "50vw",
            background: "radial-gradient(circle, hsl(263 70% 60% / 0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute rounded-full opacity-40 dark:opacity-100"
          style={{
            bottom: "-10%",
            right: "-5%",
            width: "45vw",
            height: "45vw",
            background: "radial-gradient(circle, hsl(199 89% 58% / 0.12) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      <div className="relative z-10">
        <Navbar />

        <section className="pt-32 pb-20 md:pt-48 md:pb-32">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl mx-auto rounded-3xl border border-border bg-card/80 backdrop-blur-xl overflow-hidden"
            >
              <div className="h-1 w-full bg-gradient-to-r from-primary via-cyan-400 to-primary" />

              <div className="p-10 md:p-16 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-8"
                >
                  <CheckCircle className="w-8 h-8 text-primary" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-5xl font-bold mb-4 text-foreground"
                >
                  Thank you!
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-muted-foreground mb-6 leading-relaxed"
                >
                  Open ScreenFlow in your browser to start recording:{" "}
                  <a
                    href={APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 underline transition-colors"
                  >
                    Launch ScreenFlow App
                  </a>.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-10"
                >
                  <Download className="w-4 h-4" />
                  <span>ScreenFlow — web app</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <Link href="/">
                    <Button
                      size="lg"
                      className="rounded-full px-8 h-14 text-base gap-2 bg-foreground text-background hover:bg-foreground/90 transition-all duration-300"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Back to Home
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => window.open(APP_URL, "_blank", "noopener,noreferrer")}
                    className="rounded-full px-8 h-14 text-base gap-2 border-foreground/20 dark:border-white/20 hover:bg-muted dark:hover:bg-white/5 bg-transparent text-foreground transition-all duration-300"
                  >
                    <Download className="w-5 h-5" />
                    Open ScreenFlow App
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="max-w-lg mx-auto mt-12 text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>
                  Questions?{" "}
                  <a href="mailto:support@screenflow.io" className="text-primary hover:text-primary/80 underline transition-colors">
                    support@screenflow.io
                  </a>
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
