import { ArenaVisual } from '@/components/ArenaVisual';

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-end overflow-hidden">
      {/* Custom arena visual background */}
      <div className="absolute inset-0">
        <ArenaVisual mood="mixed" showNet intensity={0.8} className="h-full w-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-20 pt-32 md:px-10 md:pb-28">
        {/* Mono label */}
        <div
          className="mb-10 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan opacity-0 animate-fade-in md:mb-14"
          style={{ animationDelay: '0.3s' }}
        >
          <span className="h-px w-12 bg-cyan" />
          Vilnius · Lietuva
        </div>

        {/* Headline вЂ” massive, asymmetric */}
        <h1 className="font-sans font-light leading-[0.82] tracking-ultra">
          <span
            className="block text-[18vw] text-white opacity-0 animate-fade-up md:text-[16vw] lg:text-[13rem] xl:text-[16rem]"
            style={{ animationDelay: '0.4s' }}
          >
            GLOW
          </span>
          <span
            className="block text-[13vw] text-white opacity-0 animate-fade-up md:text-[11vw] lg:text-[9rem] xl:text-[11rem]"
            style={{ animationDelay: '0.55s' }}
          >
            <span className="text-white">BEACH</span>{' '}
            <span className="gradient-text-glow font-medium">ARENA</span>
          </span>
        </h1>

        {/* Subtitle + CTA row */}
        <div className="mt-12 flex flex-col gap-8 md:mt-16 md:flex-row md:items-end md:justify-between">
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: '0.7s' }}>
            <p className="text-lg font-light text-white/90 md:text-3xl lg:text-4xl">
              Paplūdimio tinklinio arena Vilniuje
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan/70">
              SmД—lis. Е viesa. Energija.
            </p>
          </div>

          <a
            href="#kontaktai"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#kontaktai')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-3 self-start rounded-full border border-cyan/40 bg-cyan/5 px-8 py-4 text-sm font-medium tracking-tight2 text-white transition-all duration-300 hover:bg-cyan hover:text-ink-900 hover:glow-cyan md:self-auto"
          >
            REZERVUOTI
            <span className="text-cyan transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink-900">
              {'\u2192'}
            </span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-cyan/50 to-transparent" />
      </div>
    </section>
  );
}


