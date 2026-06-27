export function Footer() {
  const links = {
    Product: ["Features", "Pricing", "Download", "Changelog", "Roadmap"],
    Resources: ["Blog", "Help Center", "Community", "API Docs", "Status"],
    Company: ["About", "Careers", "Privacy Policy", "Terms of Service", "Press"],
  };

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
            <p className="text-muted-foreground text-sm max-w-xs mb-8 leading-relaxed">
              The screen recorder for creative professionals. Built with precision and care to help you share your best work.
            </p>
            <div className="flex items-center gap-4">
              {["Twitter", "GitHub", "Discord"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="font-semibold mb-5 text-sm text-foreground">{section}</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href={item === "Download" ? "https://drive.google.com/file/d/1jfcLFfD39XIuFoYtV6-fFP_C8NvHHtEa/view?usp=sharing" : "#"}
                      target={item === "Download" ? "_blank" : undefined}
                      rel={item === "Download" ? "noopener noreferrer" : undefined}
                      onClick={item === "Download" ? (e) => { setTimeout(() => { window.location.href = "/thanks"; }, 100); } : undefined}
                      className="hover:text-foreground transition-colors"
                    >
                      {item}
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
