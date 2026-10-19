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
    <div className="w-full">
      {/* Top Segmented Navigation Tabs */}
      <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#090C16] border border-white/10 mb-5 select-none">
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setAuthView('login');
          }}
          className="py-2 px-3 rounded-xl text-xs font-bold transition-all text-slate-400 hover:text-white cursor-pointer"
        >
          Log In
        </button>
        <button
          type="button"
          onClick={() => setAuthView('signup')}
          className="py-2 px-3 rounded-xl text-xs font-black transition-all bg-[#F5C518] text-slate-950 shadow-sm cursor-default"
        >
          Create Account
        </button>
      </div>

      <AuthHeader
        title="Create Account"
        subtitle="Start tracking your preparation smarter"
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

        <div className="space-y-2.5">
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
              className="mt-0.5 w-4 h-4 rounded text-[#F5C518] focus:ring-[#F5C518]/30 border-slate-700 bg-[#080B14] cursor-pointer accent-[#F5C518]"
            />
            <span className="text-[11px] text-slate-400 leading-tight select-none">
              I agree to the{' '}
              <button
                type="button"
                onClick={() => setLegalModalType('terms')}
                className="text-[#F5C518] font-bold hover:underline"
              >
                Terms of Service
              </button>{' '}
              and{' '}
              <button
                type="button"
                onClick={() => setLegalModalType('privacy')}
                className="text-[#F5C518] font-bold hover:underline"
              >
                Privacy Policy
              </button>
            </span>
          </label>

          {errors.terms && (
            <p className="text-[11px] font-semibold text-rose-400 pl-6 pt-1">
              {errors.terms}
            </p>
          )}
        </div>

        <div className="pt-1.5">
          <PrimaryAuthButton isLoading={isLoading}>
            Continue
          </PrimaryAuthButton>
        </div>

        {/* Divider */}
        <div className="relative flex py-1.5 items-center">
          <div className="flex-grow border-t border-white/10" />
          <span className="flex-shrink mx-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            OR CONTINUE WITH
          </span>
          <div className="flex-grow border-t border-white/10" />
        </div>

        <SocialLoginButton
          onClick={handleGoogleLogin}
          isLoading={isGoogleLoading}
        />
      </form>

      {/* Switch to Log In Footnote */}
      <div className="mt-5 text-center text-xs font-semibold text-slate-400">
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setAuthView('login');
          }}
          className="font-bold text-[#F5C518] hover:underline cursor-pointer"
        >
          Log In
        </button>
      </div>

      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

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
