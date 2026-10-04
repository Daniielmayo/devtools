export default function FaqSection() {
  const faqs = [
    {
      q: "¿Qué abarca el servicio de gestión del ciclo de vida del software (SDLC)?",
      a: "DevTools cubre desde la fase conceptual (Discovery, definición de especificaciones y arquitectura), pasando por el desarrollo ágil en sprints, QA y despliegues automatizados, hasta la transferencia completa de propiedad y el mantenimiento evolutivo.",
    },
    {
      q: "¿De quién es el código fuente y la propiedad intelectual?",
      a: "100% de tu empresa. Los repositorios de GitHub/GitLab se configuran bajo la organización de tu empresa desde el primer día. Firmamos acuerdos de cesión total de propiedad intelectual sin retención de derechos ni licencias ocultas.",
    },
    {
      q: "¿Cuánto tiempo toma el desarrollo de un proyecto típico?",
      a: "Un MVP completo con especificación rigurosa toma entre 4 y 6 semanas. Proyectos SaaS enterprise o ecosistemas con aplicaciones móviles suelen tomar entre 8 y 12 semanas con entregables en staging cada 14 días.",
    },
    {
      q: "¿Qué tecnologías y stacks utilizan?",
      a: "Nos especializamos en stacks de alto rendimiento y ecosistemas modernos: Next.js 16, React 19, TypeScript, Node.js / NestJS, Python (FastAPI), React Native, Flutter, PostgreSQL y servicios Cloud administrados en AWS y Google Cloud.",
    },
    {
      q: "¿Ofrecen garantía y soporte tras el lanzamiento?",
      a: "Sí. Cada entrega incluye 30 días de garantía total sin costo para resolución de bugs o ajustes menores. Adicionalmente ofrecemos planes de acompañamiento mensual (Retainer SLA) para evolución continua.",
    },
  ];

  return (
    <section className="max-w-[1240px] mx-auto px-4 sm:px-6 py-14 sm:py-20 border-t border-brand-border" id="faq">
      <div className="max-w-3xl mb-8 sm:mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-brand-slate block mb-2">
          04 / PREGUNTAS FRECUENTES
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-brand-navy">
          RESPUESTAS DIRECTAS.
        </h2>
      </div>

      <div className="divide-y divide-brand-border border-y border-brand-border max-w-4xl">
        {faqs.map((faq, idx) => (
          <details key={idx} className="group py-5 sm:py-6 cursor-pointer">
            <summary className="flex items-center justify-between font-display font-bold text-base sm:text-xl text-brand-navy list-none select-none gap-4">
              <span>{faq.q}</span>
              <span className="material-symbols-outlined transition-transform duration-200 group-open:rotate-180 text-brand-slate text-[20px] sm:text-[24px] shrink-0">
                expand_more
              </span>
            </summary>
            <div className="pt-3 sm:pt-4 text-brand-slate text-xs sm:text-base leading-relaxed font-body">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
