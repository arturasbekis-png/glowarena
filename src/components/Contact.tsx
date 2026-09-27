import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { SectionLabel } from '@/components/SectionLabel';
import { ArenaVisual } from '@/components/ArenaVisual';
import { CONTACT } from '@/content';

export function Contact() {
  return (
    <section id="kontaktai" className="relative overflow-hidden py-28 md:py-40">
      {/* Full-bleed arena visual background */}
      <div className="absolute inset-0">
        <ArenaVisual mood="mixed" showNet intensity={0.5} className="h-full w-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal>
          <SectionLabel>Kontaktai</SectionLabel>
        </Reveal>

        {/* Massive CTA headline */}
        <Reveal delay={1}>
          <h2 className="mt-10 text-[20vw] font-light leading-[0.82] tracking-ultra text-white md:text-[15vw] lg:text-[12rem] xl:text-[15rem]">
            LET'S
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <h2 className="text-[20vw] font-medium leading-[0.82] tracking-ultra gradient-text-glow md:text-[15vw] lg:text-[12rem] xl:text-[15rem]">
            GLOW.
          </h2>
        </Reveal>

        {/* Contact details + CTA */}
        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-12">
          <Reveal className="md:col-span-7" delay={1}>
            <div className="space-y-8">
              <ContactRow icon={<MapPin className="h-5 w-5" />} label="Adresas" value={CONTACT.address} />
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
                className="group flex w-full items-center justify-between rounded-2xl border border-cyan/30 bg-cyan/5 px-8 py-7 backdrop-blur-sm transition-all duration-300 hover:bg-cyan hover:text-ink-900 hover:glow-cyan"
              >
                <span className="text-2xl font-light tracking-tight2 md:text-3xl">
                  REZERVUOTI
                </span>
                <ArrowRight className="h-7 w-7 text-cyan transition-all duration-300 group-hover:translate-x-2 group-hover:text-ink-900" />
              </a>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-white/30">
                Atsakome per 24 val.
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
    <div className="group flex items-start gap-5 border-t border-white/10 pt-6 transition-colors hover:border-cyan/30">
      <span className="mt-1 text-cyan/70 transition-colors group-hover:text-cyan">{icon}</span>
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/30">{label}</p>
        <p className="mt-1 text-xl font-light text-white transition-colors group-hover:text-cyan md:text-2xl">
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
