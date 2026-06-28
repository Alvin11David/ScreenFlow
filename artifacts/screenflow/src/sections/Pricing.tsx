import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    description: "Everything you need to get started",
    price: "$0",
    period: "/mo",
    features: [
      "Unlimited recording time",
      "4K at 60fps",
      "No watermarks",
      "Basic editing tools",
      "Cloud sharing links",
      "1 team workspace",
    ],
    cta: "Get started free",
    popular: false,
  },
  {
    name: "Pro",
    description: "For professionals and power users",
    price: "$12",
    period: "/mo",
    features: [
      "Everything in Free",
      "AI audio enhancement",
      "Custom branding",
      "Unlimited cloud storage",
      "View analytics",
      "Priority support",
      "5 team workspaces",
    ],
    cta: "Start 14-day trial",
    popular: true,
  },
  {
    name: "Team",
    description: "For teams who need more",
    price: "$29",
    period: "/mo",
    features: [
      "Everything in Pro",
      "Unlimited team workspaces",
      "SSO & advanced security",
      "Role-based access",
      "Audit logs",
      "Dedicated success manager",
      "Custom integrations",
    ],
    cta: "Start 14-day trial",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest uppercase text-primary mb-4"
          >
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-foreground"
          >
            Simple, honest pricing.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground mb-10"
          >
            Start free, upgrade when you need more.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative p-8 rounded-3xl border transition-all duration-300 ${
                plan.popular
                  ? "border-primary bg-gradient-to-b from-primary/10 to-primary/5 shadow-xl shadow-primary/10"
                  : "border-border bg-card hover:border-primary/30 elevated-card"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    <Zap className="w-3 h-3" />
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1 text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground mb-1.5">{plan.period}</span>
                </div>
              </div>

              <Button
                data-testid={`button-plan-${plan.name.toLowerCase()}`}
                onClick={() => {
                  if (plan.name === "Free") {
                    window.open("https://drive.google.com/file/d/1jfcLFfD39XIuFoYtV6-fFP_C8NvHHtEa/view?usp=sharing", "_blank", "noopener,noreferrer");
                    window.location.href = "/thanks";
                  } else {
                    window.location.href = "/register";
                  }
                }}
                className={`w-full mb-8 rounded-full h-11 font-semibold ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-foreground text-background hover:bg-foreground/90"
                }`}
              >
                {plan.cta}
              </Button>

              <div className="pt-6 border-t border-border">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                  What's included
                </p>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <div className={`mt-0.5 w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center ${plan.popular ? "bg-primary/20" : "bg-muted"}`}>
                        <Check className={`w-2.5 h-2.5 ${plan.popular ? "text-primary" : "text-foreground"}`} />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
