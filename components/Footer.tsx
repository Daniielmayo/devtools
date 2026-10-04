export default function Footer() {
  return (
    <footer className="w-full border-t border-brand-border bg-white pt-16 pb-12">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16">
          {/* Column 1: Brand */}
          <div className="md:col-span-5">
            <div className="font-display font-black text-2xl tracking-tight text-brand-navy uppercase mb-1">
              DEVTOOLS
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-brand-slate mb-4">
              SOFTWARE THAT SCALES // FULL SDLC.
            </div>
            <p className="text-sm text-brand-slate max-w-sm leading-relaxed">
              Estudio de ingeniería de software a medida. Soluciones tecnológicas, arquitectura escalable y ciclo de vida de desarrollo integral.
            </p>
          </div>

          {/* Column 2: Explore */}
          <div className="md:col-span-3">
            <div className="font-mono text-xs uppercase tracking-widest text-brand-navy font-bold mb-4">
              Navegación
            </div>
            <ul className="space-y-2.5 font-body text-xs text-brand-slate">
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
            <div className="font-mono text-xs uppercase tracking-widest text-brand-navy font-bold mb-4">
              Contacto Directo
            </div>
            <p className="text-xs text-brand-slate leading-relaxed mb-4">
              ¿Listo para acelerar tu producto sin deuda técnica? Habla directamente con nuestros ingenieros.
            </p>
            <div className="font-mono text-xs font-bold text-brand-navy">
              contacto@devtools.tech
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-brand-border/60 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-brand-slate gap-4">
          <div>© {new Date().getFullYear()} DevTools. Todos los derechos reservados.</div>
          <div className="flex items-center gap-6">
            <span>Next.js 16 SSR</span>
            <span>TypeScript</span>
            <span>Clean Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
