import React from 'react';

interface BrandEmblemLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

export const BrandEmblemLogo: React.FC<BrandEmblemLogoProps> = ({
  size = 'md',
  className = '',
  showText = false
}) => {
  const sizeMap = {
    sm: { dimension: 32 },
    md: { dimension: 42 },
    lg: { dimension: 72 },
    xl: { dimension: 108 }
  };

  const { dimension } = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* 🌟 3D Golden Knowledge Cube & Book Emblem */}
      <div
        className="relative shrink-0 flex items-center justify-center rounded-xl overflow-hidden shadow-md"
        style={{ width: dimension, height: dimension }}
      >
        <img
          src="/logo.png"
          alt="Syllabus 3D Logo"
          className="w-full h-full object-contain rounded-xl drop-shadow-[0_2px_10px_rgba(234,179,8,0.45)]"
        />
      </div>

      {showText && (
        <span className="font-serif font-black tracking-tight text-slate-900 dark:text-white uppercase">
          SYLLABUS 3D
        </span>
      )}
    </div>
  );
};
