export default function ServicesSection() {
  const services = [
    {
      number: "01",
      title: "Desarrollo SaaS & Web Platforms",
      description:
        "Plataformas multi-tenant escalables, paneles administrativos interactivos e interfaces ultrarrápidas con Next.js 16, React 19 y PostgreSQL.",
      tags: "Next.js · TypeScript · Postgres",
      timeframe: "4-8 Semanas",
      icon: "web",
    },
    {
      number: "02",
      title: "Apps Móviles Nativas & Híbridas",
      description:
        "Experiencias móviles de alto rendimiento a 60fps con React Native o Flutter. Notificaciones push, biometría y sincronización offline.",
      tags: "React Native · iOS · Android",
      timeframe: "5-9 Semanas",
      icon: "smartphone",
    },
    {
      number: "03",
      title: "Arquitectura Cloud & DevOps",
      description:
        "Microservicios, infraestructura como código (Terraform), pipelines CI/CD automatizados y optimización de bases de datos de alta demanda.",
      tags: "AWS · GCP · Docker · K8s",
      timeframe: "3-6 Semanas",
      icon: "cloud",
    },
    {
      number: "04",
      title: "Gestión Integral del Ciclo de Vida (SDLC)",
      description:
        "Acompañamiento en discovery, especificaciones técnicas, refactorización de deuda técnica, auditorías de seguridad y mantenimiento evolutivo.",
      tags: "QA · SecOps · Code Audit",
      timeframe: "Continuo",
      icon: "published_with_changes",
    },
  ];

  return (
    <section className="max-w-[1240px] mx-auto px-6 pb-28" id="servicios">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-brand-slate block mb-2">
            01 / CAPACIDADES TÉCNICAS
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl uppercase tracking-tight text-brand-navy">
            SOLUCIONES TECNOLÓGICAS.
          </h2>
        </div>
        <p className="text-brand-slate max-w-md text-sm sm:text-base leading-relaxed">
          Cubrimos cada etapa del desarrollo de software con rigor de ingeniería, código limpio y estándares internacionales.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div
            key={service.number}
            className="group bg-white rounded-3xl p-6 border border-brand-border hover:border-brand-navy transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-light border border-brand-border flex items-center justify-center text-brand-navy group-hover:bg-brand-lime transition-colors">
                  <span className="material-symbols-outlined text-[24px]">
                    {service.icon}
                  </span>
                </div>
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-brand-light text-brand-navy">
                  {service.number}
                </span>
              </div>
              <h3 className="font-display font-bold text-xl uppercase tracking-tight text-brand-navy mb-3">
                {service.title}
              </h3>
              <p className="text-brand-slate text-xs sm:text-sm leading-relaxed mb-6">
                {service.description}
              </p>
            </div>

            <div className="pt-4 border-t border-brand-border flex items-center justify-between font-mono text-[11px] text-brand-slate">
              <span>{service.tags}</span>
              <span className="text-brand-navy font-bold">{service.timeframe}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
