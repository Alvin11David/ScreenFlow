const footerLinks: Record<string, Array<{ label: string; href: string }>> = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "ScreenFlow App", href: "https://screen-recorder-v0-1.vercel.app/" },
    { label: "Changelog", href: "/#blog" },
    { label: "Roadmap", href: "/#features" },
  ],
  Resources: [
    { label: "Blog", href: "/#blog" },
    { label: "Help Center", href: "mailto:support@screenflow.io" },
    { label: "API Docs", href: "/#" },
    { label: "Status", href: "/#" },
  ],
  Company: [
    { label: "About", href: "/#" },
    { label: "Careers", href: "/#" },
    { label: "Privacy Policy", href: "/#" },
    { label: "Terms of Service", href: "/#" },
    { label: "Press", href: "/#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-primary to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
                S
              </div>
              <span className="font-bold text-lg tracking-tight text-foreground">ScreenFlow</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <a href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Sign in</a>
              <span className="text-muted-foreground">·</span>
              <a href="/register" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Get started</a>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs mb-8 leading-relaxed">
              The screen recorder for creative professionals. Built with precision and care to help you share your best work.
            </p>
            <div className="flex items-center gap-4">
              {[
                { name: "Twitter", href: "https://x.com/screenflow" },
                { name: "GitHub", href: "https://github.com/screenflow" },
                { name: "Discord", href: "https://discord.gg/screenflow" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
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
