import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { homeFaqs } from "@/lib/content";
  {
    question: "Does ScreenFlow work on M1/M2/M3 Macs?",
    answer:
      "Yes, ScreenFlow is natively compiled for Apple Silicon, ensuring maximum performance and minimal battery usage during recording.",
  },
  {
    question: "Is my cloud storage really unlimited on the Team plan?",
    answer:
      "Absolutely. We don't cap your storage or limit your video retention. Fair use policies apply to prevent automated abuse, but for normal team operations, it's unlimited.",
  },
  {
    question: "How does the AI silence removal work?",
    answer:
      "Our local AI models analyze the audio track in real-time as you record. Once you finish, click 'Polish' to automatically trim dead air, filler words (um, uh), and excessive pauses — without uploading to the cloud first.",
  },
  {
    question: "Can I record system audio?",
    answer:
      "Yes, ScreenFlow includes a built-in virtual audio driver that captures system audio, microphone, or both simultaneously with perfect sync.",
  },
  {
    question: "What formats can I export to?",
    answer:
      "You can instantly share via a cloud link, or export locally as MP4 (H.264/H.265), WebM, or high-quality GIF.",
  },
  {
    question: "Is there a free trial for paid plans?",
    answer:
      "Yes — every plan starts with a 14-day free trial with no credit card required. You only pay if you decide to continue.",
  },
];

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
                <a href="mailto:support@screenflow.io" className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                  support team
                </a>
                .
              </motion.p>
            </div>

            {/* Right column: accordion */}
            <div className="md:col-span-3">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, idx) => (
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
