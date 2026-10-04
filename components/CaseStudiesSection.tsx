export default function CaseStudiesSection() {
  return (
    <section className="max-w-[1240px] mx-auto px-6 py-20 border-t border-brand-border" id="casos">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-brand-slate block mb-2">
            03 / HISTORIAS DE ÉXITO EN PRODUCCIÓN
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl uppercase tracking-tight text-brand-navy">
            CASOS AUDITADOS.
          </h2>
        </div>
        <p className="text-brand-slate max-w-md text-sm sm:text-base leading-relaxed">
          Métricas reales de impacto entregadas a empresas tecnológicas de rápido crecimiento.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Case Card */}
        <div className="lg:col-span-7 relative min-h-[420px] rounded-3xl overflow-hidden bg-brand-navy p-8 sm:p-10 flex flex-col justify-end text-white border border-brand-border group">
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-brand-deep/80"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4 font-mono text-xs uppercase tracking-wider">
              <span className="px-2.5 py-1 rounded-full bg-brand-lime text-brand-navy font-bold">
                FINTECH B2B
              </span>
              <span className="text-brand-slate">ENTREGA EN 6 SEMANAS</span>
            </div>
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight mb-3">
              PaySync: -65% Latencia y 150k transacciones sin caídas.
            </h3>
            <p className="text-gray-300 text-sm sm:text-base max-w-xl mb-6">
              “DevTools diseñó e implementó la nueva arquitectura en 6 semanas. La calidad del código y la suite de pruebas superaron todas nuestras expectativas.”
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-lime flex items-center justify-center font-bold text-brand-navy font-mono text-sm">
                MR
              </div>
              <div>
                <div className="font-display font-bold text-sm">Matías Rojas</div>
                <div className="font-mono text-xs text-brand-slate">
                  CTO en PaySync Technologies
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stacked Cases */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="relative min-h-[200px] rounded-3xl overflow-hidden bg-brand-deep p-6 sm:p-7 flex flex-col justify-end text-white border border-brand-border group">
            <div className="relative z-10">
              <div className="font-mono text-[11px] text-brand-lime uppercase tracking-wider font-bold mb-1">
                LogiRoute // IoT &amp; Telemetría
              </div>
              <h4 className="font-display font-bold text-xl uppercase tracking-tight mb-2">
                -$45,000 USD/año en costes cloud
              </h4>
              <p className="text-xs text-gray-300">
                Optimizamos la canalización de eventos en tiempo real y refactorizamos los microservicios core.
              </p>
            </div>
          </div>

          <div className="relative min-h-[200px] rounded-3xl overflow-hidden bg-brand-navy p-6 sm:p-7 flex flex-col justify-end text-white border border-brand-border group">
            <div className="relative z-10">
              <div className="font-mono text-[11px] text-brand-lime uppercase tracking-wider font-bold mb-1">
                SalusCloud // HealthTech SaaS
              </div>
              <h4 className="font-display font-bold text-xl uppercase tracking-tight mb-2">
                25,000 usuarios activos &amp; 0 caídas
              </h4>
              <p className="text-xs text-gray-300">
                Implementación de estándares HIPAA y arquitectura de base de datos resiliente ante picos de demanda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
