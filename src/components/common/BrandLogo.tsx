import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  light?: boolean;
  onClick?: () => void;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = false,
  light = false,
  onClick,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 ${onClick ? 'cursor-pointer select-none' : ''} ${className}`}
    >
      {/* Brand Icon SVG: Paw + Neural AI Pulse */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          {/* Outer gentle AI aura */}
          <circle cx="24" cy="24" r="22" className={light ? "fill-white/10 stroke-white/20" : "fill-forest-50 stroke-sage-border"} strokeWidth="1.5" />
          
          {/* Main Paw Pad - AI Hexagon-organic hybrid */}
          <path
            d="M24 20C20 20 17 23.5 17 27.5C17 32 20.8 35.5 24 35.5C27.2 35.5 31 32 31 27.5C31 23.5 28 20 24 20Z"
            className={light ? "fill-white" : "fill-forest"}
          />
          {/* Inner AI Pulse Core in Main Pad */}
          <circle cx="24" cy="27.5" r="2.5" fill="#19A58C" />
          <path d="M21 27.5H27" stroke="#FF9478" strokeWidth="1" strokeLinecap="round" />

          {/* Left Inner Toe */}
          <ellipse
            cx="18"
            cy="16"
            rx="3.2"
            ry="4.5"
            transform="rotate(-15 18 16)"
            fill="#19A58C"
          />
          {/* Right Inner Toe */}
          <ellipse
            cx="30"
            cy="16"
            rx="3.2"
            ry="4.5"
            transform="rotate(15 30 16)"
            fill="#19A58C"
          />

          {/* Far Left Toe */}
          <ellipse
            cx="12"
            cy="21"
            rx="2.6"
            ry="3.8"
            transform="rotate(-35 12 21)"
            fill="#FF9478"
          />
          {/* Far Right Toe with AI spark */}
          <ellipse
            cx="36"
            cy="21"
            rx="2.6"
            ry="3.8"
            transform="rotate(35 36 21)"
            fill="#FF9478"
          />

          {/* AI Neural Connection lines & nodes */}
          <line x1="18" y1="16" x2="24" y2="20" stroke="#19A58C" strokeWidth="1.2" strokeDasharray="1.5 1.5" opacity="0.8" />
          <line x1="30" y1="16" x2="24" y2="20" stroke="#19A58C" strokeWidth="1.2" strokeDasharray="1.5 1.5" opacity="0.8" />
          <circle cx="24" cy="11" r="1.5" fill="#FF9478" />
          <line x1="24" y1="11" x2="24" y2="15" stroke="#FF9478" strokeWidth="1" />
        </svg>

        {/* Live Spark Indicator */}
        <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-light opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-brand"></span>
        </span>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className={`font-bold tracking-tight leading-none ${textSizes[size]} ${light ? 'text-white' : 'text-forest'}`}>
          <span>PetCare</span>
          <span className="text-emerald-brand ml-1">AI</span>
        </div>
        {showTagline && (
          <span className={`text-[10px] tracking-wide font-medium mt-0.5 ${light ? 'text-white/70' : 'text-charcoal-muted'}`}>
            Every Paw Deserves Smarter Care.
          </span>
        )}
      </div>
    </div>
  );
};
