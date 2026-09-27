import { Reveal } from '@/components/Reveal';
import { SectionLabel } from '@/components/SectionLabel';
import { ArenaVisual } from '@/components/ArenaVisual';
import { GALLERY_ITEMS } from '@/content';

export function Gallery() {
  return (
    <section id="galerija" className="relative overflow-hidden py-28 md:py-40">
      <div className="absolute right-1/3 bottom-0 h-[400px] w-[400px] rounded-full bg-violet/6 blur-[120px]" />

      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionLabel>Galerija</SectionLabel>
            <h2 className="mt-8 text-[10vw] font-light leading-[0.9] tracking-ultra text-white sm:text-[8vw] md:text-[5rem] lg:text-[6rem]">
              Akimirkos<span className="text-cyan">.</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="max-w-xs text-sm font-light leading-relaxed text-white/50">
              Nuotraukos atnaujinamos reguliariai. Realios arenos nuotraukos bus
              pridėtos greitai.
            </p>
          </Reveal>
        </div>

        {/* Cinematic asymmetric grid */}
        <div className="mt-16 grid auto-rows-[180px] grid-cols-2 gap-3 md:mt-24 md:grid-cols-4 md:gap-4 lg:auto-rows-[300px]">
          {GALLERY_ITEMS.map((item, i) => (
            <Reveal
              key={i}
              delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
              className={`group relative overflow-hidden rounded-xl ${item.span}`}
            >
              {item.type === 'image' ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                  loading="lazy"
                />
              ) : (
                <ArenaVisual
                  mood={item.mood}
                  showNet={i % 2 === 0}
                  intensity={0.65}
                  className="h-full w-full transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />
              )}
              {/* Hover gradient + label */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 flex items-center gap-2 p-4 opacity-0 transition-all duration-500 group-hover:opacity-100">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
                  {item.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
