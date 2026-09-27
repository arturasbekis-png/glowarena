/**
 * ArenaVisual — a custom SVG/CSS cinematic rendering of the GLOW BEACH ARENA
 * interior. No stock photos. Captures the dark indoor beach-volleyball
 * atmosphere with neon cyan, blue, violet and magenta lighting.
 *
 * Props let each section tune the mood (color emphasis, perspective angle).
 */

type ArenaVisualProps = {
  className?: string;
  /** Dominant neon hue for the scene */
  mood?: 'cyan' | 'magenta' | 'violet' | 'mixed';
  /** Show the volleyball net */
  showNet?: boolean;
  /** Intensity of the glow (0–1) */
  intensity?: number;
};

const MOOD_COLORS: Record<string, { primary: string; secondary: string; accent: string }> = {
  cyan: { primary: '#00f0ff', secondary: '#3b82f6', accent: '#8b5cf6' },
  magenta: { primary: '#ff2d95', secondary: '#8b5cf6', accent: '#00f0ff' },
  violet: { primary: '#8b5cf6', secondary: '#3b82f6', accent: '#ff2d95' },
  mixed: { primary: '#00f0ff', secondary: '#8b5cf6', accent: '#ff2d95' },
};

export function ArenaVisual({
  className = '',
  mood = 'mixed',
  showNet = true,
  intensity = 0.7,
}: ArenaVisualProps) {
  const c = MOOD_COLORS[mood];
  const glowOpacity = intensity;

  return (
    <div className={`relative overflow-hidden bg-ink-900 ${className}`}>
      {/* Deep gradient floor — the sand court */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 100%, rgba(${hexToRgb(c.primary)}, ${0.12 * glowOpacity}) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(${hexToRgb(c.secondary)}, ${0.08 * glowOpacity}) 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 80% 30%, rgba(${hexToRgb(c.accent)}, ${0.06 * glowOpacity}) 0%, transparent 50%), linear-gradient(180deg, #05060f 0%, #0a0c1a 50%, #11142a 100%)`,
        }}
      />

      {/* Perspective sand court lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`sand-${mood}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0c1a" stopOpacity="0" />
            <stop offset="40%" stopColor={c.primary} stopOpacity={0.04 * glowOpacity} />
            <stop offset="100%" stopColor={c.primary} stopOpacity={0.10 * glowOpacity} />
          </linearGradient>
          <radialGradient id={`glow-${mood}`} cx="50%" cy="100%" r="60%">
            <stop offset="0%" stopColor={c.primary} stopOpacity={0.15 * glowOpacity} />
            <stop offset="100%" stopColor={c.primary} stopOpacity="0" />
          </radialGradient>
          <filter id={`blur-${mood}`}>
            <feGaussianBlur stdDeviation="40" />
          </filter>
        </defs>

        {/* Sand surface with perspective */}
        <path d="M 0 500 L 1200 500 L 1200 800 L 0 800 Z" fill={`url(#sand-${mood})`} />

        {/* Court boundary lines — perspective trapezoid */}
        <g stroke={c.primary} strokeWidth="1.5" fill="none" opacity={0.25 * glowOpacity}>
          <path d="M 300 520 L 900 520 L 1050 760 L 150 760 Z" />
          <line x1="600" y1="520" x2="600" y2="760" />
        </g>

        {/* Center line glow on sand */}
        <ellipse cx="600" cy="720" rx="500" ry="60" fill={`url(#glow-${mood})`} />

        {/* Neon light bars — overhead arena lights */}
        <g opacity={0.6 * glowOpacity}>
          <rect x="200" y="80" width="800" height="3" rx="1.5" fill={c.primary} filter={`url(#blur-${mood})`} />
          <rect x="200" y="80" width="800" height="1.5" rx="0.75" fill={c.primary} />
          <rect x="100" y="160" width="1000" height="2" rx="1" fill={c.secondary} filter={`url(#blur-${mood})`} opacity="0.5" />
        </g>

        {/* Vertical neon strips — arena wall lighting */}
        <g opacity={0.35 * glowOpacity}>
          <rect x="80" y="0" width="2" height="500" fill={c.primary} filter={`url(#blur-${mood})`} />
          <rect x="80" y="0" width="1" height="500" fill={c.primary} />
          <rect x="1118" y="0" width="2" height="500" fill={c.accent} filter={`url(#blur-${mood})`} />
          <rect x="1118" y="0" width="1" height="500" fill={c.accent} />
        </g>

        {/* Volleyball net */}
        {showNet && (
          <g opacity={0.3 * glowOpacity}>
            <line x1="350" y1="200" x2="850" y2="200" stroke={c.primary} strokeWidth="1.5" />
            <line x1="350" y1="200" x2="350" y2="520" stroke={c.primary} strokeWidth="1" opacity="0.4" />
            <line x1="850" y1="200" x2="850" y2="520" stroke={c.primary} strokeWidth="1" opacity="0.4" />
            {/* Net mesh — subtle grid */}
            {Array.from({ length: 18 }).map((_, i) => (
              <line
                key={`nv-${i}`}
                x1={350 + i * 27.8}
                y1={200}
                x2={350 + i * 27.8}
                y2={500}
                stroke={c.primary}
                strokeWidth="0.5"
                opacity={0.12}
              />
            ))}
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={`nh-${i}`}
                x1={350}
                y1={200 + i * 25}
                x2={850}
                y2={200 + i * 25}
                stroke={c.primary}
                strokeWidth="0.5"
                opacity={0.10}
              />
            ))}
          </g>
        )}

        {/* Floating particles — sand/dust in the light */}
        {Array.from({ length: 40 }).map((_, i) => {
          const x = (i * 137.5) % 1200;
          const y = (i * 73.3) % 800;
          const r = (i % 3) * 0.5 + 0.5;
          const col = i % 3 === 0 ? c.primary : i % 3 === 1 ? c.secondary : c.accent;
          return (
            <circle
              key={`p-${i}`}
              cx={x}
              cy={y}
              r={r}
              fill={col}
              opacity={0.15 * glowOpacity}
            />
          );
        })}
      </svg>

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 30%, rgba(5,6,15,0.6) 80%, rgba(5,6,15,0.95) 100%)',
        }}
      />

      {/* Top gradient for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-ink-900/30" />
    </div>
  );
}

function hexToRgb(hex: string): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}
