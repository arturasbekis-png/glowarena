import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { SectionLabel } from '@/components/SectionLabel';
import { ArenaVisual } from '@/components/ArenaVisual';
import { CONTACT } from '@/content';

export function Contact() {
  return (
    <section id="kontaktai" className="relative overflow-hidden py-28 md:py-40">
      <div className="absolute inset-0">
        <ArenaVisual showNet intensity={0.45} className="h-full w-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal>
          <SectionLabel>Kontaktai</SectionLabel>
        </Reveal>

        <Reveal delay={1}>
          <h2 className="mt-10 text-[20vw] font-light leading-[0.82] tracking-ultra text-white md:text-[15vw] lg:text-[12rem] xl:text-[15rem]">
            LET'S
          </h2>
        </Reveal>

        <Reveal delay={2}>
          <h2 className="text-[20vw] font-medium leading-[0.82] tracking-ultra text-orange-500 md:text-[15vw] lg:text-[12rem] xl:text-[15rem]">
            GLOW.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-12">
          <Reveal className="md:col-span-7" delay={1}>
            <div className="space-y-8">
              <ContactRow
                icon={<MapPin className="h-5 w-5" />}
                label="Adresas"
                value={CONTACT.address}
              />

              <ContactRow
                icon={<Phone className="h-5 w-5" />}
                label="Telefonas"
                value={CONTACT.phone}
                href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
              />

              <ContactRow
                icon={<Mail className="h-5 w-5" />}
                label="El. paštas"
                value={CONTACT.email}
                href={`mailto:${CONTACT.email}`}
              />
            </div>
          </Reveal>

          <Reveal className="md:col-span-5 md:flex md:items-end" delay={2}>
            <div className="w-full">
              <a
                href={`mailto:${CONTACT.email}`}
                className="group flex w-full items-center justify-between border border-orange-500 bg-orange-500 px-8 py-7 text-black transition-all duration-300 hover:bg-orange-400"
              >
                <span className="text-2xl font-semibold tracking-tight2 md:text-3xl">
                  REZERVUOTI
                </span>
                <ArrowRight className="h-7 w-7 transition-transform duration-300 group-hover:translate-x-2" />
              </a>

              <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-white/30">
                Susisiekite dėl rezervacijos
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="group flex items-start gap-5 border-t border-white/10 pt-6 transition-colors hover:border-orange-500/40">
      <span className="mt-1 text-orange-500 transition-colors group-hover:text-orange-400">
        {icon}
      </span>

      <div>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/30">
          {label}
        </p>

        <p className="mt-1 text-xl font-light text-white transition-colors group-hover:text-orange-500 md:text-2xl">
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
}
