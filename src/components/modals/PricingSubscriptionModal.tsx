import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Check,
  Zap,
  Sparkles,
  ShieldCheck,
  Clock,
  Infinity as InfinityIcon,
  Crown,
  Flame,
  ArrowRight,
  Laptop
} from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';
import { fireCelebration } from '../../utils/confettiHelper';

interface PricingSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PricingSubscriptionModal: React.FC<PricingSubscriptionModalProps> = ({
  isOpen,
  onClose
}) => {
  const [billingCycle, setBillingCycle] = useState<'yearly' | 'monthly'>('yearly');
  const [selectedTier, setSelectedTier] = useState<'free' | 'pro' | 'lifetime'>('pro');
  const [isSuccessNotice, setIsSuccessNotice] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectPlan = (tier: 'free' | 'pro' | 'lifetime') => {
    soundManager.playSuccess();
    haptics.success();
    setSelectedTier(tier);
    if (tier !== 'free') {
      fireCelebration();
      setIsSuccessNotice(true);
      setTimeout(() => {
        setIsSuccessNotice(false);
      }, 4000);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-4xl my-auto rounded-3xl bg-white dark:bg-[#0D101A] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden animate-scale-up text-slate-900 dark:text-white"
        onClick={e => e.stopPropagation()}
      >
        {/* Glow Accents */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="relative px-5 sm:px-8 pt-6 sm:pt-8 pb-4 text-center">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-slate-100 dark:bg-white/[0.08] hover:bg-slate-200 dark:hover:bg-white/15 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-all cursor-pointer active:scale-90"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Premium Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/15 via-indigo-500/15 to-purple-500/15 border border-blue-500/30 text-blue-600 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Crown className="w-3.5 h-3.5 fill-current" />
            <span className="font-manrope font-extrabold">Precision Exam Mastery Suite</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-[40px] font-extrabold font-manrope tracking-tight leading-tight">
            Invest in Your Discipline.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400">
              Own Your Dream Rank.
            </span>
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-medium">
            Supercharge your study workflow with AI YouTube Notes, real-time multi-device cloud sync, and futuristic focus timers.
          </p>

          {/* Billing Cycle Switcher with Sora ExtraBold Discount */}
          <div className="mt-5 inline-flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setBillingCycle('yearly');
              }}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-white dark:bg-[#1A1D2D] text-blue-600 dark:text-cyan-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="font-manrope font-extrabold">Annual Billing</span>
              <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-sora font-extrabold text-[10px] tracking-wide">
                SAVE 40%
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setBillingCycle('monthly');
              }}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-[#1A1D2D] text-blue-600 dark:text-cyan-400 shadow-xs font-manrope font-extrabold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="font-manrope font-extrabold">Monthly</span>
            </button>
          </div>
        </div>

        {/* Success Alert Notice */}
        {isSuccessNotice && (
          <div className="mx-6 sm:mx-8 mb-3 p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 stroke-[3]" />
              <span className="text-xs font-manrope font-extrabold">
                Pro Protocols Activated! Welcome to Syllabus 3D Pro Scholar.
              </span>
            </div>
            <button
              onClick={() => setIsSuccessNotice(false)}
              className="text-xs underline font-bold cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* 3 Pricing Tier Cards (Sora ExtraBold for Pricing Figures, Manrope ExtraBold for CTAs & Headers) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 px-5 sm:px-8 pb-6 sm:pb-8 pt-2">
          
          {/* TIER 1: FREE ASPIRANT */}
          <div className="rounded-2xl p-5 sm:p-6 bg-slate-50 dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/10 flex flex-col justify-between transition-all hover:border-slate-300 dark:hover:border-white/20">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider font-sora text-slate-500 dark:text-slate-400">
                  Free Aspirant
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                  Starter
                </span>
              </div>

              {/* Price in Sora ExtraBold */}
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold font-sora tracking-tight text-slate-900 dark:text-white">
                  ₹0
                </span>
                <span className="text-xs font-semibold text-slate-400">/ forever</span>
              </div>

              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Offline study tracker for focused individual test preparation.
              </p>

              {/* Features List */}
              <div className="mt-5 space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                {[
                  'Full 3D Syllabus Explorer & Matrix',
                  'Daily Study Planner & Task Schedule',
                  'Standard Pomodoro Timer (JetBrains)',
                  'Local Offline Storage & Manual Backup',
                  'Topic Flashcards & Progress Graph'
                ].map(feat => (
                  <div key={feat} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleSelectPlan('free')}
              className={`mt-6 w-full py-2.5 rounded-xl text-xs font-extrabold font-manrope transition-all cursor-pointer border ${
                selectedTier === 'free'
                  ? 'bg-slate-200 dark:bg-white/15 text-slate-800 dark:text-white border-transparent'
                  : 'bg-transparent hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-700 dark:text-slate-300 border-slate-300 dark:border-white/15'
              }`}
            >
              {selectedTier === 'free' ? 'Current Plan' : 'Select Free'}
            </button>
          </div>

          {/* TIER 2: PRO SCHOLAR (Featured / Most Popular) */}
          <div className="relative rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-blue-500/[0.08] via-indigo-500/[0.05] to-transparent dark:from-blue-600/20 dark:via-indigo-600/15 dark:to-transparent border-2 border-blue-500 dark:border-blue-400 shadow-xl shadow-blue-500/10 flex flex-col justify-between">
            {/* Best Value Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-sora font-extrabold text-[10px] tracking-wider uppercase shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-current" />
              <span>MOST POPULAR • PRO SCHOLAR</span>
            </div>

            <div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-extrabold uppercase tracking-wider font-sora text-blue-600 dark:text-cyan-300">
                  Pro Scholar
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-500/15 text-blue-600 dark:text-cyan-300 border border-blue-500/20">
                  PRO
                </span>
              </div>

              {/* Price in Sora ExtraBold */}
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-extrabold font-sora tracking-tight text-slate-900 dark:text-white">
                  {billingCycle === 'yearly' ? '₹499' : '₹59'}
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {billingCycle === 'yearly' ? '/ year' : '/ month'}
                </span>
              </div>

              <p className="mt-2 text-xs text-blue-900/80 dark:text-blue-200/80 leading-relaxed font-medium">
                The ultimate precision toolkit for aspirants aiming for top ranks.
              </p>

              {/* Features List */}
              <div className="mt-5 space-y-2.5 text-xs text-slate-800 dark:text-slate-200">
                {[
                  'AI YouTube Notes Generator with Timestamps',
                  'Real-time Multi-Device Cloud Sync',
                  'All 3 Timer HUD Fonts: JetBrains, Roboto Mono, Orbitron',
                  'Audio Memos & Voice Notes Recording',
                  'Smart Spaced Repetition (SM-2 Algorithm)',
                  'Full Mock Test Analytics & Target Gap Engine'
                ].map(feat => (
                  <div key={feat} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 stroke-[3] shrink-0 mt-0.5" />
                    <span className="font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleSelectPlan('pro')}
              className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold font-manrope text-xs sm:text-sm tracking-wide shadow-lg shadow-blue-500/25 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>{selectedTier === 'pro' ? 'Renew Pro Scholar' : 'Upgrade to Pro Scholar'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* TIER 3: LIFETIME MASTERY */}
          <div className="rounded-2xl p-5 sm:p-6 bg-slate-50 dark:bg-white/[0.03] border border-purple-500/30 dark:border-purple-500/40 flex flex-col justify-between transition-all hover:border-purple-500/50">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider font-sora text-purple-600 dark:text-purple-400">
                  Lifetime Mastery
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/20">
                  ONE-TIME
                </span>
              </div>

              {/* Price in Sora ExtraBold */}
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold font-sora tracking-tight text-slate-900 dark:text-white">
                  ₹999
                </span>
                <span className="text-xs font-semibold text-slate-400">/ one-time pay</span>
              </div>

              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Pay once, own the complete study intelligence system forever.
              </p>

              {/* Features List */}
              <div className="mt-5 space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                {[
                  'Everything in Pro Scholar for Life',
                  'Private Google Drive Cloud Vault',
                  'Priority AI Processing & Unlimited Exports',
                  'Access to All Upcoming Exam Packs',
                  'Zero Recurring Fees or Subscriptions',
                  'Dedicated Priority Scholar Support'
                ].map(feat => (
                  <div key={feat} className="flex items-start gap-2">
                    <InfinityIcon className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleSelectPlan('lifetime')}
              className="mt-6 w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold font-manrope text-xs transition-all active:scale-95 cursor-pointer shadow-md shadow-purple-500/20"
            >
              Get Lifetime Access
            </button>
          </div>

        </div>

        {/* Footer Guarantee Strip */}
        <div className="px-6 sm:px-8 py-3.5 bg-slate-50 dark:bg-white/[0.02] border-t border-slate-200/80 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>7-Day Full Money Back Guarantee • Encrypted &amp; Offline Safe</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1">
              <Laptop className="w-3 h-3 text-blue-500" />
              <span>Works on Mobile, Tablet &amp; Desktop</span>
            </span>
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
};
