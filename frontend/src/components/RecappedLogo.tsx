import React from 'react';
import Image from 'next/image';

interface RecappedLogoProps {
  className?: string;
  size?: number;
  heroMode?: boolean;
}

export const RecappedLogo: React.FC<RecappedLogoProps> = ({
  className = '',
  size = 60,
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
            position: 'relative',
            animation:
              'logoDrop 0.9s cubic-bezier(0.34,1.28,0.64,1) 0.1s both, logoFloat 4s ease-in-out 1.2s infinite, glowBreathe 3.5s ease-in-out 1.2s infinite',
            filter: 'drop-shadow(0 0 28px rgba(77,124,254,0.65)) brightness(1.08)',
          }}
        >
          <Image
            src="/recapped.png"
            alt="Recapped Logo"
            width={size}
            height={size}
            priority
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
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
        position: 'relative',
        filter: 'drop-shadow(0 0 8px rgba(77,124,254,0.4))',
      }}
    >
      <Image
        src="/recapped.png"
        alt="Recapped Logo"
        width={size}
        height={size}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  );
};
