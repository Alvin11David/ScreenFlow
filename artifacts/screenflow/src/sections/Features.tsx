import { motion } from "framer-motion";
import {
  Video,
  Sparkles,
  CloudLightning,
  Users,
  Monitor,
  BarChart3,
  Mic,
  Share2,
} from "lucide-react";

const features = [
  {
    icon: Video,
    title: "Crystal Clear Capture",
    description:
      "Record up to 4K resolution at 60fps without dropping a single frame. Perfect for design reviews, code walkthroughs, and customer demos.",
    color: "from-violet-500/20 to-purple-500/5",
    accent: "text-violet-500 dark:text-violet-400",
    bg: "bg-violet-500/10",
    large: true,
  },
  {
    icon: Sparkles,
    title: "AI-Powered Polish",
    description:
      "Remove filler words, silence, and background noise in one click. Local AI — your audio never leaves your machine.",
    color: "from-cyan-500/20 to-blue-500/5",
    accent: "text-cyan-500 dark:text-cyan-400",
    bg: "bg-cyan-500/10",
    large: true,
  },
  {
    icon: Mic,
    title: "Studio Audio",
    description: "Capture system audio, mic, or both — perfectly synced.",
    color: "from-pink-500/10 to-rose-500/5",
    accent: "text-pink-500 dark:text-pink-400",
    bg: "bg-pink-500/10",
    large: false,
  },
  {
    icon: CloudLightning,
    title: "Instant Cloud Share",
    description: "Your link is ready before you close the recording window.",
    color: "from-amber-500/10 to-orange-500/5",
    accent: "text-amber-500 dark:text-amber-400",
    bg: "bg-amber-500/10",
    large: false,
  },
  {
    icon: Users,
    title: "Team Workspaces",
    description: "Shared libraries, roles, and comments built in.",
    color: "from-green-500/10 to-emerald-500/5",
    accent: "text-green-500 dark:text-green-400",
    bg: "bg-green-500/10",
    large: false,
  },
  {
    icon: Monitor,
    title: "Cross-Platform",
    description: "Mac, Windows, and Linux with native performance.",
    color: "from-blue-500/10 to-indigo-500/5",
    accent: "text-blue-500 dark:text-blue-400",
    bg: "bg-blue-500/10",
    large: false,
  },
  {
    icon: Share2,
    title: "Webcam Overlay",
    description: "Picture-in-picture with background blur and custom shapes.",
    color: "from-purple-500/10 to-violet-500/5",
    accent: "text-purple-500 dark:text-purple-400",
    bg: "bg-purple-500/10",
    large: false,
  },
  {
    icon: BarChart3,
    title: "View Analytics",
    description: "See who watched, when they dropped off, and what they replayed.",
    color: "from-teal-500/10 to-cyan-500/5",
    accent: "text-teal-500 dark:text-teal-400",
    bg: "bg-teal-500/10",
    large: false,
  },
];

function FeatureCard({
  feature,
  delay,
}: {
  feature: (typeof features)[0];
  delay: number;
}) {
  const Icon = feature.icon;

  if (feature.large) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`group relative rounded-3xl border border-border bg-gradient-to-br ${feature.color} bg-card p-8 md:p-10 overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5`}
      >
        {/* Animated gradient blob */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className={`inline-flex w-12 h-12 rounded-2xl ${feature.bg} items-center justify-center mb-6`}>
          <Icon className={`w-6 h-6 ${feature.accent}`} />
        </div>

        <h3 className="text-2xl font-bold mb-3 text-foreground">{feature.title}</h3>
        <p className="text-muted-foreground leading-relaxed text-base">{feature.description}</p>

        {/* Visual decoration */}
        <div className="mt-8 h-px bg-gradient-to-r from-border via-primary/30 to-transparent" />
        <div className="mt-6 flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className={`h-1.5 rounded-full ${feature.bg}`}
              style={{ width: `${[40, 80, 60, 100, 55][i]}%` }}
              initial={{ width: 0 }}
              whileInView={{ width: `${[40, 80, 60, 100, 55][i]}%` }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.3 + i * 0.08, duration: 0.5 }}
            />
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative rounded-2xl border border-border bg-card p-6 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-default`}
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className={`inline-flex w-10 h-10 rounded-xl ${feature.bg} items-center justify-center mb-4`}>
        <Icon className={`w-5 h-5 ${feature.accent}`} />
      </div>
      <h3 className="font-semibold mb-2 text-foreground">{feature.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

export function Features() {
  const largeFeatures = features.filter((f) => f.large);
  const smallFeatures = features.filter((f) => !f.large);

  return (
    <section id="features" className="py-32 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest uppercase text-primary mb-4"
          >
            Features
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-6 text-foreground"
          >
            Built for perfectionists.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground"
          >
            Every feature is designed to get out of your way so you can focus on communicating your ideas clearly.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {largeFeatures.map((f, i) => (
            <FeatureCard key={f.title} feature={f} delay={i * 0.15} />
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {smallFeatures.map((f, i) => (
            <FeatureCard key={f.title} feature={f} delay={0.3 + i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
