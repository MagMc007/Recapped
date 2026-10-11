import React from 'react';

interface RecappedLogoProps {
  className?: string;
  size?: number;
  heroMode?: boolean;
}

export const RecappedLogo: React.FC<RecappedLogoProps> = ({
  className = '',
  size = 48,
  heroMode = false,
}) => {
  if (heroMode) {
    return (
      <div
        className={`relative inline-flex items-center justify-center select-none ${className}`}
        style={{ width: size, height: size }}
      >
        {/* Expanding halo rings */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '2px solid var(--accent)',
            animation: 'haloExpand 2.2s ease-out 0.5s both',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '2px solid var(--accent-light)',
            animation: 'haloExpand 2.2s ease-out 0.9s both',
            pointerEvents: 'none',
          }}
        />

        {/* Brand logo container with drop-in, subtle float & breathing glow */}
        <div
          style={{
            width: size,
            height: size,
            animation:
              'logoDrop 0.9s cubic-bezier(0.34,1.28,0.64,1) 0.1s both, logoFloat 4s ease-in-out 1.2s infinite, glowBreathe 3.5s ease-in-out 1.2s infinite',
            filter: 'drop-shadow(0 0 28px rgba(77,124,254,0.65)) brightness(1.08)',
          }}
        >
          <LogoSVG size={size} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-center select-none ${className}`}
      style={{
        width: size,
        height: size,
        filter: 'drop-shadow(0 0 8px rgba(77,124,254,0.4))',
      }}
    >
      <LogoSVG size={size} />
    </div>
  );
};

const LogoSVG: React.FC<{ size: number }> = ({ size }) => (
  <svg
    viewBox="0 0 500 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: size, height: size }}
  >
    <defs>
      <linearGradient id="mainBlueGrad" x1="120" y1="100" x2="420" y2="400" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4368FF" />
        <stop offset="0.6" stopColor="#3557F2" />
        <stop offset="1" stopColor="#2547E5" />
      </linearGradient>

      <linearGradient id="facetShadowGrad" x1="200" y1="200" x2="420" y2="420" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#1E3ECC" stopOpacity="0" />
        <stop offset="1" stopColor="#122BAA" stopOpacity="0.45" />
      </linearGradient>

      <filter id="logoGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#2563EB" floodOpacity="0.35" />
      </filter>
    </defs>

    {/* 1. Outer Dark Blue Contour Line Loop */}
    <path
      d="M 125 75 
         C 80 50, 20 80, 25 140 
         L 95 385 
         C 110 440, 160 455, 200 425 
         L 360 270 
         C 410 220, 375 160, 310 135 
         Z"
      stroke="#0037CE"
      strokeWidth="28"
      strokeLinejoin="round"
      strokeLinecap="round"
      className="opacity-95"
    />

    {/* 2. Solid Vibrant Blue Rounded Play Triangle */}
    <g filter="url(#logoGlowFilter)">
      <path
        d="M 115 130 
           C 115 100, 150 80, 180 95 
           L 415 220 
           C 445 235, 445 275, 415 290 
           L 180 415 
           C 150 430, 115 410, 115 380 
           Z"
        fill="url(#mainBlueGrad)"
      />

      {/* Diagonal shadow half */}
      <path
        d="M 230 185 
           L 415 220 
           C 445 235, 445 275, 415 290 
           L 180 415 
           C 155 428, 130 420, 120 405 
           Z"
        fill="url(#facetShadowGrad)"
      />
    </g>

    {/* 3. The Authentic White Brush-Script "Recapped" text */}
    <g transform="translate(48, 25) rotate(-6 250 250)">
      <text
        x="248"
        y="262"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#102580"
        opacity="0.3"
        style={{
          fontFamily: "'Kaushan Script', 'Caveat', cursive, sans-serif",
          fontSize: '84px',
          fontWeight: 800,
          fontStyle: 'italic',
          letterSpacing: '0.01em',
        }}
      >
        Recapped
      </text>

      <text
        x="245"
        y="258"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#FFFFFF"
        style={{
          fontFamily: "'Kaushan Script', 'Caveat', cursive, sans-serif",
          fontSize: '84px',
          fontWeight: 800,
          fontStyle: 'italic',
          letterSpacing: '0.01em',
        }}
      >
        Recapped
      </text>
    </g>
  </svg>
);
