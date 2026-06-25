import { motion } from "framer-motion";
import { Video, Sparkles, CloudLightning, Layout } from "lucide-react";

export function Features() {
  const features = [
    {
      title: "Crystal Clear Capture",
      description: "Record up to 4K resolution at 60fps without dropping a single frame. Perfect for design presentations.",
      icon: <Video className="w-6 h-6 text-primary" />,
      image: "/images/feature-1.png"
    },
    {
      title: "AI-Powered Polish",
      description: "Automatically remove filler words, silences, and background noise with a single click.",
      icon: <Sparkles className="w-6 h-6 text-cyan-400" />,
      image: "/images/feature-2.png"
    },
    {
      title: "Instant Cloud Sync",
      description: "Videos are uploaded as you record. Share a link seconds after hitting stop.",
      icon: <CloudLightning className="w-6 h-6 text-purple-400" />,
      image: "/images/feature-3.png"
    }
  ];

  return (
    <section id="features" className="py-32 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Built for perfectionists.</h2>
          <p className="text-xl text-muted-foreground">Every feature is designed to get out of your way so you can focus on communicating your ideas clearly.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group rounded-3xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/10 transition-colors"
            >
              <div className="aspect-[4/3] p-6 flex items-center justify-center bg-black/20">
                <img src={feature.image} alt={feature.title} className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}