import { Reveal } from '@/components/Reveal';
import { SectionLabel } from '@/components/SectionLabel';
import { PRICES } from '@/content';

export function Prices() {
  return (
    <section id="kainos" className="relative overflow-hidden py-28 md:py-40">
      <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-orange-500/6 blur-[120px]" />

      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionLabel>Kainos</SectionLabel>
            <h2 className="mt-8 text-[10vw] font-light leading-[0.9] tracking-ultra text-white sm:text-[8vw] md:text-[5rem] lg:text-[6rem]">
              Kainos<span className="text-orange-500">.</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="max-w-sm text-sm font-light leading-relaxed text-white/50 md:text-right">
              Galutinė kaina priklauso nuo datos, trukmės ir žmonių skaičiaus.
              Susisiekite tiksliam pasiūlymui.
            </p>
          </Reveal>
        </div>

        {/* Price list — editorial, no cards */}
        <div className="mt-16 md:mt-24">
          {PRICES.map((item, i) => (
            <Reveal key={item.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <div className="group relative border-t border-white/10 py-8 transition-colors duration-300 hover:border-orange-500/30 md:py-12">
                {/* Hover background sweep */}
                <div className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-orange-500/[0.03] to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100" />

                <div className="relative flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
                  <div className="flex items-baseline gap-4 md:gap-8">
                    <span className="font-mono text-xs text-white/30 transition-colors group-hover:text-orange-500">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-3xl font-light tracking-tight2 text-white transition-all duration-300 group-hover:translate-x-2 group-hover:text-orange-500 md:text-5xl lg:text-6xl">
                      {item.title}
                    </h3>
                  </div>
                  <div className="pl-8 md:pl-0">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-orange-500/70 md:text-sm">
                      {item.price}
                    </span>
                  </div>
                </div>
                <p className="relative mt-3 max-w-lg pl-8 text-sm font-light text-white/40 md:pl-[3.5rem]">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
}
