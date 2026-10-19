import React from 'react';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle, badge }) => {
  return (
    <div className="flex flex-col items-start text-left mb-6">
      {/* Brand Header with Circular Gold Logo Badge */}
      <div className="flex items-center gap-2.5 mb-5 select-none">
        <div className="w-8 h-8 rounded-full bg-[#F5C518] text-slate-950 flex items-center justify-center p-1.5 shadow-md shrink-0">
          <img
            src="/logo.png"
            alt="SYLLABUS 3D"
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-sm font-black tracking-wider text-white uppercase font-sans">
          SYLLABUS 3D
        </span>
      </div>

      {badge && (
        <span className="mb-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F5C518]/15 border border-[#F5C518]/30 text-[#F5C518] text-[10px] font-black uppercase tracking-wider">
          {badge}
        </span>
      )}

      {/* Heading & Subtitle */}
      <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
        {title}
      </h1>
      <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-sm font-medium leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};
