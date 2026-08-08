import { Navbar } from "@/sections/Navbar";
import { Footer } from "@/sections/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { APP_URL } from "@/lib/utils";
import { landingPages } from "@/lib/content";

export default function LandingPage({ path }: { path: string }) {
  const page = landingPages.find((p) => p.path === path);

  if (!page) return null;

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden">
      <div className="relative z-10">
        <Navbar />
        <article className="container mx-auto px-4 pt-36 md:pt-44 pb-24 max-w-4xl">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to ScreenFlow
          </a>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-foreground">
            {page.h1}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-16 max-w-3xl">
            {page.intro}
          </p>

          <div className="space-y-14">
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {section.heading}
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                  {section.body}
                </p>
                {section.bullets && (
                  <ul className="space-y-2.5">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-muted-foreground leading-relaxed"
                      >
                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <section className="mt-20 border-t border-border pt-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Frequently asked questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {page.faqs.map((faq, idx) => (
                <AccordionItem
                  key={faq.question}
                  value={`faq-${idx}`}
                  className="border-border"
                >
                  <AccordionTrigger className="text-left text-base font-medium text-foreground py-5 hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section className="mt-20 rounded-3xl border border-border bg-card/80 backdrop-blur-xl p-10 md:p-14 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Try ScreenFlow free
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Start recording your screen in seconds. Free forever for basic use — no credit card required.
            </p>
            <Button
              size="lg"
              data-testid="button-landing-cta"
              onClick={() => {
                window.open(APP_URL, "_blank", "noopener,noreferrer");
              }}
              className="rounded-full px-8 h-14 text-base gap-2 bg-foreground text-background hover:bg-foreground/90 transition-all duration-300"
            >
              <ExternalLink className="w-5 h-5" />
              Go to ScreenFlow App
            </Button>
          </section>

          <nav className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {page.related.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </article>
        <Footer />
      </div>
    </main>
  );
}
