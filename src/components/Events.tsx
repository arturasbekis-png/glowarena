import { Reveal } from '@/components/Reveal';
import { SectionLabel } from '@/components/SectionLabel';
import { EVENTS } from '@/content';

export function Events() {
  return (
    <section id="renginiai" className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal>
          <SectionLabel>Renginiai</SectionLabel>
        </Reveal>

        <div className="mt-12 max-w-4xl md:mt-20">
          <Reveal delay={1}>
            <h2 className="text-5xl font-light leading-[0.9] tracking-tight text-white md:text-7xl lg:text-8xl">
              ERDVĖ
              <br />
              <span className="text-orange-500">ĮVYKIAMS.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 border-t border-white/10 md:mt-24">
          {EVENTS.map((event, index) => (
            <Reveal key={event.title} delay={((index % 4) + 1) as 1 | 2 | 3 | 4}>
              <div className="group grid gap-6 border-b border-white/10 py-8 transition-colors duration-300 hover:bg-white/[0.025] md:grid-cols-[90px_1fr_auto] md:items-center md:gap-10 md:py-10">
                <span className="font-mono text-xs tracking-[0.2em] text-orange-500">
                  0{index + 1}
                </span>

                <h3 className="text-2xl font-light text-white transition-colors duration-300 group-hover:text-orange-500 md:text-4xl">
                  {event.title}
                </h3>

                <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/35">
                  GLOW BEACH ARENA
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
