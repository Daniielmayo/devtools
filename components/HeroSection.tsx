export default function HeroSection() {
  return (
    <section className="max-w-[1240px] mx-auto px-6 pt-16 pb-12">
      {/* Top Row: Titular monumental + Subtítulo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
        <div className="lg:col-span-8">
          <h1 className="font-display font-extrabold text-[48px] sm:text-[72px] lg:text-[90px] leading-[0.92] tracking-tighter uppercase text-brand-navy">
            INGENIERÍA <br />
            DE SOFTWARE.
          </h1>
        </div>
        <div className="lg:col-span-4 pb-2">
          <p className="text-brand-slate text-base sm:text-lg leading-relaxed">
            En <strong>DevTools</strong> transformamos necesidades complejas en
            soluciones tecnológicas robustas. Gestionamos{" "}
            <strong>todo el ciclo de vida del software</strong>: desde la
            arquitectura inicial hasta el despliegue y mantenimiento continuo.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-block px-3 py-1 rounded-full bg-brand-navy text-white font-mono text-xs uppercase font-medium tracking-wider">
              Ciclo de Vida 360°
            </span>
            <span className="inline-block px-3 py-1 rounded-full bg-brand-lime text-brand-navy font-mono text-xs uppercase font-bold tracking-wider">
              Sprints Ágiles
            </span>
          </div>
        </div>
      </div>

      {/* Hero Visual Card */}
      <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[520px] rounded-[28px] overflow-hidden bg-brand-deep shadow-2xl border border-brand-border">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-brand-deep to-brand-navy"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]"></div>

        {/* Floating Technical Status Badge */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 bg-brand-navy/90 backdrop-blur-md text-white border border-white/10 rounded-2xl p-5 shadow-2xl max-w-xs">
          <div className="font-mono text-[11px] uppercase tracking-widest text-brand-lime font-bold mb-1">
            MÉTRICAS SDLC // DEVTOOLS
          </div>
          <div className="font-display font-bold text-xl sm:text-2xl tracking-tight text-white mb-3">
            Calidad &amp; Despliegue
          </div>
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center font-mono">
            <div>
              <div className="text-[10px] text-brand-slate uppercase">Time-To-Market</div>
              <div className="text-sm font-bold text-brand-lime">2.5x</div>
            </div>
            <div>
              <div className="text-[10px] text-brand-slate uppercase">Uptime</div>
              <div className="text-sm font-bold text-white">99.99%</div>
            </div>
            <div>
              <div className="text-[10px] text-brand-slate uppercase">Coverage</div>
              <div className="text-sm font-bold text-white">100%</div>
            </div>
          </div>
        </div>

        {/* Floating Action Bar */}
        <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 right-6 sm:right-auto flex flex-wrap items-center gap-3">
          <a
            href="#contacto"
            className="px-6 py-3.5 rounded-full bg-brand-lime text-brand-navy font-display font-bold text-sm uppercase tracking-wider hover:bg-white transition-all shadow-lg flex items-center gap-2"
          >
            <span>Iniciar Proyecto</span>
            <span className="material-symbols-outlined text-[18px]">
              east
            </span>
          </a>
          <a
            href="#servicios"
            className="px-5 py-3.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 font-mono text-xs uppercase tracking-wider hover:bg-white/20 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-brand-lime text-[18px]">
              terminal
            </span>
            <span>Ver Soluciones</span>
          </a>
        </div>
      </div>
    </section>
  );
}
