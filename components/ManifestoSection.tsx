export default function ManifestoSection() {
  return (
    <section className="max-w-[1240px] mx-auto px-4 sm:px-6 py-16 sm:py-28" id="manifesto">
      <div className="max-w-4xl">
        <span className="font-mono text-xs uppercase tracking-widest text-brand-slate block mb-3 sm:mb-4">
          // MANIFIESTO DEVTOOLS
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-7xl uppercase leading-[0.95] tracking-tight text-brand-navy mb-6 sm:mb-8">
          MÁS QUE CÓDIGO. <br />
          INGENIERÍA PARA ESCALAR.
        </h2>
        <p className="text-lg sm:text-2xl text-brand-slate leading-relaxed">
          En <strong className="text-brand-navy">DevTools</strong> entendemos que el desarrollo de software no es un evento aislado, sino un{" "}
          <strong className="text-brand-navy font-bold">
            ciclo continuo de evolución, ingeniería rigurosa y valor de negocio.
          </strong>{" "}
          Diseñamos soluciones tecnológicas robustas, mantenibles y listas para responder al crecimiento exponencial de tu empresa.
        </p>
      </div>
    </section>
  );
}
