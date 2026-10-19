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
        // User closed popup
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
    <div className="w-full">
      {/* Top Segmented Navigation Tabs */}
      <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#090C16] border border-white/10 mb-5 select-none">
        <button
          type="button"
          onClick={() => setAuthView('login')}
          className="py-2 px-3 rounded-xl text-xs font-black transition-all bg-[#F5C518] text-slate-950 shadow-sm cursor-default"
        >
          Log In
        </button>
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setAuthView('signup');
          }}
          className="py-2 px-3 rounded-xl text-xs font-bold transition-all text-slate-400 hover:text-white cursor-pointer"
        >
          Create Account
        </button>
      </div>

      <AuthHeader
        title="Log in or sign up"
        subtitle="Enter your credentials — we'll take it from there."
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

        {/* 1-Click Demo / Guest Mode Pill */}
        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={isDemoLoading}
          className="w-full h-11 rounded-xl sm:rounded-2xl bg-[#090C15] hover:bg-[#111624] border border-[#F5C518]/30 text-[#F5C518] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
        >
          <Zap className="w-3.5 h-3.5 fill-[#F5C518] text-[#F5C518]" />
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
      <div className="mt-6 text-center text-xs font-semibold text-slate-400">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setAuthView('signup');
          }}
          className="font-bold text-[#F5C518] hover:underline cursor-pointer"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};
