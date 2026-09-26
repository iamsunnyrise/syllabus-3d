import React, { useState, useMemo } from 'react';
import { Quote, RefreshCw, Sparkles, Timer } from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';
import { haptics } from '../../utils/haptics';

export interface InspirationalQuote {
  text: string;
  author: string;
  role?: string;
  category: 'Focus' | 'Perseverance' | 'Mastery' | 'Vision' | 'Wisdom' | 'Consistency';
}

export const INSPIRATIONAL_QUOTES: InspirationalQuote[] = [
  {
    text: "Learning never exhausts the mind.",
    author: "Leonardo da Vinci",
    role: "Polymath & Renaissance Pioneer",
    category: "Mastery"
  },
  {
    text: "Dream is not that which you see while sleeping; it is something that does not let you sleep.",
    author: "Dr. A.P.J. Abdul Kalam",
    role: "Scientist & 11th President of India",
    category: "Vision"
  },
  {
    text: "It is not that I'm so smart, it is just that I stay with problems longer.",
    author: "Albert Einstein",
    role: "Theoretical Physicist",
    category: "Perseverance"
  },
  {
    text: "Arise, awake, and stop not until the goal is reached.",
    author: "Swami Vivekananda",
    role: "Philosopher & Spiritual Leader",
    category: "Perseverance"
  },
  {
    text: "You have power over your mind — not outside events. Realize this, and you will find great strength.",
    author: "Marcus Aurelius",
    role: "Stoic Philosopher & Roman Emperor",
    category: "Focus"
  },
  {
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle",
    role: "Greek Philosopher",
    category: "Consistency"
  },
  {
    text: "Study hard what interests you the most in the most undisciplined, irreverent and original manner possible.",
    author: "Richard Feynman",
    role: "Nobel Laureate in Physics",
    category: "Mastery"
  },
  {
    text: "I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times.",
    author: "Bruce Lee",
    role: "Martial Artist & Philosopher",
    category: "Consistency"
  },
  {
    text: "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
    author: "Marie Curie",
    role: "Pioneer in Radioactivity & 2-Time Nobel Laureate",
    category: "Wisdom"
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    role: "Philosopher & Teacher",
    category: "Perseverance"
  },
  {
    text: "An investment in knowledge always pays the best interest.",
    author: "Benjamin Franklin",
    role: "Scientist & Statesman",
    category: "Wisdom"
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
    role: "Author & Humorist",
    category: "Focus"
  }
];

interface DailyInspirationBannerProps {
  onOpenFocus?: () => void;
  className?: string;
}

export const DailyInspirationBanner: React.FC<DailyInspirationBannerProps> = ({
  onOpenFocus,
  className = ''
}) => {
  // Compute deterministic daily index based on day of year
  const initialIndex = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return dayOfYear % INSPIRATIONAL_QUOTES.length;
  }, []);

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isRotating, setIsRotating] = useState(false);

  const currentQuote = INSPIRATIONAL_QUOTES[currentIndex] || INSPIRATIONAL_QUOTES[0];

  const handleNextQuote = () => {
    soundManager.playClick();
    haptics.selection();
    setIsRotating(true);
    setCurrentIndex(prev => (prev + 1) % INSPIRATIONAL_QUOTES.length);
    setTimeout(() => setIsRotating(false), 400);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-indigo-50/90 via-purple-50/50 to-white dark:from-[#13162b] dark:via-[#111322] dark:to-[#0f111e] border border-indigo-100/90 dark:border-indigo-500/20 shadow-xs hover:shadow-md transition-all duration-300 p-4 sm:p-5 ${className}`}
    >
      {/* Signature Vertical Accent Bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#4F46E5] via-[#818CF8] to-[#C084FC] rounded-l-2xl sm:rounded-l-3xl" />

      {/* Decorative Background Large Quote Watermark */}
      <Quote
        className="w-20 h-20 text-indigo-500/10 dark:text-indigo-400/10 absolute right-3 -bottom-2 pointer-events-none select-none rotate-12 transition-transform duration-500"
      />

      <div className="relative z-10 flex flex-col gap-2.5">
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-[10px] font-mono font-bold tracking-wider uppercase">
              <Sparkles className="w-3 h-3 text-indigo-500 animate-pulse" />
              <span>Daily Inspiration</span>
            </span>

            <span className="hidden xs:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-slate-200/60 dark:bg-white/10 text-slate-600 dark:text-slate-300">
              #{currentQuote.category}
            </span>
          </div>

          {/* Quick Actions (Shuffle, Focus) */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleNextQuote}
              className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-300 hover:bg-white/80 dark:hover:bg-white/10 border border-transparent hover:border-slate-200 dark:hover:border-white/10 transition-all cursor-pointer active:scale-95 group"
              title="Shuffle new inspiration (New Quote)"
              aria-label="Shuffle new quote"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 transition-transform duration-500 ${
                  isRotating ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : 'group-hover:rotate-45'
                }`}
              />
            </button>

            {onOpenFocus && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  haptics.medium();
                  onOpenFocus();
                }}
                className="hidden sm:inline-flex items-center gap-1.5 ml-1 px-3 py-1 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] active:scale-[0.98] text-white text-[11px] font-bold shadow-xs transition-all cursor-pointer"
                title="Launch 3D Focus Chamber"
              >
                <Timer className="w-3.5 h-3.5 text-amber-300" />
                <span>Focus (25m)</span>
              </button>
            )}
          </div>
        </div>

        {/* Quote Content */}
        <div className="pl-1 pr-4 sm:pr-8">
          <blockquote className="text-[13.5px] sm:text-[15px] font-semibold italic text-slate-800 dark:text-slate-100 leading-relaxed tracking-tight transition-opacity duration-300">
            "{currentQuote.text}"
          </blockquote>

          <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 mt-1.5 text-xs">
            <cite className="not-italic font-bold font-mono tracking-wide text-[#4F46E5] dark:text-indigo-400">
              — {currentQuote.author}
            </cite>
            {currentQuote.role && (
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 not-italic">
                • {currentQuote.role}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
