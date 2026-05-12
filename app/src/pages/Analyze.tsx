import { useState, useRef, useCallback, useEffect } from 'react';
import { useAnalysisStore } from '@/stores/analysisStore';
import { useUIStore } from '@/stores/uiStore';
import { EXAMPLE_SEQUENCE } from '@/lib/bioinformatics';
import ExportBar from '@/components/ExportBar';
import type { ProteinResults, AminoAcidComposition } from '@/lib/bioinformatics';
import {
  Upload,
  FileText,
  Trash2,
  Play,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  AlertCircle,
  Beaker,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'composition', label: 'Composition' },
  { id: 'properties', label: 'Properties' },
  { id: 'hydrophobicity', label: 'Hydrophobicity' },
  { id: 'structure', label: 'Structure' },
  { id: 'sequence', label: 'Sequence' },
];

const AA_COLORS: Record<string, string> = {
  A: '#3B82F6', R: '#EF4444', N: '#3B82F6', D: '#EF4444', C: '#F59E0B',
  Q: '#3B82F6', E: '#EF4444', G: '#6B7280', H: '#10B981', I: '#6B7280',
  L: '#6B7280', K: '#10B981', M: '#6B7280', F: '#8B5CF6', P: '#6B7280',
  S: '#3B82F6', T: '#3B82F6', W: '#8B5CF6', V: '#6B7280', Y: '#8B5CF6',
};

const CLASSIFICATION_COLORS_PIE: Record<string, string> = {
  polar: '#3B82F6', nonpolar: '#6B7280', acidic: '#EF4444', basic: '#10B981', aromatic: '#8B5CF6', special: '#F59E0B',
};

const PROPERTY_EXPLANATIONS: Record<string, string> = {
  'Molecular Weight': 'The mass of the protein calculated from amino acid residue weights plus water.',
  'Theoretical pI': 'The pH at which the protein carries no net electrical charge.',
  'Extinction Coefficient': 'Measure of light absorption at 280nm, used for protein concentration determination.',
  'Instability Index': 'Predicts protein stability; values < 40 indicate a stable protein.',
  'Aliphatic Index': 'Measures thermal stability based on aliphatic amino acid content.',
  'GRAVY': 'Grand Average of Hydropathy; positive = hydrophobic, negative = hydrophilic.',
  'Charge at pH 7': 'Net electrical charge of the protein at physiological pH.',
};

export default function Analyze() {
  const sequence = useAnalysisStore((s: AnalysisState) => s.sequence);
  const sequenceName = useAnalysisStore((s: AnalysisState) => s.sequenceName);
  const isAnalyzing = useAnalysisStore((s: AnalysisState) => s.isAnalyzing);
  const progress = useAnalysisStore((s: AnalysisState) => s.progress);
  const progressStep = useAnalysisStore((s: AnalysisState) => s.progressStep);
  const results = useAnalysisStore((s: AnalysisState) => s.results);
  const error = useAnalysisStore((s: AnalysisState) => s.error);
  const setSequence = useAnalysisStore((s: AnalysisState) => s.setSequence);
  const setSequenceName = useAnalysisStore((s: AnalysisState) => s.setSequenceName);
  const analyze = useAnalysisStore((s: AnalysisState) => s.analyze);
  const clearResults = useAnalysisStore((s: AnalysisState) => s.clearResults);
  const setError = useAnalysisStore((s: AnalysisState) => s.setError);
  const showToast = useUIStore((s: UIState) => s.showToast);
  const activeTab = useUIStore((s: UIState) => s.activeTab);
  const setActiveTab = useUIStore((s: UIState) => s.setActiveTab);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dragOver, setDragOver] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'Enter' && sequence.length > 0 && !isAnalyzing) {
        e.preventDefault();
        analyze();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [sequence, isAnalyzing, analyze]);

  const handleFileUpload = useCallback(
    (file: File) => {
      if (!file.name.match(/\.(fasta|fa|txt)$/i)) {
        setError('Please upload a .fasta, .fa, or .txt file');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (content) {
          setSequence(content);
          setSequenceName(file.name.replace(/\.(fasta|fa|txt)$/i, ''));
          showToast('File uploaded successfully', 'success');
        }
      };
      reader.readAsText(file);
    },
    [setSequence, setSequenceName, setError, showToast]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFileUpload(file);
    },
    [handleFileUpload]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const loadExample = () => {
    setSequence(EXAMPLE_SEQUENCE);
    setSequenceName('Bovine Serum Albumin (BSA)');
    showToast('Example sequence loaded', 'info');
  };

  const copySequence = () => {
    if (results?.sequence) {
      navigator.clipboard.writeText(results.sequence);
      setCopied(true);
      showToast('Sequence copied to clipboard', 'success');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen pt-16 flex">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 z-30 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 ${
          sidebarOpen ? 'w-80 translate-x-0' : 'w-0 -translate-x-full'
        } overflow-hidden`}
      >
        <div className="w-80 h-full flex flex-col p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Beaker className="w-5 h-5 text-blue-600" />
              Sequence Input
            </h2>
          </div>

          <div className="mb-3">
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              Sequence Name (optional)
            </label>
            <input
              type="text"
              value={sequenceName}
              onChange={(e) => setSequenceName(e.target.value)}
              placeholder="e.g., My Protein"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="flex-1 mb-3">
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              Protein Sequence
            </label>
            <textarea
              value={sequence}
              onChange={(e) => setSequence(e.target.value)}
              placeholder="Enter protein sequence (single letter code)...&#10;Or paste FASTA format&#10;>header&#10;SEQUENCEHERE"
              className="w-full h-full min-h-[200px] px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
              spellCheck={false}
            />
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`mb-3 p-4 rounded-xl border-2 border-dashed cursor-pointer transition-colors text-center ${
              dragOver
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600'
            }`}
          >
            <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Drag &amp; drop FASTA file or click to upload
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".fasta,.fa,.txt"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
              className="hidden"
            />
          </div>

          <div className="flex items-center gap-2 mb-3">
            <button onClick={loadExample} className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
              Load Example
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => {
                setSequence('');
                setSequenceName('');
                clearResults();
              }}
              className="text-xs text-slate-500 hover:text-red-500 font-medium flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              Clear
            </button>
          </div>

          <button
            onClick={analyze}
            disabled={!sequence.trim() || isAnalyzing}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Analyze Sequence
              </>
            )}
          </button>

          <p className="text-[10px] text-slate-400 text-center mt-2">
            Ctrl+Enter to analyze
          </p>

          {error && (
            <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}
        </div>
      </aside>

      {/* Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`fixed top-20 z-40 w-8 h-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-r-lg flex items-center justify-center shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all ${
          sidebarOpen ? 'left-80' : 'left-0'
        }`}
      >
        {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'}`}>
        {/* Loading State */}
        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
            <div className="w-full max-w-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {progressStep}
                </span>
                <span className="text-sm font-medium text-blue-600">{progress}%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%`, boxShadow: '0 0 10px rgba(37, 99, 235, 0.4)' }}
                />
              </div>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Computing physicochemical properties...
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isAnalyzing && !results && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
            <img src="/empty-state.png" alt="Enter a sequence" className="w-48 h-48 object-contain mb-6 opacity-60" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Enter a Sequence to Begin
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md text-center mb-6">
              Paste a protein sequence or upload a FASTA file to analyze its physicochemical
              properties, composition, and structure.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Enter Sequence
              </button>
              <button
                onClick={loadExample}
                className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 hover:border-blue-400 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg transition-colors"
              >
                Try Example
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {!isAnalyzing && results && (
          <div className="p-4 sm:p-6">
            {/* Results Header */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{results.sequenceName}</h2>
                <span className="px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium">
                  {results.sequenceLength} residues
                </span>
                {results.isStable ? (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
                    Stable
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-medium">
                    Unstable
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <span>MW: {results.molecularWeight.average.toFixed(1)} Da</span>
                <span>pI: {results.theoreticalPi}</span>
                <span>GRAVY: {results.gravy}</span>
                <span>Charge (pH 7): {results.chargeAtPh7 > 0 ? '+' : ''}{results.chargeAtPh7}</span>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Sequence Length', value: `${results.sequenceLength}`, sub: 'residues' },
                { label: 'Molecular Weight', value: `${(results.molecularWeight.average / 1000).toFixed(1)}`, sub: 'kDa' },
                { label: 'Theoretical pI', value: `${results.theoreticalPi}`, sub: '' },
                { label: 'GRAVY Score', value: `${results.gravy}`, sub: results.gravy > 0 ? 'hydrophobic' : 'hydrophilic' },
              ].map((card) => (
                <div key={card.label} className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{card.label}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{card.value}</p>
                  {card.sub && <p className="text-xs text-slate-400 dark:text-slate-500">{card.sub}</p>}
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200 dark:border-slate-700 mb-6">
              <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                        : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="pb-20">
              {activeTab === 'overview' && <OverviewTab results={results} />}
              {activeTab === 'composition' && <CompositionTab results={results} />}
              {activeTab === 'properties' && <PropertiesTab results={results} />}
              {activeTab === 'hydrophobicity' && <HydrophobicityTab results={results} />}
              {activeTab === 'structure' && <StructureTab results={results} />}
              {activeTab === 'sequence' && (
                <SequenceTab results={results} copied={copied} onCopy={copySequence} />
              )}
            </div>
          </div>
        )}
      </main>

      {results && <ExportBar />}
    </div>
  );
}

/* Sub-components for each tab */

function OverviewTab({ results }: { results: ProteinResults }) {
  const overviewProps: [string, string][] = [
    ['Molecular Weight (average)', `${results.molecularWeight.average.toFixed(2)} Da`],
    ['Molecular Weight (monoisotopic)', `${results.molecularWeight.monoisotopic.toFixed(2)} Da`],
    ['Theoretical pI', `${results.theoreticalPi}`],
    ['Extinction Coefficient (reduced)', `${results.extinctionCoefficient.reduced} M\u207B\u00B9cm\u207B\u00B9`],
    ['Extinction Coefficient (oxidized)', `${results.extinctionCoefficient.oxidized} M\u207B\u00B9cm\u207B\u00B9`],
    ['Absorbance (reduced)', `${results.extinctionCoefficient.absorbanceReduced}`],
    ['Instability Index', `${results.instabilityIndex} (${results.isStable ? 'Stable' : 'Unstable'})`],
    ['Aliphatic Index', `${results.aliphaticIndex}`],
    ['GRAVY', `${results.gravy}`],
    ['Charge at pH 7', `${results.chargeAtPh7 > 0 ? '+' : ''}${results.chargeAtPh7}`],
    ['Half-life (Mammalian)', results.halfLife.mammalian],
    ['Half-life (Yeast)', results.halfLife.yeast],
    ['Half-life (E. coli)', results.halfLife.ecoli],
    ['N-terminus', results.nTerminus],
    ['C-terminus', results.cTerminus],
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Property Summary</h3>
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="w-full text-sm">
          <tbody>
            {overviewProps.map(([label, value], i) => (
              <tr
                key={label}
                className={`border-b border-slate-100 dark:border-slate-800 ${
                  i % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-800/50'
                } hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors`}
              >
                <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300 w-1/2">
                  <span title={PROPERTY_EXPLANATIONS[label] || ''} className="cursor-help">
                    {label}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-900 dark:text-white font-mono">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-8">Atomic Composition</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {(['C', 'H', 'N', 'O', 'S'] as const).map((atom) => {
          const count = results.atomicComposition[atom];
          return (
            <div key={atom} className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{atom}</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">{count}</p>
              <p className="text-xs text-slate-500">{((count / results.atomicComposition.total) * 100).toFixed(1)}%</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CompositionTab({ results }: { results: ProteinResults }) {
  const pieData = Object.entries(results.classificationCounts).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value: value as number,
  }));

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Amino Acid Count</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={results.aminoAcidComposition.slice(0, 20)} margin={{ left: 20, right: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="code" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px' }} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {results.aminoAcidComposition.slice(0, 20).map((entry: AminoAcidComposition) => (
                <Cell key={entry.code} fill={AA_COLORS[entry.code] || '#3B82F6'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-slate-700 dark:text-slate-300">AA</th>
              <th className="px-4 py-2 text-left font-semibold text-slate-700 dark:text-slate-300">Name</th>
              <th className="px-4 py-2 text-right font-semibold text-slate-700 dark:text-slate-300">Count</th>
              <th className="px-4 py-2 text-right font-semibold text-slate-700 dark:text-slate-300">Mole %</th>
              <th className="px-4 py-2 text-right font-semibold text-slate-700 dark:text-slate-300">Mass %</th>
            </tr>
          </thead>
          <tbody>
            {results.aminoAcidComposition.map((aa: AminoAcidComposition, i: number) => (
              <tr
                key={aa.code}
                className={`border-b border-slate-100 dark:border-slate-800 ${
                  i % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-800/50'
                }`}
              >
                <td className="px-4 py-2 font-mono font-bold" style={{ color: AA_COLORS[aa.code] }}>{aa.code}</td>
                <td className="px-4 py-2 text-slate-700 dark:text-slate-300">{aa.name}</td>
                <td className="px-4 py-2 text-right font-mono">{aa.count}</td>
                <td className="px-4 py-2 text-right font-mono">{aa.molePercent}%</td>
                <td className="px-4 py-2 text-right font-mono">{aa.massPercent}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Amino Acid Classification</h4>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
              {pieData.map((entry) => (
                <Cell key={entry.name} fill={CLASSIFICATION_COLORS_PIE[entry.name.toLowerCase()] || '#3B82F6'} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function PropertiesTab({ results }: { results: ProteinResults }) {
  const props = [
    { title: 'Molecular Weight', value: `${results.molecularWeight.average.toFixed(2)} Da`, desc: 'Sum of residue weights + water (18.015 Da)' },
    { title: 'Monoisotopic Weight', value: `${results.molecularWeight.monoisotopic.toFixed(2)} Da`, desc: 'Using monoisotopic mass of each atom' },
    { title: 'Extinction Coefficient (Reduced)', value: `${results.extinctionCoefficient.reduced} M\u207B\u00B9cm\u207B\u00B9`, desc: `E = nW\u00d75500 + nY\u00d71490 + nC\u00d7125` },
    { title: 'Extinction Coefficient (Oxidized)', value: `${results.extinctionCoefficient.oxidized} M\u207B\u00B9cm\u207B\u00B9`, desc: 'Assuming all Cys form cystine disulfide bonds' },
    { title: 'Instability Index', value: `${results.instabilityIndex} (${results.isStable ? 'Stable' : 'Unstable'})`, desc: 'II < 40 indicates a stable protein' },
    { title: 'Aliphatic Index', value: `${results.aliphaticIndex}`, desc: 'AI = X(Ala) + 2.9\u00d7X(Val) + 3.9\u00d7X(Ile+Leu)' },
    { title: 'Half-life (Mammalian)', value: results.halfLife.mammalian, desc: 'Estimated in vitro half-life in mammalian reticulocytes' },
    { title: 'Half-life (Yeast)', value: results.halfLife.yeast, desc: 'Estimated half-life in yeast' },
    { title: 'Half-life (E. coli)', value: results.halfLife.ecoli, desc: 'Estimated half-life in E. coli' },
    { title: 'Charge at pH 7.0', value: `${results.chargeAtPh7 > 0 ? '+' : ''}${results.chargeAtPh7}`, desc: 'Net charge at physiological pH' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Detailed Properties</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {props.map((prop) => (
          <div key={prop.title} className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{prop.title}</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white font-mono">{prop.value}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-mono">{prop.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HydrophobicityTab({ results }: { results: ProteinResults }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Hydrophobicity Profile</h3>
        <div className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            GRAVY: {results.gravy} ({results.gravy > 0 ? 'Hydrophobic' : 'Hydrophilic'})
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={results.hydrophobicityPlot} margin={{ left: 20, right: 20 }}>
            <defs>
              <linearGradient id="hydroGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="position" tick={{ fontSize: 11 }} label={{ value: 'Residue Position', position: 'insideBottom', offset: -5, style: { fontSize: 12 } }} />
            <YAxis tick={{ fontSize: 11 }} label={{ value: 'Hydropathy', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px' }} formatter={(value: number) => [value.toFixed(3), 'Hydropathy']} />
            <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fill="url(#hydroGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400">
        Kyte-Doolittle hydropathy values using a sliding window of 9 residues.
        Positive values indicate hydrophobic regions, negative values indicate hydrophilic regions.
      </p>
    </div>
  );
}

function StructureTab({ results }: { results: ProteinResults }) {
  const ssData = [
    { name: 'Alpha Helix', value: results.secondaryStructure.helix, fill: '#3B82F6' },
    { name: 'Beta Sheet', value: results.secondaryStructure.sheet, fill: '#10B981' },
    { name: 'Beta Turn', value: results.secondaryStructure.turn, fill: '#F59E0B' },
    { name: 'Random Coil', value: results.secondaryStructure.coil, fill: '#6B7280' },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Secondary Structure Prediction</h3>
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={ssData} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis type="number" tick={{ fontSize: 11 }} domain={[0, 100]} />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={100} />
            <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} formatter={(value: number) => [`${value.toFixed(1)}%`, 'Percentage']} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-8">Charge vs pH Profile</h3>
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={results.chargePlot} margin={{ left: 20, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="ph" tick={{ fontSize: 11 }} label={{ value: 'pH', position: 'insideBottom', offset: -5, style: { fontSize: 12 } }} />
            <YAxis tick={{ fontSize: 11 }} label={{ value: 'Net Charge', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} />
            <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} formatter={(value: number) => [value.toFixed(2), 'Charge']} />
            <Line type="monotone" dataKey="charge" stroke="#3B82F6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Isoelectric Point (pI): {results.theoreticalPi}
        </p>
        <div className="relative h-8 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-blue-600">
          <div
            className="absolute top-0 w-1 h-8 bg-white border-2 border-slate-800 rounded-full shadow-lg"
            style={{ left: `${(results.theoreticalPi / 14) * 100}%` }}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded">
              {results.theoreticalPi}
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-white font-medium px-2 pt-8">
            <span>0</span><span>7</span><span>14</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SequenceTab({ results, copied, onCopy }: { results: ProteinResults; copied: boolean; onCopy: () => void }) {
  const chunks = Array.from({ length: Math.ceil(results.sequence.length / 50) }, (_, i) => {
    const start = i * 50;
    return results.sequence.slice(start, start + 50);
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Sequence Viewer</h3>
        <button
          onClick={onCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 overflow-x-auto">
        <div className="font-mono text-xs leading-7">
          {chunks.map((chunk, i) => (
            <div key={i} className="flex">
              <span className="text-slate-500 w-12 shrink-0 text-right pr-3 select-none">
                {i * 50 + 1}
              </span>
              <span>
                {chunk.split('').map((aa, j) => (
                  <span key={j} className="inline-block w-3.5 text-center" style={{ color: AA_COLORS[aa] || '#94A3B8' }}>
                    {aa}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        {Object.entries(AA_COLORS).slice(0, 5).map(([aa, color]) => (
          <div key={aa} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
            <span className="text-slate-600 dark:text-slate-400">{aa}</span>
          </div>
        ))}
        <span className="text-xs text-slate-400 self-center">(color-coded by property)</span>
      </div>
    </div>
  );
}

interface AnalysisState {
  sequence: string;
  sequenceName: string;
  isAnalyzing: boolean;
  progress: number;
  progressStep: string;
  results: ProteinResults | null;
  error: string | null;
  setSequence: (seq: string) => void;
  setSequenceName: (name: string) => void;
  analyze: () => Promise<void>;
  clearResults: () => void;
  setError: (error: string | null) => void;
}

interface UIState {
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
