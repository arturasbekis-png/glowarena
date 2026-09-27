import { Reveal } from '@/components/Reveal';
import { SectionLabel } from '@/components/SectionLabel';
import { ArenaVisual } from '@/components/ArenaVisual';

export function About() {
  return (
    <section id="apie" className="relative overflow-hidden py-28 md:py-40">
      {/* Ambient glow */}
      <div className="absolute left-0 top-1/3 h-[400px] w-[400px] rounded-full bg-violet/8 blur-[120px]" />

      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal>
          <SectionLabel>Apie areną</SectionLabel>
        </Reveal>

        {/* Oversized editorial message */}
        <div className="mt-12 md:mt-20">
          <Reveal delay={1}>
            <h2 className="text-[10vw] font-light leading-[0.9] tracking-ultra text-white sm:text-[8vw] md:text-[6vw] lg:text-[5.5rem] xl:text-[6.5rem]">
              Ne tik aikštelė.
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <h2 className="text-[10vw] font-medium leading-[0.9] tracking-ultra gradient-text-glow sm:text-[8vw] md:text-[6vw] lg:text-[5.5rem] xl:text-[6.5rem]">
              Visa atmosfera.
            </h2>
          </Reveal>
        </div>

        {/* Asymmetric content row */}
        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-12 md:gap-8">
          {/* Left — large visual */}
          <Reveal className="md:col-span-7" delay={1}>
            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl md:aspect-[16/11]">
              <ArenaVisual
                mood="mixed"
                showNet
                intensity={0.75}
                className="h-full w-full transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
              />
              {/* Caption overlay */}
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
                  [ Arena · Vilnius ]
                </span>
              </div>
            </div>
          </Reveal>

          {/* Right — text */}
          <Reveal className="md:col-span-5 md:flex md:flex-col md:justify-end" delay={2}>
            <div className="space-y-6">
              <p className="text-lg font-light leading-relaxed text-white/70 md:text-xl">
                GLOW BEACH ARENA sujungia paplūdimio tinklinį, renginius ir
                pramogas vienoje erdvėje — su smėliu, šviesa ir energija, kurios
                nejauti jokiame kitame Vilniaus kampelyje.
              </p>
              <p className="text-base font-light leading-relaxed text-white/50">
                Tai vieta, kur sportas tampa patirtimi, o kiekvienas renginys —
                atmosfera. Tamsi erdvė, neon šviesa ir tikras smėlis.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Pillars — oversized text, no cards */}
        <div className="mt-20 grid grid-cols-2 gap-y-10 md:mt-32 md:grid-cols-4 md:gap-x-8">
          {[
            { label: 'Smėlis', desc: 'Tikras paplūdimio jausmas' },
            { label: 'Šviesa', desc: 'Neon atmosfera' },
            { label: 'Energija', desc: 'Varžybos ir bendrystė' },
            { label: 'Renginiai', desc: 'Šventės ir gimtadieniai' },
          ].map((item, i) => (
            <Reveal key={item.label} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <div className="border-t border-white/10 pt-5">
                <p className="text-3xl font-light text-white md:text-4xl lg:text-5xl">
                  {item.label}
                </p>
                <p className="mt-3 font-mono text-xs uppercase tracking-[0.15em] text-white/40">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
