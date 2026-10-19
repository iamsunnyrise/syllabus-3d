import React, { useState } from 'react';
import { Mail, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthHeader } from './AuthHeader';
import { AuthTextField } from './AuthTextField';
import { PasswordField } from './PasswordField';
import { PrimaryAuthButton } from './PrimaryAuthButton';
import { SocialLoginButton } from './SocialLoginButton';
import { AuthErrorMessage } from './AuthErrorMessage';
import { GoogleOAuthSetupModal } from './GoogleOAuthSetupModal';
import { validateEmail, validatePassword } from '../../utils/authValidation';
import { soundManager } from '../../utils/soundEffects';

export const LoginView: React.FC = () => {
  const { login, loginWithGoogle, loginWithDemoGoogle, setAuthView } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const [isGoogleSetupOpen, setIsGoogleSetupOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const emailVal = validateEmail(email);
    const pwdVal = validatePassword(password);

    if (!emailVal.isValid || !pwdVal.isValid) {
      setErrors({
        email: emailVal.error,
        password: pwdVal.error
      });
      return;
    }

    try {
      setIsLoading(true);
      await login(email, password);
      soundManager.playCompleteChime();
    } catch (err: any) {
      setErrors({ form: err.message || 'Incorrect email or password' });
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
        // User voluntarily closed popup
      } else {
        setErrors({ form: err?.message || 'Google sign-in was cancelled or encountered an error.' });
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    try {
      setIsDemoLoading(true);
      setErrors({});
      await loginWithDemoGoogle('scholar@syllabus3d.app', 'Guest Aspirant');
      soundManager.playCompleteChime();
    } catch (err: any) {
      setErrors({ form: 'Demo login error: ' + (err?.message || 'Failed to authenticate') });
    } finally {
      setIsDemoLoading(false);
    }
  };

  return (
    <div>
      {/* Top Segmented Navigation Tabs */}
      <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900/90 warm-cream:bg-[#EDE3CB] border border-slate-200/80 dark:border-white/10 warm-cream:border-[#DFCFA8] mb-5 select-none">
        <button
          type="button"
          onClick={() => setAuthView('login')}
          className="py-2 px-3 rounded-xl text-xs font-black transition-all bg-white dark:bg-[#1E2033] warm-cream:bg-[#FFFDF9] text-slate-950 dark:text-white warm-cream:text-[#232001] shadow-xs"
        >
          Log In
        </button>
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setAuthView('signup');
          }}
          className="py-2 px-3 rounded-xl text-xs font-bold transition-all text-slate-500 dark:text-slate-400 warm-cream:text-[#655819] hover:text-slate-900 dark:hover:text-white cursor-pointer"
        >
          Create Account
        </button>
      </div>

      <AuthHeader
        title="Welcome Back"
        subtitle="Continue your smart preparation journey"
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthErrorMessage message={errors.form || null} />

        <AuthTextField
          label="Email Address"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Enter your email (e.g. rahul@aspirant.com)"
          icon={Mail}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
          }}
          error={errors.email}
          required
        />

        <PasswordField
          label="Password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
          }}
          error={errors.password}
          showForgotPassword
          onForgotPasswordClick={() => setAuthView('forgot_password')}
          required
        />

        <div className="pt-1">
          <PrimaryAuthButton isLoading={isLoading}>
            Log In
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

        {/* 1-Click Demo / Guest Mode Pill */}
        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={isDemoLoading}
          className="w-full h-10 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 text-amber-900 dark:text-amber-300 warm-cream:text-[#654E00] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
        >
          <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>{isDemoLoading ? 'Launching Demo...' : 'Instant Demo Access (Explore as Guest)'}</span>
        </button>
      </form>

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

      {/* Switch to Sign Up Footnote */}
      <div className="mt-5 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 warm-cream:text-[#655819]">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setAuthView('signup');
          }}
          className="font-bold text-amber-600 dark:text-amber-400 warm-cream:text-[#8D7A02] hover:underline cursor-pointer"
        >
          Create Free Account
        </button>
      </div>
    </div>
  );
};
