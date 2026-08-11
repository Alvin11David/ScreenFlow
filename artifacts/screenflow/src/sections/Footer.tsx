import { landingPages } from "@/lib/content";

const guideLabels: Record<string, string> = {
  "/screen-recorder": "Free screen recorder",
  "/screen-recording-software": "Screen recording software",
  "/how-to-record-your-screen": "How to record your screen",
  "/record-zoom-meetings": "Record Zoom meetings",
  "/record-gameplay": "Record gameplay",
  "/best-free-screen-recorders": "Best free screen recorders",
};

const footerLinks: Record<string, Array<{ label: string; href: string }>> = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "ScreenFlow App", href: "https://screen-recorder-v0-1.vercel.app/" },
    { label: "Changelog", href: "/#blog" },
    { label: "Roadmap", href: "/#features" },
  ],
  Guides: landingPages.map((page) => ({
    label: guideLabels[page.path] ?? page.title,
    href: page.path,
  })),
  Resources: [
    { label: "Blog", href: "/#blog" },
    { label: "Help Center", href: "mailto:screenflowcom@gmail.com" },
  ],
  Company: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-primary to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
                S
              </div>
              <span className="font-bold text-lg tracking-tight text-foreground">ScreenFlow</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs mb-8 leading-relaxed">
              The screen recorder for creative professionals. Built with precision and care to help you share your best work.
            </p>
          </div>

          {Object.entries(footerLinks).map(([section, items]) => (
            <div key={section}>
              <h4 className="font-semibold mb-5 text-sm text-foreground">{section}</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ScreenFlow Inc. All rights reserved.</p>
          <p className="text-xs">
            Designed with care. Built to last.
          </p>
        </div>
      </div>
    </footer>
  );
}
