import { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/ScrollReveal';
import {
  BookOpen,
  AlertCircle,
  ChevronRight,
  Play,
  FileText,
  BarChart3,
  Download,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';

const TUTORIAL_STEPS = [
  {
    icon: FileText,
    title: 'Enter Your Sequence',
    description: 'Go to the Analyze page. Paste your protein sequence in the text area or upload a FASTA file by dragging and dropping into the upload zone.',
    tip: 'You can also click "Load Example" to try APARS with a sample BSA sequence.',
  },
  {
    icon: Play,
    title: 'Run the Analysis',
    description: 'Click the "Analyze Sequence" button or press Ctrl+Enter. APARS will validate your sequence and compute all properties.',
    tip: 'Analysis typically takes 1-3 seconds depending on sequence length.',
  },
  {
    icon: BarChart3,
    title: 'Explore Results',
    description: 'Browse through the six result tabs: Overview, Composition, Properties, Hydrophobicity, Structure, and Sequence Viewer.',
    tip: 'Hover over chart elements for detailed tooltips.',
  },
  {
    icon: Download,
    title: 'Export Your Data',
    description: 'Use the export bar at the bottom to download results as PDF reports, CSV spreadsheets, or JSON files.',
    tip: 'PDF reports are formatted for publication and include all computed properties.',
  },
];

const TROUBLESHOOTING = [
  {
    problem: 'Invalid sequence error',
    solution: 'Make sure your sequence only contains standard amino acid letters (A, C, D, E, F, G, H, I, K, L, M, N, P, Q, R, S, T, V, W, Y). Remove any headers, numbers, or special characters.',
  },
  {
    problem: 'Sequence too long error',
    solution: 'The maximum sequence length is 50,000 amino acids. For longer proteins, consider analyzing individual domains separately.',
  },
  {
    problem: 'FASTA file not parsing correctly',
    solution: 'Ensure your FASTA file starts with a >header line followed by the sequence. Check that there are no special characters in the sequence data.',
  },
  {
    problem: 'Charts not displaying',
    solution: 'Make sure you have analyzed a sequence first. Charts appear only after successful analysis. Try refreshing the page if charts do not render.',
  },
  {
    problem: 'Export buttons not working',
    solution: 'Check that your browser allows downloads. Disable popup blockers for this site. The export bar appears only when analysis results are available.',
  },
];

const FAQS = [
  {
    q: 'Do I need to create an account?',
    a: 'No. APARS is completely free and requires no registration.',
  },
  {
    q: 'Is my data kept private?',
    a: 'Yes. All analysis runs in your browser. Your sequences are never sent to any server unless you use optional cloud features.',
  },
  {
    q: 'What browsers are supported?',
    a: 'APARS works in all modern browsers: Chrome, Firefox, Safari, and Edge (latest versions).',
  },
  {
    q: 'Can I use APARS offline?',
    a: 'After the first load, APARS can work offline as a Progressive Web App. The analysis engine runs entirely client-side.',
  },
  {
    q: 'How do I cite APARS?',
    a: 'See our citation guide in the Documentation page. A BibTeX entry is provided for academic use.',
  },
];

export default function Help() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openTrouble, setOpenTrouble] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <ScrollReveal className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Help Center
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Learn how to use APARS with our step-by-step tutorial, FAQ, and troubleshooting guide.
          </p>
        </ScrollReveal>

        {/* Tutorial */}
        <section className="mb-16">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Quick Start Tutorial
            </h2>
          </ScrollReveal>

          <div className="space-y-6">
            {TUTORIAL_STEPS.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 100}>
                <div className="flex gap-4 p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                    <step.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                        STEP {i + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      {step.description}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg">
                      <strong>Tip:</strong> {step.tip}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={400} className="mt-6 text-center">
            <Link
              to="/analyze"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
            >
              <Play className="w-4 h-4" />
              Start Analyzing Now
            </Link>
          </ScrollReveal>
        </section>

        {/* Troubleshooting */}
        <section className="mb-16">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-amber-600" />
              Troubleshooting
            </h2>
          </ScrollReveal>

          <div className="space-y-3">
            {TROUBLESHOOTING.map((item, i) => (
              <ScrollReveal key={i} delay={i * 50}>
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <button
                    onClick={() => setOpenTrouble(openTrouble === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span className="font-medium text-slate-900 dark:text-white">{item.problem}</span>
                    <ChevronRight
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                        openTrouble === i ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  {openTrouble === i && (
                    <div className="px-4 pb-4 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
                      {item.solution}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-blue-600" />
              Frequently Asked Questions
            </h2>
          </ScrollReveal>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 50}>
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span className="font-medium text-slate-900 dark:text-white">{faq.q}</span>
                    <ChevronRight
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                        openFaq === i ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Video placeholder */}
        <section className="mb-12">
          <ScrollReveal>
            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 border-dashed text-center">
              <Play className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Video Tutorial
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                A comprehensive video walkthrough is coming soon.
              </p>
              <Link
                to="/documentation"
                className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
              >
                Read the docs instead
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
}
