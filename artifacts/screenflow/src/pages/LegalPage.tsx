import { Navbar } from "@/sections/Navbar";
import { Footer } from "@/sections/Footer";
import { ArrowLeft } from "lucide-react";
import { legalPages } from "@/lib/legal";

export default function LegalPage({ path }: { path: string }) {
  const page = legalPages.find((p) => p.path === path);

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

          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-foreground">
            {page.h1}
          </h1>
          <p className="text-sm text-muted-foreground mb-10">
            Last updated: {page.updated}
          </p>
          <p className="text-xl text-muted-foreground leading-relaxed mb-16 max-w-3xl">
            {page.intro}
          </p>

          <div className="space-y-10">
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                  {section.heading}
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </article>
        <Footer />
      </div>
    </main>
  );
}
