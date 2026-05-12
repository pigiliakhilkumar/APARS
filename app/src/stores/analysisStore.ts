import { create } from 'zustand';
import type { ProteinResults } from '@/lib/bioinformatics';
import { analyzeProtein, EXAMPLE_SEQUENCE } from '@/lib/bioinformatics';

interface AnalysisState {
  sequence: string;
  sequenceName: string;
  inputMode: 'paste' | 'upload';
  fileName: string | null;
  isAnalyzing: boolean;
  progress: number;
  progressStep: string;
  results: ProteinResults | null;
  error: string | null;
  setSequence: (seq: string) => void;
  setSequenceName: (name: string) => void;
  setInputMode: (mode: 'paste' | 'upload') => void;
  setFileName: (name: string | null) => void;
  setProgress: (progress: number) => void;
  setProgressStep: (step: string) => void;
  analyze: () => Promise<void>;
  clearResults: () => void;
  setError: (error: string | null) => void;
  loadExample: () => void;
}

const STEPS = [
  'Validating sequence...',
  'Computing amino acid composition...',
  'Calculating molecular weight...',
  'Determining isoelectric point...',
  'Analyzing extinction coefficient...',
  'Computing instability index...',
  'Calculating hydrophobicity profile...',
  'Predicting secondary structure...',
  'Generating charge profile...',
  'Finalizing results...',
];

export const useAnalysisStore = create<AnalysisState>((set, get) => ({
  sequence: '',
  sequenceName: '',
  inputMode: 'paste',
  fileName: null,
  isAnalyzing: false,
  progress: 0,
  progressStep: '',
  results: null,
  error: null,

  setSequence: (seq: string) => set({ sequence: seq }),
  setSequenceName: (name: string) => set({ sequenceName: name }),
  setInputMode: (mode: 'paste' | 'upload') => set({ inputMode: mode }),
  setFileName: (name: string | null) => set({ fileName: name }),
  setProgress: (progress: number) => set({ progress }),
  setProgressStep: (step: string) => set({ progressStep: step }),

  analyze: async () => {
    const state = get();
    set({ isAnalyzing: true, progress: 0, error: null, results: null });

    try {
      for (let i = 0; i < STEPS.length; i++) {
        set({
          progress: Math.round(((i + 1) / STEPS.length) * 100),
          progressStep: STEPS[i],
        });
        await new Promise((r) => setTimeout(r, 200));
      }

      const results = analyzeProtein(state.sequence, state.sequenceName || undefined);
      set({ results, isAnalyzing: false, progress: 100 });

      try {
        const recent = JSON.parse(sessionStorage.getItem('apars_recent') || '[]');
        const entry = {
          sequence: state.sequence.slice(0, 100),
          fullLength: state.sequence.length,
          name: state.sequenceName || `Sequence_${state.sequence.length}aa`,
          timestamp: Date.now(),
          pi: results.theoreticalPi,
          mw: results.molecularWeight.average,
        };
        const updated = [entry, ...recent].slice(0, 10);
        sessionStorage.setItem('apars_recent', JSON.stringify(updated));
      } catch {
        // Ignore storage errors
      }
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Analysis failed',
        isAnalyzing: false,
        progress: 0,
      });
    }
  },

  clearResults: () =>
    set({
      results: null,
      error: null,
      progress: 0,
      progressStep: '',
      sequence: '',
      sequenceName: '',
      fileName: null,
    }),

  setError: (error: string | null) => set({ error }),

  loadExample: () => {
    set({
      sequence: EXAMPLE_SEQUENCE,
      sequenceName: 'Bovine Serum Albumin (BSA)',
      inputMode: 'paste',
      fileName: null,
      error: null,
    });
  },
}));
