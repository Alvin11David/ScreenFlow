import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Design Lead",
    company: "Prisma",
    content:
      "ScreenFlow replaced three different tools in my workflow. The AI silence removal alone saves me hours every week when recording presentations.",
    initials: "SJ",
    rating: 5,
    color: "from-violet-500 to-purple-600",
    featured: true,
  },
  {
    name: "Marcus Cole",
    role: "Senior Engineer",
    company: "Vercel",
    content:
      "Finally, a screen recorder that doesn't destroy my CPU. I can record 4K and IDE tutorials without dropping a single frame.",
    initials: "MC",
    rating: 5,
    color: "from-cyan-500 to-blue-600",
    featured: false,
  },
  {
    name: "Elena Rodriguez",
    role: "Product Manager",
    company: "Linear",
    content:
      "I hit stop, paste the link in Slack, and my team is already watching it. It's fundamentally changed how we work asynchronously.",
    initials: "ER",
    rating: 5,
    color: "from-pink-500 to-rose-600",
    featured: false,
  },
  {
    name: "Theo Park",
    role: "Founder",
    company: "Raycast",
    content:
      "The quality bar on ScreenFlow is extraordinary. You can tell it was made by people who use it every day.",
    initials: "TP",
    rating: 5,
    color: "from-amber-500 to-orange-600",
    featured: false,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export function Testimonials() {
  const featured = testimonials.find((t) => t.featured)!;
  const rest = testimonials.filter((t) => !t.featured);

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest uppercase text-primary mb-4"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-foreground"
          >
            Loved by creators.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground"
          >
            Join thousands of professionals who have already upgraded their workflow.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {/* Featured large card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 relative p-8 md:p-10 rounded-3xl border border-border bg-card overflow-hidden group hover:border-primary/30 transition-all duration-300 elevated-card"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <Quote className="w-10 h-10 text-primary/30 mb-6" />
            <Stars count={featured.rating} />

            <p className="text-xl md:text-2xl font-medium leading-relaxed my-6 text-foreground">
              "{featured.content}"
            </p>

            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${featured.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                {featured.initials}
              </div>
              <div>
                <p className="font-bold text-foreground">{featured.name}</p>
                <p className="text-sm text-muted-foreground">
                  {featured.role} · {featured.company}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Smaller cards */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {rest.slice(0, 2).map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + idx * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300 group flex-1 elevated-card"
              >
                <Stars count={t.rating} />
                <p className="text-base my-4 leading-relaxed text-muted-foreground">
                  "{t.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mt-6">
          {rest.slice(2).map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300 elevated-card"
            >
              <Stars count={t.rating} />
              <p className="text-base my-4 leading-relaxed text-muted-foreground">
                "{t.content}"
              </p>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
