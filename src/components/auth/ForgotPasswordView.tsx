import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthHeader } from './AuthHeader';
import { AuthTextField } from './AuthTextField';
import { PrimaryAuthButton } from './PrimaryAuthButton';
import { AuthErrorMessage } from './AuthErrorMessage';
import { validateEmail } from '../../utils/authValidation';
import { soundManager } from '../../utils/soundEffects';

export const ForgotPasswordView: React.FC = () => {
  const { resetPassword, setAuthView } = useAuth();

  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);

    const emailVal = validateEmail(email);
    if (!emailVal.isValid) {
      setError(emailVal.error);
      return;
    }

    try {
      setIsLoading(true);
      await resetPassword(email);
      setIsSuccess(true);
      soundManager.playCompleteChime();
    } catch (err: any) {
      setError('Something went wrong. Please check your network and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setAuthView('login');
          }}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white warm-cream:text-[#655819] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Log In</span>
        </button>
      </div>

      <AuthHeader
        title="Reset Password"
        subtitle="Enter your registered email and we'll send you a password recovery link."
      />

      {isSuccess ? (
        <div className="space-y-5 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white warm-cream:text-[#232001]">
              Check your email
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 warm-cream:text-[#5E5211] max-w-xs mx-auto leading-relaxed">
              We've sent password reset instructions to <span className="font-bold text-slate-700 dark:text-slate-200">{email}</span>.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setAuthView('login');
            }}
            className="w-full py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 warm-cream:bg-[#EDE3CB] hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white warm-cream:text-[#232001] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Log In</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthErrorMessage message={error || null} />

          <AuthTextField
            label="Email Address"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Enter your registered email"
            icon={Mail}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(undefined);
            }}
            error={error}
            required
          />

          <div className="pt-1">
            <PrimaryAuthButton isLoading={isLoading}>
              Send Reset Link
            </PrimaryAuthButton>
          </div>
        </form>
      )}
    </div>
  );
};
