export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "“DevTools no solo construyó nuestro MVP a tiempo, sino que estableció la arquitectura y buenas prácticas que nuestro equipo in-house sigue utilizando hoy.”",
      name: "Alejandro Morales",
      role: "Founder @ NexusLog",
      initials: "AM",
      featured: false,
    },
    {
      quote:
        "“Buscábamos un aliado técnico capaz de asumir todo el ciclo de vida de nuestro producto digital. DevTools redujo nuestros costos de infraestructura un 50%.”",
      name: "Camila Valenzuela",
      role: "VP Engineering @ FinGrid",
      initials: "CV",
      featured: true,
    },
    {
      quote:
        "“La documentación técnica, los tests automatizados y el traspaso de código fueron impecables. Cero sorpresas y 100% de cumplimiento en los plazos.”",
      name: "Sebastián Godoy",
      role: "Product Director @ OmniDesk",
      initials: "SG",
      featured: false,
    },
  ];

  return (
    <section className="max-w-[1240px] mx-auto px-6 py-20 border-t border-brand-border">
      <div className="mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-brand-slate block mb-2">
          CLIENTES &amp; EQUIPOS
        </span>
        <h2 className="font-display font-extrabold text-4xl sm:text-6xl uppercase tracking-tight text-brand-navy">
          CONSTRUIR MEJOR, JUNTOS.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className={`p-8 rounded-3xl flex flex-col justify-between ${
              t.featured
                ? "bg-brand-lime border border-brand-lime shadow-lg"
                : "bg-white border border-brand-border shadow-sm"
            }`}
          >
            <p
              className={`text-base sm:text-lg leading-relaxed mb-8 ${
                t.featured
                  ? "text-brand-navy font-medium"
                  : "text-brand-navy font-normal"
              }`}
            >
              {t.quote}
            </p>
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-mono text-xs ${
                  t.featured
                    ? "bg-brand-navy text-white"
                    : "bg-brand-light border border-brand-border text-brand-navy"
                }`}
              >
                {t.initials}
              </div>
              <div>
                <div className="font-display font-bold text-sm text-brand-navy">
                  {t.name}
                </div>
                <div
                  className={`font-mono text-xs ${
                    t.featured ? "text-brand-navy/70" : "text-brand-slate"
                  }`}
                >
                  {t.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
