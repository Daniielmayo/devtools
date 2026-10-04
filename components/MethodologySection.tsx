export default function MethodologySection() {
  const steps = [
    {
      num: "01",
      time: "DÍA 1 – 3",
      title: "Discovery & Spec Técnica",
      description:
        "Definición clara del alcance, requisitos funcionales y no funcionales, arquitectura recomendada y cronograma semanal cerrado.",
      deliverable: "Tech Spec & Plan de Arquitectura",
      active: false,
    },
    {
      num: "02",
      time: "SEM 1 – 2",
      title: "Diseño & Prototipado",
      description:
        "Diseño de interfaz UI/UX en Figma, prototipo interactivo y definición de contratos de API antes de iniciar el código.",
      deliverable: "Figma Prototyped & DB Schema",
      active: false,
    },
    {
      num: "03",
      time: "SEM 3 – 6",
      title: "Desarrollo Ágil & Sprints",
      description:
        "Construcción modular en Next.js, TypeScript y servicios Cloud. Commits transparentes a tu repositorio y demos funcionales quincenales.",
      deliverable: "Demos en Staging & CI/CD Active",
      active: true,
    },
    {
      num: "04",
      time: "SEM 7+",
      title: "QA, Despliegue & SDLC Sync",
      description:
        "Pruebas de carga, análisis de seguridad, despliegue en producción y transferencia total de propiedad intelectual con soporte post-launch.",
      deliverable: "Traspaso 100% Repositorio + Docs",
      active: false,
    },
  ];

  return (
    <section className="max-w-[1240px] mx-auto px-4 sm:px-6 py-14 sm:py-20 border-t border-brand-border" id="metodologia">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-brand-slate block mb-2">
            02 / METODOLOGÍA SDLC
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-brand-navy">
            CICLO DE VIDA DE SOFTWARE.
          </h2>
        </div>
        <p className="text-brand-slate max-w-md text-sm sm:text-base leading-relaxed">
          Proceso estructurado en 4 fases transparentes para asegurar previsibilidad, calidad y velocidad sin deuda técnica.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {steps.map((step) => (
          <div
            key={step.num}
            className={`p-5 sm:p-6 rounded-3xl flex flex-col justify-between min-h-[280px] sm:min-h-[300px] h-full border-2 transition-all ${
              step.active
                ? "bg-white border-brand-navy shadow-lg"
                : "bg-brand-light border-brand-border"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy">
                  {step.num}
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full font-mono text-[10px] sm:text-[11px] font-bold ${
                    step.active
                      ? "bg-brand-lime text-brand-navy"
                      : "bg-white border border-brand-border text-brand-slate"
                  }`}
                >
                  {step.time}
                </span>
              </div>
              <h3 className="font-display font-bold text-base sm:text-lg uppercase tracking-tight text-brand-navy mb-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-brand-slate leading-relaxed">
                {step.description}
              </p>
            </div>

            <div className="font-mono text-[10px] sm:text-[11px] text-brand-navy font-semibold flex items-center gap-1.5 pt-4 border-t border-brand-border/60 mt-4">
              <span className="material-symbols-outlined text-brand-lime text-[16px]">
                task_alt
              </span>
              <span>{step.deliverable}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
