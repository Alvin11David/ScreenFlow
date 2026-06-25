import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for quick sharing",
      features: [
        "Up to 5 mins per video",
        "720p resolution",
        "Standard watermark",
        "1GB cloud storage"
      ]
    },
    {
      name: "Pro",
      price: "$12",
      description: "For individual creators",
      popular: true,
      features: [
        "Unlimited recording time",
        "4K resolution at 60fps",
        "No watermarks",
        "100GB cloud storage",
        "AI audio enhancement"
      ]
    },
    {
      name: "Team",
      price: "$29",
      description: "For growing teams",
      features: [
        "Everything in Pro",
        "Unlimited cloud storage",
        "Team workspaces",
        "SSO & advanced security",
        "Priority support"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Simple pricing.</h2>
          <p className="text-xl text-muted-foreground">Start for free, upgrade when you need more power.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative p-8 rounded-3xl border ${plan.popular ? 'border-primary bg-primary/5' : 'border-white/10 bg-white/5'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              <div className="mb-8">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">/mo</span>
              </div>
              <Button 
                className={`w-full mb-8 rounded-full h-12 ${plan.popular ? 'bg-white text-black hover:bg-white/90' : 'bg-white/10 hover:bg-white/20'}`}
              >
                Get Started
              </Button>
              <ul className="space-y-4">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check className="w-5 h-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}