import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "Does ScreenFlow work on M1/M2/M3 Macs?",
      answer: "Yes, ScreenFlow is natively compiled for Apple Silicon, ensuring maximum performance and minimal battery usage during recording."
    },
    {
      question: "Is my cloud storage really unlimited on the Team plan?",
      answer: "Absolutely. We don't cap your storage or limit your video retention. Fair use policies apply to prevent automated abuse, but for normal team operations, it's unlimited."
    },
    {
      question: "How does the AI silence removal work?",
      answer: "Our local AI models analyze the audio track in real-time as you record. Once you finish, you can click 'Polish' to automatically trim dead air, filler words (um, uh), and excessive pauses without uploading to the cloud first."
    },
    {
      question: "Can I record system audio?",
      answer: "Yes, ScreenFlow includes a built-in virtual audio driver that allows you to capture system audio, microphone, or both simultaneously with perfect sync."
    },
    {
      question: "What formats can I export to?",
      answer: "You can instantly share via our cloud link, or export locally as MP4 (H.264/H.265), WebM, or high-quality GIF."
    }
  ];

  return (
    <section id="faq" className="py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Frequently asked questions.</h2>
          <p className="text-xl text-muted-foreground">Everything you need to know about the product and billing.</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <AccordionItem value={`item-${idx}`} className="border-white/10">
                  <AccordionTrigger className="text-left text-lg font-medium hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}