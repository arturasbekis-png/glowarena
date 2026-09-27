import { useEffect, useState } from 'react';
import { X, Plus } from 'lucide-react';
import { MENU_ITEMS, CONTACT } from '@/content';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleNav = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ink-900/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10 md:py-7">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-sm font-medium tracking-tight2 md:text-base"
          >
            <span className="text-white">GLOW</span>
            <span className="mx-1.5 text-cyan">·</span>
            <span className="text-white/80">BEACH ARENA</span>
          </a>

          <button
            onClick={() => setOpen(true)}
            className="group flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-cyan"
            aria-label="Atidaryti meniu"
          >
            <span>MENIU</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 transition-all group-hover:border-cyan group-hover:text-cyan">
              <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
          </button>
        </div>
      </header>

      {/* Menu Panel */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 ${
          open ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-ink-900/70 backdrop-blur-md transition-opacity duration-500 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setOpen(false)}
        />

        {/* Panel */}
        <nav
          className={`absolute right-0 top-0 flex h-full w-full max-w-[680px] flex-col justify-between px-8 py-10 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:px-14 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            backgroundImage:
              'radial-gradient(circle at 80% 20%, rgba(0,240,255,0.08), transparent 50%), radial-gradient(circle at 20% 80%, rgba(255,45,149,0.08), transparent 50%), linear-gradient(180deg, #0a0c1a, #05060f)',
          }}
          aria-hidden={!open}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
              Meniu
            </span>
            <button
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all hover:border-magenta hover:text-magenta"
              aria-label="Uždaryti meniu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Items */}
          <ul className="flex flex-col gap-0 py-10">
            {MENU_ITEMS.map((item, i) => (
              <li
                key={item.number}
                className="overflow-hidden"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateX(0)' : 'translateX(30px)',
                  transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.06}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.06}s`,
                }}
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(item.href);
                  }}
                  className="group flex items-baseline gap-5 border-b border-white/5 py-5 transition-colors hover:border-cyan/30"
                >
                  <span className="font-mono text-xs text-white/30 transition-colors group-hover:text-cyan">
                    {item.number}
                  </span>
                  <span
                    className={`text-4xl font-light tracking-tight2 transition-all duration-300 group-hover:translate-x-2 md:text-5xl lg:text-6xl ${
                      item.cta
                        ? 'gradient-text-glow text-5xl font-medium md:text-6xl lg:text-7xl'
                        : 'text-white group-hover:text-cyan'
                    }`}
                  >
                    {item.label}
                    {item.cta && <span className="ml-3 text-cyan">{'\u2192'}</span>}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Bottom info */}
          <div className="space-y-3 font-mono text-xs text-white/40">
            <p>{CONTACT.address}</p>
            <p>{CONTACT.phone}</p>
            <p className="text-white/25">Smėlis · Šviesa · Energija</p>
          </div>
        </nav>
      </div>
    </>
  );
}
