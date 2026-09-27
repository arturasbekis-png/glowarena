import { Reveal } from '@/components/Reveal';
import { SectionLabel } from '@/components/SectionLabel';
import { ArenaVisual } from '@/components/ArenaVisual';
import { GALLERY_ITEMS } from '@/content';

export function Gallery() {
  return (
    <section id="galerija" className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal>
          <SectionLabel>Galerija</SectionLabel>
        </Reveal>

        <div className="mt-12 flex flex-col justify-between gap-8 md:mt-20 md:flex-row md:items-end">
          <Reveal delay={1}>
            <h2 className="max-w-4xl text-5xl font-light leading-[0.9] tracking-tight text-white md:text-7xl lg:text-8xl">
              PAMATYK
              <br />
              <span className="text-orange-500">ARENĄ.</span>
            </h2>
          </Reveal>

          <Reveal delay={2}>
            <p className="max-w-sm text-sm leading-relaxed text-white/45">
              GLOW BEACH ARENA – smėlis, šviesa ir erdvė sportui bei
              renginiams Vilniuje.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 md:mt-24 md:grid-cols-2">
          {GALLERY_ITEMS.map((item, index) => (
            <Reveal
              key={item.id}
              delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
            >
              <div
                className={`group relative overflow-hidden border border-white/10 bg-[#080a10] ${
                  index === 0 ? 'md:row-span-2' : ''
                }`}
              >
                <div className="aspect-[4/3] md:aspect-[16/10]">
                  <ArenaVisual
                    showNet={index % 2 === 0}
                    intensity={0.45 + (index % 3) * 0.08}
                    className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/80 to-transparent p-6 pt-16">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-orange-500">
                      0{index + 1}
                    </p>
                    <p className="mt-2 text-lg font-light text-white">
                      {item.title}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-white/25">
          Tikros arenos nuotraukos bus įkeltos netrukus
        </p>
      </div>
    </section>
  );
}
