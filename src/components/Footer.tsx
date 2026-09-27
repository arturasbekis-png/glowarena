export function Footer() {
  return (
    <footer className="border-t border-white/8 py-12">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 px-6 md:flex-row md:px-10">
        <div className="flex items-center gap-2 text-sm font-light tracking-tight2">
          <span className="text-white">GLOW</span>
          <span className="text-orange-500">·</span>
          <span className="text-white/60">BEACH ARENA</span>
        </div>

        <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/30">
          Vilnius
        </p>

        <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/30">
          {'\u00A9'} 2026
        </p>
      </div>
    </footer>
  );
}
