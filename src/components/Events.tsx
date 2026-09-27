import { Reveal } from '@/components/Reveal';
import { SectionLabel } from '@/components/SectionLabel';
import { ArenaVisual } from '@/components/ArenaVisual';
import { EVENTS } from '@/content';

export function Events() {
  return (
    <section id="renginiai" className="relative overflow-hidden py-28 md:py-40">
      <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-magenta/6 blur-[130px]" />

      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal>
          <SectionLabel>Renginiai</SectionLabel>
          <h2 className="mt-8 max-w-3xl text-[10vw] font-light leading-[0.9] tracking-ultra text-white sm:text-[8vw] md:text-[5rem] lg:text-[6rem]">
            Kiekvienam <span className="gradient-text-glow font-medium">šviesa.</span>
          </h2>
        </Reveal>

        {/* Events — alternating editorial rows */}
        <div className="mt-16 md:mt-24">
          {EVENTS.map((event, i) => (
            <Reveal key={event.number} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <article className="group relative grid grid-cols-1 gap-6 border-t border-white/10 py-10 md:grid-cols-12 md:items-center md:gap-8 md:py-16">
                {/* Number */}
                <div className="md:col-span-1">
                  <span className="font-mono text-xs text-white/30 transition-colors group-hover:text-cyan">
                    {event.number}
                  </span>
                </div>

                {/* Title — oversized */}
                <div className="md:col-span-5">
                  <h3 className="text-4xl font-light tracking-ultra text-white transition-all duration-300 group-hover:translate-x-2 group-hover:text-cyan md:text-5xl lg:text-6xl xl:text-7xl">
                    {event.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="md:col-span-3">
                  <p className="max-w-sm text-sm font-light leading-relaxed text-white/50">
                    {event.desc}
                  </p>
                </div>

                {/* Visual thumbnail */}
                <div className="md:col-span-3">
                  <div className="group/img relative aspect-[16/10] overflow-hidden rounded-xl">
                    <ArenaVisual
                      mood={event.mood}
                      showNet={false}
                      intensity={0.6}
                      className="h-full w-full transition-transform duration-[1.5s] ease-out group-hover/img:scale-105"
                    />
                    {/* Glow ring on hover */}
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-cyan/0 transition-all duration-500 group-hover:ring-cyan/30" />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
}
