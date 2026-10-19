import React, { forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';

interface AuthTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
  error?: string;
  hint?: string;
}

export const AuthTextField = forwardRef<HTMLInputElement, AuthTextFieldProps>(({
  label,
  icon: Icon,
  error,
  hint,
  id,
  className = '',
  ...props
}, ref) => {
  const inputId = id || 'auth_input_' + Math.random().toString(36).substr(2, 9);

  return (
    <div className="space-y-1.5 text-left">
      <div className="flex items-center justify-between">
        <label
          htmlFor={inputId}
          className="auth-label block text-xs font-extrabold text-slate-200"
        >
          {label}
        </label>
        {hint && (
          <span className="text-[10px] font-semibold text-slate-400">
            {hint}
          </span>
        )}
      </div>

      <div className="relative flex items-center">
        <div className="absolute left-3.5 pointer-events-none text-slate-400">
          <Icon className="w-4 h-4" />
        </div>

        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`auth-input w-full pl-10 pr-3.5 py-3 rounded-xl sm:rounded-2xl bg-[#080B14] border text-xs sm:text-sm font-semibold text-white placeholder-slate-400 focus:outline-none focus:ring-1 transition-all ${
            error
              ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/30'
              : 'border-white/10 hover:border-white/20 focus:border-[#F5C518] focus:ring-[#F5C518]/30'
          } ${className}`}
          {...props}
        />
      </div>

      {error && (
        <p
          id={`${inputId}-error`}
          className="text-[11px] font-semibold text-rose-400 pl-1 animate-fade-in"
        >
          {error}
        </p>
      )}
    </div>
  );
});

AuthTextField.displayName = 'AuthTextField';
