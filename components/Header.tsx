import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-brand-border/80">
      <div className="max-w-[1240px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-display font-black text-2xl tracking-tighter text-brand-navy flex items-center gap-2"
        >
          <span>DEVTOOLS</span>
          <span className="text-brand-slate text-sm font-mono tracking-widest font-normal">
            // SDLC
          </span>
        </Link>

        {/* Middle Nav Links */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-wider text-brand-slate">
          <a
            href="#servicios"
            className="hover:text-brand-navy transition-colors"
          >
            Servicios
          </a>
          <a
            href="#disponibilidad"
            className="hover:text-brand-navy transition-colors"
          >
            Disponibilidad
          </a>
          <a
            href="#metodologia"
            className="hover:text-brand-navy transition-colors"
          >
            Método SDLC
          </a>
          <a href="#casos" className="hover:text-brand-navy transition-colors">
            Casos
          </a>
          <a href="#faq" className="hover:text-brand-navy transition-colors">
            FAQ
          </a>
        </nav>

        {/* Right CTAs */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-light border border-brand-border">
            <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse"></span>
            <span className="font-mono text-[11px] text-brand-navy font-medium">
              Q3/Q4 · 2 CUPOS SDLC
            </span>
          </div>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-lime text-brand-navy font-display font-bold text-xs uppercase tracking-wider hover:opacity-95 hover:shadow-lg transition-all"
          >
            <span>Diagnóstico Tech</span>
            <span className="material-symbols-outlined text-[16px]">
              arrow_forward
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
