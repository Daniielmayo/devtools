"use client";

import { useState, FormEvent } from "react";

export default function CtaSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="max-w-[1240px] mx-auto px-6 py-16" id="contacto">
      <div className="relative w-full rounded-[32px] overflow-hidden bg-brand-navy text-white p-8 sm:p-12 lg:p-16 border border-white/10 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/95 to-brand-deep/90"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Text and Headline */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 font-mono text-[11px] text-brand-lime font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-lime animate-ping"></span>
              <span>Slots SDLC Q3/Q4 disponibles</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase leading-[0.92] tracking-tighter mb-6">
              TU PRÓXIMO <br />
              <span className="text-brand-lime">PROYECTO</span> <br />
              EMPIEZA AQUÍ.
            </h2>
            <p className="text-gray-300 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
              Cuéntanos tu requerimiento o agenda una sesión técnica de 15 minutos. Sin comerciales: hablarás directamente con un Tech Lead para analizar alcance y viabilidad técnica.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="mailto:contacto@devtools.tech"
                className="px-6 py-4 rounded-full bg-brand-lime text-brand-navy font-display font-extrabold text-sm uppercase tracking-wider hover:bg-white transition-all shadow-xl flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">
                  mail
                </span>
                <span>contacto@devtools.tech</span>
              </a>
            </div>
          </div>

          {/* Quick Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 text-brand-navy shadow-2xl">
            <h3 className="font-display font-bold text-xl uppercase tracking-tight mb-1 text-brand-navy">
              Diagnóstico en 15 Min
            </h3>
            <p className="text-xs text-brand-slate mb-6">
              Respuesta con Tech Lead en menos de 2 horas hábiles.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-[10px] uppercase font-bold text-brand-slate mb-1">
                  Nombre o Empresa
                </label>
                <input
                  type="text"
                  required
                  placeholder="DevTools Client"
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-light text-brand-navy placeholder:text-brand-slate/60 text-sm focus:border-brand-navy focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] uppercase font-bold text-brand-slate mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  placeholder="contacto@empresa.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-light text-brand-navy placeholder:text-brand-slate/60 text-sm focus:border-brand-navy focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] uppercase font-bold text-brand-slate mb-1">
                  Servicio Requerido
                </label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-light text-brand-navy text-sm focus:border-brand-navy focus:outline-none">
                  <option>Ciclo de Vida Completo (SDLC)</option>
                  <option>Plataforma SaaS / Aplicación Web</option>
                  <option>App Móvil (iOS &amp; Android)</option>
                  <option>Arquitectura Cloud &amp; DevOps</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-brand-navy text-white hover:bg-brand-deep font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Solicitar Propuesta</span>
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </button>

              {submitted && (
                <div className="p-3 rounded-lg bg-brand-lime/30 text-brand-navy font-mono text-xs text-center font-bold">
                  ✓ ¡Recibido! Nos contactaremos a la brevedad.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
