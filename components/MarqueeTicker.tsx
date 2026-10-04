export default function MarqueeTicker() {
  const items = [
    { text: "Ciclo de Vida del Software (SDLC)", badge: "360°" },
    { text: "Arquitectura Cloud & Microservicios" },
    { text: "Desarrollo SaaS & Web con Next.js 16" },
    { text: "Apps Móviles Nativas (iOS & Android)" },
    { text: "CI/CD & DevOps Automatizado", badge: "ZERO DOWNTIME" },
    { text: "Código 100% de tu Propiedad" },
  ];

  return (
    <div className="w-full border-y border-brand-border bg-white py-4 overflow-hidden select-none">
      <div className="animate-marquee whitespace-nowrap items-center text-xs sm:text-sm font-mono tracking-widest uppercase text-brand-navy">
        {[...items, ...items].map((item, index) => (
          <span key={index} className="inline-flex items-center">
            <span className="mx-6 flex items-center gap-2">
              {item.text}
              {item.badge && (
                <span className="px-2 py-0.5 rounded-full bg-brand-lime font-bold text-[10px] text-brand-navy">
                  {item.badge}
                </span>
              )}
            </span>
            <span className="mx-6 text-brand-slate">—</span>
          </span>
        ))}
      </div>
    </div>
  );
}
