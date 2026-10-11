import React, { useState } from 'react';
import {
  Target,
  Calendar,
  Clock,
  ArrowRightLeft,
  Timer,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Award,
  CheckCircle2,
  TrendingUp,
  Layers
} from 'lucide-react';
import { useSyllabus } from '../../context/SyllabusContext';
import { soundManager } from '../../utils/soundEffects';
import { AppView } from '../layout/Sidebar';
import { EditExamTargetModal } from '../modals/EditExamTargetModal';

interface ExamTargetMissionBannerProps {
  onOpenFocus?: () => void;
  onNavigate?: (view: AppView) => void;
  className?: string;
}

interface ExamVisualMeta {
  key: 'ssc' | 'railway' | 'banking' | 'defence' | 'upsc' | 'state_pcs' | 'custom' | 'generic';
  authorityName: string;
  hindiAuthority: string;
  motto: string;
  logoSrc?: string;
  badgeLabel: string;
  gradientBadge: string;
  ambientGlow: string;
  borderColor: string;
  accentColor: string;
}

export const ExamTargetMissionBanner: React.FC<ExamTargetMissionBannerProps> = ({
  onOpenFocus,
  onNavigate,
  className = ''
}) => {
  const { currentExam, overallStats } = useSyllabus();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Reset img error on exam change
  React.useEffect(() => {
    setImgError(false);
  }, [currentExam?.id, currentExam?.name]);

  // 1. Resolve Exam Name & Year
  const examName = currentExam?.name || 'SSC CGL 2026';
  const examYear = currentExam?.targetYear || (examName.match(/\b(20\d{2})\b/)?.[1] ? Number(examName.match(/\b(20\d{2})\b/)?.[1]) : 2026);
  const examYearStr = String(examYear);
  const baseExamName = examName.replace(new RegExp(`\\b${examYearStr}\\b`, 'g'), '').trim() || examName;

  // 2. Intelligent Exam Metadata & Official Logo Resolver
  const examMeta: ExamVisualMeta = React.useMemo(() => {
    const raw = `${examName} ${currentExam?.code || ''}`.toLowerCase();

    // 1) SSC Exams (SSC CGL, CHSL, CPO, MTS, GD, Steno, JE, Selection Post, Havaldar, etc.)
    if (
      raw.includes('ssc') ||
      raw.includes('cgl') ||
      raw.includes('chsl') ||
      raw.includes('cpo') ||
      raw.includes('mts') ||
      raw.includes('steno') ||
      raw.includes('havaldar') ||
      raw.includes('gd constable') ||
      raw.includes('selection post') ||
      raw.includes('staff selection')
    ) {
      return {
        key: 'ssc',
        authorityName: 'Staff Selection Commission • भारत सरकार',
        hindiAuthority: 'कर्मचारी चयन आयोग • Staff Selection Commission',
        motto: 'सत्यमेव जयते • निष्पक्ष, पारदर्शी एवं तीव्र चयन',
        logoSrc: '/exam-logos/ssc.png',
        badgeLabel: 'Staff Selection Commission (SSC)',
        gradientBadge: 'from-rose-600 via-red-500 to-amber-500 text-white',
        ambientGlow: 'bg-rose-500/10 dark:bg-rose-500/15',
        borderColor: 'border-rose-200/80 dark:border-rose-500/25',
        accentColor: '#E11D48'
      };
    }

    // 2) Indian Railways (RRB NTPC, Group D, ALP, Technician, RPF SI/Constable, RRB JE, Paramedical)
    if (
      raw.includes('railway') ||
      raw.includes('rail') ||
      raw.includes('rrb') ||
      raw.includes('ntpc') ||
      raw.includes('group d') ||
      raw.includes('alp') ||
      raw.includes('loco') ||
      raw.includes('technician') ||
      raw.includes('rpf') ||
      raw.includes('indian railways')
    ) {
      return {
        key: 'railway',
        authorityName: 'Ministry of Railways • Indian Railways',
        hindiAuthority: 'भारतीय रेल • Railway Recruitment Board (RRB)',
        motto: 'राष्ट्र की जीवन रेखा • Lifeline of the Nation',
        logoSrc: '/exam-logos/railways.png',
        badgeLabel: 'Indian Railways (RRB Target)',
        gradientBadge: 'from-red-600 via-rose-600 to-amber-500 text-white',
        ambientGlow: 'bg-red-500/10 dark:bg-red-500/15',
        borderColor: 'border-red-200/80 dark:border-red-500/25',
        accentColor: '#DC2626'
      };
    }

    // 3) Banking & Financial Institutions (IBPS PO, IBPS Clerk, IBPS SO, IBPS RRB, SBI PO/Clerk, RBI Grade B/Assistant, NABARD)
    if (
      raw.includes('ibps') ||
      raw.includes('bank') ||
      raw.includes('sbi') ||
      raw.includes('rbi') ||
      raw.includes('po') ||
      raw.includes('clerk') ||
      raw.includes('nabard') ||
      raw.includes('specialist officer') ||
      raw.includes('office assistant')
    ) {
      return {
        key: 'banking',
        authorityName: 'Institute of Banking Personnel Selection (IBPS)',
        hindiAuthority: 'बैंकिंग कार्मिक चयन संस्थान • IBPS',
        motto: 'प्रज्ञाविभावनम् • Speed, Accuracy & Financial Leadership',
        logoSrc: '/exam-logos/ibps.png',
        badgeLabel: 'Institute of Banking Personnel Selection (IBPS)',
        gradientBadge: 'from-sky-600 via-blue-600 to-indigo-600 text-white',
        ambientGlow: 'bg-sky-500/10 dark:bg-sky-500/15',
        borderColor: 'border-sky-200/80 dark:border-sky-500/25',
        accentColor: '#0284C7'
      };
    }

    // 4) Defence & Armed Forces (NDA, CDS, AFCAT, CAPF, Army, Navy, Air Force)
    if (raw.includes('nda') || raw.includes('cds') || raw.includes('defence') || raw.includes('afcat') || raw.includes('army') || raw.includes('navy') || raw.includes('air force') || raw.includes('capf')) {
      return {
        key: 'defence',
        authorityName: 'National Defence Academy & Armed Forces',
        hindiAuthority: 'राष्ट्रीय रक्षा अकादमी • भारतीय सशस्त्र बल',
        motto: 'सेवा परमो धर्मः • Service Before Self',
        logoSrc: '/exam-logos/defence.webp',
        badgeLabel: 'Armed Forces Officer Cadet Mission',
        gradientBadge: 'from-amber-600 via-amber-500 to-yellow-500 text-white',
        ambientGlow: 'bg-amber-500/10 dark:bg-amber-500/15',
        borderColor: 'border-amber-200/80 dark:border-amber-500/25',
        accentColor: '#D97706'
      };
    }

    // 5) UPSC Civil Services & National Examinations (IAS, IPS, IFS, CSE, ESE, EPFO, etc.)
    if (
      raw.includes('upsc') ||
      raw.includes('civil service') ||
      raw.includes('ias') ||
      raw.includes('ips') ||
      raw.includes('ifs') ||
      raw.includes('cse') ||
      raw.includes('dholpur house') ||
      raw.includes('epfo') ||
      raw.includes('ese') ||
      raw.includes('union public service')
    ) {
      return {
        key: 'upsc',
        authorityName: 'Union Public Service Commission (UPSC)',
        hindiAuthority: 'संघ लोक सेवा आयोग • भारत सरकार',
        motto: 'सत्यमेव जयते • राष्ट्र निर्माण का संकल्प',
        logoSrc: '/exam-logos/upsc.png',
        badgeLabel: 'Union Public Service Commission (UPSC)',
        gradientBadge: 'from-amber-600 via-yellow-600 to-orange-500 text-white',
        ambientGlow: 'bg-amber-500/10 dark:bg-amber-500/15',
        borderColor: 'border-amber-300/80 dark:border-amber-500/25',
        accentColor: '#D97706'
      };
    }

    // 6) State PCS (UPPSC, BPSC, MPPSC, RPSC, etc.)
    if (raw.includes('pcs') || raw.includes('psc') || raw.includes('state') || raw.includes('uppsc') || raw.includes('bpsc') || raw.includes('mppsc')) {
      return {
        key: 'state_pcs',
        authorityName: 'State Public Service Commission',
        hindiAuthority: 'राज्य लोक सेवा आयोग • State Civil Services',
        motto: 'सत्यमेव जयते • लोक सेवा एवं समर्पण',
        logoSrc: '/exam-logos/upsc.png',
        badgeLabel: 'State Civil Services Target',
        gradientBadge: 'from-amber-600 to-orange-500 text-white',
        ambientGlow: 'bg-amber-500/10 dark:bg-amber-500/15',
        borderColor: 'border-amber-200/80 dark:border-amber-500/20',
        accentColor: '#D97706'
      };
    }

    // 7) Custom / User-Defined / Other Target Exam (Bullseye Mission)
    return {
      key: 'custom',
      authorityName: 'Aspirant Target Mission • Personal Goal',
      hindiAuthority: 'लक्ष्य निर्धारण • मिशन शत-प्रतिशत सफलता',
      motto: 'Focus, Precision & Relentless Execution • 100% Bullseye',
      logoSrc: '/exam-logos/custom-target.png',
      badgeLabel: 'Aspirant Target Mission',
      gradientBadge: 'from-rose-600 via-red-500 to-amber-500 text-white',
      ambientGlow: 'bg-rose-500/10 dark:bg-rose-500/15',
      borderColor: 'border-rose-200/80 dark:border-rose-500/20',
      accentColor: '#E11D48'
    };
  }, [examName, currentExam?.code]);

  // 3. Days Remaining Runway Calculation
  const daysDiff = React.useMemo(() => {
    if (!currentExam?.examDate) return null;
    const now = new Date();
    const todayMid = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    let y = examYear || 2026;
    let m = now.getMonth();
    let d = now.getDate();
    if (currentExam.examDate.includes('-')) {
      const parts = currentExam.examDate.split('-').map(Number);
      if (parts.length >= 3 && !isNaN(parts[0])) {
        y = parts[0];
        m = parts[1] - 1;
        d = parts[2];
      }
    }
    const targetMid = new Date(y, m, d).getTime();
    return Math.round((targetMid - todayMid) / (1000 * 60 * 60 * 24));
  }, [currentExam?.examDate, examYear]);

  // 4. Formatted Exam Date String
  const formattedDate = React.useMemo(() => {
    if (!currentExam?.examDate) return '15 Oct 2026';
    try {
      const d = new Date(currentExam.examDate);
      if (isNaN(d.getTime())) return currentExam.examDate;
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return currentExam.examDate;
    }
  }, [currentExam?.examDate]);

  return (
    <>
      <div
        className={`group relative rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0E111C]/90 dark:backdrop-blur-2xl border ${examMeta.borderColor} p-4 sm:p-6 shadow-sm hover:shadow-md dark:shadow-[0_8px_32px_rgba(0,0,0,0.45)] transition-all duration-300 overflow-hidden select-none ${className}`}
      >
        {/* Top 2px Colored Ambient Accent Strip */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-80 group-hover:opacity-100 transition-opacity"
          style={{
            background: `linear-gradient(90deg, transparent, ${examMeta.accentColor}, transparent)`
          }}
        />

        {/* Ambient Radial Colored Glow (Top Left & Bottom Right) */}
        <div
          className={`absolute -top-12 -left-12 w-52 sm:w-72 h-52 sm:h-72 rounded-full ${examMeta.ambientGlow} blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500`}
        />
        <div
          className="absolute -bottom-12 -right-12 w-48 sm:w-60 h-48 sm:h-60 rounded-full bg-slate-500/5 dark:bg-white/[0.02] blur-3xl pointer-events-none"
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
          
          {/* LEFT SECTION: OFFICIAL EXAM EMBLEM + BIG BEAUTIFUL TYPOGRAPHY */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-5 min-w-0 flex-1">
            
            {/* 🏅 Luxury Emblem / Logo Container */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl sm:rounded-3xl bg-slate-50/90 dark:bg-white/[0.04] dark:backdrop-blur-xl border border-slate-200/90 dark:border-white/[0.10] p-2.5 sm:p-3 shadow-md shadow-black/5 dark:shadow-[0_8px_24px_rgba(0,0,0,0.35)] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 duration-300">
                {examMeta.logoSrc && !imgError ? (
                  <img
                    src={examMeta.logoSrc}
                    alt={examMeta.authorityName}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-contain filter drop-shadow-md select-none transition-transform group-hover:scale-105"
                  />
                ) : (
                  /* Fallback National Crest / Emblem */
                  <div className="w-full h-full rounded-xl sm:rounded-2xl bg-gradient-to-tr from-amber-500/15 to-orange-500/20 border border-amber-500/30 flex flex-col items-center justify-center text-amber-600 dark:text-amber-400">
                    <Award className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.2] drop-shadow-xs" />
                    <span className="text-[9px] font-black font-mono tracking-widest mt-0.5 uppercase">TARGET</span>
                  </div>
                )}
              </div>

              {/* Insignia Verified Target Dot */}
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 sm:h-4.5 sm:w-4.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex items-center justify-center rounded-full h-full w-full bg-amber-500 text-white text-[9px] font-black shadow-xs border-2 border-white dark:border-[#0E111C]">
                  ✓
                </span>
              </span>
            </div>

            {/* 🎯 Exam Title & Authority Micro-Summary */}
            <div className="min-w-0 flex-1 space-y-1.5 sm:space-y-2">
              
              {/* Top Mission Pill */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-wider bg-slate-100 dark:bg-white/[0.08] text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>TARGET MISSION</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold text-amber-700 dark:text-amber-300 bg-amber-500/10 border border-amber-500/25">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>{examMeta.badgeLabel}</span>
                </span>
              </div>

              {/* 🌟 BIG AND BEAUTIFUL EXAM TARGET HEADING */}
              <div className="space-y-0.5">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black font-grotesk tracking-tight text-slate-900 dark:text-white uppercase leading-none drop-shadow-2xs">
                  <span>{baseExamName}</span>
                  <span className="ml-2 sm:ml-3 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 font-mono tracking-normal">
                    {examYear}
                  </span>
                </h1>

                {/* Authority & Motto Subtitle */}
                <div className="flex items-center gap-2 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 font-medium flex-wrap pt-0.5">
                  <span className="font-bold text-slate-800 dark:text-slate-100">
                    {examMeta.authorityName}
                  </span>
                  <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">•</span>
                  <span className="text-slate-500 dark:text-slate-400 hidden sm:inline font-sans">
                    {examMeta.hindiAuthority}
                  </span>
                </div>
              </div>

              {/* Live Target Status Pills Row */}
              <div className="flex items-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs font-mono flex-wrap pt-1">
                
                {/* ⏳ Days Runway */}
                {daysDiff !== null && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100/90 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/[0.10] text-slate-800 dark:text-slate-100 font-bold shadow-2xs backdrop-blur-sm">
                    <Clock className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                    <span>{daysDiff > 0 ? `${daysDiff} Days Runway` : daysDiff === 0 ? 'Exam Today' : `${Math.abs(daysDiff)}d Since Exam`}</span>
                  </span>
                )}

                {/* 🗓️ Target Date */}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100/90 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/[0.10] text-slate-700 dark:text-slate-200 font-medium shadow-2xs backdrop-blur-sm">
                  <Calendar className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
                  <span>{formattedDate}</span>
                </span>

                {/* 🏆 Syllabus Completion */}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/25 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-bold shadow-2xs backdrop-blur-sm">
                  <Target className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                  <span>{overallStats.completionPercentage}% Mastered ({overallStats.completedCount}/{overallStats.totalTopics} Topics)</span>
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION: INTERACTIVE TARGET CONTROLS */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 self-stretch lg:self-center justify-end flex-wrap pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-white/[0.06]">
            
            {/* Switch / Edit Target Button */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setIsEditModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.07] dark:hover:bg-white/[0.12] text-slate-800 dark:text-slate-100 text-xs sm:text-[13px] font-bold transition-all duration-200 cursor-pointer shadow-2xs active:scale-95 border border-slate-200/80 dark:border-white/[0.10] backdrop-blur-sm"
              title="Change or customize your target exam"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>Switch Goal</span>
            </button>

            {/* Launch Quick Focus Timer */}
            {onOpenFocus && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onOpenFocus();
                }}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 dark:bg-amber-500/20 dark:hover:bg-amber-500/30 text-amber-700 dark:text-amber-300 border border-amber-500/30 dark:border-amber-500/40 text-xs sm:text-[13px] font-bold transition-all duration-200 cursor-pointer shadow-2xs active:scale-95 backdrop-blur-sm"
                title="Start a 25-minute Pomodoro focus study block"
              >
                <Timer className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                <span>Focus (25m)</span>
              </button>
            )}

            {/* View Full Syllabus CTA */}
            {onNavigate && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onNavigate('syllabus');
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs sm:text-[13px] font-extrabold transition-all duration-200 cursor-pointer shadow-md shadow-indigo-500/25 dark:shadow-indigo-500/40 border border-indigo-400/25 active:scale-95"
                title="Open Syllabus Explorer"
              >
                <span>Curriculum</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Edit Target Exam Modal */}
      {isEditModalOpen && (
        <EditExamTargetModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  );
};
