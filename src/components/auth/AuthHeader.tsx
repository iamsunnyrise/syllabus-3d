import React from 'react';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle, badge }) => {
  return (
    <div className="flex flex-col items-center text-center mb-6">
      {/* App Logo with luxury glow ring */}
      <div className="relative mb-3 group">
        <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 opacity-40 blur-md group-hover:opacity-60 transition duration-300" />
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#0D0F1A] border border-amber-500/40 p-2.5 flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-105">
          <img
            src="/logo.png"
            alt="SYLLABUS 3D Logo"
            className="w-full h-full object-contain drop-shadow"
          />
        </div>
      </div>

      {badge ? (
        <span className="mb-2 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 dark:bg-amber-400/15 border border-amber-500/25 text-amber-800 dark:text-amber-300 text-[10px] font-black uppercase tracking-wider">
          {badge}
        </span>
      ) : null}

      {/* Heading & Subtitle */}
      <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white warm-cream:text-[#232001]">
        {title}
      </h1>
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 warm-cream:text-[#5E5211] mt-1.5 max-w-sm font-medium leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};
