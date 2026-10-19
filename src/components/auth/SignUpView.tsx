import React, { useState } from 'react';
import { User, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthHeader } from './AuthHeader';
import { AuthTextField } from './AuthTextField';
import { PasswordField } from './PasswordField';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';
import { PrimaryAuthButton } from './PrimaryAuthButton';
import { SocialLoginButton } from './SocialLoginButton';
import { AuthErrorMessage } from './AuthErrorMessage';
import { LegalModal } from './LegalModal';
import { GoogleOAuthSetupModal } from './GoogleOAuthSetupModal';
import {
  validateFullName,
  validateEmail,
  validatePassword,
  validatePasswordsMatch,
  checkPasswordStrength
} from '../../utils/authValidation';
import { soundManager } from '../../utils/soundEffects';

export const SignUpView: React.FC = () => {
  const { signup, loginWithGoogle, loginWithDemoGoogle, setAuthView } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | null>(null);
  const [isGoogleSetupOpen, setIsGoogleSetupOpen] = useState(false);

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
    form?: string;
  }>({});

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const passwordStrength = checkPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const nameVal = validateFullName(fullName);
    const emailVal = validateEmail(email);
    const pwdVal = validatePassword(password);
    const matchVal = validatePasswordsMatch(password, confirmPassword);

    if (!nameVal.isValid || !emailVal.isValid || !pwdVal.isValid || !matchVal.isValid || !agreeToTerms) {
      setErrors({
        fullName: nameVal.error,
        email: emailVal.error,
        password: pwdVal.error,
        confirmPassword: matchVal.error,
        terms: !agreeToTerms ? 'You must agree to the Terms & Privacy Policy to proceed.' : undefined
      });
      return;
    }

    try {
      setIsLoading(true);
      await signup(fullName, email, password);
      soundManager.playCompleteChime();
    } catch (err: any) {
      setErrors({ form: err.message || 'Failed to create account.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      setErrors({});
      await loginWithGoogle();
      soundManager.playCompleteChime();
    } catch (err: any) {
      if (err?.message === 'GOOGLE_SETUP_REQUIRED') {
        setIsGoogleSetupOpen(true);
      } else if (err?.message?.includes('cancelled')) {
        // User closed popup
      } else {
        setErrors({ form: err?.message || 'Google sign-in encountered an error.' });
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div>
      {/* Top Segmented Navigation Tabs */}
      <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900/90 warm-cream:bg-[#EDE3CB] border border-slate-200/80 dark:border-white/10 warm-cream:border-[#DFCFA8] mb-5 select-none">
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setAuthView('login');
          }}
          className="py-2 px-3 rounded-xl text-xs font-bold transition-all text-slate-500 dark:text-slate-400 warm-cream:text-[#655819] hover:text-slate-900 dark:hover:text-white cursor-pointer"
        >
          Log In
        </button>
        <button
          type="button"
          onClick={() => setAuthView('signup')}
          className="py-2 px-3 rounded-xl text-xs font-black transition-all bg-white dark:bg-[#1E2033] warm-cream:bg-[#FFFDF9] text-slate-950 dark:text-white warm-cream:text-[#232001] shadow-xs"
        >
          Create Account
        </button>
      </div>

      <AuthHeader
        title="Create Account"
        subtitle="Start tracking your preparation smarter"
        badge="Free Aspirant Access"
      />

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <AuthErrorMessage message={errors.form || null} />

        <AuthTextField
          label="Full Name"
          type="text"
          autoComplete="name"
          placeholder="Enter your full name"
          icon={User}
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            if (errors.fullName) setErrors(prev => ({ ...prev, fullName: undefined }));
          }}
          error={errors.fullName}
          required
        />

        <AuthTextField
          label="Email Address"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Enter your email"
          icon={Mail}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
          }}
          error={errors.email}
          required
        />

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <PasswordField
                label="Password"
                autoComplete="new-password"
                placeholder="Create password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                }}
                error={errors.password}
                required
              />
            </div>

            <div>
              <PasswordField
                label="Confirm Password"
                autoComplete="new-password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: undefined }));
                }}
                error={errors.confirmPassword}
                required
              />
            </div>
          </div>

          <PasswordStrengthIndicator
            strength={passwordStrength}
            passwordLength={password.length}
          />
        </div>

        {/* Terms Checkbox */}
        <div className="pt-0.5 text-left">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => {
                setAgreeToTerms(e.target.checked);
                if (errors.terms) setErrors(prev => ({ ...prev, terms: undefined }));
              }}
              className="mt-0.5 w-4 h-4 rounded text-amber-500 focus:ring-amber-500/30 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 cursor-pointer accent-amber-500"
            />
            <span className="text-[11px] text-slate-600 dark:text-slate-400 warm-cream:text-[#5E5211] leading-tight select-none">
              I agree to the{' '}
              <button
                type="button"
                onClick={() => setLegalModalType('terms')}
                className="text-amber-700 dark:text-amber-400 warm-cream:text-[#8D7A02] font-bold hover:underline"
              >
                Terms of Service
              </button>{' '}
              and{' '}
              <button
                type="button"
                onClick={() => setLegalModalType('privacy')}
                className="text-amber-700 dark:text-amber-400 warm-cream:text-[#8D7A02] font-bold hover:underline"
              >
                Privacy Policy
              </button>
            </span>
          </label>

          {errors.terms && (
            <p className="text-[11px] font-semibold text-rose-500 dark:text-rose-400 pl-6 pt-1">
              {errors.terms}
            </p>
          )}
        </div>

        <div className="pt-1.5">
          <PrimaryAuthButton isLoading={isLoading}>
            Create Account
          </PrimaryAuthButton>
        </div>

        {/* Divider */}
        <div className="relative flex py-1.5 items-center">
          <div className="flex-grow border-t border-slate-200 dark:border-white/10 warm-cream:border-[#E5D7B7]" />
          <span className="flex-shrink mx-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 warm-cream:text-[#8D7A02] uppercase tracking-widest">
            OR CONTINUE WITH
          </span>
          <div className="flex-grow border-t border-slate-200 dark:border-white/10 warm-cream:border-[#E5D7B7]" />
        </div>

        <SocialLoginButton
          onClick={handleGoogleLogin}
          isLoading={isGoogleLoading}
        />
      </form>

      {/* Switch to Log In Footnote */}
      <div className="mt-5 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 warm-cream:text-[#655819]">
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setAuthView('login');
          }}
          className="font-bold text-amber-600 dark:text-amber-400 warm-cream:text-[#8D7A02] hover:underline cursor-pointer"
        >
          Log In
        </button>
      </div>

      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Google OAuth Setup / Connect Modal */}
      <GoogleOAuthSetupModal
        isOpen={isGoogleSetupOpen}
        onClose={() => setIsGoogleSetupOpen(false)}
        onSuccess={() => {
          setIsGoogleSetupOpen(false);
          handleGoogleLogin();
        }}
        onContinueDemo={async () => {
          setIsGoogleSetupOpen(false);
          try {
            await loginWithDemoGoogle();
            soundManager.playCompleteChime();
          } catch {}
        }}
      />
    </div>
  );
};

