export function SocialProof() {
  const logos = [
    { name: "Vercel", id: "vercel" },
    { name: "Linear", id: "linear" },
    { name: "Raycast", id: "raycast" },
    { name: "Framer", id: "framer" },
    { name: "Stripe", id: "stripe" },
  ];

  return (
    <section className="py-20 border-y border-white/5 bg-white/[0.02]">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground mb-8 font-medium tracking-wide uppercase">
          TRUSTED BY CRAFT-OBSESSED TEAMS
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {logos.map((logo) => (
            <div key={logo.name} className="text-2xl font-bold tracking-tighter text-white">
              {logo.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}