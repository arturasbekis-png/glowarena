import { MENU_ITEMS } from '@/content';

export function Header() {
  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080a10]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="shrink-0 text-lg font-bold tracking-tight text-white">
          GLOW <span className="text-orange-500">BEACH ARENA</span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {MENU_ITEMS.filter((item) => !item.cta).map((item) => (
            <a key={item.href} href={item.href} onClick={(e) => { e.preventDefault(); handleNav(item.href); }} className="text-sm font-medium text-white/70 transition-colors hover:text-orange-500">
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#kontaktai" onClick={(e) => { e.preventDefault(); handleNav('#kontaktai'); }} className="hidden bg-orange-500 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-orange-400 sm:inline-flex">
          Rezervuoti
        </a>

        <details className="relative lg:hidden">
          <summary className="cursor-pointer list-none text-sm font-semibold uppercase tracking-wide text-white">Meniu</summary>
          <div className="absolute right-0 top-10 w-56 border border-white/10 bg-[#080a10] p-3 shadow-2xl">
            {MENU_ITEMS.filter((item) => !item.cta).map((item) => (
              <a key={item.href} href={item.href} onClick={(e) => { e.preventDefault(); handleNav(item.href); }} className="block border-b border-white/5 px-3 py-3 text-sm text-white/80 last:border-0 hover:text-orange-500">
                {item.label}
              </a>
            ))}
            <a href="#kontaktai" onClick={(e) => { e.preventDefault(); handleNav('#kontaktai'); }} className="mt-2 block bg-orange-500 px-3 py-3 text-center text-sm font-bold uppercase text-black">
              Rezervuoti
            </a>
          </div>
        </details>
      </div>
    </header>
  );
}
