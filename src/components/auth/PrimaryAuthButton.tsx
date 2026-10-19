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
      className={`w-full h-12 rounded-xl sm:rounded-2xl bg-[#F5C518] hover:bg-[#E5B50F] active:bg-[#CCA00B] text-slate-950 font-black text-sm tracking-wide shadow-md shadow-[#F5C518]/25 transition-all duration-150 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
          <span>Please wait...</span>
        </>
      ) : (
        <>
          <span>{children}</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </>
      )}
    </button>
  );
};
