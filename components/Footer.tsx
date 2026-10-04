export default function Footer() {
  return (
    <footer className="w-full border-t border-brand-border bg-white pt-12 sm:pt-16 pb-10 sm:pb-12">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 pb-12 sm:pb-16">
          {/* Column 1: Brand */}
          <div className="md:col-span-5">
            <div className="font-display font-black text-xl sm:text-2xl tracking-tight text-brand-navy uppercase mb-1">
              DEVTOOLS
            </div>
            <div className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-brand-slate mb-3 sm:mb-4">
              SOFTWARE THAT SCALES // FULL SDLC.
            </div>
            <p className="text-xs sm:text-sm text-brand-slate max-w-sm leading-relaxed">
              Estudio de ingeniería de software a medida. Soluciones tecnológicas, arquitectura escalable y ciclo de vida de desarrollo integral.
            </p>
          </div>

          {/* Column 2: Explore */}
          <div className="md:col-span-3">
            <div className="font-mono text-xs uppercase tracking-widest text-brand-navy font-bold mb-3 sm:mb-4">
              Navegación
            </div>
            <ul className="space-y-2 font-body text-xs text-brand-slate">
              <li>
                <a href="#servicios" className="hover:text-brand-navy transition-colors">
                  Soluciones Tecnológicas
                </a>
              </li>
              <li>
                <a href="#metodologia" className="hover:text-brand-navy transition-colors">
                  Método Ciclo de Vida (SDLC)
                </a>
              </li>
              <li>
                <a href="#disponibilidad" className="hover:text-brand-navy transition-colors">
                  Disponibilidad de Sprints
                </a>
              </li>
              <li>
                <a href="#casos" className="hover:text-brand-navy transition-colors">
                  Casos de Éxito
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-brand-navy transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="md:col-span-4">
            <div className="font-mono text-xs uppercase tracking-widest text-brand-navy font-bold mb-3 sm:mb-4">
              Contacto Directo
            </div>
            <p className="text-xs text-brand-slate leading-relaxed mb-3 sm:mb-4">
              ¿Listo para acelerar tu producto sin deuda técnica? Habla directamente con nuestros ingenieros.
            </p>
            <div className="font-mono text-xs font-bold text-brand-navy">
              contacto@devtools.tech
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 sm:pt-8 border-t border-brand-border/60 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs font-mono text-brand-slate gap-3 text-center sm:text-left">
          <div>© {new Date().getFullYear()} DevTools. Todos los derechos reservados.</div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <span>Next.js 16 SSR</span>
            <span>TypeScript</span>
            <span>Clean Architecture</span>
          </div>
        </div>

        {/* Isotipo Overscroll Signature Reveal */}
        <div className="pt-12 sm:pt-16 pb-6 flex flex-col items-center justify-center border-t border-brand-border/40 mt-8 relative overflow-hidden">
          <img
            src="/LINEAS HORIZONTALES VERDES-1.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none mix-blend-multiply"
          />
          <div className="relative z-10 flex flex-col items-center text-center gap-3">
            <img
              src="/isotipo-1.png"
              alt="DevTools Isotipo Signature"
              className="h-20 sm:h-28 w-auto object-contain transition-transform duration-700 hover:scale-110 filter drop-shadow-xl"
            />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-brand-slate font-semibold">
              DEVTOOLS // SOFTWARE ENGINEERING STUDIO
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
