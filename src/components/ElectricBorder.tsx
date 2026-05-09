import { ReactNode, useId } from 'react';

interface ElectricBorderProps {
  children: ReactNode;
  /** Hue variant: 'primary' (teal), 'accent' (purple), 'pink' */
  variant?: 'primary' | 'accent' | 'pink';
  /** Border radius in px */
  radius?: number;
  className?: string;
  /** Additional inline styles for the outer wrapper */
  style?: React.CSSProperties;
}

const variantColors: Record<string, { border: string; light: string; gradient: string }> = {
  primary: {
    border: 'hsl(174 100% 50%)',
    light: 'hsl(174 100% 70%)',
    gradient: 'hsl(174 100% 30% / 0.4)',
  },
  accent: {
    border: 'hsl(280 100% 65%)',
    light: 'hsl(280 100% 80%)',
    gradient: 'hsl(280 100% 35% / 0.4)',
  },
  pink: {
    border: 'hsl(330 100% 60%)',
    light: 'hsl(330 100% 75%)',
    gradient: 'hsl(330 100% 35% / 0.4)',
  },
};

/**
 * Animated electric/turbulent border effect using SVG feTurbulence + feDisplacementMap.
 * Wraps any content with a glowing, distorted neon border.
 */
const ElectricBorder = ({
  children,
  variant = 'primary',
  radius = 16,
  className = '',
  style,
}: ElectricBorderProps) => {
  const uid = useId().replace(/:/g, '');
  const filterId = `eb-turb-${uid}`;
  const colors = variantColors[variant];
  const r = `${radius}px`;

  return (
    <div
      className={`relative ${className}`}
      style={{
        borderRadius: r,
        padding: 2,
        background: `linear-gradient(-30deg, ${colors.gradient}, transparent, ${colors.gradient})`,
        ...style,
      }}
    >
      {/* SVG turbulence filter */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter
            id={filterId}
            colorInterpolationFilters="sRGB"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="n1" seed="1" />
            <feOffset in="n1" dx="0" dy="0" result="o1">
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="n2" seed="1" />
            <feOffset in="n2" dx="0" dy="0" result="o2">
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="n3" seed="2" />
            <feOffset in="n3" dx="0" dy="0" result="o3">
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="n4" seed="2" />
            <feOffset in="n4" dx="0" dy="0" result="o4">
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feComposite in="o1" in2="o2" result="part1" />
            <feComposite in="o3" in2="o4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combined" />
            <feDisplacementMap in="SourceGraphic" in2="combined" scale="20" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </defs>
      </svg>

      <div className="relative" style={{ borderRadius: r }}>
        {/* Animated turbulent border */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: r,
            border: `2px solid ${colors.border}`,
            filter: `url(#${filterId})`,
          }}
        />
        {/* Soft glow blur layer */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: r,
            border: `2px solid ${colors.light}`,
            filter: 'blur(4px)',
            opacity: 0.6,
          }}
        />
        {/* Outer ambient glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            borderRadius: r,
            background: `linear-gradient(-30deg, ${colors.light}, transparent, ${colors.border})`,
            filter: 'blur(28px)',
            transform: 'scale(1.05)',
            opacity: 0.25,
          }}
        />
        {/* Content */}
        <div className="relative" style={{ borderRadius: r, overflow: 'hidden' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ElectricBorder;
