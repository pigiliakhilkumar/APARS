import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import {
  BookOpen,
  FileText,
  BarChart3,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Copy,
  Check,
} from 'lucide-react';

const SECTIONS = [
  { id: 'getting-started', title: 'Getting Started', icon: BookOpen },
  { id: 'input-formats', title: 'Input Formats', icon: FileText },
  { id: 'understanding-results', title: 'Understanding Results', icon: BarChart3 },
  { id: 'properties-reference', title: 'Properties Reference', icon: BookOpen },
  { id: 'faq', title: 'FAQ', icon: AlertCircle },
];

const PROPERTIES_TABLE = [
  { property: 'Molecular Weight', formula: '\u03a3(residue weights) + H\u2082O', description: 'Total mass of the protein in Daltons' },
  { property: 'Theoretical pI', formula: 'pH where net charge = 0', description: 'Isoelectric point using bisection method' },
  { property: 'Extinction Coefficient', formula: '(nW\u00d75500) + (nY\u00d71490) + (nC\u00d7125)', description: 'Absorbance at 280nm for concentration' },
  { property: 'Instability Index', formula: '(10/L) \u00d7 \u03a3 dipeptide weights', description: 'II < 40 indicates stable protein' },
  { property: 'Aliphatic Index', formula: 'X(Ala) + 2.9\u00d7X(Val) + 3.9\u00d7X(Ile+Leu)', description: 'Thermal stability predictor' },
  { property: 'GRAVY', formula: '\u03a3(KD values) / L', description: 'Grand Average of Hydropathy' },
  { property: 'Charge at pH 7', formula: '\u03a3(+charges) - \u03a3(-charges)', description: 'Net charge at physiological pH' },
  { property: 'Atomic Composition', formula: 'Sum of atoms per residue', description: 'C, H, N, O, S atom counts' },
];

const FAQS = [
  {
    q: 'What sequence formats does APARS support?',
    a: 'APARS supports raw amino acid sequences (single-letter code) and FASTA format. You can paste sequences directly or upload .fasta, .fa, or .txt files.',
  },
  {
    q: 'What is the maximum sequence length?',
    a: 'APARS can analyze sequences up to 50,000 amino acids long. For longer sequences, consider splitting them into domains.',
  },
  {
    q: 'How accurate is the pI calculation?',
    a: 'The pI is computed using the bisection method with standard pK values. Results are typically within 0.1-0.3 pH units of experimental values.',
  },
  {
    q: 'Can I export my results?',
    a: 'Yes! After analysis, use the export bar at the bottom to download results as PDF reports, CSV data, or JSON files.',
  },
  {
    q: 'Is APARS free to use?',
    a: 'Yes, APARS is completely free and open-source. No account or registration is required.',
  },
  {
    q: 'Which amino acids are supported?',
    a: 'All 20 standard amino acids (A, C, D, E, F, G, H, I, K, L, M, N, P, Q, R, S, T, V, W, Y) are fully supported.',
  },
];

export default function Documentation() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-60 shrink-0">
            <div className="sticky top-20 space-y-1">
              <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 px-3">
                Contents
              </h2>
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
                  }`}
                >
                  <section.icon className="w-4 h-4" />
                  {section.title}
                </button>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Getting Started */}
            <section id="getting-started" className="mb-12">
              <ScrollReveal>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  Getting Started
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  APARS (AI-Powered Protein Analysis and Research Suite) is a free, open-source
                  web tool for analyzing protein sequences. It computes physicochemical properties,
                  visualizes amino acid composition, and generates comprehensive reports.
                </p>

                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 mb-6">
                  <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">
                    Quick Start
                  </h3>
                  <ol className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      Navigate to the Analyze page
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      Paste your protein sequence or upload a FASTA file
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      Click "Analyze Sequence" or press Ctrl+Enter
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      Explore results across all tabs
                    </li>
                  </ol>
                </div>
              </ScrollReveal>
            </section>

            {/* Input Formats */}
            <section id="input-formats" className="mb-12">
              <ScrollReveal>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  Input Formats
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  APARS accepts two input formats: raw sequences and FASTA.
                </p>

                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                  Raw Sequence
                </h3>
                <div className="relative mb-6">
                  <pre className="p-4 rounded-xl bg-slate-900 text-slate-300 text-sm font-mono overflow-x-auto">
{`MKWVTFISLLLLFSSAYSRGVFRRDTHKSEIAHRFKDLGE
EHFKGLVLIAFSQYLQQCPFEDHVKLVNEVTEFAKTCVAD`}
                  </pre>
                  <button
                    onClick={() => copyCode('MKWVTFISLLLLFSSAYSRGVFRRDTHKSEIAHRFKDLGEEHFKGLVLIAFSQYLQQCPFEDHVKLVNEVTEFAKTCVAD', 'raw')}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
                  >
                    {copiedCode === 'raw' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                  </button>
                </div>

                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                  FASTA Format
                </h3>
                <div className="relative mb-6">
                  <pre className="p-4 rounded-xl bg-slate-900 text-slate-300 text-sm font-mono overflow-x-auto">
{`>sp|P02769|ALBU_BOVIN Serum albumin OS=Bos taurus
MKWVTFISLLLLFSSAYSRGVFRRDTHKSEIAHRFKDLGE
EHFKGLVLIAFSQYLQQCPFEDHVKLVNEVTEFAKTCVAD`}
                  </pre>
                  <button
                    onClick={() => copyCode('>sp|P02769|ALBU_BOVIN Serum albumin\nMKWVTFISLLLLFSSAYSRGVFRRDTHKSEIAHRFKDLGE\nEHFKGLVLIAFSQYLQQCPFEDHVKLVNEVTEFAKTCVAD', 'fasta')}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
                  >
                    {copiedCode === 'fasta' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                        Supported Characters
                      </p>
                      <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                        Only standard amino acid single-letter codes are accepted:
                        A, C, D, E, F, G, H, I, K, L, M, N, P, Q, R, S, T, V, W, Y
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </section>

            {/* Understanding Results */}
            <section id="understanding-results" className="mb-12">
              <ScrollReveal>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  Understanding Results
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  After analysis, results are organized into six tabs:
                </p>

                <div className="space-y-4">
                  {[
                    { name: 'Overview', desc: 'Summary cards with key metrics (length, MW, pI, GRAVY) and a complete property table with all computed values.' },
                    { name: 'Composition', desc: 'Interactive bar chart of amino acid counts, detailed composition table, and a donut chart showing amino acid classification (polar, non-polar, acidic, basic, aromatic).' },
                    { name: 'Properties', desc: 'Detailed property cards with values, explanations, and formulas used for calculations.' },
                    { name: 'Hydrophobicity', desc: 'Kyte-Doolittle hydropathy plot showing hydrophobic and hydrophilic regions across the sequence.' },
                    { name: 'Structure', desc: 'Secondary structure prediction (helix, sheet, turn, coil percentages), charge vs pH profile, and pI visualization.' },
                    { name: 'Sequence', desc: 'Color-coded sequence viewer with residue numbering and copy-to-clipboard functionality.' },
                  ].map((tab) => (
                    <div
                      key={tab.name}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    >
                      <ChevronRight className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{tab.name}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{tab.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </section>

            {/* Properties Reference */}
            <section id="properties-reference" className="mb-12">
              <ScrollReveal>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  Properties Reference
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Complete reference of all computed physicochemical properties with formulas.
                </p>

                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Property</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Formula</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PROPERTIES_TABLE.map((prop, i) => (
                        <tr
                          key={prop.property}
                          className={`border-b border-slate-100 dark:border-slate-800 ${
                            i % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-800/50'
                          }`}
                        >
                          <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{prop.property}</td>
                          <td className="px-4 py-3 font-mono text-xs text-blue-600 dark:text-blue-400">{prop.formula}</td>
                          <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{prop.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </ScrollReveal>
            </section>

            {/* FAQ */}
            <section id="faq" className="mb-12">
              <ScrollReveal>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">FAQ</h2>
                <div className="space-y-3">
                  {FAQS.map((faq, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                    >
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
                  ))}
                </div>
              </ScrollReveal>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
