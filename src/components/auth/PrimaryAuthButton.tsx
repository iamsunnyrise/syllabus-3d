import React from 'react';
import { Loader2, ArrowRight } from 'lucide-react';

interface PrimaryAuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
}

export const PrimaryAuthButton: React.FC<PrimaryAuthButtonProps> = ({
  isLoading,
  children,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={isLoading || disabled}
      className={`relative w-full h-12 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/35 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer group overflow-hidden ${className}`}
    >
      {/* Subtle light sweep reflection */}
      <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />

      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
          <span>Please wait...</span>
        </>
      ) : (
        <>
          <span>{children}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </>
      )}
    </button>
  );
};
