import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Design Lead at Prisma",
      content: "ScreenFlow replaced three different tools in my workflow. The AI silence removal alone saves me hours every week when recording presentations.",
      avatar: "/images/avatar-1.png",
      rating: 5
    },
    {
      name: "Marcus Cole",
      role: "Senior Developer",
      content: "Finally, a screen recorder that doesn't consume 80% of my CPU. I can record 4K gameplay and IDE tutorials without dropping a single frame.",
      avatar: "/images/avatar-2.png",
      rating: 5
    },
    {
      name: "Elena Rodriguez",
      role: "Product Manager",
      content: "The instant cloud sharing is magic. I hit stop, paste the link in Slack, and my team is already watching it. It's fundamentally changed how we work asynchronously.",
      avatar: "/images/avatar-3.png",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-32 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Loved by creators.</h2>
          <p className="text-xl text-muted-foreground">Join thousands of professionals who have already upgraded their workflow.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl border border-white/10 bg-card hover:bg-white/5 transition-colors"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-lg mb-8 leading-relaxed">"{testimonial.content}"</p>
              <div className="flex items-center gap-4">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}