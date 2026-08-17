import React, { useState } from 'react';
import logoImg from '../assets/images/cleaning-services-header-logo.png';
import { Sparkles } from 'lucide-react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'auto';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const [imgError, setImgError] = useState(false);

  const heightClasses = {
    sm: 'h-10 sm:h-11',
    md: 'h-12 sm:h-14 lg:h-16',
    lg: 'h-16 sm:h-20 lg:h-22',
    xl: 'h-20 sm:h-24 lg:h-28',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {!imgError ? (
        <img
          src={logoImg || '/images/header-logo.png'}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src.includes('header-logo.png')) {
              target.src = '/images/Logo-Cleanza.png';
            } else {
              setImgError(true);
            }
          }}
          alt="Dua & Ari Gebäudereinigung"
          referrerPolicy="no-referrer"
          className={`${heightClasses[size]} w-auto max-w-[220px] sm:max-w-[260px] object-contain block drop-shadow-xs transition-transform duration-200 hover:scale-105`}
        />
      ) : (
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1855EA] to-[#0084FF] flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-lg tracking-tight text-slate-900 leading-none">
              DUA &amp; ARI
            </span>
            <span className="text-[10px] font-bold tracking-widest text-[#1855EA] uppercase">
              Gebäudereinigung
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

