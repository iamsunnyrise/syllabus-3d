import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { useMocks } from '../../../context/MockContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useMocks();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-28 md:bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none px-4">
      {toasts.map(toast => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-mint shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
          info: <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
        };

        const borders = {
          success: 'border-emerald-500/30 bg-white/95 dark:bg-[#121424]/95 text-emerald-800 dark:text-emerald-200',
          warning: 'border-amber-500/30 bg-white/95 dark:bg-[#121424]/95 text-amber-800 dark:text-amber-200',
          error: 'border-rose-500/30 bg-white/95 dark:bg-[#121424]/95 text-rose-800 dark:text-rose-200',
          info: 'border-indigo-500/30 bg-white/95 dark:bg-[#121424]/95 text-indigo-800 dark:text-indigo-200'
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl border shadow-xl backdrop-blur-md transition-all animate-float ${borders[toast.type]}`}
          >
            <div className="flex items-center gap-3">
              {icons[toast.type]}
              <span className="text-sm font-medium text-slate-900 dark:text-white">
                {toast.message}
              </span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
