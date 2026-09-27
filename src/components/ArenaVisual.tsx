type ArenaVisualProps = {
  className?: string;
  showNet?: boolean;
  intensity?: number;
};

export function ArenaVisual({
  className = '',
  showNet = true,
  intensity = 0.7,
}: ArenaVisualProps) {
  const orange = '#ff5a00';
  const white = '#f5f5f2';
  const glowOpacity = intensity;

  return (
    <div className={`relative overflow-hidden bg-[#080a10] ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 75% 55% at 50% 100%,
              rgba(255, 90, 0, ${0.14 * glowOpacity}) 0%,
              transparent 65%
            ),
            radial-gradient(
              ellipse 60% 45% at 50% 20%,
              rgba(255, 255, 255, ${0.035 * glowOpacity}) 0%,
              transparent 65%
            ),
            linear-gradient(
              180deg,
              #080a10 0%,
              #0b0d12 55%,
              #15171d 100%
            )
          `,
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="arena-sand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#080a10" stopOpacity="0" />
            <stop offset="55%" stopColor={orange} stopOpacity={0.035 * glowOpacity} />
            <stop offset="100%" stopColor={orange} stopOpacity={0.11 * glowOpacity} />
          </linearGradient>

          <radialGradient id="arena-glow" cx="50%" cy="100%" r="65%">
            <stop offset="0%" stopColor={orange} stopOpacity={0.18 * glowOpacity} />
            <stop offset="100%" stopColor={orange} stopOpacity="0" />
          </radialGradient>

          <filter id="arena-blur">
            <feGaussianBlur stdDeviation="35" />
          </filter>
        </defs>

        {/* Sand court */}
        <path
          d="M 0 500 L 1200 500 L 1200 800 L 0 800 Z"
          fill="url(#arena-sand)"
        />

        {/* Court lines */}
        <g
          stroke={white}
          strokeWidth="1.5"
          fill="none"
          opacity={0.16 * glowOpacity}
        >
          <path d="M 300 520 L 900 520 L 1050 760 L 150 760 Z" />
          <line x1="600" y1="520" x2="600" y2="760" />
        </g>

        {/* Orange light across the arena */}
        <g opacity={0.7 * glowOpacity}>
          <rect
            x="200"
            y="90"
            width="800"
            height="4"
            rx="2"
            fill={orange}
            filter="url(#arena-blur)"
          />
          <rect
            x="200"
            y="90"
            width="800"
            height="2"
            rx="1"
            fill={orange}
          />
        </g>

        {/* Subtle side lights */}
        <g opacity={0.22 * glowOpacity}>
          <rect
            x="80"
            y="0"
            width="2"
            height="500"
            fill={orange}
            filter="url(#arena-blur)"
          />
          <rect
            x="80"
            y="0"
            width="1"
            height="500"
            fill={orange}
          />

          <rect
            x="1118"
            y="0"
            width="2"
            height="500"
            fill={orange}
            filter="url(#arena-blur)"
          />
          <rect
            x="1118"
            y="0"
            width="1"
            height="500"
            fill={orange}
          />
        </g>

        {/* Volleyball net */}
        {showNet && (
          <g opacity={0.25 * glowOpacity}>
            <line
              x1="350"
              y1="200"
              x2="850"
              y2="200"
              stroke={white}
              strokeWidth="1.5"
            />

            <line
              x1="350"
              y1="200"
              x2="350"
              y2="520"
              stroke={white}
              strokeWidth="1"
            />

            <line
              x1="850"
              y1="200"
              x2="850"
              y2="520"
              stroke={white}
              strokeWidth="1"
            />

            {Array.from({ length: 18 }).map((_, i) => (
              <line
                key={`vertical-${i}`}
                x1={350 + i * 27.8}
                y1="200"
                x2={350 + i * 27.8}
                y2="500"
                stroke={white}
                strokeWidth="0.5"
                opacity="0.18"
              />
            ))}

            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={`horizontal-${i}`}
                x1="350"
                y1={200 + i * 25}
                x2="850"
                y2={200 + i * 25}
                stroke={white}
                strokeWidth="0.5"
                opacity="0.14"
              />
            ))}
          </g>
        )}

        {/* Very subtle dust particles */}
        {Array.from({ length: 25 }).map((_, i) => {
          const x = (i * 137.5) % 1200;
          const y = (i * 73.3) % 800;
          const r = (i % 3) * 0.5 + 0.5;

          return (
            <circle
              key={`particle-${i}`}
              cx={x}
              cy={y}
              r={r}
              fill={orange}
              opacity={0.08 * glowOpacity}
            />
          );
        })}

        <ellipse
          cx="600"
          cy="720"
          rx="500"
          ry="60"
          fill="url(#arena-glow)"
        />
      </svg>

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 30%, rgba(8,10,16,0.58) 80%, rgba(8,10,16,0.94) 100%)',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#080a10]/50 via-transparent to-[#080a10]/25" />
    </div>
  );
}
