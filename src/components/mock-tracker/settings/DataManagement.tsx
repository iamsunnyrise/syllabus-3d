import React, { useRef, useState } from 'react';
import { 
  Download, 
  Upload, 
  RotateCcw, 
  Trash2, 
  FileSpreadsheet, 
  FileJson, 
  AlertTriangle,
  CheckCircle2,
  Plus,
  X,
  Layers
} from 'lucide-react';
import { useMocks } from '../../../context/MockContext';
import { Card3DTilt } from '../3d/Card3DTilt';
import { Modal } from '../common/Modal';

export const DataManagement: React.FC = () => {
  const { 
    exportJSON, 
    exportCSV, 
    importJSON, 
    resetDemoData, 
    clearAllData, 
    mocks,
    customPlatforms,
    addCustomPlatform,
    deleteCustomPlatform
  } = useMocks();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showClearModal, setShowClearModal] = useState(false);
  const [importSummary, setImportSummary] = useState<{ imported: number; errors: string[] } | null>(null);
  const [newPlatformInput, setNewPlatformInput] = useState('');

  const handleAddNewPlatform = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlatformInput.trim()) {
      addCustomPlatform(newPlatformInput.trim());
      setNewPlatformInput('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const result = importJSON(content);
        setImportSummary(result);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-6">
      
      {/* 0. Custom Platforms Management */}
      <Card3DTilt
        maxTilt={1}
        className="p-6 rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#121424] shadow-sm space-y-4"
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Layers className="w-4 h-4" />
            <span>Platform Customization</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
            Custom Test Platforms
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Add your own coaching institutes, test series websites, or offline test series to use across mocks and filters.
          </p>
        </div>

        {/* Add New Custom Platform Form */}
        <form onSubmit={handleAddNewPlatform} className="flex items-center gap-2 pt-1">
          <input
            type="text"
            value={newPlatformInput}
            onChange={(e) => setNewPlatformInput(e.target.value)}
            placeholder="Enter platform name (e.g. Paramount, TopRankers, EduRev, Class Mock)..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white focus:border-indigo-500 outline-none"
          />
          <button
            type="submit"
            disabled={!newPlatformInput.trim()}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#4F46E5] disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-indigo-500/20 hover:bg-[#4338CA] transition-all shrink-0 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Platform</span>
          </button>
        </form>

        {/* Custom Platforms Tag List */}
        <div className="pt-2">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
            Your Active Custom Platforms ({customPlatforms.length}):
          </div>

          {customPlatforms.length === 0 ? (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/5 text-xs text-slate-500 dark:text-slate-400">
              No custom platforms added yet. Standard platforms (Testbook, Oliveboard, PracticeMock, etc.) are available by default.
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              {customPlatforms.map((p) => (
                <div
                  key={p}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-700 dark:text-indigo-300 text-xs font-bold animate-fadeIn"
                >
                  <span>⭐ {p}</span>
                  <button
                    type="button"
                    onClick={() => deleteCustomPlatform(p)}
                    className="p-0.5 rounded-md hover:bg-rose-500/20 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title={`Delete ${p}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card3DTilt>

      {/* 1. Export & Backup Section */}
      <Card3DTilt
        maxTilt={1}
        className="p-6 rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#121424] shadow-sm space-y-4"
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-mint">
            <Download className="w-4 h-4" />
            <span>Data Portability & Backup</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
            Export Mock Test Data
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Download your entire history, section performances, and percentile trajectories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* JSON Export */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <FileJson className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Full JSON Backup</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Complete raw dataset including section breakdowns and analysis notes. Ideal for restoring or migrating devices.
            </p>
            <button
              onClick={exportJSON}
              className="w-full py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON ({mocks.length} Mocks)</span>
            </button>
          </div>

          {/* CSV Export */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <FileSpreadsheet className="w-5 h-5 text-emerald-600 dark:text-mint" />
              <span>Excel / CSV Spreadsheet</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tabular spreadsheet containing mock dates, scores, percentiles, ranks, and cutoff statuses for custom analysis.
            </p>
            <button
              onClick={exportCSV}
              className="w-full py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-700 dark:text-mint border border-emerald-200 dark:border-mint/30 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV Spreadsheet</span>
            </button>
          </div>
        </div>
      </Card3DTilt>

      {/* 2. Import & Restore Section */}
      <Card3DTilt
        maxTilt={1}
        className="p-6 rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#121424] shadow-sm space-y-4"
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-lavender">
            <Upload className="w-4 h-4" />
            <span>Import & Migration</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
            Import Mock Test Records
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Load an existing JSON backup file to merge or restore your mock test history
          </p>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          accept=".json,application/json"
          onChange={handleFileUpload}
          className="hidden"
        />

        <div className="p-6 rounded-2xl border-2 border-dashed border-slate-300 dark:border-white/15 hover:border-indigo-500 dark:hover:border-indigo-400 bg-slate-50/50 dark:bg-white/[0.02] text-center space-y-3 transition-colors">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-500/15 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              Select JSON Backup File
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Validates schema constraints and prevents duplicate corrupted entries
            </p>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-5 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-xs shadow-md shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer"
          >
            Browse JSON File
          </button>
        </div>
      </Card3DTilt>

      {/* 3. Demo Data & Reset Actions */}
      <Card3DTilt
        maxTilt={1}
        className="p-6 rounded-3xl border border-rose-200 dark:border-alert-red/20 bg-white dark:bg-[#121424] shadow-sm space-y-4"
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-alert-red">
            <AlertTriangle className="w-4 h-4" />
            <span>Danger Zone & Reset</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
            Data Reset & Initialization
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          {/* Reset Demo Data */}
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">
              Reset to 10 Sample Demo Mocks
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Restores realistic SSC CGL Tier 1 & 2 diagnostic mock benchmarks
            </p>
          </div>

          <button
            onClick={resetDemoData}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/10 transition-all flex items-center gap-2 self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-white/5">
          {/* Clear All Data */}
          <div>
            <div className="text-xs font-bold text-alert-red">
              Wipe All Mock Test Records
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Permanently clears all mock attempts, scores, and personal baselines from local storage
            </p>
          </div>

          <button
            onClick={() => setShowClearModal(true)}
            className="px-4 py-2 rounded-xl bg-alert-red/15 hover:bg-alert-red/25 text-alert-red border border-alert-red/30 font-bold text-xs transition-all flex items-center gap-2 self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete All Records</span>
          </button>
        </div>
      </Card3DTilt>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        title="Confirm Data Deletion"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-300 leading-relaxed">
            Are you sure you want to permanently delete all <span className="font-bold text-white">{mocks.length} mock tests</span>? 
            This action cannot be undone.
          </p>
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              onClick={() => setShowClearModal(false)}
              className="px-4 py-2 rounded-xl text-slate-400 font-bold hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                clearAllData();
                setShowClearModal(false);
              }}
              className="px-4 py-2 rounded-xl bg-alert-red text-white font-bold shadow-glow-alert"
            >
              Yes, Delete All
            </button>
          </div>
        </div>
      </Modal>

      {/* Import Summary Modal */}
      {importSummary && (
        <Modal
          isOpen={Boolean(importSummary)}
          onClose={() => setImportSummary(null)}
          title="Import Summary Report"
          maxWidth="max-w-md"
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-2 text-mint-dark font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Successfully imported {importSummary.imported} records!</span>
            </div>

            {importSummary.errors.length > 0 && (
              <div className="p-3 rounded-xl bg-alert-red/10 border border-alert-red/30 text-alert-red space-y-1">
                <div className="font-bold">Errors encountered:</div>
                <ul className="list-disc list-inside space-y-0.5">
                  {importSummary.errors.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setImportSummary(null)}
                className="px-4 py-2 rounded-xl bg-electric-blue text-darkBg font-bold"
              >
                Close Report
              </button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};
