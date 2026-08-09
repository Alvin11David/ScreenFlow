import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { homeFaqs } from "@/lib/content";

export function FAQ() {
  return (
    <section id="faq" className="py-32 bg-muted/20 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-5 gap-16 items-start">
            {/* Left column: heading */}
            <div className="md:col-span-2 md:sticky md:top-32">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs font-semibold tracking-widest uppercase text-primary mb-4"
              >
                FAQ
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold mb-6 text-foreground"
              >
                Frequently asked questions.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground leading-relaxed"
              >
                Can't find the answer you're looking for? Reach out to our{" "}
                <a href="mailto:screenflowcom@gmail.com" className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                  support team
                </a>
                .
              </motion.p>
            </div>

            {/* Right column: accordion */}
            <div className="md:col-span-3">
              <Accordion type="single" collapsible className="w-full">
                {homeFaqs.map((faq, idx) => (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.07 }}
                  >
                    <AccordionItem
                      value={`item-${idx}`}
                      className="border-border"
                    >
                      <AccordionTrigger className="text-left text-base font-medium hover:text-primary transition-colors text-foreground py-5">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-5">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
