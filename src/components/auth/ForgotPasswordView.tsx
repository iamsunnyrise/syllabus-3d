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
    <div className="w-full">
      <div className="mb-4">
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setAuthView('login');
          }}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#F5C518]" />
          <span>Back to Log In</span>
        </button>
      </div>

      <AuthHeader
        title="Reset Password"
        subtitle="Enter your registered email and we'll send you a recovery link."
      />

      {isSuccess ? (
        <div className="space-y-5 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-lg font-bold text-white">
              Check your email
            </h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
              We've sent password reset instructions to <span className="font-bold text-white">{email}</span>.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setAuthView('login');
            }}
            className="w-full py-3 rounded-xl sm:rounded-2xl bg-[#090C15] hover:bg-[#111624] border border-white/10 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#F5C518]" />
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
