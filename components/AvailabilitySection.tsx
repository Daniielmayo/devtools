export default function AvailabilitySection() {
  const slots = [
    {
      title: "Sprint MVP Inicial",
      subtitle: "Lanzamiento rápido y validado",
      modality: "Remoto / Sync Diario",
      duration: "4 – 6 Semanas",
      status: "DISPONIBLE Q3",
      badgeColor: "bg-brand-lime text-brand-navy font-bold",
    },
    {
      title: "Sprint SaaS Enterprise",
      subtitle: "Arquitectura multi-tenant completa",
      modality: "Equipo Dedicado Senior",
      duration: "8 – 12 Semanas",
      status: "1 CUPO RESTANTE",
      badgeColor: "bg-brand-light border border-brand-border text-brand-navy font-bold",
    },
    {
      title: "Sprint Auditoría & SDLC Refactor",
      subtitle: "Eliminación de deuda técnica e infraestructura",
      modality: "Diagnóstico + Execution",
      duration: "3 – 4 Semanas",
      status: "RESERVA ANTICIPADA",
      badgeColor: "bg-brand-light border border-brand-border text-brand-slate",
    },
  ];

  return (
    <section className="max-w-[1240px] mx-auto px-6 py-20 border-t border-brand-border" id="disponibilidad">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-brand-slate block mb-2">
            SLOTS &amp; DISPONIBILIDAD // CAPACIDAD
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl uppercase tracking-tight text-brand-navy">
            CALENDARIO DE SPRINTS.
          </h2>
        </div>
        <p className="text-brand-slate max-w-md text-sm sm:text-base leading-relaxed">
          Garantizamos atención directa de ingenieros de software sénior limitando los proyectos activos por trimestre.
        </p>
      </div>

      <div className="border-t border-brand-border divide-y divide-brand-border">
        {slots.map((slot, idx) => (
          <div
            key={idx}
            className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-brand-light/60 px-4 -mx-4 rounded-xl transition-colors"
          >
            <div className="md:w-1/4">
              <h4 className="font-display font-bold text-lg sm:text-xl text-brand-navy uppercase">
                {slot.title}
              </h4>
              <span className="text-xs text-brand-slate font-mono">
                {slot.subtitle}
              </span>
            </div>
            <div className="md:w-1/5 font-mono text-xs text-brand-slate">
              <div className="text-[10px] uppercase text-brand-slate/70">MODALIDAD</div>
              <div className="text-brand-navy font-semibold">{slot.modality}</div>
            </div>
            <div className="md:w-1/5 font-mono text-xs text-brand-slate">
              <div className="text-[10px] uppercase text-brand-slate/70">DURACIÓN</div>
              <div className="text-brand-navy font-semibold">{slot.duration}</div>
            </div>
            <div className="md:w-1/6">
              <span className={`inline-block px-3 py-1 rounded-full font-mono text-[11px] uppercase ${slot.badgeColor}`}>
                {slot.status}
              </span>
            </div>
            <div className="md:w-auto">
              <a
                href="#contacto"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full border border-brand-navy text-xs font-mono uppercase tracking-wider font-bold text-brand-navy hover:bg-brand-navy hover:text-white transition-all"
              >
                <span>Reservar Slot</span>
                <span className="material-symbols-outlined text-[14px]">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
