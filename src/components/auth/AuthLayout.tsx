import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  onBackToLanding?: () => void;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, onBackToLanding }) => {
  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] dark:bg-[#18181D] text-[#171717] dark:text-[#F5F5F7] flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 relative overflow-x-hidden selection:bg-[#D4AF37]/30 transition-colors duration-200">
      {/* Subtle Background Radial Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-gradient-to-tr from-[#D4AF37]/10 via-[#F5E6C8]/10 to-[#D4AF37]/5 rounded-full blur-[120px]" />
      </div>

      {/* Centered Constrained Auth Card (420-460px max width) */}
      <div className="relative z-10 w-full max-w-[440px] p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-[#202020]/95 border border-[#EBD3A0] dark:border-[#272730] shadow-2xl backdrop-blur-xl animate-fade-in my-auto">
        {onBackToLanding && (
          <button
            type="button"
            onClick={onBackToLanding}
            className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        )}
        {children}
      </div>

      {/* Footer Branding */}
      <div className="relative z-10 text-center mt-6 text-[11px] font-semibold text-[#6B7280]">
        SYLLABUS 3D · Smart Exam Mastery Platform
      </div>
    </div>
  );
};
